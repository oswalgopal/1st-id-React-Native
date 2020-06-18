import React from 'react';
import {View, ImageBackground, SafeAreaView, Dimensions, StatusBar, Image,Text,KeyboardAvoidingView} from 'react-native';
import DotComponent from '../Components/DotComponent';
import ImageComponent from '../Components/ImageComponent';
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import ThreadComponent from '../Components/ThreadComponent';

const RegisterPage = (props) => {
 const[username, setUsername] = React.useState('');
 const[password, setPassword] = React.useState('');
  const[cpassword, setcPassword] = React.useState('');
 const[emailId,setemailId] = React.useState('');
 
    React.useEffect(() => {
        // window.alert(Dimensions.get('screen').height);
    }, [])
    return (
    <KeyboardAvoidingView
      style={{flex:1}}
    //   keyboardVerticalOffset={-50}
      behavior="padding"
    >    
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
                    text={'Register'}
                    color={'#fff'}
                    fontSize={40}
                    padding={20}
                    fontWeight={'bold'}
                />
                 <InputComponent
                    field={emailId}
                    placeholder={'emailId'}
                    onChangeTextFunction={setemailId}
                    secureTextEntry={false}
                />
                <InputComponent
                    field={username}
                    placeholder={'username'}
                    onChangeTextFunction={setUsername}
                    secureTextEntry={false}
                />
                <InputComponent
                    field={password}
                    placeholder={'password'}
                    onChangeTextFunction={setPassword}
                    secureTextEntry={true}
                />
                 <InputComponent
                    field={cpassword}
                    placeholder={'Confirm password'}
                    onChangeTextFunction={setcPassword}
                    secureTextEntry={true}
                />
                { (password !== cpassword && password && cpassword )?(<Text style={{color:'#ff0000',fontSize:20 ,padding:0 }}>Password does not match.</Text>):null}
                <ButtonComponent title={'Register'} marginTop={30} marginBottom={10} onPress={ () => {}}/>
                <Text onPress={() => {props.navigation.navigate('login')}} >Already Registered ?</Text>
                {/* <TextComponent text={'Already Registered ?'} onPress={() => {props.navigation.navigate('login')}}/> */}
            {/*</ImageBackground>*/}
        </SafeAreaView>
    </KeyboardAvoidingView>    
    );
};

export default RegisterPage;
