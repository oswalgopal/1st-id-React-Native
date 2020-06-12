import React from 'react';
import {Text} from 'react-native'
const TextComponent = props => {
    return (
        <Text style={{
            fontSize: props.fontSize,
            color: props.color,
            padding: props.padding
        }}>
            {props.text}
        </Text>
    );
};

export default TextComponent;