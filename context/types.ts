import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type AuthProviderProps = {
  children: React.ReactNode;
};

type FirebaseResponse = {
  success: boolean;
  error?: string;
};

export type User = FirebaseAuthTypes.User | null;

export type FirebaseAuthContext = {
  user: User;
  initializing: boolean;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<FirebaseResponse>;
  logout: () => Promise<FirebaseResponse>;
  createUser: (email: string, password: string) => Promise<FirebaseResponse>;
};

export type JWTAuthContext = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};
