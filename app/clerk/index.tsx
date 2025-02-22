import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <SignedIn>
        <Text style={styles.welcomeText}>
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>

        <TouchableOpacity onPress={() => signOut()} style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </SignedIn>
      <SignedOut>
        <View style={styles.authContainer}>
          <TouchableOpacity style={styles.button}>
            <Link href="/clerk/sign-in" asChild>
              <Text style={styles.buttonText}>Sign In</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Link href="/clerk/sign-up" asChild>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  authContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
