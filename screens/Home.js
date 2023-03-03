import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user.value);
  return (
    <View style={styles.container}>
      <Text>La page d'accueil</Text>
      <Text>Bienvenu {user.firstName} </Text>
      <Text>Bienvenu {user.token} </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
