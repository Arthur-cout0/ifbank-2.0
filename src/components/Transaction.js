import { Text, View } from "react-native";
import { useFonts } from "expo-font";

export default function Transaction ({ transaction }) {
    const [fontsLoaded] = useFonts({
        "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
        "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
        "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
      });


    return (
        <View style={{display: 'flex', borderTopWidth: 2, paddingTop: 10, borderColor: '#fff', gap: 10}}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontFamily: 'Inter-Bold', color: '#fff', fontSize: 14}}>Transação: </Text>
                <Text style={{fontFamily: 'Inter-Regular', color: '#fff', fontSize: 14}}>{transaction.type}</Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontFamily: 'Inter-Bold', color: '#fff', fontSize: 14}}>Valor: </Text>
                <Text style={{fontFamily: 'Inter-Regular', color: '#fff', fontSize: 14}}>{transaction.value}</Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontFamily: 'Inter-Bold', color: '#fff', fontSize: 14}}>Data: </Text>
                <Text style={{fontFamily: 'Inter-Regular', color: '#fff', fontSize: 14}}>{String(transaction.date).replace(','," ")}</Text>
            </View>
        </View>
    )
}