import React  from 'react';
import {View, Dimensions,Keyboard} from 'react-native';
const ThreadComponent = () => {
    const [isKeyboardVisible, setKeyboardVisible] =React.useState(false);

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
                backgroundColor: 'black',
                position: 'absolute',
                top: 0,
                zIndex: 2
            }}/>

);
}
export default ThreadComponent ;


