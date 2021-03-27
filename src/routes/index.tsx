import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const Auth = createStackNavigator(); // navegação somente para as telas de autenticação

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      // pra sumir com o header e estilizando cada uma das rotas
      headerShown: false,
      cardStyle: { backgroundColor: "#312e38" },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    {/*nome único por rota*/}
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
