import React from 'react';
import {Text} from 'react-native'
const TextComponent = props => {
    return (
        <Text style={{
            fontSize: props.fontSize,
            color: props.color,
            padding: props.padding ,
            textAlign: 'center',
            fontWeight : props.fontWeight
        }}>
            {props.text} 
        </Text>
    );
};

export default TextComponent;