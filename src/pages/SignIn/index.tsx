import React from "react";
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Input from "../../components/Input";
import Button from "../../components/Button";

import logoImage from "../../assets/logo.png";

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountText,
} from "./styles";

const SignIn: React.FC = () => {
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
          <Container>
            <Image source={logoImage} />

            <View>
              <Title>Faça seu Login</Title>
            </View>

            <Input name="email" icon="mail" placeholder="Digite seu email" />
            <Input name="password" icon="lock" placeholder="Digite sua senha" />

            <Button onPress={() => {}}>Entrar</Button>

            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText> Esqueci minha senha </ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>Criar uma conta</CreateAccountText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
