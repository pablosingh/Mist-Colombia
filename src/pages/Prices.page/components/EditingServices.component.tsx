import React, { useState, useEffect } from 'react';
import { WhiteButton } from '../../../components/formUtils';
import Assign from './Assign.component';
import Showing from './Showing.component';
import {
  HairdressingTypes,
  CosmeticsTypes,
  // ==============================
  maniPediSubServiceArray,
  waxingSubServiceArray,
  barberSubServiceArray,
  cutSubServiceArray,
  colorSubServiceArray,
  hairStraighteningSubServiceArray,
  hairCombingSubServiceArray,
  // ==============================
  reducerSubServiceArray,
  facialSubServiceArray,
  massageSubServiceArray,
  laserSubServiceArray,
} from '../../../models/enums';
import {
  getGlobalState,
  setGlobalState,
} from '../../../services/globalConfigState';

import {
  // setState,
  getState,
} from '../../../services/step4Prices';

interface iEditingServices {
  service: string;
}

export default function EditingServices(props: iEditingServices): JSX.Element {
  const [subServices, setsubServices] = useState<string[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => {
    setShow(!show);
  };
  const assign = () => {
    switch (props.service) {
      case HairdressingTypes.ALISADOS:
        setGlobalState({
          ...getGlobalState(),
          stepPrices: [hairStraighteningSubServiceArray],
        });
        setsubServices(hairStraighteningSubServiceArray);

        break;
      case HairdressingTypes.BARBERIA:
        setGlobalState({
          ...getGlobalState(),
          stepPrices: [barberSubServiceArray],
        });
        setsubServices(barberSubServiceArray);
        break;
      case HairdressingTypes.CEPILLADO:
        setGlobalState({
          ...getGlobalState(),
          stepPrices: [hairCombingSubServiceArray],
        });
        setsubServices(hairCombingSubServiceArray);
        break;
      case HairdressingTypes.COLOR:
        setGlobalState({
          ...getGlobalState(),
          stepPrices: [colorSubServiceArray],
        });
        setsubServices(colorSubServiceArray);
        break;
      case HairdressingTypes.CORTE:
        setGlobalState({
          ...getGlobalState(),
          stepPrices: [cutSubServiceArray],
        });
        setsubServices(cutSubServiceArray);
        break;
      case HairdressingTypes.DEPILACION:
        setGlobalState({
          ...getGlobalState(),
          stepPrices: [waxingSubServiceArray],
        });
        setsubServices(waxingSubServiceArray);
        break;
      case HairdressingTypes.MANI_PEDI:
        setGlobalState({
          ...getGlobalState(),
          stepPrices: [maniPediSubServiceArray],
        });
        setsubServices(maniPediSubServiceArray);
        break;
      case CosmeticsTypes.FACIAL:
        setGlobalState({
          ...getGlobalState(),
          stepPrices: [facialSubServiceArray],
        });
        setsubServices(facialSubServiceArray);
        break;
      case CosmeticsTypes.LASER:
        setGlobalState({
          ...getGlobalState(),
          stepPrices: [laserSubServiceArray],
        });
        setsubServices(laserSubServiceArray);
        break;
      case CosmeticsTypes.MASAJES:
        setGlobalState({
          ...getGlobalState(),
          stepPrices: [massageSubServiceArray],
        });
        setsubServices(massageSubServiceArray);
        break;
      case CosmeticsTypes.REDUCTOR:
        setGlobalState({
          ...getGlobalState(),
          stepPrices: [reducerSubServiceArray],
        });
        setsubServices(reducerSubServiceArray);
        break;
      default:
        setsubServices(['Error']);
        break;
    }
  };

  const state = getState();
  const checked = state.filter((ss) => ss.checked);
  const shownSs = checked.filter((ch) => subServices.includes(ch.name));
  console.log(subServices);

  useEffect(() => {
    assign();
  }, []);

  return (
    <div className='innerPriceBox'>
      <div className='top'>
        <div className='innerTop'>
          <div>{props.service}</div>
          <span style={{ fontSize: '12px' }}>
            {shownSs.length ? `${shownSs.length} servicios` : 'Pendiente'}
          </span>
        </div>
        <WhiteButton
          text={shownSs.length ? 'Editar' : 'Configurar'}
          handleClick={handleClick}
        />
      </div>
      {!!shownSs.length && <hr />}
      {show && (
        <Assign
          service={props.service}
          subServices={subServices}
          handleClose={handleClick}
        />
      )}
      {!show && <Showing service={props.service} subServices={subServices} />}
    </div>
  );
}
