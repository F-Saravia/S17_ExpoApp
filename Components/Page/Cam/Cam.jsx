//import liraries
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useContext, useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import { STYLES_VARIABLES } from "../../../Variables/stylesVariables";
import { UserContext } from "../../../Contexts/UserContext";

// create a component
const Cam = ({ route, navigation }) => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [zoom, setZoom] = useState(0);
  const cameraRef = useRef();

  const { user, setUser } = useContext(UserContext);

  function toggleCameraType() {
    setCameraType(
      cameraType === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function toggleFlash() {
    setIsFlashOn(!isFlashOn);
  }

  function handleZoom(value) {
    setZoom(value);
  }

  const sizes = useWindowDimensions();

  useEffect(() => {
    (async () => {
      try {
        let permission = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(permission.granted);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (cameraPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={64} color={STYLES_VARIABLES.PRIMARY_COLOR} />
      </View>
    );
  }

  if (cameraPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Permission refusée...</Text>
        <Feather
          name="camera-off"
          size={64}
          color={STYLES_VARIABLES.DANGER_COLOR}
        />
      </View>
    );
  }

  async function takePicture() {
    const picture = await cameraRef.current.takePictureAsync();
    console.log(picture);

    //1- Utiliser le contexte pour mettre picture dans avatar de user.
    setUser({ ...user, avatar: picture });
    //2- Retourner en arriere (Profil)
    if (navigation.canGoBack()) {
      navigation.pop();
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Camera
        zoom={zoom}
        ref={cameraRef}
        flashMode={isFlashOn ? "torch" : "off"}
        type={cameraType}
        ratio="16:9"
        style={{ width: sizes.width, height: (sizes.width * 16) / 9 }}
      >
        <Slider
          style={styles.slider}
          vertical={true}
          value={zoom}
          onValueChange={handleZoom}
          minimumValue={0}
          maximumValue={1}
          onSlidingComplete={handleZoom}
          maximumTrackTintColor={STYLES_VARIABLES.LIGHT_COLOR}
          minimumTrackTintColor={STYLES_VARIABLES.PRIMARY_COLOR}
          thumbTintColor={STYLES_VARIABLES.SECONDARY_COLOR}
        />
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={toggleCameraType}>
            <MaterialIcons
              name="flip-camera-android"
              size={64}
              color={STYLES_VARIABLES.SECONDARY_COLOR}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleFlash}>
            <MaterialIcons
              name={isFlashOn ? "flash-on" : "flash-off"}
              size={50}
              color={
                isFlashOn
                  ? STYLES_VARIABLES.SUCCESS_COLOR
                  : STYLES_VARIABLES.DANGER_COLOR
              }
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={takePicture}>
            <MaterialIcons
              name="camera"
              size={64}
              color={STYLES_VARIABLES.SUCCESS_COLOR}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
    backgroundColor: "rgba(0,0,0,0.5)",
    alignSelf: "center",
    position: "absolute",
    bottom: 100,
    borderRadius: 500,
    padding: 10,
  },
  slider: {
    width: "75%",
    alignSelf: "center",
    position: "absolute",
    bottom: 200,
  },
});

export default Cam;
