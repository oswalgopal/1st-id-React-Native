import React from 'react';
import {View, ImageBackground, SafeAreaView, Dimensions, StatusBar, Image,Text} from 'react-native';
import DotComponent from '../Components/DotComponent';
import ImageComponent from '../Components/ImageComponent';
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import ThreadComponent from '../Components/ThreadComponent';

const ForgotPassword = (props) => {
    const[newPassword, setnewPassword] = React.useState('');
    const[cPassword, setcPassword] = React.useState('');
    React.useEffect(() => {
        // window.alert(Dimensions.get('screen').height);
    }, [])
    return (
        <SafeAreaView style={{
            flex:1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
        }}>
            <ImageComponent />
            <DotComponent />
            <ThreadComponent/>
                <TextComponent
                    text={'Forgot Password ?'}
                    color={'#fff'}
                    fontSize={45}
                    fontWeight={'bold'}
                    // padding={15}
                />
                {<TextComponent
                    text={'Enter your New Password Here :)'}
                    color={'#fff'}
                    fontSize={20}
                    padding={20}
                />
            }        
                {/* <Text style={{color:'#fff' , fontSize:20 ,padding:20, textAlign:'center'}}>Please verify your account by entering the OTP sent to your registered Gmail Id.</Text> */}
                <InputComponent
                    field={newPassword}
                    placeholder={'New Password'}
                    onChangeTextFunction={setnewPassword}
                    secureTextEntry = {true}

                />
                 <InputComponent
                    field={cPassword}
                    placeholder={'Confirm Password'}
                    onChangeTextFunction={setcPassword}
                    secureTextEntry = {true}
                />
                {(newPassword!==cPassword && newPassword && cPassword) ?(<Text style={{color:'#ff0000',fontSize:20 }}>Password does not match.</Text>):null}
                <ButtonComponent title={'Done'} marginTop={30} marginBottom={10} onPress={() => {}}/>
        </SafeAreaView>
    );
};

export default ForgotPassword ;
