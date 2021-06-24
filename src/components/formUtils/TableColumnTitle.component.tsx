import React from 'react';

interface ITextProps {
  text: string;
}

/**
 *
 * PROPS
 * @text string
 */

const TableColumnTitle = (props: ITextProps) => {
  return <div className='TableColumnTitle'>{props.text}</div>;
};

export default TableColumnTitle;
