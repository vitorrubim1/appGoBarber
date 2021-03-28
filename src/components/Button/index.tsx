import React from "react";
import { RectButtonProperties } from "react-native-gesture-handler"; //props do button

import { Container, ButtonText } from "./styles";

interface ButtonProps extends RectButtonProperties {
  children: string; //dizendo que o padrão é string e obrigatório, já que não era
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
