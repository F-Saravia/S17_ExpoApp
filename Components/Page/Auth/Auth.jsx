import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import Login from "../../Page/Login/Login";
import Signup from "../../Page/Signup/Signup";
import Card from "../../HOC/Card/Card";
import ButtonLink from "../../UI/Buttons/ButtonLink/ButtonLink";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);

  const toggleIsLogin = () => setIsLogin(!isLogin);

  return (
    <ScrollView>
      {/* <Text> Auth page</Text> */}
      <Card
        title="Bienvenue"
        content={`Veuillez vous ${isLogin ? "connecter" : "inscrire"}.`}
      >
        {isLogin ? <Login /> : <Signup />}

        <ButtonLink action={toggleIsLogin}>
          {isLogin
            ? "Pas encore membre? Inscrivez-vous!"
            : "Deja membre? Connectez-vous!"}
        </ButtonLink>
      </Card>
    </ScrollView>
  );
}
