import React  from 'react';
import {View, Dimensions,Keyboard} from 'react-native';
import {useTheme} from '@react-navigation/native';
const DotComponent = () => {
    const [isKeyboardVisible, setKeyboardVisible] =React.useState(false);
    const theme = useTheme() ;
 React.useEffect(() => {
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
        <View style={{
            width: 30,
            height: 30,
            backgroundColor: theme.colors.white,
            position: 'absolute',
            top: isKeyboardVisible ? 10 : 110 ,
            left: Dimensions.get('window').width / 2 - 15,
            borderRadius: 1000,
            zIndex: 1
        }}>
        </View>
    );
};

export default DotComponent;
