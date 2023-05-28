import Transaction from "../components/Transaction";
import { Button, Text, View, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";

export default function History({ route, navigation }) {
  const { history } = route.params;

  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });

  console.log(history)

  const goToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: "#20A84F",
      paddingHorizontal: 10,
      paddingVertical: 20,
      gap: 20,
    }}>
      <Text
        style={{
          alignSelf: "flex-end",
          fontFamily: "Inter-Regular",
          color: "#fff",
          marginBottom: 10,
        }}
      >
        IFBANK / HISTORIC
      </Text>
      <View>
        <Text style={{
          fontFamily: "Inter-Bold",
          color: "#fff",
          marginBottom: 10,
          fontSize: 24
        }}>Transactions</Text>
        <View style={{gap: 15}}>
          {history.map((transaction, index) => (
            <Transaction transaction={transaction} key={index} />
          ))}
        </View>
      </View>

      <TouchableOpacity
        onPress={goToHome}
        style={{
          width: "100%",
          backgroundColor: "#fff",
          alignItems: "center",
          paddingVertical: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ fontFamily: "Inter-Medium", color: "#20A84F" }}>
          Voltar para Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}
