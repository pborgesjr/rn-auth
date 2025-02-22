import { Link, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { JWTAuthProvider } from "../../context/jwtAuth";

export default function JWTRoutesLayout() {
  return (
    <JWTAuthProvider>
      <Stack
        screenOptions={{
          headerTitle: "JWT Fake Login",
          headerLeft: () => (
            <Link href={"/"} style={{ marginRight: 16 }}>
              <Feather name="chevron-left" size={24} />
            </Link>
          ),
        }}
      />
    </JWTAuthProvider>
  );
}
