import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react"; //useImperativeHandle: server para passarmos informações de um componente filho para um componente pai
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

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref
) => {
  // ForwardRefRenderFunction: quando preciso receber "ref", como parametro, já que a tipagem sempre sera "any" com React.FC
  const inputElementRef = useRef<any>(null);

  const { defaultValue = "", registerField, fieldName, error } = useField(name); //name dos parâmetros é o que vem do componente que usa o input, da interface InputProps
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue }); // que vai ser vazio por início

  useImperativeHandle(ref, () => ({
    focus() {
      // primeiro parâmetro é oq eu recebo do componente filho, e a segunda é oq quero fazer
      inputElementRef.current.focus(); // pego a referência padrão desse componente e do foco
    },
  }));

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
      },
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

export default forwardRef(Input); //como recebo ref por parâmetro, tenho q exportar assim;
