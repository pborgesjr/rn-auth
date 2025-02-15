import { Stack } from "expo-router";
import { AuthProvider } from "../context/auth";

const StackLayout = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
}
