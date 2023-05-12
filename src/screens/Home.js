import { View, Text, Button } from "react-native";

const Home = ({ navigation }) => {

  const goToProfile = () => {
    navigation.navigate("Profile")
  }

  return (
    <View>
      <Text>Home</Text>
      <Button title="Ir para Profile" onPress={goToProfile}/>
    </View>
  );
};

export default Home;
