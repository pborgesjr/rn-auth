import { createContext, FC, useContext, useEffect, useState } from "react";
import type { AuthContext, AuthProviderProps, User } from "./types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { firebaseAuth, firebaseFirestore } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [initializing, setInitializing] = useState(true);

  const router = useRouter();

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

  useEffect(() => {
    const subscriber = firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return subscriber;
  }, []);

  useEffect(() => {
    if (user) {
      router.replace("/home");
    } else {
      router.replace("/");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, createUser, initializing }}
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
