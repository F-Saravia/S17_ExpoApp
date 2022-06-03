import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

import { UserContext } from "../../../Contexts/UserContext";
import { STYLES_VARIABLES } from "../../../Variables/stylesVariables";
import Button from "../../UI/Buttons/ButtonBootstrap/ButtonBootstrap";
import defaultAvatar from "../../../assets/default-Profil-avatar.png";

// create a component
const Profil = ({ route, navigation }) => {
  console.log(navigation);
  const { user, setUser } = useContext(UserContext);
  // console.log(user);

  const sizes = useWindowDimensions();
  // console.log(sizes);

  // function addDescription(description) {
  //   setUser({ ...user, description: description });
  // }

  async function pickImage() {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    // console.log(image);
    if (!image.cancelled) setUser({ ...user, avatar: image });
  }

  function goCamera() {
    navigation.push("camera");
  }

  return (
    <ScrollView style={{ width: "100%" }}>
      <View>
        <Image
          style={[styles.image, { width: sizes.width, height: sizes.width }]}
          source={user.avatar ? user.avatar : defaultAvatar}
        />

        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={pickImage}>
            <MaterialIcons
              name="photo-library"
              size={50}
              color={STYLES_VARIABLES.PRIMARY_COLOR}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={goCamera}>
            <MaterialIcons
              name="photo-camera"
              size={50}
              color={STYLES_VARIABLES.PRIMARY_COLOR}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infosGlobalContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.personalInfoLabel}>Email:</Text>
          <Text style={styles.personalInfo}>{user.email}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.personalInfoLabel}>Username:</Text>
          <Text style={styles.personalInfo}>{user.username}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.personalInfoLabel}>Description:</Text>
          <Text style={styles.personalInfo}>
            {user.description
              ? user.description
              : "Veuillez entrer une description..."}
          </Text>
          <Button
            label="Modifiez votre profil"
            action={() => {
              navigation.push("edit-profil");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    margin: 24,
    maxWidth: 250,
    maxHeight: 250,
    borderRadius: 125,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: STYLES_VARIABLES.GRAY_COLOR,
    maxWidth: 300,
    alignSelf: "center",
    width: "100%",
    justifyContent: "space-around",
    padding: 5,
    margin: 10,
    borderRadius: 10,
  },
  infosGlobalContainer: {
    backgroundColor: STYLES_VARIABLES.GRAY_COLOR,
    padding: 20,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: STYLES_VARIABLES.PRIMARY_COLOR,
    width: "100%",
    maxWidth: 300,
    alignSelf: "center",
  },
  infoContainer: {
    borderBottomWidth: 2,
    borderColor: STYLES_VARIABLES.DARK_GRAY_COLOR,
    padding: 5,
    margin: 5,
  },
  personalInfoLabel: {
    color: STYLES_VARIABLES.PRIMARY_COLOR,
    fontWeight: "bold",
  },
  personalInfo: {
    fontSize: 16,
    color: STYLES_VARIABLES.DARK_COLOR,
  },
});

export default Profil;
