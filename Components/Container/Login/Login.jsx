import { useState } from "react";
import { View } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { STYLES_VARIABLES } from "../../../Variables/stylesVariables";
import Button from "../../UI/Buttons/ButtonBootstrap/ButtonBootstrap";
import InputWithError from "../../UI/Texts/InputWithError/InputWithError";

const Login = () => {
  //1-creation variable d'état
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");

  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //2-création des fonctions qui changent les variables
  function handleEmail(text) {
    setEmailInput(text);
    setEmailError("");
  }

  function validationEmail(inputEmail) {
    return !isUndefinedOrBlank(inputEmail) &&
      inputEmail.includes("@") &&
      inputEmail.includes(".")
      ? true
      : false;
  }

  function handlePassword(text) {
    setPasswordInput(text);
    setPasswordError("");
  }

  function validationPassword(inputPassword) {
    return !isUndefinedOrBlank(inputPassword) && inputPassword.length >= 6
      ? true
      : false;
  }

  //3-fonction pour valider le formulaire
  const login = () => {
    if (validationEmail(emailInput) && validationPassword(passwordInput)) {
      alert(`Connexion avec succès! e-Mail: ${emailInput}`);
      setEmailInput("");
    } else {
      setEmailError(validationEmail(emailInput) ? "" : "e-Mail invalide!");
      setPasswordError(
        validationPassword(passwordInput) ? "" : "Mot de passe trop court!"
      );
    }
  };

  //4-mettre en place les composants en place et les lier avec les variables et les fonctions
  return (
    <View>
      {/* <Text> login page</Text> */}
      <InputWithError
        holder="e-Mail"
        value={emailInput}
        action={handleEmail}
        errorMessage={emailError}
        type="email-address"
      />
      <InputWithError
        holder="Mot de Passe"
        value={passwordInput}
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
};

function isUndefinedOrBlank(monString) {
  return typeof monString == "string"
    ? monString.trim() === ""
      ? true
      : false
    : true;
}

export default Login;
