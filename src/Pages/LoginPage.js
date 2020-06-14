import React from 'react';
import {View, ImageBackground, SafeAreaView, Dimensions, StatusBar, Image} from 'react-native';
import DotComponent from '../Components/DotComponent';
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
const LoginPage = () => {
    const[username, setUsername] = React.useState('');
    const[password, setPassword] = React.useState('');
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
            <Image
                style={{
                    position: "absolute",
                    top: 50,
                }}
                source={
                    Dimensions.get('screen').height > 800 ?
                        require('../images/background-ellipse.png') :
                        require('../images/background-ellipse4.png')
                }
                width={'100%'}
                height={Dimensions.get('screen').height > 800 ?
                    Dimensions.get('screen').height / 1.2:
                    Dimensions.get('screen').height
                }
            />
            {/*<ImageBackground source={require('../images/background-ellipse.png')} style={{
                flex: 1,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>*/}
                <DotComponent />
            <View style={{
                width: 5,
                height: 80 + 15,
                backgroundColor: 'black',
                position: 'absolute',
                top: 0,
                zIndex: 2
            }}/>
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
            {/*</ImageBackground>*/}
        </SafeAreaView>
    );
};

export default LoginPage;
