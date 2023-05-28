import { Button, TextInput, View, Text } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native-web";

export default function ActionForm({
  action,
  screenBack,
  inputPlaceholder,
  buttonTitle,
  filter,
}) {
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });

  const [value, setValue] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  console.log(value);

  const doAction = () => {
    action(value);
    screenBack();
  };

  useEffect(() => {
    filter(value, setButtonDisabled);
  }, [value]);

  return (
    <View style={{ gap: 5 }}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={inputPlaceholder}
        style={{
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "#fff",
          color: "#fff",
          width: "100%",
          paddingHorizontal: 5,
          paddingVertical: 10,
          fontFamily: "Inter-Regular",
        }}
      />

      <TouchableOpacity
        onPress={doAction}
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
          {buttonTitle}
        </Text>
      </TouchableOpacity>

    </View>
  );
}
