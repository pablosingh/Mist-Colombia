import React from 'react';
// import { SubtitleText } from '../../../components/formUtils';

export default function Statics():JSX.Element {
    const appointmentNro: string = '140';
    const appointmentCompleted: string = 'Citas Completadas';
    const total: string = '8000000';
    const totalSold: string = 'Total Vendido';
    return (
        <div className="containerStatics">
            <div className="staticsCards">
                <h4 className="hacheCuatro">{`${appointmentNro}`}</h4>
                <span className="hacheCuatro">{`${appointmentCompleted}`}</span>
            </div>
            <div className="staticsCards">
                <h4 className="hacheCuatro">{`$ ${total}`}</h4>
                <span className="hacheCuatro">{`${totalSold}`}</span>
            </div>
        </div>
    )
}
