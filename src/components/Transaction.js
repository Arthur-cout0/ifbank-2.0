import { Text, View } from "react-native";

export default function Transaction ({ transaction }) {
    console.log(transaction, '1')
    return (
        <View>
            <Text>{transaction.type}</Text>
            <Text>{transaction.value}</Text>
            <Text>{transaction.date}</Text>
        </View>
    )
}