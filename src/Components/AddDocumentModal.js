import React  from 'react';
import {View, ImageBackground, SafeAreaView, Dimensions, StatusBar,Text, Image} from 'react-native';
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import {useTheme} from '@react-navigation/native';
import { Button } from 'react-native-elements';

const AddDocumentModal = () =>{
    const theme = useTheme() ;
    const[docname, setDocname] = React.useState('');
    const[year, setYear] = React.useState('');
    const[semester, setSemester] = React.useState('');
    const[subject , setSubject] = React.useState('');
    const[access , setAccess] = React.useState('');

  return(    
<SafeAreaView style={{
            flex:1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10
}}>
        <TextComponent
                    text={'Add New Document'}
                    color={theme.colors.white}
                    fontSize={20}
                    fontWeight = {'bold'}
                    padding={5}
                    />
         <InputComponent
                    field={docname}
                    placeholder={'Enter Document Name'}
                    onChangeTextFunction={setDocname}
                    secureTextEntry={false}
                />
          <InputComponent
                    field={year}
                    placeholder={'Year'}
                    onChangeTextFunction={setYear}
                    secureTextEntry={false}
                />
           <InputComponent
                    field={semester}
                    placeholder={'Semester'}
                    onChangeTextFunction={setSemester}
                    secureTextEntry={false}
                />
            <InputComponent
                    field={subject}
                    placeholder={'Subject'}
                    onChangeTextFunction={setSubject}
                    secureTextEntry={false}
                /> 
            <InputComponent
                    field={access}
                    placeholder={'Access : Private or Public'}
                    onChangeTextFunction={setAccess}
                    secureTextEntry={false}
                />            
            <Image source={theme.dark ? require('../images/cloud-dark.png'): require('../images/cloud.png')} style={{ width:100 , height: 30, left:8, top:20}} />
            <Text style={{top: 25 , fontWeight:'bold', color:theme.colors.white }}>Upload your document </Text> 
             <View style={{
             top: 40 ,
             flexDirection: 'row' 
             }} >
             <Button
               title= 'Cancel'
              titleStyle={{
                  color: theme.colors.black ,
              }}
              buttonStyle={{
                  backgroundColor : theme.colors.white ,
                  // borderRadius: 50 ,
                   width: 100 ,
                   height:30 ,
                   marginLeft: 5
              }}
            />
            <Button
               title= 'Add'
              titleStyle={{
                  color: theme.colors.black ,
              }}
              buttonStyle={{
                  backgroundColor : theme.colors.white ,
                  width: 100 ,
                  height:30,
                  marginLeft: 5
              }}
            />
            </View>
 </SafeAreaView>
);        
}
export default AddDocumentModal ;