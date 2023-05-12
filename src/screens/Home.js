import { View, Text, Button, Alert, ActivityIndicator } from "react-native";
import { getAccount, updateAccount } from "../services/accounts.service";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

const Home = ({ navigation }) => {

  const firebaseAuth = getAuth();
  const user = firebaseAuth.currentUser;

  const [account, setAccount] = useState()
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    loadAccount()
  }, [])

  const loadAccount = async () => {
    const accountData = await getAccount()
    setAccount(accountData)
    setCarregando(false)
  }

  const accountDeposit = (value) => {
    updateAccount(user.uid, account.ballance + value, account.history)
    loadAccount()
    Alert.alert('Aplicativo!', 'Depósito realizado com sucesso!', [
      {text: 'OK', onPress: () => console.log('OK Pressed..')},
    ]);
  }

  const accountWithdraw = (value) => {
    updateAccount(user.uid, account.ballance - value, account.history)
    loadAccount()
    Alert.alert('Aplicativo!', 'Saque realizado com sucesso!', [
      {text: 'OK', onPress: () => console.log('OK Pressed..')},
    ]);
  }

  const goToProfile = () => {
    navigation.navigate("Profile")
  }

  if (carregando) {
    return (
      <ActivityIndicator></ActivityIndicator>
    );
  }

  return (
    <View>
      <Text>Home</Text>
      <View><Text>Saldo:</Text><Text>{account.balance}</Text></View>
      <Button title="Depositar R$10" onPress={accountDeposit(10)}/>
      <Button title="Sacar R$10" onPress={accountWithdraw(10)}/>
      <Button title="Ir para Profile" onPress={goToProfile}/>
    </View>
  );
};

export default Home;
