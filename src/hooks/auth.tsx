import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../services/api";

import User from "../dtos/IUser";

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    // função assíncrona responsável por pegar os dados do "localStorage" e se caso tenha setar no state
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        "@GoBarber:token",
        "@GoBarber:user",
      ]);

      if (token[1] && user[1]) {
        //token[1], user[1]: pq retorna chave e valor
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
    }
    loadStoragedData();
  }, []);

  // função de login/autenticação
  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post("sessions", { email, password });

    const { userData: user, token } = response.data; // desacoplando informações que vem da api

    await AsyncStorage.multiSet([
      // setando os dados como um array
      ["@GoBarber:token", token],
      ["@GoBarber:user", JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  // função para deslogar o usuário
  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(["@GoBarber:token", "@GoBarber:user"]); // array das keys que quero remover

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  // pra não precisar importar o useContext toda vez, e passar o AuthContext
  const context = useContext(AuthContext);

  if (!context) {
    // se o contexto não tiver englobando as páginas vai retorna esse erro
    throw new Error("useAuth must be used within an authProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
