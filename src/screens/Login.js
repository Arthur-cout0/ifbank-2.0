import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";
import validator from "validator";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as SecureStore from "expo-secure-store";
import { useFonts } from "expo-font";

import Logo from "../assets/logo.svg"

const Login = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });

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
        console.log("Não foi possível fazer o login!");
        Alert.alert("Aplicativo", "Não foi possível fazer o login!", [
          { text: "OK", onPress: () => {} },
        ]);
      });
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  useEffect(() => {
    if (validator.isEmail(email) && validator.isLength(password, 8)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#20A84F",
        gap: 30,
      }}
    >
      <Text style={{ fontFamily: "Inter-Bold", color: '#fff' }}>
        Logue na sua conta do IFBANK
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        showSoftInputOnFocus={false}
        style={{
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "#fff",
          color: '#fff',
          width: "90%",
          maxWidth: 280,
          paddingHorizontal: 5,
          paddingVertical: 10,
          fontFamily: "Inter-Regular",
        }}
      ></TextInput>

      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Senha"
        style={{
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "#fff",
          color: '#fff',
          width: "100%",
          maxWidth: 280,
          paddingHorizontal: 5,
          paddingVertical: 10,
          fontFamily: "Inter-Regular",
        }}
      ></TextInput>

      <View style={{ width: "75%",gap: 10, display: 'flex', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={doLogin}
          style={{ width: "100%",backgroundColor: "#fff", flex: 1, alignItems: "center", paddingVertical: 10, borderRadius: 5, }}
        >
          <Text style={{fontFamily: 'Inter-Medium', color:"#20A84F" }}>Entrar</Text>
        </TouchableOpacity>
 
        <TouchableOpacity onPress={goToRegister} style={{display: "flex", alignItems: "center", gap: 5}}>
          <Text style={{fontFamily: 'Inter-Regular', color:"#fff" }}>Não tem uma conta?</Text>
          <Text style={{fontFamily: 'Inter-Bold', color:"#fff" }}>Registre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
