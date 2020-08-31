import React from 'react';
import {View, ImageBackground, SafeAreaView, Dimensions, StatusBar,Text, Image} from 'react-native';
import DotComponent from '../Components/DotComponent';
import ImageComponent from '../Components/ImageComponent';
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import ThreadComponent from '../Components/ThreadComponent';
import {AuthContext} from '../context/authContext';
import {Api} from '../Providers/api';
const api = new Api();
const LoginPage = props => {
    const[username, setUsername] = React.useState('');
    const[password, setPassword] = React.useState('');
    const[loader ,setLoader] = React.useState(false);
    const[otp,setOtp] = React.useState('');
    const {login} = React.useContext(AuthContext);
    React.useEffect(() => {
        // window.alert(Dimensions.get('screen').height);
    }, []);
    const loginFunction = () => {
       setLoader(true);
       const param = {
        api: '/Unauth/login/' ,
        data: {
              email: username ,
              password: password
     },
    };
    api
       .postApi(param)
       .then(res => {
           console.log(res);
           if(res.status === 200){
            res
              .json()
              .then(response =>{
                console.log(response);
                api
                .setAsyncData('loginData',JSON.stringify(response))
                .then(response =>{
                  console.log(response);
                  login();
              })
              })
           .catch(error => {
                  console.log(error);
                  api.showToaster(error);
              });
           }
           else {
               console.log(res);
               api.showToaster('Could Not Fetch Data Status:'+ res.status);
           }})
        .catch (err => {
          setLoader(false);
          api.showToaster('Login Failed Check your credentials');
          console.log(err);
        });
       };
    const sendOtp = () => {
        setLoader(true);
        const param = {
            api: '/Unauth/otp/',
            data: {
                email: username
            },
        };
        api
           .postApi(param)
           .then(res => {
               console.log(res);
               setLoader(false);
               if(res.status === 200){
                   res
                      .json()
                      .then(res2 =>{
                          console.log(res2);
                          props.navigation.navigate('forgotPassword',{otp:res2,email:username});
                      })
                      .catch(err2 => {
                       console.log(err2);
                      });
               }
               else {
                   console.log(res);
                   api.showToaster('Error while sending otp: ' + res.status);
               }
           })
           .catch(err => {
               setLoader(false);
               console.log(err);
               api.showToaster('Error while sending otp : 500');
           });
    };
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
                    placeholder={'Email id'}
                    onChangeTextFunction={setUsername}
                />
                <InputComponent
                    field={password}
                    placeholder={'Password'}
                    onChangeTextFunction={setPassword}
                    secureTextEntry = {true}
                />
                <ButtonComponent title={'Login'} marginTop={30} marginBottom={10} onPress={() => {loginFunction() }}/>
                <ButtonComponent title={'SignUp'} marginTop={0} marginBottom={10} onPress={() => {props.navigation.navigate('register')}}/>
                {username ? (
                <Text onPress={() => {sendOtp()}} >Forgot Password ?</Text>
                ) : null}
            {/*</ImageBackground>*/}
        </SafeAreaView>
    );
};

export default LoginPage;
