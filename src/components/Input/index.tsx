import React, { useEffect, useRef } from "react";
import { TextInputProps } from "react-native";
import { useField } from "@unform/core";

import { Container, TextInput, Icon } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const inputElementRef = useRef<any>(null);

  const { defaultValue = "", registerField, fieldName, error } = useField(name); //name dos parâmetros é o que vem do componente que usa o input, da interface InputProps
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue }); // que vai ser vazio por início

  useEffect(() => {
    registerField({
      // registrando o input no unform
      name: fieldName,
      ref: inputValueRef.current,
      path: "value", // aonde irá encontrar o valor do input em si

      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value }); // para que o input reflita a cada alteração
      },
      clearValue() {
        inputValueRef.current.value = "";
        inputElementRef.current.clear();
      }
    });
  }, [registerField, fieldName]);

  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />

      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value; /*o texto que estiver sendo digitado no input, será a informação final do inputValueRef.value*/
        }}
        {...rest}
      />
    </Container>
  );
};

export default Input;
