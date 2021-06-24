import React, { useState } from 'react';

import {
  InputTextNameAlphaNum,
  SelectInput,
} from '../../../components/formInputs/';
import {
  Button,
  TitleText,
  StepsText,
  SubtitleText,
} from '../../../components/formUtils/';
import Map from './GoogleMap.component';
import SearchLocation from './GoogleSearchBar.component';
import { neighborhood } from '../../../models/enums';
import { IsalonConfiguration, ICoords, IValidForm } from '../../../models';
import { setStateSD, getStateSD } from '../../../services/step1Salon';
import { useHistory } from 'react-router-dom';
import {
  getGlobalState,
  setGlobalState,
} from '../../../services/globalConfigState';

const SalonDetailForm = (): JSX.Element => {
  const history = useHistory();
  const [valid, setValid] = useState<IValidForm>({
    validString: false,
    validButton: false,
    validList: false,
  });
  const [entries, setEntries] = useState<IsalonConfiguration>({
    commercialName: '',
    neighborhood: '',
    address: '',
    mapRender: false,
  });
  const [mapRender, setMapRender] = useState<boolean>(false);
  const [inputEnabler, setInputEnabler] = useState<boolean>(true);
  const [coords, setCoords] = useState<ICoords>({
    lng: 0,
    lat: 0,
    address: '',
  });
  let rxState = getStateSD();

  const handleInputChange = (name: string, value: string | undefined): void => {
    const validating = value?.length;
    if (value && validating)
      // validates the input component to have a value before it lets the user continue
      setValid({
        ...valid,
        validString: true,
      });
    else
      setValid({
        ...valid,
        validString: false,
      });

    rxState = getStateSD(); // sends the value to the local and rxState
    setEntries({
      ...entries,
      [name]: value,
    });
    setStateSD({
      ...rxState,
      [name]: value,
    });
  };
  const handleListChange = (name: string, value: string | undefined): void => {
    const validating = value?.length;
    if (value && validating)
      // once an option is selected it sets the validation on true, to let the user continue
      setValid({
        ...valid,
        validList: true,
        validButton: false,
      });
    else
      setValid({
        ...valid,
        validList: false,
      });

    rxState = getStateSD(); // sets the local and rxState with the option selected
    setEntries({
      ...entries,
      [name]: value,
    });
    setStateSD({
      ...rxState,
      [name]: value,
    });
    setInputEnabler(false);
  };
  const handleCoordsSearchbar = (coords: ICoords): void => {
    setCoords(coords); // sets the coords from the selected address
    setMapRender(true); // renders the map once an address is selected
    setStateSD({
      // sets the rxState with the coords and address selected
      ...getStateSD(),
      address: coords.address,
      lng: coords.lng,
      lat: coords.lat,
    });

    window.scrollTo({
      top: 0,
    });
  };
  const handleCoordsButton = (coords: ICoords): void => {
    rxState = getStateSD();
    setCoords(coords); // sets the coords if the user changed them before confirming
    setStateSD({
      // sets the state with said coords and address
      ...rxState,
      address: coords.address,
      lng: coords.lng,
      lat: coords.lat,
    });
    setMapRender(false); // unrenders the map once the confirm button is pushed
    setValid({
      // valids the "go next page" button
      ...valid,
      validButton: true,
    });
    setInputEnabler(true);
  };

  const handleSubmit = () => {
    // sets the global state with the local and rxState we already passed the component info.
    rxState = getStateSD();
    if (valid) {
      setGlobalState({
        ...getGlobalState(),
        stepSalonDetail: {
          ...rxState,
          isValidated: true,
        },
      });
      history.push('/Configuration/BussinessHours');
    }
  };

  return (
    <div className='form fix-form'>
      <StepsText text='Paso 1 de 5' />
      <div className='createTitleText'>
        <TitleText text='Queremos conocer más de tu Salón' />
      </div>
      <div className='subtitle'>
        <SubtitleText text='Esta es la información que verán tus clientes' />
      </div>
      <div className='inputContainer'>
        <label>Nombre comercial</label>
        <InputTextNameAlphaNum
          name='commercialName'
          placeholder='Nombre comercial'
          value={rxState.commercialName}
          handleInputChange={handleInputChange}
        />
      </div>
      <div className='inputContainer'>
        <label>Barrio</label>
        <SelectInput
          value={rxState.neighborhood}
          handleInputChange={handleListChange}
          selectValues={Object.values(neighborhood)}
          inputType='neighborhood'
          placeholder='Seleccione su Barrio'
        />
      </div>
      <div className='inputContainer'>
        <label>Dirección del salón</label>
        <SearchLocation
          selectedNeighborhood={entries.neighborhood}
          name={'address'}
          handleCoordsChange={handleCoordsSearchbar}
          inputEnabler={inputEnabler}
        />
      </div>
      {mapRender ? (
        <Map
          lat={coords.lat}
          lng={coords.lng}
          address={coords.address}
          handleCoordsChange={handleCoordsButton}
          handleSearchCoordsChange={handleCoordsSearchbar}
        />
      ) : null}
      <div className='void'></div>
      <div className='buttonCreate'>
        <Button
          text='Continuar'
          handleSubmit={handleSubmit}
          isValid={valid.validButton && valid.validString && valid.validList}
        />
      </div>
    </div>
  );
};

export default SalonDetailForm;
