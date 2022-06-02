//import liraries
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { STYLES_VARIABLES } from "../../../../Variables/stylesVariables";

/**
 *
 * @param {String} holder - Text to be put as placeholder of my button
 * @param {(String | Object)} value - Recommend to put a variable to enablr two way binding
 * @param {function} action - function that handle the validation of the desired input
 * @param {String} errorMessage - Text to show up in case an error comes up depending on the type
 * @param {enum('text', 'email-adress', 'password' )} type - string value that specifies the content type
 * @param {(undefined | boolean)} isPassword - specifies if the content is a password
 *
 */
const InputWithError = ({
  holder,
  value,
  action,
  errorMessage,
  type,
  isPassword,
}) => {
  // const [message, setMessage] = useState("");

  // const handleErrors = () => {
  //     var validation=false;
  //     switch (type) {
  //         case 'text':
  //             validation= testText(value)
  //             break;
  //         case 'email-adress':
  //             validation= testEmail(value)
  //             break;
  //         case 'password':
  //             validation= testPassword(value)
  //             break;
  //         default:
  //             break;
  //     }
  //     validation
  //         ? setMessage("")
  //         : setMessage(errorMessage)
  // }

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const toggleIsPasswordHidden = () => setIsPasswordHidden(!isPasswordHidden);

  // const outline = Platform.OS === "web" ? { outline: "none" } : null;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {
            borderBottomColor:
              errorMessage === ""
                ? STYLES_VARIABLES.PRIMARY_COLOR
                : STYLES_VARIABLES.DANGER_COLOR,
          },
        ]}
      >
        <TextInput
          style={[
            {
              color:
                errorMessage === "" ? "black" : STYLES_VARIABLES.DANGER_COLOR,
            },
            // outline,
          ]}
          placeholder={typeof holder == "string" ? holder : ""}
          value={value}
          onChangeText={action}
          keyboardType={type}
          secureTextEntry={isPassword && isPasswordHidden}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.icon}
            onPress={toggleIsPasswordHidden}
          >
            <Entypo
              name={isPasswordHidden ? "eye-with-line" : "eye"}
              size={24}
              color={
                isPasswordHidden
                  ? STYLES_VARIABLES.SUCCES_COLOR
                  : STYLES_VARIABLES.DANGER_COLOR
              }
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: STYLES_VARIABLES.LIGHT_COLOR,
    marginVertical: 10,
    padding: 7,
    borderRadius: 5,
    alignItems: "center",
    borderBottomWidth: 2,
  },
  icon: {
    position: "absolute",
    right: 7,
  },
  error: {
    color: STYLES_VARIABLES.DANGER_COLOR,
    fontSize: 13,
  },
});

// function testText(text) {
//   if (typeof text == "string") {
//     if (text.trim() === "") return false;
//     else return true;
//   } else return false;
// }

// function testEmail(email) {
//   if (typeof email == "string") {
//     if (email.trim() === "") return false;
//     else {
//       if (email.includes("@") && email.includes(".")) return true;
//       else return false;
//     }
//   } else return false;
// }

// function testPassword(password) {
//   if (password.length > 6) return true;
//   else return false;
// }

//make this component available to the app
export default InputWithError;
