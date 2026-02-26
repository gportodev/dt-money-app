import { NavigationContainer } from '@react-navigation/native';
import { PublicRoutes } from './PublicRoutes';
import { useCallback, useState } from 'react';
import { PrivateRoutes } from './PrivateRoutes';

export type PublicStackParamList = {
  Login: undefined;
  Register: undefined;
};

function NavigationRoutes() {
  const [user, setUser] = useState(undefined);

  const Routes = useCallback(() => {
    if (!user) return <PublicRoutes />;

    return <PrivateRoutes />;
  }, [user]);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

export default NavigationRoutes;
