import React from "react";
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

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

            <Input name="name" icon="user" placeholder="Digite seu nome" />
            <Input name="email" icon="mail" placeholder="Digite seu email" />
            <Input name="password" icon="lock" placeholder="Digite sua senha" />

            <Button onPress={() => {}}>Entrar</Button>
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
