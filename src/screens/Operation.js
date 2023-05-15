import { View, Text, Button, Alert } from "react-native-web"
import { useAccount } from "../contexts/accountContext/useAccount";
import { accountDeposit, accountWithdraw } from "../services/accounts.service";

const Operation = ({ navigation }) => {

    const { settingAccount, account, setAccount } = useAccount()

    const goToHome = () => {
        navigation.navigate('Home')
    }

    const doDeposit = async (value) => {
        await accountDeposit(value).then(() => {
            const newBalance = account.balance + 10
            setAccount({ useId: account.userId, history: account.history, balance: newBalance })
            goToHome()
        }).catch((error) => {
            console.log(error)
            Alert.alert('Aplicativo!', 'Algo deu errado!', [
                { text: 'OK', onPress: () => console.log('OK Pressed..') },
            ]);
        })
    }

    const doWithdraw = async (value) => {
        if (account.balance < value) {
            Alert.alert('Aplicativo', 'Saldo insuficiente', [
                { text: 'OK', onPress: () => { } },
            ])
        } else {
            await accountWithdraw(value).then(() => {
                const newBalance = account.balance - 10
                setAccount({ useId: account.userId, history: account.history, balance: newBalance })
                goToHome()
            }).catch((error) => {
                console.log(error)
                Alert.alert('Aplicativo!', 'Algo deu errado!', [
                    { text: 'OK', onPress: () => console.log('OK Pressed..') },
                ]);
            })
        }
    }

    return (
        <View>
            <Text>Operation</Text>
            <View>
                <Text>Depósito</Text>
                <Button title="Depositar R$10" onPress={() => doDeposit(10)} />
            </View>
            <View>
                <Text>Saque</Text>
                <Button title="Sacar R$10" onPress={() => doWithdraw(10)} />
            </View>
        </View>
    )
}

export default Operation