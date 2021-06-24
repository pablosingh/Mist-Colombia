import React, { useState } from 'react';
import { ILegalVinculation } from '../../../models/index';
import ComissionRate from './ComissionRate.component';
import InputTrialTime from './InputTrialTime';
import { InputDate, ResultNotification } from '../../../components/formInputs';
import { Button } from '../../../components/formUtils';
import { getState, setState } from '../../../services';
import InputContractNum from './InputContractNum.component';
import { setData } from '../../../services/firebase';
import axios from 'axios';
import { urlFunction } from '../../../services/firebaseConfig.js';

function FormLegalVinculation() {
  const [input, setInput] = useState<ILegalVinculation>({
    referenceNumber: '',
    contractDate: '',
    comissionRate: '',
    trialTime: '',
  });

  const [show, setShow] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);

  const [isValidated, setIsValidated] = useState<boolean>(false);

  const handleInputChange = (name: string, value: string | undefined): void => {
    const newInput = {
      ...input,
      [name]: value,
    };
    setInput(newInput);
    validate(newInput);
  };

  const handleSubmit = async () => {
    if (!isValidated) return;
    const initialState = getState();
    const email = initialState.general.email;
    const response = await axios.post(urlFunction, {
      email: email,
    });
    if (response.data.errormsg) {
      setResult(false);
      setState({
        ...initialState,
        legalVinculation: {},
      });
    } else {
      setData({
        ...initialState,
        general: {
          ...initialState.general,
          userId: response.data.uid,
        },
      });
      setResult(true);
    }
    setShow(true);
  };

  const validate = (input: ILegalVinculation) => {
    const LegalVinculation = Object.values(input).indexOf('') === -1;

    const initialState = getState();
    const generalValidation = initialState.general
      ? Object.values(initialState.general).indexOf('') === -1
      : null;

    if (LegalVinculation && generalValidation) {
      const state = {
        ...initialState,
        legalVinculation: {
          ...input,
        },
      };
      setState(state);
      setIsValidated(true);
    } else {
      setState({
        ...initialState,
        legalVinculation: {},
      });
      setIsValidated(false);
    }
  };

  return (
    <div className='form'>
      <div className='inputContainer'>
        <label>Número de referencia del contrato</label>
        <InputContractNum
          handleInputChange={handleInputChange}
          name='referenceNumber'
          placeholder='Número de referencia del contrato'
        ></InputContractNum>
      </div>

      <div className='inputContainer'>
        <label>Fecha del contrato</label>
        <InputDate
          name='contractDate'
          placeholder='dd/mm/aaaa'
          handleInputChange={handleInputChange}
        />
      </div>

      <div className='inputContainer'>
        <label>Tasa de comisión (%)</label>
        <ComissionRate handleInputChange={handleInputChange} />
      </div>

      <div className='inputContainer'>
        <label>Tiempo de prueba (semanas)</label>
        <InputTrialTime handleInputChange={handleInputChange} />
      </div>

      <div className='buttonCreate'>
        <Button
          text='Continuar'
          handleSubmit={handleSubmit}
          isValid={isValidated}
        />
      </div>
      {show && (
        <ResultNotification
          result={result}
          message={
            result
              ? 'Cuenta creada con éxito'
              : 'Ocurrió un error en la creación'
          }
          dir={
            result ? '/Registration/ChangePassword' : '/Registration/General'
          }
        />
      )}
    </div>
  );
}

export default FormLegalVinculation;
