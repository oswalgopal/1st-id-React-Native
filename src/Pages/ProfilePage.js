import React from 'react';
import {View, ImageBackground, SafeAreaView, Dimensions, StatusBar,Text, Image} from 'react-native';
import DotComponent from '../Components/DotComponent';
import ImageComponent from '../Components/ImageComponent';
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import ThreadComponent from '../Components/ThreadComponent';
import {Avatar} from 'react-native-paper' ;
import {useTheme} from '@react-navigation/native';

const ProfilePage = (props) => {
    const theme = useTheme() ;
    const [initials , setinitials] = React.useState('Manoj');
 return( 
      <SafeAreaView style={{
            flex:1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
        }}>
      
     <ImageComponent />
     {/* <DotComponent /> */}
     <ThreadComponent />
     <Avatar.Text color={theme.colors.blue} labelStyle={{fontWeight:'bold'}} style={{backgroundColor : theme.colors.white , marginBottom:60, zindex:0 }} size={80} label={initials.slice(0,1)} />  
      <TextComponent
                    text={'My Profile'}
                    color={theme.colors.white}
                    fontSize={30}
                    fontWeight={'bold'}
                />
       <InputComponent
                    placeholder={'User Name'}
                    onChangeTextFunction={() => {}}
                    secureTextEntry={false}
                    editable={true}
                />
       <InputComponent
                    placeholder={'Email'}
                    onChangeTextFunction={() => {}}
                    secureTextEntry={false}
                    editable={false}
                />        
        <InputComponent
                    placeholder={'About'}
                    onChangeTextFunction={() => {}}
                    secureTextEntry={false}
                    editable={true}
                />    
        <ButtonComponent title={'Edit Profile'} marginTop={30} marginBottom={10} onPress={() => {}}/>
        <ButtonComponent title={'<- Back'} marginTop={0} marginBottom={10} onPress={() => {props.navigation.navigate('landingPage')}}/>                                     
     </SafeAreaView>
 );   
     
}
export default ProfilePage ;