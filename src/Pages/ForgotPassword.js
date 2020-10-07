import React from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import DotComponent from '../Components/DotComponent';
import ImageComponent from '../Components/ImageComponent';
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import ThreadComponent from '../Components/ThreadComponent';
import {Api} from '../Providers/api';
const api = new Api();
const ForgotPassword = (props) => {
  const [OTP, setOTP] = React.useState('');
  const [sentOtp, setSentOtp] = React.useState(props.route.params.otp);
  const [loader, setLoader] = React.useState('');
  let gmail = props.route.params.email;
  const sendOtp = () => {
    setLoader(true);
    const param = {
      api: '/Unauth/otp/',
      data: {
        email: props.route.params.email,
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
              api.showToaster(
                'Otp has been resend to your email. Kindly,check.',
              );
              setSentOtp(res2);
            })
            .catch((err2) => {
              console.log(err2);
            });
        } else {
          console.log(res);
          api.showToaster('Error while sending otp: ' + res.status);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
        api.showToaster('Error while sending otp : 500');
      });
  };

  console.log(props.route);
  React.useEffect(() => {
    // window.alert(Dimensions.get('screen').height);
  }, [props.navigation]);
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
        text={'Forgot \n Password ?'}
        color={'#fff'}
        fontSize={45}
        fontWeight={'bold'}
        // padding={15}
      />
      <TextComponent
        text={
          'Please verify your account by entering the OTP sent to your registered Gmail Id.'
        }
        color={'#fff'}
        fontSize={20}
        padding={20}
      />

      {/* <Text style={{color:'#fff' , fontSize:20 ,padding:20, textAlign:'center'}}>Please verify your account by entering the OTP sent to your registered Gmail Id.</Text> */}
      <InputComponent
        field={OTP}
        placeholder={'OTP'}
        onChangeTextFunction={setOTP}
        keyboardType={'numeric'}
      />
      <ButtonComponent
        title={'Next'}
        marginTop={30}
        marginBottom={10}
        disabled={!(sentOtp == OTP)}
        onPress={() => {
          props.navigation.navigate('forgotPassword2', {
            mail: props.route.params.email,
          });
        }}
      />
      {/* <Text>Next button will be enabled only when OTP matches.</Text> */}
      <Text
        onPress={() => {
          sendOtp();
        }}>
        Resend OTP
      </Text>
      {/*</ImageBackground>*/}
    </SafeAreaView>
  );
};

export default ForgotPassword;
