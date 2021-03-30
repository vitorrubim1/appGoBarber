import React from "react";
import { View, ActivityIndicator } from "react-native";

import { useAuth } from "../hooks/auth";

import AuthRoutes from "./auth.routes"; //rotas de autenticação, quando o user não está logado
import AppRoutes from "./app.routes"; //quando o user já está logado

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ff9000" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />; //se o user tiver logado dashboard, se não telas de autenticação
};

export default Routes;
