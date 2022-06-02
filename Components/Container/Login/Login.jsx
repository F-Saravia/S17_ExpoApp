//import liraries
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { STYLES_VARIABLES } from "../../../Variables/stylesVariables";
import Button from "../../UI/Buttons/ButtonBootstrap/ButtonBootstrap";
import ButtonLink from "../../UI/Buttons/ButtonLink/ButtonLink";
import InputWithError from "../../UI/Texts/InputWithError/InputWithError";

// create a component
const Login = () => {
  //1-creation variable d'état
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //2-création des fonctions qui changent les variables
  function handleEmail(text) {
    setEmail(text);
  }

  function validationEmail(inputEmail) {
    return !isUndefinedOrBlank(inputEmail) &&
      inputEmail.includes("@") &&
      inputEmail.includes(".")
      ? true
      : false;
  }

  function handlePassword(text) {
    setPassword(text);
  }

  function validationPassword(inputPassword) {
    return !isUndefinedOrBlank(inputPassword) && inputPassword.length >= 6
      ? true
      : false;
  }

  //3-fonction pour valider le formulaire
  const login = () => {
    console.log(
      "Email=",
      email,
      " | Email Error=",
      emailError,
      " | Password Error=",
      password,
      " | Password Error=",
      passwordError
    );
    if (validationEmail(email) && validationPassword(password)) {
      alert(`Connexion avec succès! e-Mail: ${email}`);
      setEmail("");
    } else {
      setEmailError(validationEmail(email) ? "" : "e-Mail invalide!");
      setPasswordError(
        validationPassword(password) ? "" : "password invalide!"
      );
    }
  };

  //4-mettre en place les composants en place et les lier avec les variables et les fonctions
  return (
    <View>
      {/* <Text> login page</Text> */}
      <InputWithError
        holder="e-Mail"
        value={email}
        action={handleEmail}
        errorMessage={emailError}
        type="email-address"
      />
      <InputWithError
        holder="Mot de Passe"
        value={password}
        action={handlePassword}
        errorMessage={passwordError}
        type="default"
        isPassword
      />
      <Button label="Connexion" action={login}>
        <AntDesign
          name="login"
          size={20}
          color={STYLES_VARIABLES.LIGHT_COLOR}
        />
      </Button>
    </View>
  );
  //   return (
  //     <View>
  //       <TextInput placeholder="e-Mail" onChangeText={handleEmail()}></TextInput>
  //       <Text>{emailError}</Text>
  //       <TextInput
  //         placeholder="Mot de passe"
  //         onChangeText={handlePassword()}
  //         secureTextEntry={true}
  //       ></TextInput>
  //       <Text>{passwordError}</Text>
  //       <TouchableOpacity onPress={login()}>
  //         <Text>Connexion</Text>
  //       </TouchableOpacity>

  //       <Button
  //         label="Connexion"
  //         action={login}
  //         sucess={true}
  //         danger={false}
  //         outline={true}
  //       ></Button>
  //     </View>
  //   );
};

function isUndefinedOrBlank(monString) {
  return typeof monString == "string"
    ? monString.trim() === ""
      ? true
      : false
    : true;
}

//make this component available to the app
export default Login;
