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

const GrantAccessModal = (props) => {
  const theme = useTheme();
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
        />
      </View>
    </SafeAreaView>
  );
};

export default GrantAccessModal;
