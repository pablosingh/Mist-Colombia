import React from 'react';
import { StepsText, TitleText } from '../../components/formUtils/';
import FormLegalVinculation from './components/FormLegalVinculation.components';
export default function LegalVinculation() {
  return (
    <div className='form'>
      <StepsText text='Paso 2 de 2' />
      <div className='legal'>
        <TitleText text='Vinculación legal' />
      </div>
      <FormLegalVinculation />
    </div>
  );
}
