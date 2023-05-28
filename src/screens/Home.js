import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { getAccount } from "../services/accounts.service";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAccount } from "../contexts/accountContext/useAccount";
import { useFonts } from "expo-font";

const Home = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });

  const firebaseAuth = getAuth();

  const { account, settingAccount } = useAccount();

  // const [carregando, setCarregando] = useState(true);

  const goToProfile = () => {
    navigation.navigate("Profile");
  };

  const goToOperation = () => {
    navigation.navigate("Operation");
  };

  const goToHistory = () => {
    console.log(typeof account.history);
    navigation.navigate("History", { history: account.history });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#20A84F",
        paddingHorizontal: 10,
        paddingVertical: 20,
        gap: 20,
      }}
    >
      <Text style={{alignSelf: 'flex-end', fontFamily:'Inter-Regular', color: '#fff', marginBottom: 10}}>IFBANK / HOME</Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 24, fontFamily: "Inter-Bold" }}>
          Saldo:
        </Text>
        <Text
          style={{ color: "#fff", fontSize: 24, fontFamily: "Inter-Regular" }}
        >
          R$ {Number(account.balance).toFixed(2)}
        </Text>
      </View>

      <View style={{ width: "100%", display: "flex", gap: 20 }}>
        <TouchableOpacity
          onPress={goToOperation}
          style={{
            backgroundColor: "#fff",
            width: "100%",
            borderRadius: 5,
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{ color: "#20A84F", fontSize: 16, fontFamily: "Inter-Bold" }}
          >
            Fazer Depósito e/ou Saque
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goToHistory}
          style={{
            backgroundColor: "#fff",
            width: "100%",
            borderRadius: 5,
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{ color: "#20A84F", fontSize: 16, fontFamily: "Inter-Bold" }}
          >
            Ver Histórico
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goToProfile}
          style={{
            backgroundColor: "#fff",
            width: "100%",
            borderRadius: 5,
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{ color: "#20A84F", fontSize: 16, fontFamily: "Inter-Bold" }}
          >
            Ver Perfil
          </Text>
        </TouchableOpacity>

        {/* <Button title="Ir para Operation"  />
        <Button title="Ir para History" onPress={goToHistory} />
        <Button title="Ir para Profile" onPress={goToProfile} /> */}
      </View>
    </View>
  );
};

export default Home;
