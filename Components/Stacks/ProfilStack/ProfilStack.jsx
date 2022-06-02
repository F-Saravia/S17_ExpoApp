import { createStackNavigator } from "@react-navigation/stack";
import { STYLES_VARIABLES } from "../../../Variables/stylesVariables";
import Cam from "../../Page/Cam/Cam";
import Profil from "../../Page/Profil/Profil";

const Stack = createStackNavigator();

const ProfilStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: STYLES_VARIABLES.PRIMARY_COLOR,
        },
        headerTitleStyle: {
          color: STYLES_VARIABLES.LIGHT_COLOR,
          fontSize: 25,
        },
        headerTintColor: STYLES_VARIABLES.LIGHT_COLOR,
      }}
    >
      <Stack.Screen
        options={{ title: "Prenez une photo" }}
        name="camera"
        component={Cam}
      />
      <Stack.Screen
        options={{
          title: "Votre page de profil",
        }}
        name="profil"
        component={Profil}
      />
    </Stack.Navigator>
  );
};

export default ProfilStack;
