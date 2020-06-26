import React from 'react';
import{View, StyleSheet} from 'react-native';
import{Avatar , Title , Caption , Paragraph , Drawer , Text , TouchableRipple,Switch} from 'react-native-paper';
import{DrawerContentScrollView , DrawerItem} from '@react-navigation/drawer';
import {AuthContext} from '../context/authContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';

const DrawerComponent = props => {

const theme = useTheme() ;
console.log(theme) ;
const {logout , toggleTheme } = React.useContext(AuthContext);
let randomHex = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
const [initials , setinitials] = React.useState('Manoj');
const [username,setUsername] = React.useState('Manoj Rathore');
const [caption,setCaption] = React.useState('rathoremanoj98@gmail.com');
const color = randomHex() ;    
return(
        <View style={{flex:1}} >
           <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
               <View style={styles.userInfoSection}>
                   <View style={{flexDirection:'row', marginTop: 15}}>
                   <Avatar.Text color='#fff' labelStyle={{fontWeight:'bold'}} style={{backgroundColor : color }} size={50} label={initials.slice(0,1)} />

                   <View style={{marginLeft:15,flexDirection:'column'}}>
                       <Title style={styles.title , {color: theme.colors.black }}>{username}</Title>
                       <Caption style={styles.caption}>{caption}</Caption>
                 </View>
                 </View>
            </View>   
            <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color= '#0080FE'
                                size={25}
                                />
                            )}
                            labelStyle={{color:'#0080FE',fontWeight:'bold'}}
                            label="Home"
                            
                            // onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                 color= '#0080FE'
                                size={25}
                                />
                            )}
                            labelStyle={{color:'#0080FE',fontWeight:'bold'}}
                            label="Profile"
                            
                            // onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="note-outline" 
                                 color= '#0080FE'
                                size={25}
                                />
                            )}
                            labelStyle={{color:'#0080FE',fontWeight:'bold'}}
                            label="My Documents"
                            // onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="camera-outline" 
                                 color= '#0080FE'
                                size={25}
                                />
                            )}
                            labelStyle={{color:'#0080FE',fontWeight:'bold'}}
                            label="Scan Documents"
                            // onPress={() => {props.navigation.navigate('SettingScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color= '#0080FE'
                                size={25}
                                />
                            )}
                            labelStyle={{color:'#0080FE',fontWeight:'bold'}}
                            label="Support"
                            // onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="security" 
                                color= '#0080FE'
                                size={25}
                                />
                            )}
                            labelStyle={{color:'#0080FE',fontWeight:'bold'}}
                            label="Privacy Policy"
                            // onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="information-outline" 
                                color= '#0080FE'
                                size={25}
                                />
                            )}
                            labelStyle={{color:'#0080FE',fontWeight:'bold'}}
                            label="Terms and conditions"
                            // onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />

                    </Drawer.Section>
                    <Drawer.Section title="Preferences" >
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text style={{color:'#0080FE',fontWeight:'bold'}}>Dark Theme</Text>
                                <View pointerEvents="none">
                                 <Switch value={theme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>

            </View>
           </DrawerContentScrollView>
           <Drawer.Section style={styles.bottomDrawerSection}>
               <DrawerItem 
                icon={({color, size}) => (
                                <Icon 
                                name= "exit-to-app"
                                color= '#0080FE'
                                size={25}
                                />
                            )}
                 label="Logout"
                 onPress={() => {logout()}}
                 labelStyle={{color:'#0080FE',fontWeight:'bold'}}
               />
           </Drawer.Section>
        </View>
    );
}
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

export default DrawerComponent ;