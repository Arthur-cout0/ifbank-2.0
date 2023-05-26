import { Text, View } from "react-native";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import ActionForm from "../components/ActionForm";
import validator from "validator";

export default function ProfileChange({ navigation }) {

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
    <View>
      <View>
        <Text>Alterar nome: </Text>
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
