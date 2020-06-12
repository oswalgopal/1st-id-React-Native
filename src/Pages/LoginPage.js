import React from 'react';
import {View, ImageBackground, SafeAreaView, Dimensions , StatusBar } from 'react-native';
import DotComponent from '../Components/DotComponent';
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
const LoginPage = () => {
    const[username, setUsername] = React.useState('');
    const[password, setPassword] = React.useState('');
    return (
        <SafeAreaView style={{
            flex:1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
        }}>
            <ImageBackground source={require('../images/background-ellipse.png')} style={{
                flex: 1,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{
                    width: 5,
                    height: 50 + 15,
                    backgroundColor: 'black',
                    position: 'absolute',
                    top: 0,
                    zIndex: 4
                }}></View>
                <DotComponent />
                <TextComponent
                    text={'Login'}
                    color={'#fff'}
                    fontSize={50}
                    padding={20}
                />
                <InputComponent
                    username={username}
                    placeholder={'username'}
                    onChangeTextFunction={setUsername}
                />
                <InputComponent
                    username={password}
                    placeholder={'password'}
                    onChangeTextFunction={setPassword}
                />
                <ButtonComponent title={'Login'} marginTop={30} marginBottom={10} onPress={() => {}}/>
                <ButtonComponent title={'SignUp'} marginTop={0} marginBottom={10} onPress={() => {}}/>
                <TextComponent text={'forgot password ?'}/>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default LoginPage;