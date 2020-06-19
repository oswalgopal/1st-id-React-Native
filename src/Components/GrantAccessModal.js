import React  from 'react';
import {View, ImageBackground, SafeAreaView, Dimensions, StatusBar,Text, Image} from 'react-native';
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import { Button } from 'react-native-elements';


const GrantAccessModal = (props) =>{
return(    
<SafeAreaView style={{
            flex:1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10
}}>
        <TextComponent
                    text={'Grant View Access'}
                    color={'#fff'}
                    fontSize={25}
                    fontWeight = {'bold'}
                    marginTop={30}
                    />
          <TextComponent
                    text={'On clicking on grant button your personal details will be shared to the owner of the document. Also the owner of the document will be notified.'}
                    color={'#fff'}
                    fontSize={12}
                    width={'80%'}
                    padding={25}
                    />          
          <Image source={require('../images/pdf.png')} style={{ width:60 , height: 80 }} />           
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
        <View style={{
             top: 20 ,
             flexDirection: 'row' 
             }} >
             <Button
               title= 'Cancel'
              titleStyle={{
                  color: '#000000' ,
              }}
              buttonStyle={{
                  backgroundColor : '#fff',
                  // borderRadius: 50 ,
                   width: 100 ,
                   height:30 ,
                   marginLeft: 5
              }}
            />
            <Button
               title= 'Grant'
              titleStyle={{
                  color: '#000000' ,
              }}
              buttonStyle={{
                  backgroundColor : '#fff',
                  width: 100 ,
                  height:30,
                  marginLeft: 5
              }}
            />
            </View>     
         
             
 </SafeAreaView>
);        
}


export default GrantAccessModal ;