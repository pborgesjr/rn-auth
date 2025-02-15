import { User as FirebaseAuthUser } from "firebase/auth";

type FirebaseResponse = {
  success: boolean;
  error?: string;
};

export type User = FirebaseAuthUser | null;

export type AuthContext = {
  user: User;
  initializing: boolean;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<FirebaseResponse>;
  createUser: (email: string, password: string) => Promise<FirebaseResponse>;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
