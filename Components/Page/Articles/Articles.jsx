//import liraries
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import axios from "axios";
import { Link } from "@react-navigation/native";

// create a component
const News = () => {
  const [resultats, setResultats] = useState([]);
  const [searchWords, setSearchWords] = useState("");
  const [language, setLanguage] = useState("fr");
  //ar | de | en | es | fr | he | it | nl | no | pt | ru | sv | ud | zh

  const topHeadlines_url = `https://newsapi.org/v2/top-headlines?country=${language}&apiKey=9171c5df7c4d429e9f41ca2e90753585`;
  const search_url = `https://newsapi.org/v2/everything?q=${searchWords}&language=${language}&apiKey=9171c5df7c4d429e9f41ca2e90753585`;

  useEffect(() => {
    axios
      .get(topHeadlines_url)
      .then((response) => {
        setResultats(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function validationSearchWords(input) {
    if (input.length == 0 || input.trim() === "") return "";
    else if (input.includes(" ")) return input.replace(/ /g, "-");
    else return input;
  }

  const searchQuery = () => (inputWords) => {
    const validation = validationSearchWords(inputWords);
    if (validation === "") {
    } else {
      setSearchWords(validation);
      axios
        .get(search_url)
        .then((response) => {
          console.log(response);
          setResultats(response.data.articles);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <ScrollView style={styles.resultsGlobalContainer}>
      <TextInput style={styles.searchBar}></TextInput>
      {resultats.map((article, index) => {
        return (
          /*
          publishedAt?
          title
          description
          urlToImage =>lien(url)
          content => lien(url)
          source.name?
          author?
           */
          <View key={index} style={styles.resultatIndividualContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.publishedAt}>
                {article.publishedAt ? article.publishedAt : ""}
              </Text>
              <Text style={styles.title}>{article.title}</Text>
              <Text style={styles.description}>{article.description}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Link source={article.url}>
                <Image style={styles.image} source={article.urlToImage} />
                <Text style={styles.content}>{article.content}</Text>
              </Link>
            </View>
            <View style={styles.footerContainer}>
              <Text style={styles.sourceName}>
                {article.source.name ? article.source.name : ""}
              </Text>
              <Text style={styles.author}>
                {article.author ? article.author : ""}
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resultsGlobalContainer: {
    margin: 10,
    padding: 2,
  },
  searchBar: {
    margin: 10,
    padding: 2,
  },
  resultatIndividualContainer: {
    padding: 2,
  },

  headerContainer: {},
  contentContainer: {},
  footerContainer: {},

  publishedAt: {},
  title: {},
  description: {},
  image: {},
  content: {},
  sourceName: {},
  author: {},
});

//make this component available to the app
export default News;

/*
{
-"source": {
  "id": null,
  "name": "Destructoid"
  },
  "author": null,
  "title": "Final Fantasy XVI trailer reveals massive battles and summer 2023 window - Destructoid",
  "description": "Square Enix showed off some new gameplay of Final Fantasy XVI, and confirmed the next installment is aiming for the summer of 2023.",
  "url": "https://www.destructoid.com/final-fantasy-xvi-state-of-play-trailer-eikon-battles-playstation-5-summer-2023/",
  "urlToImage": "https://d23gn3985hkc32.cloudfront.net/wp-content/uploads/2022/06/FinalFantasyXVI_StateOfPlay_060222.jpg",
  "publishedAt": "2022-06-03T11:45:47Z",
  "content": "Eikon-on-eikon fights are in store for next summer\r\nFinal Fantasy XVI re-emerged today to show off some new gameplay, and set a release window. Square Enix showed off a new trailer for the RPG and co… [+1843 chars]"
},
 */
