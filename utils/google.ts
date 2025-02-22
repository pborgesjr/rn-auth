import { Alert } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import firebaseAuthSDK from "@react-native-firebase/auth";

import { firebaseApp } from "./firebase";
import { router } from "expo-router";
import { saveSecureValue } from "./secureStore";

export const loginGoogle = async () => {
  try {
    GoogleSignin.configure({
      webClientId:
        "82535043101-ujqjmkq98bolvtmsrnuuhnus2rh6tse9.apps.googleusercontent.com",
    });
    await GoogleSignin.hasPlayServices();

    const response = await GoogleSignin.signIn();
    const token = response.data?.idToken;

    if (!token) {
      return { success: false, error: "Failed to login with Google" };
    }

    const googleCredentials =
      firebaseAuthSDK.GoogleAuthProvider.credential(token);
    const res = await firebaseApp
      .auth()
      .signInWithCredential(googleCredentials);

    const idToken = await res.user.getIdToken();
    await saveSecureValue("token", idToken);

    router.replace("/firebase");

    return { success: true };
  } catch (error: any) {
    Alert.alert("Error", error.message);
    return { success: false, error: error.message };
  }
};
