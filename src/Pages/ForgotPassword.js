import React from 'react';
import {View, ImageBackground, SafeAreaView, Dimensions, StatusBar, Image,Text} from 'react-native';
import DotComponent from '../Components/DotComponent';
import ImageComponent from '../Components/ImageComponent';
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import ThreadComponent from '../Components/ThreadComponent';

const ForgotPassword2 = (props) => {
    const[OTP, setOTP] = React.useState('');
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
            <ThreadComponent />
                <TextComponent
                    text={'Forgot Password ?'}
                    color={'#fff'}
                    fontSize={45}
                    fontWeight = {'bold'}
                    // padding={15}
                />
                <TextComponent
                    text={'Please verify your account by entering the OTP sent to your registered Gmail Id.'}
                    color={'#fff'}
                    fontSize={20}
                    padding={20}
                />
                    
                {/* <Text style={{color:'#fff' , fontSize:20 ,padding:20, textAlign:'center'}}>Please verify your account by entering the OTP sent to your registered Gmail Id.</Text> */}
                <InputComponent
                    field={OTP}
                    placeholder={'OTP'}
                    onChangeTextFunction={setOTP}
                />
                <ButtonComponent title={'Next'} marginTop={30} marginBottom={10} onPress={() => {props.navigation.navigate('forgotPassword2')}}/>
                 <Text onPress={() => {props.navigation.navigate('')}} >Resend OTP</Text>
            {/*</ImageBackground>*/}
        </SafeAreaView>
    );
};

export default ForgotPassword2 ;
