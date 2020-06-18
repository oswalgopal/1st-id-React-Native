import React from 'react';
import {View} from 'react-native' ;
import { Button } from 'react-native-elements';
const ButtonComponent = props => {
    return (
        <View style={{
        
            width: '50%',
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            borderRadius: 100
        }}>
            <Button
               onPress={props.onPress}
               title={props.title}
              titleStyle={{
                  color: '#000000' ,
              }}
              buttonStyle={{
                  backgroundColor : '#fff',
                  borderRadius: 50 
              }}
            />
            
            {/* <Button
               
                color={'#fff'}
                style={{
                    borderWidth: 2
                }}
            /> */}
        </View>
    );
};

export default ButtonComponent;