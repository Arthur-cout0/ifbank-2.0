import { Text, View } from "react-native";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import ActionForm from "../components/ActionForm";
import validator from "validator";
import { useFonts } from "expo-font";

export default function ProfileChange({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });

  const auth = getAuth()

  const updateDisplayName = async (name) => {
    await updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then((user) => {
        goToProfile(user)
        Alert.alert("Aplicativo!", "Nome atualizado!", [
          { text: "OK", onPress: () => console.log("OK Pressed..") },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const goToProfile = (user) => {
    navigation.navigate("Profile", {routeUser: user});
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
        IFBANK / EDITAR PERFIL
      </Text>

      <View>
        <Text style={{
          fontFamily: "Inter-Bold",
          color: "#fff",
          fontSize: 24
        }}>Alterar nome: </Text>
        <ActionForm
          action={updateDisplayName}
          screenBack={() => {}}
          inputPlaceholder="Digite o novo nome"
          buttonTitle="Enviar"
          filter={(value, setButtonDisabled) => {
            if (!validator.isLength(value, {max: 60, min: 1})){
                setButtonDisabled(true)
            } else {
                setButtonDisabled(false)
            }
          }}
        />
      </View>
    </View>
  );
}
