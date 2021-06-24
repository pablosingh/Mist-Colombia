import React, { useState, ChangeEvent, useEffect } from 'react';
import { IHourInput, ITime } from '../../models/components.interfaces';

/**
 * PROPS
 * @active :string
 * @name : string
 * @value : string
 * @handleInputChange (name: string, value: string) => void
 */

const HourInput = (props: IHourInput): JSX.Element => {
  const [time, setTime] = useState<ITime>({
    value: props.value || '',
  });

  useEffect(() => {
    setTime({
      value: props.value,
    });
  }, [props.value]);

  useEffect(() => {
    !props.active
      ? setTime({
          value: props.value,
        })
      : setTime({
          value: props.value,
        });
  }, [props.active]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTime({
      value: e.target.value,
    });
    props.handleInputChange(props.name, e.target.value);
  };

  return (
    <React.Fragment>
      {props.active ? (
        <input type='time' value={time.value} onChange={handleChange} />
      ) : (
        <input type='time' value={time.value} disabled />
      )}
    </React.Fragment>
  );
};

export default HourInput;
