import React from 'react';
import {StyleSheet , Text , View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Header = (props) => {
   return(
       <View style={styles.header}>
         <Icon name="user" size={30} color="#fff" style={styles.icon2} onPress={() => {props.navigation.navigate('notifications')}}/>
         <Icon name={props.bellShown && 'bell' } size={25} color="#fff" style={styles.icon3} onPress={() => {props.navigation.navigate('notifications')}} />
        <Icon name="bars" size={25} color="#fff" style={styles.icon1} />
       </View>
   ); 
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        backgroundColor: '#0080FE',
        alignItems: 'center',
        justifyContent : 'center',
    } ,
    icon1: {
        position: 'absolute',
        left: 10
    },
    icon2: {
        position: 'absolute',
        right: 10
    },
    icon3: {
        position: 'absolute',
        right: 50
    }
})
export default Header ;