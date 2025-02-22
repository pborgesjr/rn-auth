import { Link, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "../../utils/clerkCache";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function AuthRoutesLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
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
      </ClerkLoaded>
    </ClerkProvider>
  );
}
