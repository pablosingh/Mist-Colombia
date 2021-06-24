import React, { useEffect, useState } from 'react';
import { Button, TitleText } from '../formUtils';
import '../../styles/Css/index.css';
import errorGif from '../../assets/images/error.gif';
import checkGif from '../../assets/images/check.gif';
import { useHistory } from 'react-router-dom';
import { IResults } from '../../models/components.interfaces';

/**
 * PROPS
 * @result boolean
 * @message string
 * @dir string --> Example: '/Registrarse/General' || '/' || '/Login'
 */

const ResultNotification = (props: IResults) => {
  const [show, setShow] = useState<boolean>(true);
  const history = useHistory();

  /*
    Reusable component that handles success and error notifications based on the result passed down by PROPS.
    If success: message pops up and redirects to direction passed by PROPS after 5 seconds
    If error: message pops up and clickable button allows the user to try again, redirecting them to wherever the props.dir specifies
  */

  const handleSubmit = (): void => {
    history.push(props.dir);
    setShow(false);
  };

  useEffect(() => {
    if (props.result) {
      setTimeout(() => {
        history.push(props.dir);
        setShow(false);
      }, 5000);
    }
  }, []);

  return (
    <>
      {show &&
        (props.result ? (
          <div className='success'>
            <div className='successBox'>
              <img src={checkGif} className='checkGif' />
              <TitleText text={props.message} />
            </div>
          </div>
        ) : (
          <div className='createError'>
            <div className='errorBox'>
              <img src={errorGif} className='errorGif' />
              <TitleText text={props.message} />
              <br></br>
              <Button
                text='Volver a intentar'
                handleSubmit={handleSubmit}
                isValid={true}
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default ResultNotification;
