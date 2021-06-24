import React from 'react';
import { RoundedCheckbox } from '../../../components/checkboxes';
import { SectionTitle } from '../../../components/texts/';
import { getStateSch, setStateSch } from '../../../services/step1';

/**
 * PROPS
 * @neighborhoods :string[]
 */

const Neighborhoods = ({
  neighborhoods,
}: {
  neighborhoods: string[];
}): JSX.Element => {
  let state = getStateSch();

  const handleCheckboxClick = (text: string) => {
    state = getStateSch();
    const newNeighborhoods = state.neighborhoods.includes(text)
      ? state.neighborhoods.filter((nbh) => nbh !== text)
      : state.neighborhoods.concat(text);
    setStateSch({
      ...state,
      neighborhoods: newNeighborhoods,
    });
  };

  return (
    <div>
      <SectionTitle text='Barrios donde atiendes' />
      <div className='List'>
        {neighborhoods.map((data, i) => (
          <RoundedCheckbox
            name={data}
            text={data}
            handleCheckboxClick={handleCheckboxClick}
            checked={state.neighborhoods.includes(data)}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Neighborhoods;
