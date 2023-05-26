import { Text, View } from "react-native";

export default function Transaction ({ object }) {
    return (
        <View>
            <Text>{object.type}</Text>
            <Text>{object.value}</Text>
            <Text>{object.date}</Text>
        </View>
    )
}