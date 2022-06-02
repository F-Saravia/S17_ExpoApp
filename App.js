import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SayHello from './Components/Container/SaySomething/SayHello';
import Auth from './Components/Page/Auth/Auth';
import Profil from './Components/Page/Profil/Profil';
import { UserContext } from './Contexts/UserContext';

export default function App() {

  const fakeUser = {
    email: "monEmail@gmail.com",
    username: "unUserName"
  }
  const [user, setUser] = useState(fakeUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <View style={styles.container}>
        {/* <Text> app page</Text> */}
        {user ? <Profil /> : <Auth />}
        <StatusBar style="auto" />
      </View>
    </UserContext.Provider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: "red"
  }
});
