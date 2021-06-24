import React from 'react';
import { SubtitleText } from '../../../components/formUtils';
import '../../../styles/Css/index.css';
import user from '../../../assets/vectors/user.svg';

export default function NavBar():JSX.Element {
    const name: string = 'Nombre de Empresa'
    return (
        <div className="containerNavBar">
            <div className="leftNavBar">
                <SubtitleText text="Hola"/>
                <SubtitleText text={`${name}`}/>
            </div>
            <div className="rightNavBar">
                <img src={user} id="" className="" alt="Img"/>
            </div>
        </div>
    )
};
