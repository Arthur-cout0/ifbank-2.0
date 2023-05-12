import { View, Text, Button } from "react-native";

import { getAuth, signOut } from "firebase/auth";

const Profile = ({ navigation }) => {
  const firebaseAuth = getAuth()

  const doSignOut = () => {
    signOut(firebaseAuth)
    .then(() => {
      console.log('User signed out')
    }).catch((error) => {
      console.log(error)
      console.log(error.message)
    });
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