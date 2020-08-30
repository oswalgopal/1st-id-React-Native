import React from 'react';
import {
  View,
  ImageBackground,
  TouchableHighlight,
  SafeAreaView,
  Dimensions,
  StatusBar,
  FlatList,
  Image,
  Text,
  StyleSheet,
  Modal,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchComponent from '../Components/SearchComponent';
import AddDocumentModal from '../Components/AddDocumentModal';
import GrantAccessModal from '../Components/GrantAccessModal';
import DotComponent from '../Components/DotComponent';
import ImageComponent from '../Components/ImageComponent';
import ThreadComponent from '../Components/ThreadComponent';
import {useTheme} from '@react-navigation/native';
import {Api} from '../Providers/api';
const api = new Api();
const LandingPage = (props) => {
    React.useEffect(() => {
        getData();
    }, []);
  const theme = useTheme();
  // const data = [
  //   {id: '1', value: '4th sem IT ACT', accessType: 'P', owner: 'Yashi Rathore'},
  //   {id: '2', value: '4th sem NAD', accessType: 'P', owner: 'Manisha Sahu'},
  //   {id: '3', value: '4th sem DCC', accessType: 'P', owner: 'Yashi Rathore'},
  //   {id: '4', value: '4th sem DBMS', accessType: 'S', owner: 'Manisha Sahu'},
  //   {id: '5', value: '3rd sem French', accessType: 'S', owner: 'Yashi Rathore'},
  //   {id: '6', value: '3rd sem LA', accessType: 'S', owner: 'Manisha Sahu'},
  // ];
  const numColumns = 2;
  const size = (Dimensions.get('window').width / numColumns) - 15;
  const [modalVisible, setModalVisible] = React.useState({
    open: false,
    type: '',
  });
  const [grantAccessDetail, setGrantAccessDetail] = React.useState({
    document: '',
    owner: '',
  });
  const[data , setData] = React.useState([]);
  const styles = StyleSheet.create({
    itemContainer: {
      width: size,
      height: size * 1.25,
      padding: 0,
        marginTop: 10,
        shadowColor: theme.colors.blue,
        shadowRadius: 2,
        shadowOpacity: 0.2,
    },
    item: {
      flex: 1,
      margin: 3,
      backgroundColor: theme.colors.white,
      borderRadius: 10,
    },
    add: {
      color: theme.colors.blue,
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
  });
const getData = () => {
    const param = '/document-list/';
    api
        .getApi(param)
        .then(res => {
           console.log(res);
           if(res.status === 200){
               res
                   .json()
                   .then(response => {
                       console.log("Data",response);
                       let lists = response.private.concat(response.public); //joined 2 arrays
                       setData(lists);
                       console.log(data);
                   })
                   .catch(error => {
                       console.log(error);
                   });
           }
           else{
               console.log(res);
               api.showToaster(res);
           }
        })
        .catch(err => {
            api.showToaster('Could Not Fetch Data');
            console.log(err);
        });
};
  return (
    <SafeAreaView style={{flex: 1, paddingBottom: 20}}>
      <SearchComponent />
      <TouchableOpacity style={{
          flexDirection: "row",
          alignItems: "center",
          marginRight: 10,
          marginTop: 10,
          justifyContent: "flex-end"
      }} onPress={() => {
          alert('implement filter and sort')
      }}>
          <Text style={{
              textAlign: "right",
          }}>
              Sort + filter
          </Text>
          <Icon
              name="arrow-down"
              size={20}
              style={{
                    marginLeft: 10,
                  color: theme.colors.blue,
              }}
          />
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
              style={{
                  marginLeft: 'auto',
                  marginRight: 'auto'
              }}
            onPress={() => {
              if (item.document_access_type === 'private') {
                setModalVisible({open: true, type: 'grant'});
                setGrantAccessDetail({document: item.document_name, owner: item.owner});
              }
            }}>
            <View style={styles.itemContainer}>

        <View style={{
            flex: 1,
            margin: 3,
            backgroundColor: theme.colors.white,
            borderRadius: 3,
            elevation: 5,
            paddingBottom: 10,
            paddingTop: 10,
            paddingLeft: 10
        }}>
        <Image
                  source={require('../images/pdf.png')}
                  style={{width: '80%', height: '80%', marginRight: 'auto', marginLeft: 'auto'}}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    marginTop: 10,
                    fontWeight: 'bold',
                      fontSize: 16,
                    color: theme.colors.blue,
                      width: '85%'
                  }} numberOfLines={1} ellipsizeMode={'tail'}>
                  {item.document_name}
                </Text>
                <Text
                  style={{left: 5, fontSize: 12, color: theme.colors.black}}>
                  By:- {item.document_ownerid.username}
                </Text>
                <Icon
                  name={item.document_access_type === 'private' ? 'lock' : 'eye'}
                  size={20}
                  style={{marginLeft: 'auto', marginRight: 10, bottom: 25}}
                  color={theme.colors.black}
                />
              </View>
            </View>
          </TouchableOpacity>

      )}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />
      <Icon
        name="plus-circle"
        size={60}
        style={{
          color: theme.colors.blue,
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
        onPress={() => {
          setModalVisible({open: true, type: 'add'});
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.open}
        onRequestClose={() => {
          setModalVisible({open: false, type: ''});
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: theme.dark
              ? 'rgba(0,0,0,0.7)'
              : 'rgba(255,255,255,0.7)',
          }}
        />
        <DotComponent />
        <ThreadComponent />
        <ImageComponent />
        {modalVisible.type === 'add' ? (
          <AddDocumentModal Close={() => {setModalVisible({open: false, type: ''})}} />
        ) : (
          <GrantAccessModal DocumentDetail={grantAccessDetail} />
        )}
      </Modal>
    </SafeAreaView>
  );
};
export default LandingPage ;
