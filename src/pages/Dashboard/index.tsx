import React from "react";
import { View, Text, Button } from "react-native";

import { useAuth } from "../../hooks/auth";

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Text
        style={{
          color: "#FFF",
          fontSize: 20,
          textAlign: "center",
          marginVertical: 50,
        }}
      >
        You are logged in 👍️
      </Text>

      <Button title="Sair" onPress={signOut} color="#ff9000"  />
    </View>
  );
};

export default Dashboard;
