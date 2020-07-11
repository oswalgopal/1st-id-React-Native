import React  from 'react';
import {View, Dimensions,Keyboard} from 'react-native';
import {useTheme} from '@react-navigation/native';
const ThreadComponent = () => {
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
                width: 5,
                height: isKeyboardVisible ? 25 : 125  ,
                backgroundColor: theme.colors.black,
                position: 'absolute',
                top: 0,
                left: Dimensions.get('screen').width / 2 - 2.5 ,
                zIndex: 2
            }}/>

);
}
export default ThreadComponent ;


