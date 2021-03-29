import "react-native-gesture-handler"; // react-navigation, trabalhar com rotas, exige que seja na primeira linha do arquivo de inicio

import React from "react";
import { View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; /*
  NavigationContainer: é o provider do contexto de navegação da aplicação.
  ele tem que estar por volta de tudo, pra que a navegação/rota funcione;
*/

import AppProvider from "./hooks";

import Routes from "./routes";

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#111111" />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: "#111111" }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
