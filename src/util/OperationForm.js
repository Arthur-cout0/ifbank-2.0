import { Button, TextInput, View } from 'react-native';
import { useState, useEffect } from 'react'

export default function OperationForm ({action}) {

    const [value, setValue] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const doOperation = () => {
        action(value)
        setValue('')
    }

    useEffect(() => {
        if (typeof Number(value) === 'number') setButtonDisabled(false)
    }, [])

    return (
        <View>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder='Digite o valor'
                keyboardType='numeric'
                inputMode='decimal'
            />
            <Button title='Realizar Operação' onPress={doOperation()} disabled={buttonDisabled}/>
        </View>
    )
}