import { createContext, FC, useContext, useEffect, useState } from "react";
import type { FirebaseAuthContext, AuthProviderProps, User } from "./types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
  signOut,
} from "@react-native-firebase/auth";
import { doc, setDoc } from "@react-native-firebase/firestore";
import { firebaseAuth, firebaseFirestore } from "../utils/firebase";
import { deleteSecureValue, saveSecureValue } from "../utils/secureStore";

const FirebaseAuthContext = createContext<FirebaseAuthContext | null>(null);

export const FirebaseAuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [initializing, setInitializing] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const createUser = async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      await setDoc(doc(firebaseFirestore, "users", response.user.uid), {
        email: response.user.email,
        uid: response.user.uid,
      });

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(firebaseAuth);
      await deleteSecureValue("token");
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    const subscriber = firebaseAuth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (initializing) setInitializing(false);

      if (user) {
        const token = await getIdToken(user);

        await saveSecureValue("token", token);
      }
    });

    return subscriber;
  }, []);

  return (
    <FirebaseAuthContext.Provider
      value={{ user, setUser, login, logout, createUser, initializing }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const useFirebaseAuth = (): FirebaseAuthContext => {
  const context = useContext(FirebaseAuthContext);

  if (!context) {
    throw new Error(
      "useFirebaseAuth must be used within an FirebaseAuthProvider"
    );
  }

  return context;
};
