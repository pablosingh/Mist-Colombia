import React from 'react';
import { Route, Link } from 'react-router-dom';
import {
  CreateAccount,
  LegalVinculation,
  ChangePassword,
  SalonDetail,
  BussinessHours,
  Services,
  SignIn,
  ExpertsConfiguration,
  Prices,
} from './pages';
import { PartnerTypeArray, PartnerType } from './models/enums';
import { AuthRoute } from './components/appUtils/';
import './styles/Css/index.css';
import LogOut from './components/appUtils/LogOut';
import Home from './pages/Home.page/Home.page';

function App() {
  return (
    <div className='App'>
      <Route
        exact
        path='/'
        render={() => (
          <div>
            <Link to='/Registration/General'>
              <button className='button isValid'>Registrarse</button>
            </Link>
            <Link to='/Registration/ChangePassword'>
              <button className='button isValid'>Cambiar Contraseña</button>
            </Link>
            <Link to='/SignIn'>
              <button className='button isValid'>Ingresar</button>
            </Link>
            <Link to='/Configuration/SalonDetail'>
              <button className='button isValid'>Detalle de salón</button>
            </Link>
            <Link to='/Configuration/BussinessHours'>
              <button className='button isValid'>Horarios de atención</button>
            </Link>
            <Link to='/Configuration/Services'>
              <button className='button isValid'>Servicios</button>
            </Link>

            <Link to='/Configuration/Experts'>
              <button className='button isValid'>Especialistas</button>
            </Link>
            <Link to='/Configuration/Prices'>
              <button className='button isValid'>Prices</button>
            </Link>
            <LogOut />
            <Link to='/Home'>
              <button className='button isValid'>Home</button>
            </Link>
          </div>
        )}
      />
      <Route path='/Registration/General' render={() => <CreateAccount />} />
      <Route path='/Registration/Legal' render={() => <LegalVinculation />} />
      <AuthRoute
        path='/Registration/ChangePassword'
        Component={ChangePassword}
        requiredTypes={PartnerTypeArray}
      />
      <Route path='/SignIn' render={() => <SignIn />} />
      <AuthRoute
        path='/Configuration/SalonDetail'
        Component={SalonDetail}
        requiredTypes={[PartnerType.SALON]}
      />
      <AuthRoute
        path='/Configuration/BussinessHours'
        Component={BussinessHours}
        requiredTypes={PartnerTypeArray}
      />
      <AuthRoute
        path='/Configuration/Services'
        Component={Services}
        requiredTypes={PartnerTypeArray}
      />

      <AuthRoute
        path='/Configuration/Experts'
        Component={ExpertsConfiguration}
        requiredTypes={[PartnerType.SALON]}
      />
      <Route path='/Configuration/Prices' render={() => <Prices />} />
      <Route path='/Home' render={() => <Home />} />
    </div>
  );
}

export default App;
