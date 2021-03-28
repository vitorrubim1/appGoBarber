import styled from "styled-components/native";
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0 30px; // pra que nada fique encostando nas laterais
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: "RobotoSlab-Medium";

  margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-family: "RobotoSlab-Regular";
  font-size: 16px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 0 ${10 + getBottomSpace()}px;

  background: #111111;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CreateAccountText = styled.Text`
  color: #ff9000;
  font-family: "RobotoSlab-Regular";
  font-size: 16px;
  margin-left: 16px;
`;
