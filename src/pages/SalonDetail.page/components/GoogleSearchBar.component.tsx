import React, { useState, useEffect } from 'react';
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import { POSTAL_CODES } from '../utils/PostalCodes.utils';
import { ISearchLocation } from '../../../models';
import { ValidationAlert } from '../../../components/formUtils';

export default function SearchLocation(props: ISearchLocation): JSX.Element {
  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      location: new google.maps.LatLng(4.711, -74.0721),
      radius: 20 * 1000,
      componentRestrictions: {
        // restricted the showed options to only show colombian streets
        country: 'CO',
      },
    },
  });
  const [errorState, setErrorState] = useState(false);
  const handleSelect = async (address: string) => {
    setValue(address, false); // sets the value of the input to the selected adress from the dropdown
    clearSuggestions(); // clears the dropdown once its selected

    try {
      const results = await getGeocode({
        // tries to get the address from the Geocode API
        address,
        componentRestrictions: {
          // restricted the Geocode API to only accept Colombian Streets from the Postal Code we pass from props
          country: 'CO',
          postalCode:
            POSTAL_CODES[
              props.selectedNeighborhood ? props.selectedNeighborhood : 'Chico'
            ],
        },
      });
      const { lat, lng } = await getLatLng(results[0]);
      props.handleCoordsChange({ lat, lng, address });
      setErrorState(false);
    } catch (error) {
      setErrorState(true);
    }
  };

  useEffect(() => {
    // it sets the value to void if another the selected neighborhood changes
    setValue('');
  }, [props.selectedNeighborhood]);

  return (
    <div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={props.inputEnabler}
          placeholder={'Enter an address'}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ description }, i) => {
                const optionList: string[] = description.split(',');
                return <ComboboxOption key={i} value={optionList[0]} />;
              })}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      {errorState ? (
        <ValidationAlert
          content={'Esa direccion no pertenece al barrio escogido.'}
        />
      ) : null}
    </div>
  );
}
