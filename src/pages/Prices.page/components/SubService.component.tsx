import React, { useEffect, useState, ChangeEvent } from 'react';
import { CustomCheckbox } from '../../../components/checkboxes';
import { getState } from '../../../services/step4Prices';
import '../../../styles/Css/index.css';
import '../../../styles/Css/text.css';
import NumberFormat from 'react-number-format';

export interface iInput {
  name: string;
  price: string;
  checked: boolean;
}

interface iSubService {
  name: string;
  checking: (p: iInput) => void;
}

export default function SubService(props: iSubService): JSX.Element {
  const [input, setInput] = useState<iInput>({
    name: props.name,
    price: '',
    checked: false,
  });

  useEffect(() => {
    const initial = getState()?.find((state) => state.name === props.name);
    setInput({
      name: props.name,
      price: initial ? initial.price : '',
      checked: initial ? initial.checked : false,
    });
  }, []);

  useEffect(() => {
    props.checking(input);
  }, [input]);

  const handleChange = (event: ChangeEvent): void => {
    let { value }: { value: any } = event.target as HTMLInputElement;
    value = `${value}`;
    setInput({
      ...input,
      name: props.name,
      price: value,
    });
    props.checking({
      ...input,
      name: props.name,
      price: value,
    });
    // console.log(value);
  };

  return (
    <div className='containerSubService'>
      <div className='leftSubService'>
        <CustomCheckbox
          checked={input.checked}
          handleCheck={() => {
            if (!input.checked) {
              setInput({
                ...input,
                name: props.name,
                checked: !input.checked,
              });
            } else {
              setInput({
                ...input,
                name: props.name,
                price: '',
                checked: !input.checked,
              });
            }
          }}
        />
        <div className='nameSubService'>{props.name}</div>
      </div>
      <NumberFormat
        onChange={handleChange}
        value={input.price}
        disabled={!input.checked}
        className='inputNumber'
        thousandSeparator={'.'}
        decimalSeparator={','}
        allowNegative={false}
        prefix={'$'}
        maxLength={10}
      />
    </div>
  );
}
