import {
  getGlobalState,
  setGlobalState,
} from '../../../services/globalConfigState';
import React, { useEffect, useState } from 'react';
import {
  Button,
  TitleText,
  CloseWindowsXButton,
} from '../../../components/formUtils';
import SubService, { iInput } from './SubService.component';
import { getState, setState } from '../../../services/step4Prices';
import '../../../styles/Css/text.css';
import '../../../styles/Css/index.css';

interface IassignPrice {
  service: string;
  subServices: string[];
  handleClose: () => void;
}

export default function AssignPrice(props: IassignPrice): JSX.Element {
  const [subServices, setsubServices] = useState<string[]>([]);
  const [toSend, setToSend] = useState<iInput[]>([]);
  const [pricesValid, setPricesValid] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);
  const initState = (array: string[]) => {
    const aux = array.map((a) => {
      return {
        name: a,
        price: '',
        checked: false,
      };
    });
    setToSend(aux);
  };

  const submitHandler = () => {
    const actualState = getState();
    actualState?.forEach((ac) => {
      const found = toSend?.find((ts) => ac.name === ts.name);
      if (!found)
        toSend.push({
          name: ac.name,
          price: ac.price,
          checked: ac.checked,
        });
    });
    setState(toSend);
    setGlobalState({
      ...getGlobalState(),
      stepPrices: getState().filter((elem) => elem.checked === true),
    });
  };

  useEffect(() => {
    toSend.map((e) => {
      if (e.checked && e.price.length > 0) setPricesValid(true);
      else setPricesValid(false);
      console.log(pricesValid);
    });
  }, [props.subServices]);

  useEffect(() => {
    setsubServices(props.subServices);
    initState(props.subServices);
  }, []);
  const validating = () => {
    const checked = toSend?.filter((ts) => ts.checked);
    const priced = toSend?.filter((ts) => ts.price);
    if (checked.length > 0 && checked.length === priced.length) setValid(true);
    else setValid(false);
  };
  const handleClick = (p: iInput): void => {
    toSend.forEach((t) => {
      if (t.name === p.name) {
        t.price = p.price;
        t.checked = p.checked;
      }
    });
    validating();
  };
  return (
    <div className='assignPrices'>
      <div className='errorBox'>
        <div className='wrapper'>
          <div className='tabTitle'>
            <TitleText
              text={`Asigna los servicios y tarifas de ${props.service}`}
            />
            <CloseWindowsXButton handleClick={props.handleClose} />
          </div>
          <div className='columnTitles'>
            <p style={{ fontWeight: 500, margin: '0', paddingTop: '30px' }}>
              Servicios
            </p>
            <p style={{ fontWeight: 500, margin: '0', paddingTop: '30px' }}>
              Precio
            </p>
          </div>
          <div className='priceSubservices'>
            {subServices?.map((s, i) => (
              <SubService key={i} name={s} checking={handleClick} />
            ))}
          </div>
          <br />
          <div className='btnWrapper'>
            <Button
              text='Guardar'
              handleSubmit={() => {
                if (valid) {
                  submitHandler();
                  props.handleClose();
                }
              }}
              // isValid={pricesValid}
              isValid={valid}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
