import React from 'react';
import {View, TextInput, ImageBackground, SafeAreaView, Dimensions, StatusBar, FlatList,Image,Text,StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements' ;
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const SearchComponent = () => {
const[search, setSearch] = React.useState('');
const theme = useTheme() ;
// return(
//        <SearchBar
//         placeholder="Search Here..."
//         onChangeText={setSearch}
//         value={search}
//         inputStyle={{color:'black',backgroundColor: '#E3E0E0'}}
//         inputContainerStyle={{backgroundColor: '#E3E0E0' , borderRadius: 50 }}
//         containerStyle={{backgroundColor:theme.dark ? '#000':'#F1F1F1', borderTopWidth:0 , borderBottomWidth:0 ,height:20,marginBottom: 35,marginTop: 5 ,padding:0}}
//         leftIconContainerStyle={{padding:10}}
//       />
//      );
    return (
        <View style={{
            width: '95%',
            height: 40,
            backgroundColor: '#E3E0E0',
            borderRadius: 5,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 10,
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row"
        }}>
            <Icon name={'search'} size={20} style={{
                marginLeft: 10,
                marginRight: 10
            }}/>
            <TextInput onTextChange={() => {}} placeholder={'Search here...'} style={{
                width: '90%',
                height: '100%',
                color: '#000',
            }} placeholderTextColor={'#000'}/>
        </View>
    )
}

export default SearchComponent ;
