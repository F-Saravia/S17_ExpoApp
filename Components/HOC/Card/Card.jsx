import { StyleSheet, Text, View } from "react-native";
import { STYLES_VARIABLES } from "../../../Variables/stylesVariables";

export default function Card(props) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props?.title}</Text>
        <Text style={styles.contenu}>{props?.content}</Text>
      </View>
      <View style={styles.composantPotentiel}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 20,
  },
  textContainer: {
    backgroundColor: STYLES_VARIABLES.PRIMARY_COLOR,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    color: STYLES_VARIABLES.LIGHT_COLOR,
    fontSize: 30,
    fontWeight: "bold",
  },
  contenu: {
    textAlign: "center",
    color: STYLES_VARIABLES.LIGHT_COLOR,
    fontSize: 20,
  },
  composantPotentiel: {
    backgroundColor: STYLES_VARIABLES.GRAY_COLOR,
    textAlign: "left",
    padding: 15,
  },
});
