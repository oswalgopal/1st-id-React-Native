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
        height: Platform.OS === "ios" ? 80 : 60,
        flexDirection: 'row',
           paddingTop: Platform.OS === "ios" ? 30 : 0,
           backgroundColor: theme.colors.blue ,
        justifyContent: 'space-between',
           paddingLeft: 10,
           paddingRight: 10
       }}>
        <TouchableOpacity
        style={{
            height: '100%',
            width: 50,
            justifyContent: "center",
            // paddingTop: Platform.OS === "ios" ? 30 : 0
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
        height: '100%' ,
        alignItems: 'center',
        flexDirection:'row',
    }
})
export default Header ;
