import { View, Text, Button } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { getAuth } from "firebase/auth";

const Profile = ({ navigation }) => {
  const firebaseAuth = getAuth()

  const doSignOut = async () => {
    await SecureStore.deleteItemAsync("user");
    await firebaseAuth.signOut();
  }

  const goToHome = () => {
    navigation.navigate("Home")
  }

  return (
    <View>
      <Text>Profile</Text>
      <Button title="Ir para Home" onPress={goToHome}/>
      <Button title="Finalizar sessão" onPress={doSignOut}/>
    </View>
    
  );
};

export default Profile;