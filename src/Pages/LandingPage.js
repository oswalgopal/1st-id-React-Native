import React from 'react';
import {View, ImageBackground,TouchableHighlight, SafeAreaView, Dimensions, StatusBar, FlatList,Image,Text,StyleSheet,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchComponent from '../Components/SearchComponent' ;
import AddDocumentModal from '../Components/AddDocumentModal';
import GrantAccessModal from '../Components/GrantAccessModal';
import DotComponent from '../Components/DotComponent';
import ImageComponent from '../Components/ImageComponent';
import ThreadComponent from '../Components/ThreadComponent';
import {useTheme} from '@react-navigation/native';


const LandingPage = () => {
const theme = useTheme() ; 
const data = [
  {id: '1', value: '4th sem IT ACT',accessType:'P',owner:'Yashi Rathore'},
  {id: '2', value: '4th sem NAD',accessType:'P',owner:'Manisha Sahu'},
  {id: '3', value: '4th sem DCC',accessType:'P',owner:'Yashi Rathore'},
  {id: '4', value: '4th sem DBMS',accessType:'S',owner:'Manisha Sahu'},
  {id: '5', value: '3rd sem French',accessType:'S',owner:'Yashi Rathore'},
  {id: '6', value: '3rd sem LA',accessType:'S',owner:'Manisha Sahu'},
];
const numColumns = 2 ;
const size = Dimensions.get('window').width/numColumns;
const[modalVisible,setModalVisible] = React.useState({open:false,type:''});
const [grantAccessDetail ,setGrantAccessDetail ] = React.useState({document:'',owner:''});
const styles = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
    padding: 0,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: theme.colors.white ,
    borderRadius: 10 ,
    elevation: 5
  }, 
  add: {
   color: theme.colors.blue ,
   position: 'absolute' ,
   bottom : 20 ,
   right: 20,

  }
});

return(
        
    <SafeAreaView style={{flex:1}}>
     <SearchComponent />
     <FlatList
      data={data}
      renderItem={({item}) => (
     <TouchableHighlight onPress={() => { 
       if(item.accessType === 'P'){
       setModalVisible({open:true,type:'grant'})
       setGrantAccessDetail({document:item.value,owner:item.owner})
       }
       }
       }>
        <View style={styles.itemContainer}>
       
        <View style={{
          flex: 1,
          margin: 3,
         backgroundColor: theme.colors.white ,
         borderRadius: 10 ,
         borderWidth: 1 ,
         borderColor: theme.colors.black ,
         elevation: 5}}>
         
          <Image source={require('../images/pdf.png')} style={{ width:100 , height: 120, left:40}} />
           <Text style={{marginLeft:5,marginTop:10 , fontWeight:'bold', color:theme.colors.black}}>{item.value}</Text>
            <Text style={{left:5 , fontSize:10, color:theme.colors.black }}>By:- {item.owner}</Text>
          <Icon name={item.accessType === 'P' ? 'lock' : 'eye'} size={25} style={{left:140, bottom:30}} color={theme.colors.black}/>
        </View>
        </View>
      </TouchableHighlight>
       
      )}
      keyExtractor={item => item.id}
      numColumns={numColumns} />
     <Icon name="plus-circle" size={60} style={{ color: theme.colors.blue ,position: 'absolute' ,bottom : 20 ,right: 20}} onPress={() => {setModalVisible({open:true,type:'add'})} } />
     <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.open}
        onRequestClose={() => {
          setModalVisible({open:false ,type: ''})
        }}
      >
      <View style={{
        position: 'absolute' ,
        top:0 ,
        left: 0 ,
        flex: 1 ,
        width: '100%' ,
        height: '100%' ,
        backgroundColor: theme.dark ? 'rgba(0,0,0,0.7)':'rgba(255,255,255,0.7)'
      }}/>
      <DotComponent/>
      <ThreadComponent />
      <ImageComponent />
      {
        modalVisible.type === 'add' ? <AddDocumentModal /> : <GrantAccessModal DocumentDetail={grantAccessDetail} />
      }
      </Modal>
 
    </SafeAreaView>
);
}

export default LandingPage ;