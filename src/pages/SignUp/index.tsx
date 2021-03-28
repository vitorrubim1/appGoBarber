import React, { useCallback, useRef } from "react";
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core"; // métodos disponíveis para manipular a referência do formulário de maneira direta

import Input from "../../components/Input";
import Button from "../../components/Button";

import logoImage from "../../assets/logo.png";

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInText,
} from "./styles";

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const handleSignUp = useCallback((data: object) => {
    console.log(data);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImage} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form
              onSubmit={handleSignUp}
              ref={formRef}
              style={{ width: "100%" }}
            >
              <Input name="name" icon="user" placeholder="Digite seu nome" />
              <Input name="email" icon="mail" placeholder="Digite seu email" />
              <Input
                name="password"
                icon="lock"
                placeholder="Digite sua senha"
              />
            </Form>

            <Button
              onPress={() => {
                formRef.current?.submitForm(); /*não tem como por type submit, então tenho que disparar com a o submit com a referência do formulário*/
              }}
            >
              Entrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignInButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar pra login</BackToSignInText>
      </BackToSignInButton>
    </>
  );
};

export default SignUp;
