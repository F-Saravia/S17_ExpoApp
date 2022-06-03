//import liraries
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { STYLES_VARIABLES } from "../../../Variables/stylesVariables";
import Button from "../../UI/Buttons/ButtonBootstrap/ButtonBootstrap";
import ButtonLink from "../../UI/Buttons/ButtonLink/ButtonLink";
import InputWithError from "../../UI/Texts/InputWithError/InputWithError";

// create a component
const Signup = () => {
  //1-variables d'état
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    passwordBis: "",
  });

  const [inputsErrorMessages, setInputsErrorMessages] = useState({
    email: "",
    username: "",
    password: "",
    passwordBis: "",
  });

  //2-gestion des variables d'état
  const handleFieldForm = (field) => (text) => {
    var { email, username, password, passwordBis } = inputs;
    switch (field) {
      case "email":
        email = text;
        break;
      case "username":
        username = text;
        break;
      case "password":
        password = text;
        break;
      case "passwordBis":
        passwordBis = text;
        break;
      default:
        break;
    }
    return setInputs({ email, username, password, passwordBis });
  };

  const handleErrorMessages_V1 = (field, text) => () => {
    var { email, username, password, passwordBis } = inputsErrorMessages;
    switch (field) {
      case "email":
        email = text;
        break;
      case "username":
        username = text;
        break;
      case "password":
        password = text;
        break;
      case "passwordBis":
        passwordBis = text;
        break;
      default:
        // email = text;
        // username = text;
        // password = text;
        // passwordBis = text;
        break;
    }
    return setInputsErrorMessages({ email, username, password, passwordBis });
  };

  const handleErrorMessages_V2 = (field) => (text) => {
    var { email, username, password, passwordBis } = inputsErrorMessages;
    switch (field) {
      case "email":
        setInputsErrorMessages((values) => {
          console.log("values", values);
          return { ...values, email: text };
        });
        break;
      case "username":
        setInputsErrorMessages((values) => {
          console.log("values", values);
          return { ...values, username: text };
        });
        break;
      case "password":
        setInputsErrorMessages((values) => {
          console.log("values", values);
          return { ...values, password: text };
        });
        break;
      case "passwordBis":
        setInputsErrorMessages((values) => {
          console.log("values", values);
          return { ...values, passwordBis: text };
        });
        break;
        break;
      default:
        // email = text;
        // username = text;
        // password = text;
        // passwordBis = text;
        break;
    }
    return setInputsErrorMessages({ email, username, password, passwordBis });
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
    return inputPasswordBis === inputs.password;
  }

  //3-fonction pour valider le formulaire
  const signup = () => {
    var { email, username, password, passwordBis } = inputs;
    var {
      email: emailMsg,
      username: usernameMsg,
      password: passwordMsg,
      passwordBis: passwordBisMsg,
    } = inputsErrorMessages;
    const testUsername = validationUsername(username);
    const testEmail = validationEmail(email);
    const testPassword = validationPassword(password);
    const testPasswordBis = validationPasswordBis(passwordBis);
    console.log(
      `Email=${email} | TestEmail= ${testEmail} | ErrorMsg= ${emailMsg}`
    );
    console.log(
      `Username=${username} | TestUsername= ${testUsername} | ErrorMsg= ${usernameMsg}`
    );
    console.log(
      `Password=${password} | TestPassword= ${testPassword} | ErrorMsg= ${passwordMsg}`
    );
    console.log(
      `PasswordBis=${passwordBis} | TesPasswordBise= ${testPasswordBis} | ErrorMsg= ${passwordBisMsg}`
    );

    if (testUsername && testEmail && testPassword && testPasswordBis) {
      alert(
        `Inscription réussie avec succès! e-Mail: ${email} | username: ${username}`
      );
      setInputs({
        email: "",
        username: "",
        password: "",
        passwordBis: "",
      });
    } else {
      handleErrorMessages_V1(
        "email",
        testEmail ? "nothing to show" : "e-Mail invalide!"
      );
      handleErrorMessages_V2("email")(
        testEmail ? "nothing to show" : "e-Mail invalide!"
      );
      handleErrorMessages_V1(
        "username",
        testUsername
          ? "nothing to show"
          : username.length < 3
          ? "Username trop court. Minimum 3 caractères"
          : "Username trop long. Maximum 12 caractères"
      );
      handleErrorMessages_V2("username")(
        testUsername
          ? "nothing to show"
          : username.length < 3
          ? "Username trop court. Minimum 3 caractères"
          : "Username trop long. Maximum 12 caractères"
      );
      handleErrorMessages_V1(
        "password",
        testPassword
          ? "nothing to show"
          : "Mot de passe trop court. Minimum 6 caractères"
      );
      handleErrorMessages_V2("password")(
        testPassword
          ? "nothing to show"
          : "Mot de passe trop court. Minimum 6 caractères"
      );
      handleErrorMessages_V1(
        "passwordBis",
        testPasswordBis
          ? "nothing to show"
          : "Les mots de passe ne sont pas identiques!"
      );
      handleErrorMessages_V2("passwordBis")(
        testPasswordBis
          ? "nothing to show"
          : "Les mots de passe ne sont pas identiques!"
      );
    }
  };

  //4-mettre enplace les composants et les lier avec les variables et les fonctions

  return (
    <ScrollView>
      {/* <Text> login page</Text> */}
      <InputWithError
        holder="e-Mail"
        value={inputs.email}
        action={handleFieldForm("email")}
        errorMessage={inputsErrorMessages.email}
        type="email-address"
      />
      <InputWithError
        holder="Username"
        value={inputs.username}
        action={handleFieldForm("username")}
        errorMessage={inputsErrorMessages.username}
        type="default"
      />
      <InputWithError
        holder="Mot de Passe"
        value={inputs.password}
        action={handleFieldForm("password")}
        errorMessage={inputsErrorMessages.password}
        type="default"
        isPassword
      />
      <InputWithError
        holder="Confirmation du mot de passe"
        value={inputs.passwordBis}
        action={handleFieldForm("passwordBis")}
        errorMessage={inputsErrorMessages.passwordBis}
        type="default"
        isPassword
      />
      <Button label="S'Inscrire" action={signup}>
        <AntDesign
          name="login"
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
