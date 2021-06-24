import React, { useContext } from 'react';
import { RouteComponentProps, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

interface Props {
  Component: React.FC<RouteComponentProps>;
  path: string;
  requiredTypes: string[];
  exact?: boolean;
}

const AuthRoute = ({
  Component,
  path,
  requiredTypes,
  exact = false,
}: Props): JSX.Element => {
  const { user, userType } = useContext(AuthContext);
  const tofind = userType || '';
  const hasRequiredType = requiredTypes.includes(tofind);

  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) =>
        !!user && hasRequiredType ? (
          <Component {...props} />
        ) : (
          <Redirect to='/SignIn' />
        )
      }
    />
  );
};
export default AuthRoute;
