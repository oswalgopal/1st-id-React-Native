import React from 'react';
import {View, ImageBackground, SafeAreaView, Dimensions, StatusBar, FlatList,Image,Text,StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements' ;
import {useTheme} from '@react-navigation/native';

const SearchComponent = () => {
const[search, setSearch] = React.useState('');  
const theme = useTheme() ;
return(     
       <SearchBar
        placeholder="Search Here..."
        onChangeText={setSearch}
        value={search}
        inputStyle={{color:'black',backgroundColor: '#E3E0E0'}}
        inputContainerStyle={{backgroundColor: '#E3E0E0' , borderRadius: 50 }}
        containerStyle={{backgroundColor:theme.dark ? '#000':'#F1F1F1', borderTopWidth:0 , borderBottomWidth:0 ,height:20,marginBottom: 35,marginTop: 5 ,padding:0}}
        leftIconContainerStyle={{padding:10}}
      />
     );
}

export default SearchComponent ;
