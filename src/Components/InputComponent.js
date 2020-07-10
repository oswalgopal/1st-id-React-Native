import React from 'react';
import {TextInput} from 'react-native';
import {useTheme} from '@react-navigation/native';
const InputComponent = props => {
    const theme = useTheme() ;
    return (
        <TextInput
            style={{
                height: 40,
                width: '70%',
                borderColor: theme.colors.blue ,
                backgroundColor: theme.colors.white ,
                borderRadius: 5,
                marginTop: 10,
                paddingLeft: 10,
            }}
            placeholder={props.placeholder}
            placeholderTextColor={theme.colors.black}
            onChangeText={ev => props.onChangeTextFunction(ev)}
            secureTextEntry={props.secureTextEntry}
            value={props.field}
            editable={props.editable}
        />
    );
};

export default InputComponent;