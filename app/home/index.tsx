import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { signOut } from "@firebase/auth";
import { firebaseAuth } from "../../config/firebase";

const Home = () => {
  const handleLogout = async () => {
    await signOut(firebaseAuth);
  };

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#e00d0d",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
