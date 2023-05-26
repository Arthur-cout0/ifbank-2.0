import { View, Text, Button, Alert } from "react-native-web"
import { useAccount } from "../contexts/accountContext/useAccount";
import { accountDeposit, accountWithdraw } from "../services/accounts.service";
import OperationForm from "../util/operationform";

const Operation = ({ navigation }) => {

    const { settingAccount, account, setAccount } = useAccount()

    const goToHome = () => {
        navigation.navigate('Home')
    }

    const doDeposit = async (value) => {
        await accountDeposit(value).then(() => {
            const newBalance = account.balance + 10
            setAccount({ useId: account.userId, history: account.history, balance: newBalance })
            Alert.alert('Aplicativo!', 'Operação realizada com sucesso!', [
                { text: 'OK', onPress: () => console.log('OK Pressed..') },
            ]);
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
                Alert.alert('Aplicativo!', 'Operação realizada com sucesso!', [
                    { text: 'OK', onPress: () => console.log('OK Pressed..') },
                ]);
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
                <Text>Saque</Text>
                <OperationForm  />
            </View>
            <View>
                <Text>Depósito</Text>
                <OperationForm  />
            </View>
            <View><Text>Tranferência</Text></View>
        </View>
    )
}

export default Operation