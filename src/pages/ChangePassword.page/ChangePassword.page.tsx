import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TermsAndConditions } from '../../components/checkboxes';
import { Button, TitleText } from '../../components/formUtils';
import {
  InputPassword,
  ResultNotification,
} from '../../components/formInputs/';
import { changePassword, getEmail, getUserType } from '../../services/firebase';
import { IinputChangePasswordForm } from '../../models';
import { Logo } from '../../components/appUtils/';
import { PartnerType } from '../../models/enums';

interface Iresult {
  result: boolean;
  show: boolean;
}

const ChangePassword = (): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [userType, setUserType] = useState<string | boolean | undefined>(
    undefined
  );
  const [input, setInput] = useState<IinputChangePasswordForm>({
    oldPassword: '',
    newPassword: '',
    newPasswordCheck: '',
    checkbox: false,
  });
  const [result, setResult] = useState<Iresult>({
    result: false,
    show: false,
  });

  const redirect =
    userType === PartnerType.INDEPENDENT
      ? '/Configuration/BussinessHours'
      : '/Configuration/SalonDetail';
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const userType = await getUserType();
      setUserType(userType);
    })();

    getEmail() ? null : history.push('/');

    setResult({
      result: false,
      show: false,
    });
  }, []);

  const handleInputChange = (
    name: string,
    value: string | boolean | undefined
  ): void => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(() => {
    if (
      input.checkbox &&
      input.newPassword === input.newPasswordCheck &&
      input.oldPassword.length &&
      input.newPassword.length
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [input]);

  async function handleClickHistory() {
    const result = await changePassword(input.newPassword, input.oldPassword);
    setResult({
      result,
      show: true,
    });
    setTimeout(() => {
      setResult({
        result,
        show: false,
      });
    }, 5500);
  }

  return (
    <div className='form'>
      <Logo />
      <div className='changePassTitle'>
        <TitleText text='Crea una nueva contraseña para ingresar' />
      </div>
      <div className='inputContainer'>
        <InputPassword
          name='oldPassword'
          placeholder='Contraseña actual'
          handleInputChange={handleInputChange}
        />
      </div>
      <div className='inputContainer'>
        <InputPassword
          name='newPassword'
          placeholder='Nueva contraseña'
          handleInputChange={handleInputChange}
        />
      </div>
      <div className='inputContainer'>
        <InputPassword
          name='newPasswordCheck'
          placeholder='Repite tu nueva contraseña'
          handleInputChange={handleInputChange}
        />
      </div>
      <TermsAndConditions handleInputChange={handleInputChange} />
      <div className='inputContainer'>
        <Button
          text='Ingresar'
          isValid={isValid}
          handleSubmit={handleClickHistory}
        />
      </div>
      {result.show && (
        <ResultNotification
          dir={result.result ? redirect : '/Registration/ChangePassword'}
          result={result.result}
          message={
            result.result
              ? 'Contraseña cambiada con éxito'
              : 'No se pudo cambiar contraseña'
          }
        />
      )}
    </div>
  );
};

export default ChangePassword;
