import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/formUtils';
import {
  InputTextNameAlpha,
  InputPhone,
  InputMail,
} from '../../../components/formInputs';
import {
  LabelTextComponent,
  CloseWindowsXButton,
} from '../../../components/formUtils';
import ExpertScreen from './ExpertScreen.component';
import {
  setStateExpert,
  getStateExpert,
  stateObservableExpert,
} from '../../../services/step5';
import { IExperts } from '../../../models/rxjsInterfaces';
import BussinessHoursTable from './BussinessHoursTable.component';
import { RoundedCheckbox } from '../../../components/checkboxes/';
import { getGlobalState } from '../../../services/globalConfigState';
import { useHistory } from 'react-router-dom';

const intialExpert: IExperts = {
  schedule: [],
  services: [],
  toggle: () => {},
  isValid: () => true,
  activeToggle: false,
  ExpertName: '',
  ExpertEmail: '',
  ExpertPhone: '',
};

const ExpertsConfiguration = (): JSX.Element => {
  const estheticServices = getGlobalState().stepServices?.estheticData;
  const hairdressingServices = getGlobalState().stepServices?.hairdressingData;
  const servicesExp = (estheticServices || []).concat(
    hairdressingServices || []
  );
  const [show, setShow] = useState<boolean>(false);
  const [activeExpert, setActiveExpert] = useState<string>('');
  const [isValid, setIsValid] = useState(false);
  const observable = stateObservableExpert();
  const [activeExpertInfo, setActiveExpertInfo] =
    useState<IExperts>(intialExpert);
  const history = useHistory();

  useEffect(() => {
    const subscription = observable.subscribe((data) =>
      setIsValid(!!data[activeExpert]?.isValid())
    );
    return () => subscription.unsubscribe();
  }, [observable]);

  useEffect(() => {
    if (!getGlobalState().stepPrices?.length) {
      history.push('/Configuration/Prices');
    }
  }, []);

  const handleEdit = (expertKey: string) => {
    setActiveExpert(expertKey);
    setShow(true);
    setActiveExpertInfo(getStateExpert()[expertKey]);
  };

  const handleClickExpert = () => {
    const stateExpert = getStateExpert();
    const stateKeys = Object.keys(stateExpert);
    const getExpertKey = (stateKeys: string[]) => {
      if (stateKeys.length > 0) {
        const re = new RegExp('\\d+', 'g');
        const indexExpert = Number(stateKeys.pop()?.match(re)) + 1;
        return 'expert' + indexExpert;
      } else {
        return 'expert1';
      }
    };
    const expertName = getExpertKey(stateKeys);
    const newExpert: IExperts = {
      schedule: [],
      services: [],
      toggle: function () {
        if (this.schedule[0]) {
          const open = this.schedule[0].open;
          const close = this.schedule[0].close;
          this.schedule.map((sch) => {
            sch.open = open;
            sch.close = close;
          });
        }
      },
      isValid: function () {
        if (
          this.schedule.length > 0 &&
          this.services.length > 0 &&
          this.ExpertName &&
          this.ExpertPhone &&
          this.ExpertEmail
        ) {
          return true;
        }
        return false;
      },
      activeToggle: false,
      ExpertName: '',
      ExpertEmail: '',
      ExpertPhone: '',
    };

    setShow((prev) => !prev);
    setActiveExpert(expertName);
    setStateExpert({
      ...stateExpert,
      [expertName]: newExpert,
    });
  };

  const handleClick = () => {
    const state = getStateExpert();
    if (activeExpertInfo.ExpertName) {
      setStateExpert({
        ...state,
        [activeExpert]: activeExpertInfo,
      });
      setActiveExpert('');
      setActiveExpertInfo(intialExpert);
    } else {
      console.log('entre acá');
      delete state[activeExpert], setStateExpert(state);
      setActiveExpert('');
    }
    setShow((prev) => !prev);
  };

  const handleInputChange = (name: string, value: string | undefined) => {
    const stateExpert = getStateExpert();
    setStateExpert({
      ...stateExpert,
      [activeExpert]: {
        ...stateExpert[activeExpert],
        [name]: value,
      },
    });
  };

  const handleCheckboxClick = (text: string) => {
    const state = getStateExpert();
    const newServices = state[activeExpert].services.includes(text)
      ? state[activeExpert].services.filter((el) => el !== text)
      : state[activeExpert].services.concat(text);
    setStateExpert({
      ...state,
      [activeExpert]: {
        ...state[activeExpert],
        services: newServices,
      },
    });
  };

  const handleSubmit = () => {
    setShow((prev) => !prev);
    setActiveExpertInfo(intialExpert);
    setActiveExpert('');
  };

  return (
    <React.Fragment>
      <ExpertScreen
        show={show}
        handleClick={handleClickExpert}
        handleEdit={handleEdit}
      />

      {show && (
        <div className={show ? 'expertContainer' : 'expertDisplay'}>
          <div className='expertConfig'>
            <div className='expertHeader'>
              <div className='expertText'>Crea un especialista</div>{' '}
              <CloseWindowsXButton handleClick={handleClick} />
            </div>
            <LabelTextComponent text='Nombre completo' />
            <InputTextNameAlpha
              placeholder='Nombre Completo'
              name='ExpertName'
              handleInputChange={handleInputChange}
              value={getStateExpert()[activeExpert].ExpertName}
            />

            <LabelTextComponent text='Celular' />
            <InputPhone
              placeholder='Celular'
              name='ExpertPhone'
              handleInputChange={handleInputChange}
              value={getStateExpert()[activeExpert].ExpertPhone}
            />

            <LabelTextComponent text='Correo electrónico' />
            <InputMail
              placeholder='Email'
              name='ExpertEmail'
              handleInputChange={handleInputChange}
              value={getStateExpert()[activeExpert].ExpertEmail}
            />

            {activeExpert && (
              <BussinessHoursTable
                getState={getStateExpert}
                setState={setStateExpert}
                obs={stateObservableExpert}
                expertName={activeExpert}
              />
            )}

            <LabelTextComponent text='Servicios que ofrece' />
            <br />

            {servicesExp.map((el, index) => (
              <RoundedCheckbox
                key={index}
                name={el}
                handleCheckboxClick={handleCheckboxClick}
                checked={getStateExpert()[activeExpert].services.includes(el)}
                text={el}
              />
            ))}

            <div className='buttonExpert'>
              <Button
                text='Siguiente'
                handleSubmit={handleSubmit}
                isValid={isValid}
              />
            </div>

            <br />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ExpertsConfiguration;
