import React from 'react';
import {View, ImageBackground, SafeAreaView, Dimensions, StatusBar,Text, Image} from 'react-native';
import DotComponent from '../Components/DotComponent';
import ImageComponent from '../Components/ImageComponent';
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import ThreadComponent from '../Components/ThreadComponent';
import {AuthContext} from '../context/authContext';
const LoginPage = (props) => {
    const[username, setUsername] = React.useState('');
    const[password, setPassword] = React.useState('');
    const {login} = React.useContext(AuthContext);

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
            {/*<ImageBackground source={require('../images/background-ellipse.png')} style={{
                flex: 1,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>*/}
                <DotComponent />
                <ThreadComponent />
                <TextComponent
                    text={'Login'}
                    color={'#fff'}
                    fontSize={50}
                    padding={20}
                    fontWeight={'bold'}
                />
                <InputComponent
                    field={username}
                    placeholder={'username'}
                    onChangeTextFunction={setUsername}
                />
                <InputComponent
                    field={password}
                    placeholder={'password'}
                    onChangeTextFunction={setPassword}
                    secureTextEntry = {true}
                />
                <ButtonComponent title={'Login'} marginTop={30} marginBottom={10} onPress={() => {login()}}/>
                <ButtonComponent title={'SignUp'} marginTop={0} marginBottom={10} onPress={() => {props.navigation.navigate('register')}}/>
                <Text onPress={() => {props.navigation.navigate('forgotPassword')}} >Forgot Password ?</Text>
            {/*</ImageBackground>*/}
        </SafeAreaView>
    );
};

export default LoginPage;
