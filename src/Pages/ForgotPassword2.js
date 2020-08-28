import React from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Image,
  Text,
} from 'react-native';
import DotComponent from '../Components/DotComponent';
import ImageComponent from '../Components/ImageComponent';
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import ThreadComponent from '../Components/ThreadComponent';
import {Api} from '../Providers/api';
const api = new Api();
const ForgotPassword2 = (props) => {
  const [newPassword, setnewPassword] = React.useState('');
  const [cPassword, setcPassword] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  const forgotPassword = () => {
    setLoader(true);
    console.log(props.route);
    const param = {
      api: '/Unauth/forgotpass/',
      data: {
        email: props.route.params.mail,
        newpassword: newPassword,
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
            .then((res2) => {
              console.log(res2);
              props.navigation.navigate('login');
            })
            .catch((err2) => {
              console.log(err2);
            });
        } else {
          console.log(res);
          api.showToaster('Error while reseting otp: ' + res.status);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
        api.showToaster('Error while reseting otp : 500');
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }}>
      <ImageComponent />
      <DotComponent />
      <ThreadComponent />
      <TextComponent
        text={'Forgot Password ?'}
        color={'#fff'}
        fontSize={45}
        fontWeight={'bold'}
        // padding={15}
      />
      {
        <TextComponent
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
        secureTextEntry={true}
      />
      <InputComponent
        field={cPassword}
        placeholder={'Confirm Password'}
        onChangeTextFunction={setcPassword}
        secureTextEntry={true}
      />
      {newPassword !== cPassword && newPassword && cPassword ? (
        <Text style={{color: '#ff0000', fontSize: 20}}>
          Password does not match.
        </Text>
      ) : null}
      <ButtonComponent
        title={'Done'}
        marginTop={30}
        marginBottom={10}
        disabled={!(newPassword === cPassword)}
        onPress={() => {
          forgotPassword();
        }}
      />
    </SafeAreaView>
  );
};

export default ForgotPassword2;
