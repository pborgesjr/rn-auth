import React, { useState } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  Text,
} from "react-native";
import { router } from "expo-router";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

import { loginGoogle } from "../../utils/google";
import { useAuth } from "../../context/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("pedro@email.com");
  const [password, setPassword] = useState("senha123");
  const [loading, setLoading] = useState(false);

  const { login, createUser } = useAuth();

  const handleLogin = async () => {
    setLoading(true);

    const { success, error } = await login(email, password);

    if (success) {
      Alert.alert("Success", "You have successfully logged in!");
      router.replace("/firebase/home");
    }

    if (error) {
      Alert.alert("Error", error);
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    const { success, error } = await loginGoogle();

    if (success) {
      Alert.alert("Success", "You have successfully logged in with Google!");
    }

    if (error) {
      Alert.alert("Error", error);
    }

    setLoading(false);
  };

  const handleCreateUser = async () => {
    setLoading(true);

    const { success, error } = await createUser(email, password);

    if (success) {
      Alert.alert("Success", "You have successfully created an account!");
    }

    if (error) {
      Alert.alert("Error", error);
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.title}>Login Page</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        placeholderTextColor="#fff"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        secureTextEntry
        placeholderTextColor="#fff"
        style={styles.input}
      />

      <View>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <GoogleSigninButton onPress={handleGoogleLogin} style={styles.google} />
        <TouchableOpacity onPress={handleCreateUser} style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#f03" />}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#000",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    borderWidth: 2,
    borderColor: "#4610b3",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#4610b3",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  google: {
    marginTop: 16,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
