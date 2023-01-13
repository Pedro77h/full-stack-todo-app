import { StyleSheet, View, Image, Text } from "react-native";

const check = require("../../../assets/big-check.png");

export function NoTasksCard() {
  return (
    <>
      <View style={styles.container}>
        <Image source={check} />
        <Text style={styles.text}>No Tasks</Text>
      </View>
      <Text style={styles.smallText}>You're free to enjoy your day</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    borderRadius: 4,
  },
  image: {
    marginVertical: 10,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  smallText: {
    width: 140,
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    alignSelf: "center",
    paddingVertical: 20,
  },
});
