import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  TitleText,
  StepsText,
  SubtitleText,
} from '../../components/formUtils/';
import BussinessHoursTable from './components/BussinessHoursTable.component';
import Neighborhoods from './components/Neighborhoods.component';
import { InputTextNameAlphaNum } from '../../components/formInputs';
import { SectionTitle } from '../../components/texts/';
import { ISchedules } from '../../models/';
import {
  getStateSch,
  stateObservableSch,
  setStateSch,
} from '../../services/step1';
import { useHistory } from 'react-router-dom';
import { PartnerType } from '../../models/enums';
import {
  getGlobalState,
  setGlobalState,
} from '../../services/globalConfigState';
import { BackNavBar } from '../../components/appUtils/';
import { AuthContext } from '../../components/appUtils/AuthProvider';

interface IFormSchedules {
  schedules: ISchedules[];
  appointmentTime: string;
}

const BussinessHours = (): JSX.Element => {
  const { userType } = useContext(AuthContext);
  const [isValid, setIsValid] = useState(false);
  const [input, setInput] = useState<IFormSchedules>({
    schedules: getStateSch().schedule,
    appointmentTime: '',
  });
  const history = useHistory();
  const observable = stateObservableSch();
  const state = getStateSch();

  function handleSubmit() {
    const state = getStateSch();
    if (isValid) {
      setGlobalState({
        ...getGlobalState(),
        stepBusinessHours: state,
      });
      history.push('/Configuration/Services');
    }
  }

  useEffect(() => {
    const aux = observable.subscribe((data) => {
      setIsValid(data.isValid());
    });
    return () => aux.unsubscribe();
  }, [observable]);

  useEffect(() => {
    setStateSch({
      ...getStateSch(),
      type: userType,
    });
    if (
      userType === PartnerType.SALON &&
      !getGlobalState().stepSalonDetail?.isValidated
    ) {
      history.push('/Configuration/SalonDetail');
    }
  }, []);

  const handleInputChange = (name: string, value: string | undefined) => {
    setInput({
      ...input,
      [name]: value,
    });
    setStateSch({
      ...getStateSch(),
      appointmentTime: value,
    });
  };
  const title =
    userType === PartnerType.INDEPENDENT
      ? 'Queremos conocer mas de tu operación'
      : 'En qué horarios está abierto el salón';
  const subTitle =
    userType === PartnerType.INDEPENDENT
      ? 'Esta es la información que verán tus clientes'
      : 'Este es el horario en que los clientes programan citas';
  const steps =
    userType === PartnerType.INDEPENDENT ? 'Paso 1 de 3' : 'Paso 2 de 5';

  return (
    <div className='hoursPage'>
      <BackNavBar />
      <StepsText text={steps} />
      <TitleText text={title} />
      <SubtitleText text={subTitle} />
      <br />
      {userType === PartnerType.INDEPENDENT ? (
        <div className='sectionsContainer'>
          <Neighborhoods
            neighborhoods={[
              'Chicó',
              'Santa Barbara',
              'San Patricio',
              'Santa Bibiana',
              'Rosales',
            ]}
          />
          <SectionTitle text='Tiempo aprox. de desplazamiento' />
          <InputTextNameAlphaNum
            name='appointmentTime'
            placeholder='Cuanto tiempo tardas entre citas'
            handleInputChange={handleInputChange}
            value={state.appointmentTime}
          />
        </div>
      ) : (
        <br />
      )}
      <BussinessHoursTable
        getState={getStateSch}
        setState={setStateSch}
        obs={stateObservableSch}
      />
      <div className='buttonCreate'>
        <Button
          text='Continuar'
          handleSubmit={handleSubmit}
          isValid={isValid}
        />
      </div>
    </div>
  );
};

export default BussinessHours;
