import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../../context/auth";

const HomeScreen = () => {
  const { logout } = useAuth();

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

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
