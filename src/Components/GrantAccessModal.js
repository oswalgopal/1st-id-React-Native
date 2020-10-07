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
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import {Button} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {Api} from '../Providers/api';
const api = new Api();
const GrantAccessModal = (props) => {
  const theme = useTheme();
  const [loader2, setLoader2] = React.useState(false);
  const [user_id, setUserId] = React.useState([]);
  React.useEffect(() => {
    api
      .getAsyncData('loginData')
      .then((res) => {
        if (res) {
          console.log(res);
          setUserId(res.user_id);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const wantAccess = () => {
    setLoader2(true);
    const param =
      '/checkaccess/' + user_id + '/ ' + props.DocumentDetail.document_id + '/';
    console.log(param);
    api
      .getApi(param)
      .then((res) => {
        setLoader2(false);
        console.log(res);
        if (res.status === 200) {
          res.json().then((response) => {
            console.log(response);
          });
        } else if (res.status === 400) {
          res.json().then((response) => {

          });
        }
      })
      .catch((error) => {
        setLoader2(false);
        console.log(error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}>
      <TextComponent
        text={'Grant View Access'}
        color={theme.colors.white}
        fontSize={25}
        fontWeight={'bold'}
        marginTop={30}
      />
      <TextComponent
        text={
          'On clicking on grant button your personal details will be shared to the owner of the document. Also the owner of the document will be notified.'
        }
        color={theme.colors.white}
        fontSize={12}
        width={'80%'}
        padding={25}
      />
      <Image
        source={require('../images/pdf.png')}
        style={{width: 60, height: 80}}
      />
      <InputComponent
        field={props.DocumentDetail.document}
        placeholder={'Document Name'}
        onChangeTextFunction={() => {}}
        secureTextEntry={false}
        editable={false}
      />
      <InputComponent
        field={props.DocumentDetail.owner}
        placeholder={'Owner Name'}
        onChangeTextFunction={() => {}}
        secureTextEntry={false}
        editable={false}
      />
      <View
        style={{
          top: 20,
          flexDirection: 'row',
        }}>
        <Button
          title="Cancel"
          titleStyle={{
            color: theme.colors.black,
          }}
          buttonStyle={{
            backgroundColor: theme.colors.white,
            // borderRadius: 50 ,
            width: 100,
            height: 30,
            marginLeft: 5,
          }}
          onPress={() => {
            props.Close();
          }}
        />
        <Button
          loader={loader2}
          title="Grant"
          titleStyle={{
            color: theme.colors.black,
          }}
          buttonStyle={{
            backgroundColor: theme.colors.white,
            width: 100,
            height: 30,
            marginLeft: 5,
          }}
          onPress={wantAccess}
        />
      </View>
    </SafeAreaView>
  );
};

export default GrantAccessModal;
