import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { NoTasksCard, FabButton } from "../components";
import { Theme } from "../themes";

const logo = require("../../assets/logo.png");

export function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <NoTasksCard />
        <FabButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
  },

  container: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 20,
  },

  logo: {
    width: 227,
    height: 46,
    alignSelf: "center",
    marginBottom: 20,
  },
});
