import React  from 'react';
import {View, ImageBackground, SafeAreaView, Dimensions, StatusBar,Text, Image,TouchableOpacity} from 'react-native';
import TextComponent from '../Components/TextComponent';
import InputComponent from '../Components/InputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import {useTheme} from '@react-navigation/native';
import { Button } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import S3 from 'aws-sdk/clients/s3';
const AddDocumentModal = () =>{
    const theme = useTheme() ;
    const[docname, setDocname] = React.useState('');
    const[year, setYear] = React.useState('');
    const[semester, setSemester] = React.useState('');
    const[subject , setSubject] = React.useState('');
    const[access , setAccess] = React.useState('');
    const[url, setUrl] = React.useState('');
    const pick = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size
            );
            setUrl(res.uri);
            upload(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }
    const upload = async file => {
    const s3bucket = new S3({
        accessKeyId: 'AKIAYVYWOBA4MAHIQJGS',
        secretAccessKey:'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',
        Bucket: '1staid',
        signatureVersion:'v4',
    });
const params ={
    Bucket:'1staid/pdfs',
    Key: file.name,
    Body: file.uri,
    ContentDisposition:'inline',
    ContentType: file.type,
    ACL: 'public-read',
}
       await s3bucket.putObject(params, (err, data) => {
            if (err) {
                console.log(err) ;
                console.log('error in callback');
            }
            console.log('success');
            console.log("Response URL : "+ data);
        })
    }
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
    <TouchableOpacity onPress={pick}><Image source={theme.dark ? require('../images/cloud-dark.png') : require('../images/cloud.png')} style={{ width:100 , height: 30, left:8, top:20}} /></TouchableOpacity>
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
