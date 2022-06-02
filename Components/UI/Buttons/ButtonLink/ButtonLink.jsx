import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonLink = (props) => (
  <TouchableOpacity onPress={props.action}>
    <Text style={styles.link}>{props.children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  link: {
    color: "royalblue",
    textDecorationLine: "underline",
    marginVertical: 10,
  },
});

export default ButtonLink;
