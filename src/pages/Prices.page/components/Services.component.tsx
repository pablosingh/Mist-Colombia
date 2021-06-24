import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../components/appUtils/AuthProvider';
import { useHistory } from 'react-router-dom';
import '../../../styles/Css/index.css';
import { getGlobalState } from '../../../services/globalConfigState';
import { stateObservable } from '../../../services/step4Prices';
import {
  Button,
  TitleText,
  StepsText,
  SubtitleText,
} from '../../../components/formUtils';
import { BackNavBar } from '../../../components/appUtils/';
import EditingServices from './EditingServices.component';
import { PartnerType } from '../../../models/enums';
import { setPostData } from '../../../services/firebase';

interface iServices {
  services: string[];
}

export default function Services(props: iServices) {
  const { userType } = useContext(AuthContext);
  const [allyType, setAllyType] = useState<string | undefined>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const observable = stateObservable();

  const steps =
    userType === PartnerType.INDEPENDENT ? 'Paso 3 de 3' : 'Paso 4 de 5';

  const history = useHistory();

  const handleSubmit = async () => {
    if (userType === 'Independiente') {
      const { stepBusinessHours, stepServices, stepPrices } = getGlobalState();
      const step1 = {
        schedule: stepBusinessHours?.schedule,
        neighborhoods: stepBusinessHours?.neighborhoods,
        type: stepBusinessHours?.type,
        appointmentTime: stepBusinessHours?.appointmentTime,
      };
      //  const step2 = {
      //  schedule: stepServices?.schedule,
      //  neighborhoods: stepServices?.neighborhoods,
      //  type: stepServices?.type,
      //  appointmentTime:stepServices?.appointmentTime
      //  }
      //  delete step1?.toggle
      //  delete step1?.isValid

      await setPostData({
        stepPrices,
        stepServices,
        step1,
      });

      history.push('/');
      //  falta enviar al postData el estado actual del componente
    } else {
      history.push('/Configuration/Experts');
    }

    // falta setear el estado del componente en el estado global (Rx)
  };

  useEffect(() => {
    setAllyType(userType);
    if (!getGlobalState().stepServices?.isValid) {
      history.push('/Configuration/Services');
    }
  }, []);

  useEffect(() => {
    const subscription = observable.subscribe((data) => {
      const filteredDataByChecked = data.filter(
        (elem) => elem.checked === true
      );
      const filteredDataByPrice = data.filter((elem) => elem.price !== '');
      if (
        filteredDataByChecked.length &&
        filteredDataByChecked.length === filteredDataByPrice.length
      )
        setIsValid(true);
      else setIsValid(false);
    });
    return () => subscription.unsubscribe();
  }, [observable]);

  return (
    <div>
      <BackNavBar />
      <div className='priceHeaders'>
        <StepsText text={steps} />
        <TitleText text='¿Cuanto cobras por servicio?' />
        <SubtitleText text='Los servicios que los clientes podrán agendar en tu salón' />
      </div>
      <div>
        {props.services?.map((s, i) => (
          <div className='priceBoxes' key={i}>
            <EditingServices service={s} key={i} />
          </div>
        ))}
      </div>
      <div className='btnWrapper'>
        <Button
          text={
            allyType === 'salon' ? `Continuar a especialistas` : `Continuar`
          }
          handleSubmit={handleSubmit}
          isValid={isValid}
        />
      </div>
    </div>
  );
}
