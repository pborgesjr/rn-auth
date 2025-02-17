import { createContext, FC, useContext, useEffect, useState } from "react";
import type { AuthContext, AuthProviderProps, User } from "./types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
  signOut,
} from "@react-native-firebase/auth";
import { doc, setDoc } from "@react-native-firebase/firestore";
import { deleteSecureValue, saveSecureValue } from "../utils/secureStore";
import { firebaseAuth, firebaseFirestore } from "../utils/firebase";
const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
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
    <AuthContext.Provider
      value={{ user, setUser, login, logout, createUser, initializing }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
