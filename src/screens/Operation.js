import { View, Text, Button, Alert } from "react-native-web"
import { useAccount } from "../contexts/accountContext/useAccount";
import { accountDeposit, accountWithdraw } from "../services/accounts.service";
import ActionForm from "../components/ActionForm";

const Operation = ({ navigation }) => {

    const { settingAccount, account, setAccount } = useAccount()

    const goToHome = () => {
        navigation.navigate('Home')
    }

    const doDeposit = async (value) => {
        console.log('deposito')
        await accountDeposit(value).then(() => {
            const newBalance = account.balance + value
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
        console.log('saque')
        if (account.balance < value) {
            Alert.alert('Aplicativo', 'Saldo insuficiente', [
                { text: 'OK', onPress: () => { } },
            ])
        } else {
            await accountWithdraw(value).then(() => {
                const newBalance = account.balance - value
                setAccount({ useId: account.userId, history: account.history, balance: newBalance })
                Alert.alert('Aplicativo!', 'Operação realizada com sucesso!', [
                    { text: 'OK', onPress: () => console.log('OK Pressed..') },
                ]);
                goToHome()
            }).catch((error) => {
                console.log(error)
                Alert.alert('Aplicativo!', 'Algo deu errado!', [
                    { text: 'OK', onPress: () => console.log('OK Pressed..') },
                ])
            })
        }
    }

    return (
        <View>
            <Text>Operation</Text>
            <View>
                <Text>Saque</Text>
                <ActionForm doAction={(value) => {console.log('action'); doWithdraw(value)}} goToHome={goToHome}/>
            </View>
            <View>
                <Text>Depósito</Text>
                <ActionForm doAction={(value) => {console.log('action'); doDeposit(value)}} goToHome={goToHome}/>
            </View>
        </View>
    )
}

export default Operation