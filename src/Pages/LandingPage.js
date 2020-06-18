import React from 'react';
import {View, ImageBackground, SafeAreaView, Dimensions, StatusBar, FlatList,Image,Text,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchComponent from '../Components/SearchComponent' ;


const LandingPage = () => {
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
const styles = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
    padding: 0,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: 'white',
    borderRadius: 10 ,
    elevation: 5
  }, 
  add: {
   color: '#0080FE',
   position: 'absolute' ,
   bottom : 20 ,
   right: 20,

  }
});

return(
        
    <SafeAreaView style={{position:'absolute'}}>
     <SearchComponent />
     <FlatList
      data={data}
      renderItem={({item}) => (
        <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Image source={require('../images/pdf.png')} style={{ width:100 , height: 120, left:40}} />
           <Text style={{padding:5}}>{item.value}</Text>
            <Text style={{left:5}}>By:- {item.owner}</Text>
          <Icon name={item.accessType === 'P' ? 'lock' : 'eye'} size={20} style={{left:140 , bottom:20}}/>
        </View>
        </View>
      )}
      keyExtractor={item => item.id}
      numColumns={numColumns} />
     <Icon name="plus-circle" size={60} style={styles.add} />
    </SafeAreaView>
);
}

export default LandingPage ;