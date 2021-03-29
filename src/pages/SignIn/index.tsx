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

import getValidationErrors from "../../utils/getValidationsErrors";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core"; // métodos disponíveis para manipular a referência do formulário de maneira direta

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

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null); // para que ao prosseguir o input de email o de password tenha autofoco

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({}); // zerando os erros

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Email obrigatório")
          .email("Digite um email válido"),
        password: Yup.string().required("Senha obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false, // pra retornar todos os erros de uma vez
      }); // dados q recebi do input

      // fazendo login e sendo redirecionado ao dashboard
      // await signIn({ email: data.email, password: data.password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // verifico se o erro que deu é uma instância do Yup
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors); // formRef: referencia do formulario. current: valor das informações

        return; // para não executar o toast caso seja erro de validação
      }

      // disparar um alerta
      Alert.alert(
        "Erro na autenticação",
        "Ocorreu um erro ao fazer login, verifique as credenciais"
      );
    }
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
              <Title>Faça seu Login</Title>
            </View>

            <Form
              onSubmit={handleSignIn}
              ref={formRef}
              style={{ width: "100%" }}
            >
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="Digite seu email"
                returnKeyType="next" // pro teclado ter a opção visual de prosseguir pro outro input abaixo
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus(); //para do foco no input de senha
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Digite sua senha"
                secureTextEntry //campo do tipo password
                returnKeyType="send" //pro teclado ter a opção visual de "submitar"
                onSubmitEditing={() => {
                  // pra submitar de fato o form
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm(); /*não tem como por type submit, então tenho que disparar com a o submit com a referência do formulário*/
                }}
              >
                Entrar
              </Button>
            </Form>

            <ForgotPassword>
              <ForgotPasswordText> Esqueci minha senha </ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate("SignUp")}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>Criar uma conta</CreateAccountText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
