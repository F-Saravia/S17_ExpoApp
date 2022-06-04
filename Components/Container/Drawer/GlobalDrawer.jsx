import { createDrawerNavigator } from "@react-navigation/drawer";
import Navbar from "../NavBar/Navbar";
import ProfilStack from "../../Stacks/ProfilStack/ProfilStack";

const Drawer = createDrawerNavigator();

const GlobalDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <Navbar {...props} />,
      }}
    >
      <Drawer.Screen
        name="profilstack"
        component={ProfilStack}
        options={{ title: "Profil" }}
      />
      <Drawer.Screen
        name="got"
        component={ProfilStack}
        options={{ title: "Personnages de GOT" }}
      />
    </Drawer.Navigator>
  );
};
export default GlobalDrawer;
