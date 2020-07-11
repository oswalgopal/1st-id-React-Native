import React from 'react';
import {View} from 'react-native' ;
import { Button } from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
const ButtonComponent = props => {
    const theme = useTheme() ;
    console.log(theme)
    return (
        <View style={{
        
            width: '50%',
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            borderRadius: 100 ,
        }}>
            <Button
               onPress={props.onPress}
               title={props.title}
              titleStyle={{
                  color: theme.colors.black ,
              }}
              buttonStyle={{
                   backgroundColor : theme.colors.white ,
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