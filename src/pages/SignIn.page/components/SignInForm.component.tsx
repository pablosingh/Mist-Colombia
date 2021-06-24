import React, { useState, useContext, useEffect } from 'react';
import {
  InputPassword,
  InputTextNameAlphaNum,
} from '../../../components/formInputs/';
import { Button, TitleText } from '../../../components/formUtils/';
import {
  getEmailWithUser,
  signIn,
  getUserType,
} from '../../../services/firebase';
import { AuthContext } from '../../../components/appUtils/AuthProvider';
import { useHistory, Link } from 'react-router-dom';
import { PartnerType } from '../../../models/enums';

interface ISignInProps {
  user: string;
  passwordCheck: string;
}

const SignInForm = (): JSX.Element => {
  const InitialState = {
    user: '',
    passwordCheck: '',
  };

  const [isValid, setIsValid] = useState<boolean>(false);
  const [input, setInput] = useState<ISignInProps>(InitialState);
  const [error, setError] = useState<ISignInProps>(InitialState);

  const { user } = useContext(AuthContext);
  const history = useHistory();

  const handleInputChange = (name: string, value: string | undefined): void => {
    const newInput = {
      ...input,
      [name]: value,
    };

    setInput(newInput);
    if (Object.values(newInput).indexOf('') === -1) {
      setIsValid(true);
      setError(InitialState);
    } else {
      setIsValid(false);
      if (!!input.passwordCheck) {
        setError({
          ...error,
          passwordCheck: 'La contraseña debe contener números y letras. ',
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    const emailRes = await getEmailWithUser(input.user);

    if (emailRes) {
      const resSign = await signIn(emailRes, input.passwordCheck);
      if (resSign) {
        setError(InitialState);
        const userType = await getUserType();

        userType === PartnerType.SALON
          ? history.push('/Configuration/SalonDetail')
          : history.push('/Configuration/BussinessHours');
      } else {
        setError({
          ...error,
          passwordCheck: 'Password incorrecto. Por favor vuelve a intentarlo.',
        });
      }
    } else {
      setError({
        ...error,
        user: 'Usuario incorrecto. Por favor vuelve a intentarlo.',
      });
    }
  };

  useEffect(() => {
    if (user) history.push('/');
  }, []);

  useEffect(() => {
    if (!!input.passwordCheck) {
      setError(InitialState);
    }
  }, [input]);

  return (
    <div className='form'>
      <br />
      <div className='createTitleText'>
        <TitleText text='¡Bienvenido!' />
      </div>
      <div className='createTitleText'>
        <TitleText text='Ingresa a tu cuenta: ' />
      </div>
      <br />
      <div className='inputContainer'>
        <label>Usuario</label>
        <InputTextNameAlphaNum
          name='user'
          placeholder='Ingresa tu nombre de usuario'
          handleInputChange={handleInputChange}
          errormessage={error.user}
        />
      </div>
      <div className='inputContainer'>
        <InputPassword
          name='passwordCheck'
          placeholder='Contraseña'
          handleInputChange={handleInputChange}
          errormessage={error.passwordCheck}
        />
      </div>
      <Link className='forgotPassText' to='/'>
        Olvidé mi usuario o contraseña
      </Link>
      <div className='buttonCreate'>
        <Button text='Ingresar' handleSubmit={handleSubmit} isValid={isValid} />
      </div>
    </div>
  );
};

export default SignInForm;
