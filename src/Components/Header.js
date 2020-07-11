import React from 'react';
import {StyleSheet , Text , View ,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import {useTheme} from '@react-navigation/native';
const Header = (props) => {
    const theme = useTheme() ;
   return(
       <View style={{
        width: '100%',
        height: 80,
        flexDirection: 'row',
        backgroundColor: theme.colors.blue ,
        alignItems : 'center',
        justifyContent: 'space-between',
           paddingTop: 20,
           paddingLeft: 10,
           paddingRight: 10
       }}>
        <TouchableOpacity
        style={{
            height: '100%',
            width: 50,
            justifyContent: "center"
        }}
            onPress={() =>{props.navigation.openDrawer()}}>
            <Icon name="bars" size={25} color={theme.colors.white} style={{left:10}} />
        </TouchableOpacity>

       <View style={styles.headerRight}>
        <TouchableOpacity onPress={() => {props.navigation.navigate('notifications')}}><Icon name={props.bellShown && 'bell' } size={25} color={theme.colors.white} style={styles.icon3} /></TouchableOpacity>
        <TouchableOpacity onPress={() =>{props.navigation.navigate('profilePage')}}><Icon name="user" size={30} color={theme.colors.white} style={styles.icon2}/></TouchableOpacity>
        </View>
        </View>
   );
}
const styles = StyleSheet.create({
    // header: {
    //     width: '100%',
    //     height: 50,
    //     flexDirection: 'row',
    //     backgroundColor: '#0080FE',
    //     alignItems : 'center',
    //     justifyContent: 'space-between'
    // } ,
    headerRight: {
        justifyContent: 'space-evenly',
        width: 90 ,
        height: 80 ,
        alignItems: 'center',
        flexDirection:'row',
    }
})
export default Header ;
