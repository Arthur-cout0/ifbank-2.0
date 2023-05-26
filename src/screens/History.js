import Transaction from "../components/Transaction";
import { Button, Text, View } from "react-native";

export default function History({route, navigation }) {

    const { history } = route.params

    const toArray = (object) => {
        const values = Object.values(object)
        return values
    }

    const transactions = toArray(history)

    console.log(transactions)

    const goToHome = () => {
        navigation.navigate("Home")
    }

    return (
        <View>
            <View>
                <Text>
                    Transactions
                </Text>
                {
                    transactions.map((transaction, index) => <Transaction object={transaction} key={index} />)
                }
            </View>
            <Button title='Go to Home' onPress={goToHome}/>
        </View>

    )
}