import { getApp } from "@react-native-firebase/app";
import { getAuth } from "@react-native-firebase/auth";
import { getFirestore } from "@react-native-firebase/firestore";

// I'm not sure if this is a good practice, but I'm using this to avoid importing these two functions in every file that needs them.
export const firebaseApp = getApp();
export const firebaseAuth = getAuth();
export const firebaseFirestore = getFirestore();
