import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import validator from "validator";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as SecureStore from "expo-secure-store";
import { createAccount } from "../services/accounts.service";
import { useFonts } from "expo-font";

const Register = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const firebaseAuth = getAuth();

  const doRegister = () => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        createAccount(user.uid);
        console.log(user);
        SecureStore.setItemAsync("user", JSON.stringify(user));
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Aplicativo", "Não foi possível fazer o Registro!", [
          { text: "OK", onPress: () => {} },
        ]);
      });
  };

  const goToLogin = () => {
    navigation.navigate("Login");
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
      <Text style={{ fontFamily: "Inter-Bold", color: "#fff" }}>
        Cadastre-se no IFBANK e faça parte!
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
          color: "#fff",
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
          color: "#fff",
          width: "100%",
          maxWidth: 280,
          paddingHorizontal: 5,
          paddingVertical: 10,
          fontFamily: "Inter-Regular",
        }}
      ></TextInput>

      <View
        style={{ width: "75%", gap: 10, display: "flex", alignItems: "center" }}
      >
        <TouchableOpacity
          onPress={doRegister}
          style={{
            width: "100%",
            backgroundColor: "#fff",
            flex: 1,
            alignItems: "center",
            paddingVertical: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ fontFamily: "Inter-Medium", color: "#20A84F" }}>
            Cadastrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToLogin} style={{display: "flex", alignItems: "center", gap: 5}}>
          <Text style={{fontFamily: 'Inter-Regular', color:"#fff" }}>Já tem uma conta?</Text>
          <Text style={{fontFamily: 'Inter-Bold', color:"#fff" }}>Faça login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
