import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import validator from "validator";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as SecureStore from 'expo-secure-store';
import { createAccount } from '../../services/accounts.service'

const Register = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const firebaseAuth = getAuth();

  const doRegister = () => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        createAccount(user.uid)
        console.log(user);
        SecureStore.setItemAsync("user", JSON.stringify(user));
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Aplicativo', 'Não foi possível fazer o Registro!', [
          { text: 'OK', onPress: () => { } },
        ]);
      })
  }

  const goToLogin = () => {
    navigation.navigate("Login")
  }

  useEffect(() => {
    if (validator.isEmail(email) && validator.isLength(password, 8)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Registro</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
      ></TextInput>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Digite sua senha"
      ></TextInput>
      <Button title="Entrar" onPress={doRegister} disabled={buttonDisabled}></Button>
      <TouchableOpacity onPress={goToLogin}><Text>Já tenho uma conta</Text></TouchableOpacity>
    </View>
  );
} 

export default Register;