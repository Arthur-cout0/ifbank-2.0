import { Button, TextInput, View } from 'react-native';
import { useState, useEffect } from 'react'

export default function OperationForm ({formAction}) {
    const [value, setValue] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const validate = (newValue) => {
        const asNumber = Number(newValue)
        setButtonDisabled(asNumber === NaN || asNumber < 1)
    } 

    const doOperation = () => {
        console.log(value);
        console.log('operacao')
    }

    return (
        <View>
            <TextInput
                value={value}
                onChangeText={(newValue) => {
                    setValue(newValue);
                    validate(newValue);
                }}
                placeholder='Digite o valor'
            />
            <Button title='Realizar Operação' onPress={doOperation} disabled={buttonDisabled}/>
        </View>
    )
}