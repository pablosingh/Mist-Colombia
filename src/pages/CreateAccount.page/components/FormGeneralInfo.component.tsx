import React, { useState } from 'react';
import {
  InputDate,
  InputCity,
  InputMail,
  InputPhone,
  InputTextNameAlphaNum,
  InputTextNameAlpha,
  SelectInput,
  InputDocument,
} from '../../../components/formInputs';
import { IgeneralInfoinput } from '../../../models';
import { Button, StepsText, TitleText } from '../../../components/formUtils/';
import { PartnerType, PartnerTypeArray } from '../../../models/enums';
import { useHistory } from 'react-router-dom';
import { setState } from '../../../services/index';

function FormGeneralInfo() {
  const [activeForm, setActiveForm] = useState<string | undefined>(undefined);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [input, setInput] = useState<IgeneralInfoinput>({
    general: {
      name: '',
      user: '',
      tel: '',
      email: '',
      idType: 'NIT',
      idDoc: '',

      type: activeForm,
    },
    salon: {
      reason: '',
      legalName: '',
      legalIdDoc: '',
      legalIdType: 'CC',
    },
    independent: {
      idExpeditionDate: '',
      idExpeditionCity: '',
    },
  });

  const history = useHistory();

  const validate = (input: IgeneralInfoinput) => {
    const generalValidation = Object.values(input.general).indexOf('') === -1;
    const salonValidation = Object.values(input.salon).indexOf('') === -1;
    const independentValidation =
      Object.values(input.independent).indexOf('') === -1;
    if (
      activeForm === PartnerType.SALON &&
      generalValidation &&
      salonValidation
    ) {
      setIsValid(true);
      setState({
        general: {
          ...input.general,
        },
        salon: {
          ...input.salon,
        },
      });
    } else {
      if (
        activeForm === PartnerType.INDEPENDENT &&
        generalValidation &&
        independentValidation
      ) {
        setIsValid(true);
        setState({
          general: {
            ...input.general,
          },
          independent: {
            ...input.independent,
          },
        });
      } else {
        setState({});
        setIsValid(false);
      }
    }
  };

  const handleInputChange = (name: string, value: string | undefined): void => {
    const property = input.general.hasOwnProperty(name)
      ? 'general'
      : input.salon.hasOwnProperty(name)
      ? 'salon'
      : input.independent.hasOwnProperty(name)
      ? 'independent'
      : undefined;
    if (property) {
      const newInput = {
        ...input,
        [property]: {
          ...input[property],
          [name]: value,
        },
      };
      setInput(newInput);
      validate(newInput);
    }
    // const stateRx = getState();
  };

  const handleClick = (name: string, value: string | undefined): void => {
    setInput({
      ...input,
      general: {
        ...input.general,
        [name]: value,
      },
    });
    setActiveForm(value);
  };

  function handleClickHistory() {
    if (isValid) history.push('/Registration/Legal');
  }

  return (
    <div>
      {activeForm === undefined ? null : <StepsText text='Paso 1 de 2' />}
      {activeForm === undefined ? (
        <div className='createTitleText'>
          <TitleText text='Crear cuenta' />
        </div>
      ) : (
        <div className='generalInfo'>
          <TitleText text='Información general' />
        </div>
      )}
      <div className='inputContainer'>
        <label>Modalidad de Servicio</label>
        <SelectInput
          handleInputChange={handleClick}
          selectValues={PartnerTypeArray}
          inputType={'type'}
          placeholder='Modalidad de servicio'
        />
      </div>
      {activeForm === PartnerType.SALON ? (
        <section>
          <div className='inputContainer'>
            <label>Nombre del negocio</label>
            <InputTextNameAlphaNum
              name='name'
              placeholder='Nombre del negocio'
              handleInputChange={handleInputChange}
            />
            {/* {!isValid ? <ValidationAlert content='Nombre del negocio invalid' /> : null } */}
          </div>
          <div className='inputContainer'>
            <label>Razón Social</label>
            <InputTextNameAlpha
              name='reason'
              placeholder='Razón Social'
              handleInputChange={handleInputChange}
            />
          </div>
          <div className='inputContainer'>
            <label>Documento</label>
            <div className='inputGroup'>
              <div>
                <SelectInput
                  handleInputChange={handleInputChange}
                  selectValues={['CC', 'CE', 'NIT']}
                  inputType={'idType'}
                  placeholder='Doc'
                />
              </div>
              <InputDocument
                handleInputChange={handleInputChange}
                selectedValue={input.general.idType}
                name={'idDoc'}
              />
            </div>
          </div>
          <div className='inputContainer'>
            <label>Representante Legal</label>
            <InputTextNameAlpha
              name='legalName'
              placeholder='Representante Legal'
              handleInputChange={handleInputChange}
            />
          </div>
          <div className='inputContainer'>
            <label>Identificación del representante legal</label>
            <div className='inputGroup'>
              <div className='selectInputContainer'>
                <SelectInput
                  handleInputChange={handleInputChange}
                  selectValues={['CC', 'CE', 'NIT']}
                  inputType={'legalIdType'}
                  placeholder='Doc'
                />
              </div>
              <InputDocument
                handleInputChange={handleInputChange}
                selectedValue={input.salon.legalIdType}
                name={'legalIdDoc'}
              />
            </div>
          </div>
          <div className='inputContainer'>
            <label>Celular</label>
            <InputPhone
              handleInputChange={handleInputChange}
              name='tel'
              placeholder='Ingresa tu número de contacto'
            />
          </div>
          <div className='inputContainer'>
            <label>Correo electrónico</label>
            <InputMail
              name='email'
              placeholder='Ingresa tu correo electrónico'
              handleInputChange={handleInputChange}
            />
          </div>
        </section>
      ) : activeForm === PartnerType.INDEPENDENT ? (
        <section>
          <div className='inputContainer'>
            <label>Nombre</label>
            <InputTextNameAlpha
              name='name'
              placeholder='Nombre Apellido'
              handleInputChange={handleInputChange}
            />
          </div>
          <div className='inputContainer'>
            <label>Celular</label>
            <InputPhone
              handleInputChange={handleInputChange}
              name='tel'
              placeholder='Ingresa tu número de contacto'
            />
          </div>
          <div className='inputContainer'>
            <label>Correo electrónico</label>
            <InputMail
              name='email'
              placeholder='Ingresa tu correo electrónico'
              handleInputChange={handleInputChange}
            />
          </div>
          <div className='inputContainer'>
            <label>Documento</label>
            <div className='inputGroup'>
              <div className='selectInputContainer'>
                <SelectInput
                  handleInputChange={handleInputChange}
                  selectValues={['CC', 'CE', 'NIT']}
                  inputType={'idType'}
                  placeholder='Doc'
                />
              </div>
              <InputDocument
                handleInputChange={handleInputChange}
                selectedValue={input.general.idType}
                name={'idDoc'}
              />
            </div>
          </div>
          <div className='inputContainer'>
            <label>Ciudad de expedición</label>
            <InputCity handleInputChange={handleInputChange} />
          </div>
          <div className='inputContainer'>
            <label>Fecha de expedición</label>
            <InputDate
              name='idExpeditionDate'
              placeholder='dd/mm/aaaa'
              handleInputChange={handleInputChange}
            />
          </div>
        </section>
      ) : null}
      {activeForm !== undefined ? (
        <section>
          <div className='inputContainer'>
            <label>Usuario</label>
            <InputTextNameAlphaNum
              name='user'
              placeholder='Ingresa tu nombre de usuario'
              handleInputChange={handleInputChange}
            />
          </div>
          <div className='buttonCreate'>
            <Button
              text='Continuar'
              handleSubmit={handleClickHistory}
              isValid={isValid}
            />
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default FormGeneralInfo;
