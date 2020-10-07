import React from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Image,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import DotComponent from '../Components/DotComponent';
import ImageComponent from '../Components/ImageComponent';
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import ThreadComponent from '../Components/ThreadComponent';
import {Api} from '../Providers/api';
const api = new Api();
const RegisterPage = (props) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [cpassword, setcPassword] = React.useState('');
  const [emailId, setemailId] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  const signUpFunction = () => {
    setLoader(true);
    const param = {
      api: '/Unauth/addUser/',
      data: {
        email: emailId,
        username: username,
        phoneno: 0,
        about: username,
        password: password,
      },
    };
    api
      .postApi(param)
      .then((res) => {
        console.log(res);
        setLoader(false);
        if (res.status === 200) {
          res
            .json()
            .then((response) => {
              console.log(response);
              props.navigation.navigate('login');
            })
            .catch((err) => {
              console.log(err);
              api.showToaster('Error while registration');
            });
        } else if (res.status === 400) {
          res
            .json()
            .then((response) => {
              console.log(response);
              if (response.username) {
                api.showToaster('Username :' + response.username[0]);
              } else if (response.email) {
                api.showToaster('Email :' + response.email[0]);
              } else {
                api.showToaster(
                  'Registration Failed Please check your credentials',
                );
              }
            })
            .catch((error) => {
              console.log(error);
              api.showToaster(error);
            });
        } else {
          console.log(res);
          api.showToaster('Error while registration: ' + res.status);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
        api.showToaster('Error while Signup');
      });
  };
  // React.useEffect(() => {
  //     // window.alert(Dimensions.get('screen').height);
  // }, [])
  return (
    <SafeAreaView
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }}>
      {/* <KeyboardAvoidingView
        style={{}}
        behavior={'height'}
        keyboardVerticalOffset={20}> */}
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
        placeholder={'Email Id'}
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
      {password !== cpassword && password && cpassword ? (
        <Text style={{color: '#ff0000', fontSize: 20, padding: 0}}>
          Password does not match.
        </Text>
      ) : null}
      <ButtonComponent
        loader={loader}
        title={'Register'}
        marginTop={30}
        marginBottom={10}
        onPress={() => {
          signUpFunction();
        }}
      />
      <Text
        onPress={() => {
          props.navigation.navigate('login');
        }}>
        Already Registered ?
      </Text>
      {/* <TextComponent text={'Already Registered ?'} onPress={() => {props.navigation.navigate('login')}}/> */}
      {/*</ImageBackground>*/}
      {/* </KeyboardAvoidingView>     */}
    </SafeAreaView>
  );
};
export default RegisterPage;
