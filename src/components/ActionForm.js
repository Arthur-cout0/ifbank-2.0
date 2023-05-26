import { Button, TextInput, View } from 'react-native';
import { useState, useEffect } from 'react'

export default function ActionForm ({doAction, goToHome}) {
    const [value, setValue] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(true)

    console.log(value)

    const doOperation = () => {
        console.log('operation')
        doAction(Number(value))
        goToHome()
    }

    useEffect(() => {
        const asNumber = Number(value)
        if (isNaN(asNumber) || value == '' || asNumber < 1){
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }, [value])

    return (
        <View>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder='Digite o valor'
                keyboardType='number-pad'
            />
            <Button title='Realizar Operação' onPress={doOperation} disabled={buttonDisabled}/>
        </View>
    );
}