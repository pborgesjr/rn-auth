import { Link, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";

import {
  FirebaseAuthProvider,
  useFirebaseAuth,
} from "../../context/firebaseAuth";

const FirebaseWrapper = () => {
  const { initializing } = useFirebaseAuth();

  if (initializing) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        title: "Firebase",
        headerLeft: () => (
          <Link href="/" style={{ marginRight: 16, borderWidth: 2 }}>
            <Feather name="chevron-left" size={24} />
          </Link>
        ),
      }}
    />
  );
};

const FirebaseLayout = () => {
  return (
    <FirebaseAuthProvider>
      <FirebaseWrapper />
    </FirebaseAuthProvider>
  );
};

export default FirebaseLayout;
