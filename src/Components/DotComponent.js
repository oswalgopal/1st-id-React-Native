import React from 'react';
import {View, Dimensions} from 'react-native';
const DotComponent = () => {
    return (
        <View style={{
            width: 30,
            height: 30,
            backgroundColor: 'white',
            position: 'absolute',
            top: 80,
            left: Dimensions.get('window').width / 2 - 15,
            borderRadius: 1000,
            zIndex: 1
        }}>
        </View>
    );
};

export default DotComponent;
