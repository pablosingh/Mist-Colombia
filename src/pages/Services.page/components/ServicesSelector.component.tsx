import React, { useEffect, useState, useContext } from 'react';
import {
  Button,
  TitleText,
  StepsText,
  SubtitleText,
  LabelTextComponent,
} from '../../../components/formUtils/';
import { RoundedCheckbox } from '../../../components/checkboxes';
import { HairdressingTypes, CosmeticsTypes } from '../../../models/enums';
import {
  getStateServices,
  setStateServices,
  stateObservable,
} from '../../../services/step2';
import { useHistory } from 'react-router-dom';
import {
  getGlobalState,
  setGlobalState,
} from '../../../services/globalConfigState';
import { BackNavBar } from '../../../components/appUtils/';
import { AuthContext } from '../../../components/appUtils/AuthProvider';
import { PartnerType } from '../../../models/enums';

const ServicesSelector = (): JSX.Element => {
  const [isValid, setIsValid] = useState(false);
  const { userType } = useContext(AuthContext);
  const history = useHistory();

  const checkBoxAction = (arr: string[], str: string) => {
    return arr.includes(str) ? arr.filter((el) => el !== str) : arr.concat(str);
  };

  const handleCheckboxClickHd = (text: string) => {
    //  For HairDressing checkbox
    const { hairdressingData } = getStateServices();
    const newHairdressingData = checkBoxAction(hairdressingData, text);

    setStateServices({
      ...getStateServices(),
      hairdressingData: newHairdressingData,
    });
  };

  const handleCheckboxClickE = (text: string) => {
    //  For esthetic checkbox
    const { estheticData } = getStateServices();
    const newEstheticData = checkBoxAction(estheticData, text);

    setStateServices({
      ...getStateServices(),
      estheticData: newEstheticData,
    });
  };

  const handleSubmit = () => {
    const state = getStateServices();
    if (isValid) {
      setGlobalState({
        ...getGlobalState(),
        stepServices: {
          ...state,
          isValid: true,
        },
      });
      history.push('/Configuration/Prices');
    }
  };

  useEffect(() => {
    const observable = stateObservable().subscribe((data) =>
      setIsValid(!!data.hairdressingData.length || !!data.estheticData.length)
    );
    return () => observable.unsubscribe();
  });

  useEffect(() => {
    if (!getGlobalState().stepBusinessHours?.isValid()) {
      history.push('/Configuration/BussinessHours');
    }
  }, []);

  const steps =
    userType === PartnerType.INDEPENDENT ? 'Paso 2 de 3' : 'Paso 3 de 5';
  const title = '¿Qué servicios ofreces?';
  const subTitle =
    userType === PartnerType.INDEPENDENT
      ? 'Los servicios que los clientes podrán agendar a domicilio'
      : 'Selecciona los servicios que los clientes podrán agendar en tu salón';
  const subTitleClass =
    userType === PartnerType.SALON ? 'subTitleSalon' : 'subTitleInd';

  return (
    <div className='form'>
      <BackNavBar />
      <div className='serviceHeaders'>
        <StepsText text={steps} />
        <TitleText text={title} />
      </div>
      <div className={subTitleClass}>
        <SubtitleText text={subTitle} />
      </div>
      <div className='sectionsContainer'>
        <LabelTextComponent text='Servicios de peluquería' />

        {Object.values(HairdressingTypes).map((el, index) => (
          <RoundedCheckbox
            key={index}
            name={el}
            handleCheckboxClick={handleCheckboxClickHd}
            checked={getStateServices().hairdressingData.includes(el)}
            text={el}
          />
        ))}

        <LabelTextComponent text='Servicios de Estetica' />

        {Object.values(CosmeticsTypes).map((el, index) => (
          <RoundedCheckbox
            key={index}
            name={el}
            handleCheckboxClick={handleCheckboxClickE}
            checked={getStateServices().estheticData.includes(el)}
            text={el}
          />
        ))}
      </div>
      <div className='whiteSpace'></div>
      <div className='buttonCreate'>
        <Button
          text='Continuar a precios'
          handleSubmit={handleSubmit}
          isValid={isValid}
        />
      </div>
    </div>
  );
};

export default ServicesSelector;
