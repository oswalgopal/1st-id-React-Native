import React from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Text,
  Image,
} from 'react-native';
import DotComponent from '../Components/DotComponent';
import ImageComponent from '../Components/ImageComponent';
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import ThreadComponent from '../Components/ThreadComponent';
import {Avatar} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {Api} from '../Providers/api';
import Spinner from 'react-native-loading-spinner-overlay';
const api = new Api();
const ProfilePage = (props) => {
  const theme = useTheme();
  // const [initials, setinitials] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [about, setAbout] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [edit, setEdit] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    React.useEffect(() => {
    getProfile();
  }, []);
  const getProfile = () => {
      setLoader(true);
    const param = '/myprofile/2';
    api
      .getApi(param)
      .then((res) => {
        console.log(res);
          setLoader(false);
        if (res.status === 200) {
          res
            .json()
            .then((response) => {
              console.log('Response->', response);
              // setEdit(false);
              setUserName(response.username);
              setEmail(response.email);
              setAbout(response.about);
              setPassword(response.password);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  const upgradeProfile = (item) => {
    const param = {
      api: '/profileupdate/2/',
      data: {
        username: userName,
        email: email,
        password: password,
        about: about,
        phoneno: 11111111,
      },
    };
    api
      .putApi(param)
      .then((res) => {
        if (res.status === 200) {
          res
            .json()
            .then((response) => {
              console.log(response);
              // setEdit(t);
              // getProfile();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log(res);
          api.showToaster('Error while updating profile: ' + res.status);
        }
      })
      .catch((err) => {
        console.log('Error');
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
      <Spinner
        visible={loader}
        textContent={'Please wait ...'}
        textStyle={{
          color: '#fff',
        }}
      />
      <ImageComponent />
      {/* <DotComponent /> */}
      <ThreadComponent />
      <Avatar.Text
        color={theme.colors.blue}
        labelStyle={{fontWeight: 'bold'}}
        style={{
          backgroundColor: theme.colors.white,
          marginBottom: 60,
          zindex: 10,
        }}
        size={80}
        label={userName.slice(0, 1)}
      />
      <TextComponent
        text={'My Profile'}
        color={theme.colors.white}
        fontSize={30}
        fontWeight={'bold'}
      />
      <InputComponent
        field={userName}
        placeholder={'User Name'}
        onChangeTextFunction={setUserName}
        secureTextEntry={false}
        editable={edit}
      />
      <InputComponent
        field={email}
        placeholder={'Email'}
        onChangeTextFunction={setEmail}
        secureTextEntry={false}
        editable={edit}
      />
      <InputComponent
        field={about}
        placeholder={'About'}
        onChangeTextFunction={setAbout}
        secureTextEntry={false}
        editable={edit}
      />
      {edit ? (
        <ButtonComponent
          title={'Done'}
          marginTop={30}
          marginBottom={10}
          onPress={() => {
            upgradeProfile();
          }}
        />
      ) : (
        <ButtonComponent
          title={'Edit Profile'}
          marginTop={30}
          marginBottom={10}
          onPress={() => {
            setEdit(true);
          }}
        />
      )}
      <ButtonComponent
        title={'<- Back'}
        marginTop={0}
        marginBottom={10}
        onPress={() => {
          props.navigation.navigate('landingPage');
        }}
      />
    </SafeAreaView>
  );
};
export default ProfilePage;
