import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type FirebaseResponse = {
  success: boolean;
  error?: string;
};

export type User = FirebaseAuthTypes.User | null;

export type AuthContext = {
  user: User;
  initializing: boolean;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<FirebaseResponse>;
  logout: () => Promise<FirebaseResponse>;
  createUser: (email: string, password: string) => Promise<FirebaseResponse>;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
