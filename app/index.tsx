import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import { Link } from "expo-router";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Link href="/firebase" style={styles.button}>
        <Text style={styles.text}>Go to Firebase login</Text>
      </Link>
      <Link href="/clerk" style={styles.button}>
        <Text style={styles.text}>Go to Clerk login</Text>
      </Link>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 16,
  },
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  text: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
