import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "../pages/Dashboard";

const App = createStackNavigator(); // navegação somente para as telas de autenticação

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      // pra sumir com o header e estilizando cada uma das rotas
      headerShown: false,
      cardStyle: { backgroundColor: "#111111" },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    {/*nome único por rota*/}
  </App.Navigator>
);

export default AppRoutes;
