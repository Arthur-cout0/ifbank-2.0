import { View, Text, Button, Alert, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useFonts } from "expo-font";

const Profile = ({ route, navigation }) => {
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });

  const { routeUser } = route.params ? route.params : { routeUser: null };

  const auth = getAuth();

  const [user] = useState(routeUser ? routeUser : auth.currentUser);

  const doSignOut = async () => {
    // await SecureStore.deleteItemAsync("user");
    await auth.signOut();
  };

  const goToHome = () => {
    navigation.navigate("Home");
  };

  const goToProfileChange = () => {
    navigation.navigate("ProfileChange");
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
      <Text
        style={{
          alignSelf: "flex-end",
          fontFamily: "Inter-Regular",
          color: "#fff",
          marginBottom: 10,
        }}
      >
        IFBANK / PERFIL
      </Text>
      {user.displayName && <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
        <Text style={{ fontFamily: "Inter-Bold", color: "#fff", fontSize: 18 }}>
          Nome:  
        </Text>
        <Text
          style={{ fontFamily: "Inter-Regular", color: "#fff", fontSize: 18 }}
        >
          {user.displayName}
        </Text>
      </View>}

      <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
        <Text style={{ fontFamily: "Inter-Bold", color: "#fff", fontSize: 18 }}>
          Email:  
        </Text>
        <Text
          style={{ fontFamily: "Inter-Regular", color: "#fff", fontSize: 18 }}
        >
          {user.email}
        </Text>
      </View>

      <View style={{ width: "100%", display: "flex", gap: 20 }}>
        <TouchableOpacity
          onPress={goToProfileChange}
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
            Alterar Perfil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goToHome}
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
            Voltar para Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={doSignOut}
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
            Finalizar Sessão
          </Text>
        </TouchableOpacity>

        {/* <Button title="Ir para Operation"  />
        <Button title="Ir para History" onPress={goToHistory} />
        <Button title="Ir para Profile" onPress={goToProfile} /> */}
      </View>
    </View>
  );
};

export default Profile;
