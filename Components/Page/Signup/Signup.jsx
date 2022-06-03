import { useContext, useState } from "react";
import { ScrollView, View } from "react-native";

// import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { STYLES_VARIABLES } from "../../../Variables/stylesVariables";
import Button from "../../UI/Buttons/ButtonBootstrap/ButtonBootstrap";
import InputWithError from "../../UI/Texts/InputWithError/InputWithError";

import { UserContext } from "../../../Contexts/UserContext";

const Signup = () => {
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;
  // console.log(userContext);

  //1-creation variable d'état
  const [usernameInput, setUsernameInput] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");

  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordBisInput, setPasswordBisInput] = useState("");
  const [passwordBisError, setPasswordBisError] = useState("");

  //2-création des fonctions qui changent les variables
  const handleFieldForm = (field) => (text) => {
    switch (field) {
      case "username":
        setUsernameInput(text);
        setUsernameError("");
        break;
      case "email":
        setEmailInput(text);
        setEmailError("");
        break;
      case "password":
        setPasswordInput(text);
        setPasswordError("");
        break;
      case "passwordBis":
        setPasswordBisInput(text);
        setPasswordBisError("");
        break;
    }
  };

  function validationUsername(inputUsername) {
    return (
      !isUndefinedOrBlank(inputUsername) &&
      inputUsername.length > 2 &&
      inputUsername.length < 13
    );
  }

  function validationEmail(inputEmail) {
    return (
      !isUndefinedOrBlank(inputEmail) &&
      inputEmail.includes("@") &&
      inputEmail.includes(".")
    );
  }

  function validationPassword(inputPassword) {
    return !isUndefinedOrBlank(inputPassword) && inputPassword.length >= 6;
  }
  function validationPasswordBis(inputPasswordBis) {
    return passwordBisInput === passwordInput;
  }

  //3-fonction pour valider le formulaire
  const signup = () => {
    const testUsername = validationUsername(usernameInput);
    const testEmail = validationEmail(emailInput);
    const testPassword = validationPassword(passwordInput);
    const testPasswordBis = validationPasswordBis(passwordBisInput);

    if (testUsername && testEmail && testPassword && testPasswordBis) {
      setUser({ email: emailInput, username: usernameInput });
      setEmailInput("");
      setUsernameInput("");
      setPasswordInput("");
      setPasswordBisInput("");
    } else {
      setEmailError(testEmail ? "" : "e-Mail invalide!");
      setUsernameError(
        testUsername
          ? ""
          : `${
              usernameInput.length < 3
                ? "Username trop court. Minimum 3 caractères"
                : "Username trop long. Maximum 12 caractères"
            }`
      );
      setPasswordError(
        testPassword ? "" : "Mot de passe trop court. Minimum 6 caractères"
      );
      setPasswordBisError(
        testPasswordBis ? "" : "Les mots de passe ne sont pas identiques!"
      );
    }
  };

  //4-mettre en place les composants en place et les lier avec les variables et les fonctions
  return (
    <ScrollView>
      {/* <Text> login page</Text> */}
      <InputWithError
        holder="e-Mail"
        value={emailInput}
        action={handleFieldForm("email")}
        errorMessage={emailError}
        type="email-address"
      />
      <InputWithError
        holder="Username"
        value={usernameInput}
        action={handleFieldForm("username")}
        errorMessage={usernameError}
        type="default"
      />
      <InputWithError
        holder="Mot de Passe"
        value={passwordInput}
        action={handleFieldForm("password")}
        errorMessage={passwordError}
        type="default"
        isPassword
      />
      <InputWithError
        holder="Confirmation du mot de passe"
        value={passwordBisInput}
        action={handleFieldForm("passwordBis")}
        errorMessage={passwordBisError}
        type="default"
        isPassword
      />
      <Button label="S'Inscrire" action={signup}>
        <FontAwesome
          name="sign-in"
          size={20}
          color={STYLES_VARIABLES.LIGHT_COLOR}
        />
      </Button>
    </ScrollView>
  );
};

function isUndefinedOrBlank(monString) {
  return typeof monString == "string"
    ? monString.trim() === ""
      ? true
      : false
    : true;
}

//make this component available to the app
export default Signup;
