import { StyleSheet, Text, View } from "react-native";


  export default function SayHello(props) {
    console.log(props);
    return (
        <Text
            style={[{ color: props.isFormat ? "red" : "green" }, styles.text]}
        >{`Hello ${props.nom} ${props.prenom}, vous avez ${props.age} ans!`}</Text>
    );
}
  
//HOC: High Order Component
export function SayHi(props) { 
    console.log(props);
    return <View>{props.children}</View>
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: "bold"
    }
});