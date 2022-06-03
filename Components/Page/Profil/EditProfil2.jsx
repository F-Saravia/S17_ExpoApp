import { useContext, useState } from "react";
import { ScrollView, View } from "react-native";

import Button from "../../UI/Buttons/ButtonBootstrap/ButtonBootstrap";
import InputWithError from "../../UI/Texts/InputWithError/InputWithError";

import { UserContext } from "../../../Contexts/UserContext";

const EditProfil = () => {
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;

  //1-creation variable d'état
  const [inputs, setInputs] = useState({
    holder: "veuillez saisir un nouveau username",
    username: {
      value: user.username,
      error: "",
      validation: function () {
        return (
          !isUndefinedOrBlank(this.value) &&
          this.value.length > 2 &&
          this.value.length < 13
        );
      },
      handleError: function () {
        return this.validation()
          ? ""
          : `${
              username.value.length < 3
                ? "Username trop court. Minimum 3 caractères"
                : "Username trop long. Maximum 12 caractères"
            }`;
      },
    },
    email: {
      holder: "veuillez saisir un nouveau e-mail",
      value: user.email,
      error: "",
      validation: function () {
        return (
          !isUndefinedOrBlank(this.value) &&
          this.value.includes("@") &&
          this.value.includes(".")
        );
      },
      handleError: function () {
        return this.validation() ? "" : "e-Mail invalide!";
      },
    },
    description: {
      holder: "Veuillez saisir une description",
      value: user.description ? user.description : "",
      error: "",
      validation: function () {
        return true;
      },
      handleError: function () {
        return this.validation() ? "" : "Description trop longue!";
      },
    },
  });

  //2-création des fonctions qui changent les variables
  const handleFieldForm_V1 = (field, text) => {
    setInputs({
      ...inputs,
      [field]: {
        value: text,
        error: "",
      },
    });
  };

  const handleFieldForm_V2 = (field) => (text) => {
    setInputs({
      ...inputs,
      [field]: {
        value: text,
        error: "",
      },
    });
  };

  //3-fonction pour valider le formulaire
  const enregistrer = () => {
    const { email, username, description } = inputs;
    const testUsername = username.validation;
    const testEmail = email.validation;
    const testDescription = description.validation;

    if (testUsername && testEmail && testDescription) {
      setInputs({
        ...user,
        email: email.value,
        username: username.value,
        description: description.value,
      });
    } else {
      setInputs({
        email: {
          ...email,
          error: email.handleError,
        },
        username: {
          ...username,
          error: username.handleError,
        },
        description: {
          ...description,
          error: description.handleError,
        },
      });
    }
  };

  //4-mettre en place les composants en place et les lier avec les variables et les fonctions
  return (
    <ScrollView>
      <InputWithError
        holder={inputs.email.holder}
        value={inputs.email.value}
        action={(value) => handleFieldForm_V1("email", value)}
        errorMessage={inputs.email.error}
        type="email-address"
      />
      <InputWithError
        holder={inputs.username.holder}
        value={inputs.username.value}
        action={(unNomNimporteLequel) =>
          handleFieldForm_V1("username", unNomNimporteLequel)
        }
        errorMessage={inputs.username.error}
        type="default"
      />
      <InputWithError
        holder={
          inputs.description.value
            ? inputs.description.value
            : inputs.description.holder
        }
        value={inputs.description.value}
        action={handleFieldForm_V2("description")}
        errorMessage={inputs.description.error}
        type="default"
      />
      <Button label="Enregistrer" action={enregistrer} />
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

export default EditProfil;
