import Transaction from "../components/Transaction";
import { Button, Text, View } from "react-native";

export default function History({ route, navigation }) {
  const { history } = route.params;

  console.log(history)

  const goToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View>
      <View>
        <Text>Transactions</Text>
        <View>
          {history.map((transaction, index) => (
            <Transaction transaction={transaction} key={index} />
          ))}
        </View>
      </View>
      <Button title="Go to Home" onPress={goToHome} />
    </View>
  );
}
