import { View, Text, Button, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { getAuth } from "firebase/auth";
import { useState } from "react";

const Profile = ({ route, navigation }) => {
  
  const { routeUser } = route.params ? route.params : {routeUser: null}

  const auth = getAuth();

  const [user] = useState(routeUser ? routeUser : auth.currentUser);

  const doSignOut = async () => {
    await SecureStore.deleteItemAsync("user");
    await auth.signOut();
  };

  const goToHome = () => {
    navigation.navigate("Home");
  };

  const goToProfileChange = () => {
    navigation.navigate("ProfileChange");
  };

  return (
    <View>
      <Text>Profile</Text>
      <Text>Nome: {user.displayName}</Text>
      <Text>Email: {user.email}</Text>
      <Button title="Alterar Perfil" onPress={goToProfileChange} />
      <Button title="Ir para Home" onPress={goToHome} />
      <Button title="Finalizar sessão" onPress={doSignOut} />
    </View>
  );
};

export default Profile;
