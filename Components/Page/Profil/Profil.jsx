//import liraries
import React, { Component, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { UserContext } from "../../../Contexts/UserContext";
import { STYLES_VARIABLES } from "../../../Variables/stylesVariables";

// create a component
const Profil = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  function addDescription(description) {
    setUser({ ...user, description: description });
  }

  const sizes = useWindowDimensions();
  console.log(sizes);

  return (
    <View style={{ width: "100%" }}>
      <View>
        <Image
          style={[
            styles.image,
            {
              width: sizes.width,
              height: sizes.width,
            },
          ]}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
        />
      </View>

      <View style={{styles.iconsContainer}}>
        <TouchableOpacity>
          <MaterialIcons
            name="photo-library"
            size={50}
            color={STYLES_VARIABLES.PRIMARY_COLOR}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons
            name="photo-camera"
            size={50}
            color={STYLES_VARIABLES.PRIMARY_COLOR}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infosGlobalContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.input}>{user.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.input}>{user.username}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            placeholder="Veuillez entrer une description"
            value={user.description}
            onChangeText={addDescription}
          ></TextInput>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  image: {
    maxheight: 200,
    maxwidth: 200,
    alignSelf: "center",
    margin: 20,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: STYLES_VARIABLES.GRAY_COLOR,
    maxWidth: 300,
    alignSelf
  },
  infosGlobalContainer: {
    width: "100%",
    maxWidth: 300,
    alignSelf: "center",
    backgroundColor: STYLES_VARIABLES.GRAY_COLOR,
    padding: 24,
    borderBottomWidth: 3,
    borderTopWidth: 3,
    borderColor: STYLES_VARIABLES.DARK_GRAY_COLOR,
  },
  infoContainer: {
    backgroundColor: STYLES_VARIABLES.GRAY_COLOR,
    padding: 8,
    borderBottomWidth: 1,
    borderColor: STYLES_VARIABLES.DARK_GRAY_COLOR,
  },
  label: {
    color: STYLES_VARIABLES.PRIMARY_COLOR,
    fontWeight: "bold",
  },
  input: {
    fontSize: 17,
    color: STYLES_VARIABLES.DARK_COLOR,
  },
});

//make this component available to the app
export default Profil;
