import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/auth";

export default function AuthenticatedLayout() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return null;
  }

  /*   if (!user) {
    return <Redirect href="/firebase" />;
  } */

  return <Stack screenOptions={{ headerShown: false }} />;
}
