import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Counter() {
  //demo without useState that kind of works but NOT really
  //because the variable it's only updated on the reload of the render and not simultaniously
  function myState(intialValue) {
    let value = intialValue;
    function setValue(newValue) {
      value = newValue;
    }
    return [value, setValue];
  }

  const val = myState(0);
  const val2 = myState(0);

  //soutions with useState: 1-without currying | 2- with currying
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);
  //solution 1, no currying: two separate fonctions
  function add() {
    setCounter(counter + 1);
  }
  function substract() {
    setCounter(counter - 1);
  }
  //solution 2, currying: one function that takes a calcul as param
  const onPressCalcul = (monCalcul) => () => setCounter(monCalcul);

  return (
    <View>
      <Text>{counter}</Text>
      <Button title="-1" color="red" onPress={onPressCalcul(counter - 1)} />
      <Button title="+1" color="blue" onPress={onPressCalcul(counter + 1)} />
    </View>
  );
}
