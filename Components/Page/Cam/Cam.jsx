import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

import { useContext, useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";

import { STYLES_VARIABLES } from "../../../Variables/stylesVariables";
import { UserContext } from "../../../Contexts/UserContext";

// create a component
const Cam = ({ route, navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const sizes = useWindowDimensions();
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraActivation, setCameraActivation] = useState(false);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flashType, setFlashType] = useState(false);
  const cameraRef = useRef();

  function togglePermission() {
    //TODO acces the permissions on the device to remove it
    //just switching state variable doesnt modify the os permission itself....so.....mmm...
    //i'll just toggle state variable for now...........
    setCameraPermission(!cameraPermission);
  }

  function toggleCameraActivation() {
    setCameraActivation(!cameraActivation);
  }

  function toggleCameraType() {
    setCameraType(
      cameraType === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  function toggleFlash() {
    setFlashType(!flashType);
  }

  async function takePicture() {
    // console.log(cameraRef);
    // const ratios = await cameraRef.current.getSupportedRatiosAsync();
    // console.log(ratios);
    const photo = cameraRef.current.takePictureAsync();
    setUser({ ...user, avatar: photo });
    if (navigation.canGoBack()) navigation.pop();
  }

  useEffect(() => {
    (async () => {
      let permission = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(permission.granted);
    })();
  }, []);

  if (cameraPermission === null) {
    return (
      <View style={{ height: "100%", justifyContent: "center" }}>
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

  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={toggleCameraActivation}>
          <Feather
            name={cameraActivation ? "camera" : "camera-off"}
            size={24}
            color={cameraActivation ? "camera" : "camera-off"}
          />
        </TouchableOpacity>
      </View>
      (cameraActivation &&{" "}
      <Camera
        ref={cameraRef}
        flashMode={flashType ? "torch" : "off"}
        type={cameraType}
        ratio="16:9"
        style={{
          // width: "100%",
          // height: "50%",
          width: sizes.width,
          height: sizes.height,
        }}
      >
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
              name={flashType ? "flash-on" : "flash-off"}
              size={45}
              color={
                flashType
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
      )
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
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
});

export default Cam;
