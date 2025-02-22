import { Link, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { useAuth } from "../../context/auth";

export default function AuthenticatedLayout() {
  const { user, initializing } = useAuth();

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
}
