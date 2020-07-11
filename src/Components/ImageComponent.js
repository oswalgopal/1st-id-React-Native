import React,{useEffect,useState} from 'react';
import {View, Dimensions,Image,Keyboard} from 'react-native';
import {useTheme} from '@react-navigation/native';
const ImageComponent = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const theme = useTheme() ;
 useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

    return (
         <Image
                style={{
                    position: "absolute",
                    top: isKeyboardVisible ? -50 : 50 ,
                }}
                source={
                    Dimensions.get('screen').height > 800 ?
                        (theme.dark ? require('../images/dark-ellipse.png') : require('../images/background-ellipse.png')) :
                        (theme.dark ? require('../images/dark-ellipse5.png') : require('../images/background-ellipse5.png'))
                }
                width={'100%'}
                height={Dimensions.get('screen').height > 800 ?
                    Dimensions.get('screen').height / 1.2 :
                    Dimensions.get('screen').height/1.2
                }
        />

    );
};

export default ImageComponent;
