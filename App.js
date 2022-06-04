import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import SayHello from './Components/Container/SaySomething/SayHello';
import Auth from './Components/Page/Auth/Auth';
import Profil from './Components/Page/Profil/Profil';
import { UserContext } from './Contexts/UserContext';
import ProfilStack from "./Components/Stacks/ProfilStack/ProfilStack";
import GlobalDrawer from "./Components/Container/Drawer/GlobalDrawer";

export default function App() {
  const fakeUser = { email: "monEmail@email.em", username: "NOMPrenom" };
  const [user, setUser] = useState(fakeUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <View style={styles.container}>
        <NavigationContainer>
          {user ? <GlobalDrawer /> : <Auth />}
        </NavigationContainer>

        <StatusBar style='auto' />
      </View>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    width: "100%"
  },
});
