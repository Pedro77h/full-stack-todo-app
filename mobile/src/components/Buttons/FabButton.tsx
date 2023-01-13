import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { Theme } from "../../themes";

const plus = require("../../../assets/plus.png");

export function FabButton() {
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container}>
      <Image source={plus} resizeMode="contain" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.primaryDark,
    width: 57,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 57,
    elevation: 8,
    position: 'absolute',
    right: 40,
    bottom:35,
  },
  image: {
    width: 14,
    height: 14
  },
});
