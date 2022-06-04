import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useContext } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import { STYLES_VARIABLES } from "../../../Variables/stylesVariables";
const Navbar = ({ navigation, options }) => {
  const { user, setUser } = useContext(UserContext);
  function openMenu() {
    navigation.openDrawer();
  }

  function logout() {
    setUser(null);
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS !== "web" ? 50 : 10 },
      ]}
    >
      <TouchableOpacity onPress={openMenu}>
        <AntDesign
          name="menu-fold"
          size={24}
          color={STYLES_VARIABLES.LIGHT_COLOR}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{options.title}</Text>
      <TouchableOpacity onPress={logout}>
        <AntDesign
          name="logout"
          size={24}
          color={STYLES_VARIABLES.LIGHT_COLOR}
        />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: STYLES_VARIABLES.PRIMARY_COLOR,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    color: STYLES_VARIABLES.LIGHT_COLOR,
    fontSize: 24,
  },
});

export default Navbar;
