import React from "react";
import { Image } from "react-native";

import Input from "../../components/Input";
import Button from "../../components/Button";

import logoImage from "../../assets/logo.png";

import { Container, Title } from "./styles";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImage} />

      <Title>Faça seu Login</Title>

      <Input name="email" icon="mail" placeholder="Digite seu email" />
      <Input name="password" icon="lock" placeholder="Digite sua senha" />

      <Button onPress={() => {}}>Entrar</Button>
    </Container>
  );
};

export default SignIn;
