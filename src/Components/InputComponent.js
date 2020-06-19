import React from 'react';
import {TextInput} from 'react-native';
const InputComponent = props => {
    return (
        <TextInput
            style={{
                height: 40,
                width: '70%',
                borderColor: 'gray',
                backgroundColor: '#fff',
                borderRadius: 5,
                marginTop: 10,
                paddingLeft: 10,
            }}
            placeholder={props.placeholder}
            placeholderTextColor={'#000000'}
            onChangeText={ev => props.onChangeTextFunction(ev)}
            secureTextEntry={props.secureTextEntry}
            value={props.field}
            editable={props.editable}
        />
    );
};

export default InputComponent;