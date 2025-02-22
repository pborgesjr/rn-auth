import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { axiosInstance } from "../../api/axios";
import { saveSecureValue } from "../../utils/secureStore";
import { router } from "expo-router";
import { useJWTAuth } from "../../context/jwtAuth";

const LoginScreen = () => {
  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");

  const { setIsLoggedIn } = useJWTAuth();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post<{
        access_token: string;
        refresh_token: string;
      }>("/login", {
        email,
        password,
      });

      await saveSecureValue("access_token", response.data.access_token);
      await saveSecureValue("refresh_token", response.data.refresh_token);
      setIsLoggedIn(true);
      router.replace("/jwt/home");
    } catch (error: any) {
      console.error("Error", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LoginScreen;
