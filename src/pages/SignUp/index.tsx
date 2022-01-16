import React, { useCallback, useRef } from "react";
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import * as Yup from "yup";

import api from "../../services/api";
import getValidationErrors from "../../utils/getValidationsErrors";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import Input from "../../components/Input";
import Button from "../../components/Button";

import logoImage from "../../assets/logo.png";

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInText,
} from "./styles";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("Email obrigatório")
            .email("Digite um email válido"),
          password: Yup.string().min(6, "Mínimo 6 dígitos "),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("users", data);
        Alert.alert(
          "Cadastro realizado com sucesso!",
          "Você já pode fazer login na aplicação"
        );
        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          "Erro no cadastro.",
          "Ocorreu um erro ao fazer cadastro, tente novamente."
        );
      }
    },
    [navigation]
  );

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
                autoCapitalize="words"
                returnKeyType="next"
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
                returnKeyType="next"
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
                secureTextEntry
                textContentType="newPassword" //Para não tentar gerar uma senha automática no ios
                returnKeyType="send"
                name="password"
                icon="lock"
                placeholder="Digite sua senha"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Form>

            <Button onPress={() => formRef.current?.submitForm()}>
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
