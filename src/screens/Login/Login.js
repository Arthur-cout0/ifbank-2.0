import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import validator from "validator";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as SecureStore from 'expo-secure-store';

const Login = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const firebaseAuth = getAuth();

  const doLogin = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        SecureStore.setItemAsync("user", JSON.stringify(user));
      })
      .catch((error) => {
        console.error(error);
        console.log('Não foi possível fazer o login!')
        Alert.alert('Aplicativo', 'Não foi possível fazer o login!', [
          { text: 'OK', onPress: () => { } },
        ]);
      })
  }

  const goToRegister = () => {
    navigation.navigate("Register")
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
      <Text>Login</Text>
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
      <Button title="Entrar" onPress={doLogin} disabled={buttonDisabled}></Button>
      <TouchableOpacity onPress={goToRegister}><Text>Não tenho uma conta</Text></TouchableOpacity>
    </View>
  );
}

export default Login;