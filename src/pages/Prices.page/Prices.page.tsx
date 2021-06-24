import React from 'react';
import { getGlobalState } from '../../services/globalConfigState';
import Services from './components/Services.component';

export default function Prices(): JSX.Element {
  const esthetic = getGlobalState().stepServices?.estheticData || [];
  const services = esthetic?.concat(
    getGlobalState().stepServices?.hairdressingData || []
  );
  return (
    <div className='form'>
      <Services services={services} />
    </div>
  );
}
