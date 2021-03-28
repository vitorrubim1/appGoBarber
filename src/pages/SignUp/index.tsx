import React, { useCallback, useRef } from "react";
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
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
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

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
              <Input
                autoCapitalize="words" // nomes próprios em letra maiuscula
                returnKeyType="next" // pro teclado ter a opção visual de prosseguir pro outro input abaixo
                name="name"
                icon="user"
                placeholder="Digite seu nome"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next" // pro teclado ter a opção visual de prosseguir pro outro input abaixo
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="Digite seu email"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry //campo do tipo password
                textContentType="newPassword" //para não tentar gerar uma senha automática no ios
                returnKeyType="send" //pro teclado ter a opção visual de "submitar"
                name="password"
                icon="lock"
                placeholder="Digite sua senha"
                onSubmitEditing={() => {
                  // pra submitar de fato o form
                  formRef.current?.submitForm();
                }}
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
