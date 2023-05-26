import { Button, TextInput, View } from "react-native";
import { useState, useEffect } from "react";

export default function ActionForm({
  action,
  screenBack,
  inputPlaceholder,
  buttonTitle,
  filter,
}) {
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
    <View>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={inputPlaceholder}
      />
      <Button
        title={buttonTitle}
        onPress={doAction}
        disabled={buttonDisabled}
      />
    </View>
  );
}
