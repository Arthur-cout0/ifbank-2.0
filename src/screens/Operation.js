import { View, Text, Button, Alert } from "react-native-web";
import { useAccount } from "../contexts/accountContext/useAccount";
import { accountDeposit, accountWithdraw } from "../services/accounts.service";
import ActionForm from "../components/ActionForm";
import { getToday } from "../util/getToday";

const Operation = ({ navigation }) => {
  const { settingAccount, account, setAccount } = useAccount();

  const goToHome = () => {
    navigation.navigate("Home");
  };

  const createTransaction = (type, value) => {
    return {
      type: type,
      value: value,
      date: getToday(),
    };
  };

  const doDeposit = async (value) => {
    console.log("deposito");
    await accountDeposit(value)
      .then(() => {
        const newBalance = account.balance + value;
        setAccount({
          useId: account.userId,
          history: [...account.history, createTransaction("deposit", value)],
          balance: newBalance,
        });
        Alert.alert("Aplicativo!", "Operação realizada com sucesso!", [
          { text: "OK", onPress: () => console.log("OK Pressed..") },
        ]);
        goToHome();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Aplicativo!", "Algo deu errado!", [
          { text: "OK", onPress: () => console.log("OK Pressed..") },
        ]);
      });
  };

  const doWithdraw = async (value) => {
    console.log("saque");
    if (account.balance < value) {
      Alert.alert("Aplicativo", "Saldo insuficiente", [
        { text: "OK", onPress: () => {} },
      ]);
    } else {
      await accountWithdraw(value)
        .then(() => {
          const newBalance = account.balance - value;
          setAccount({
            useId: account.userId,
            history: [...account.history, createTransaction("withdraw", value)],
            balance: newBalance,
          });
          Alert.alert("Aplicativo!", "Operação realizada com sucesso!", [
            { text: "OK", onPress: () => console.log("OK Pressed..") },
          ]);
          goToHome();
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Aplicativo!", "Algo deu errado!", [
            { text: "OK", onPress: () => console.log("OK Pressed..") },
          ]);
        });
    }
  };

  return (
    <View>
      <Text>Operation</Text>
      <View>
        <Text>Saque</Text>
        <ActionForm
          action={(value) => {
            console.log("action");
            doWithdraw(Number(value));
          }}
          screenBack={goToHome}
          inputPlaceholder="Digite o valor"
          buttonTitle="Realizar operação"
          filter={(value, setButtonDisabled) => {
            const asNumber = Number(value);
            if (isNaN(asNumber) || value == "" || asNumber < 1) {
              setButtonDisabled(true);
            } else {
              setButtonDisabled(false);
            }
          }}
        />
      </View>
      <View>
        <Text>Depósito</Text>
        <ActionForm
          action={(value) => {
            doDeposit(Number(value));
          }}
          screenBack={goToHome}
          inputPlaceholder="Digite o valor"
          buttonTitle="Realizar operação"
          filter={(value, setButtonDisabled) => {
            const asNumber = Number(value);
            if (isNaN(asNumber) || value == "" || asNumber < 1) {
              setButtonDisabled(true);
            } else {
              setButtonDisabled(false);
            }
          }}
        />
      </View>
    </View>
  );
};

export default Operation;
