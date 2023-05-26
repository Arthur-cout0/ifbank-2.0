import { View, Text, Button, Alert, ActivityIndicator } from "react-native";
import { getAccount } from "../services/accounts.service";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAccount } from "../contexts/accountContext/useAccount";

const Home = ({ navigation }) => {

  console.log('renderizou')

  const firebaseAuth = getAuth();

  const {account, settingAccount} = useAccount()

  // const [carregando, setCarregando] = useState(true);

  const goToProfile = () => {
    navigation.navigate("Profile")
  }

  const goToOperation = () => {
    navigation.navigate("Operation")
  }

  const goToHistory = () => {
    navigation.navigate("History", {transactions: account.history})
  }

  return (
    <View>
      <Text>Home</Text>
      <View><Text>Saldo:</Text><Text>{account.balance}</Text></View>
      <Button title="Ir para Operation" onPress={goToOperation}/>
      <Button title="Ir para History" onPress={goToHistory}/>
      <Button title="Ir para Profile" onPress={goToProfile}/>
    </View>
  );
};

export default Home;
