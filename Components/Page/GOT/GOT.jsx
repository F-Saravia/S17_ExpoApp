import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { STYLES_VARIABLES } from "../../../Variables/stylesVariables";

const GOT_GET_URL = "https://thronesapi.com/api/v2/Characters";

// create a component
const GOT = () => {
  const [listPersos, setListPersos] = useState([]);

  useEffect(() => {
    axios
      .get(GOT_GET_URL)
      .then((response) => {
        console.log(response);
        setListPersos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const sizes = useWindowDimensions();
  return (
    <ScrollView style={styles.container}>
      {listPersos.map((perso, index) => {
        return (
          <View key={index} style={styles.persoContainer}>
            <Text style={styles.fullName}>{perso.fullName}</Text>
            <Image source={{ uri: perso.imageUrl }} />
            <Text style={styles.title}>{perso.title}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  persoContainer: {
    margin: 20,
    backgroundColor: STYLES_VARIABLES.GRAY_COLOR,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: STYLES_VARIABLES.PRIMARY_COLOR,
    padding: 20,
  },
  persoImage: {
    maxWidth: "100%",
  },
  title: {
    fontSize: 30,
    color: STYLES_VARIABLES.PRIMARY_COLOR,
    textAlign: "center",
    margin: 10,
  },
  fullName: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

export default GOT;
