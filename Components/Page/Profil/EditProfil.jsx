import { useContext, useState } from "react";
import { View } from "react-native";

import Button from "../../UI/Buttons/ButtonBootstrap/ButtonBootstrap";
import InputWithError from "../../UI/Texts/InputWithError/InputWithError";

import { UserContext } from "../../../Contexts/UserContext";

const EditProfil = () => {
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;

  //1-creation variable d'état
  const [usernameUpdate, setUsernameUpdate] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [emailUpdate, setEmailUpdate] = useState("");
  const [emailError, setEmailError] = useState("");

  const [descriptionUpdate, setDescriptionUpdate] = useState("");

  //2-création des fonctions qui changent les variables
  const handleFieldForm = (field) => (text) => {
    switch (field) {
      case "username":
        setUsernameUpdate(text);
        setUsernameError("");
        break;
      case "email":
        setEmailUpdate(text);
        setEmailError("");
        break;
      case "description":
        setDescriptionUpdate(text);
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

  //3-fonction pour valider le formulaire
  const enregistrer = () => {
    const testUsername = validationUsername(usernameUpdate);
    const testEmail = validationEmail(emailUpdate);

    if (testUsername && testEmail) {
      setUser({
        ...user,
        email: emailUpdate,
        username: usernameUpdate,
        description: descriptionUpdate,
      });
    } else {
      setEmailError(testEmail ? "" : "e-Mail invalide!");
      setUsernameError(
        testUsername
          ? ""
          : `${
              usernameUpdate.length < 3
                ? "Username trop court. Minimum 3 caractères"
                : "Username trop long. Maximum 12 caractères"
            }`
      );
    }
  };

  //4-mettre en place les composants en place et les lier avec les variables et les fonctions
  return (
    <View>
      <InputWithError
        holder={user.email}
        value={emailUpdate}
        action={handleFieldForm("email")}
        errorMessage={emailError}
        type="email-address"
      />
      <InputWithError
        holder={user.username}
        value={usernameUpdate}
        action={handleFieldForm("username")}
        errorMessage={usernameError}
        type="default"
      />
      <InputWithError
        holder={user.description}
        value={descriptionUpdate}
        action={handleFieldForm("description")}
        errorMessage={descriptionError}
        type="default"
      />
      <Button label="Enregistrer" action={enregistrer} />
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

//make this component available to the app
export default EditProfil;
