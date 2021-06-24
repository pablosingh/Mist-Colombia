import React, { useEffect, useState } from 'react';
import { iInput } from './SubService.component';
import { getState } from '../../../services/step4Prices';
import '../../../styles/Css/text.css';

interface Ishowing {
  service: string;
  subServices: string[];
}

export default function Showing(props: Ishowing): JSX.Element {
  const [toSend, setToSend] = useState<iInput[]>([]);

  useEffect(() => {
    const actualState = getState();
    const aux = actualState?.filter(
      (act) => props.subServices?.includes(act.name) && act.checked === true
    );
    setToSend(aux);
  }, []);

  return (
    <div className='containerAssign'>
      {toSend
        ?.filter((ts) => ts.checked === true)
        ?.map((t, i) => (
          <div className='priceSubservices' key={i}>
            <div>{t.name}</div>
            <div>{t.price}</div>
          </div>
        ))}
    </div>
  );
}
