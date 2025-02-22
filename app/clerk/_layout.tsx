import { Link, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function AuthRoutesLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Clerk Login",
        headerLeft: () => (
          <Link href={"/"} style={{ marginRight: 16 }}>
            <Feather name="chevron-left" size={24} />
          </Link>
        ),
      }}
    />
  );
}
