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
  TouchableOpacity,
  RefreshControl,
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
import Pdf from 'react-native-pdf';
import Spinner from 'react-native-loading-spinner-overlay';
const api = new Api();
const LandingPage = (props) => {
  React.useEffect(() => {
    api
      .getAsyncData('loginData')
      .then((res) => {
        if (res) {
          console.log(res);
          setUserId(res.user_id);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getData();
  }, []);
  const theme = useTheme();
  const numColumns = 2;
  const size = Dimensions.get('window').width / numColumns - 15;
  const [modalVisible, setModalVisible] = React.useState({
    open: false,
    type: '',
  });
  const [grantAccessDetail, setGrantAccessDetail] = React.useState({
    document: '',
    owner: '',
    document_id: '',
  });
  const [data, setData] = React.useState([]);
  const [user_id, setUserId] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [loader2, setLoader2] = React.useState(false);
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
    setLoader(true);
    const param = '/document-list/';
    api
      .getApi(param)
      .then((res) => {
        console.log(res);
        setLoader(false);
        if (res.status === 200) {
          res
            .json()
            .then((response) => {
              console.log('Data', response);
              let lists = response.private.concat(response.public); //joined 2 arrays
              setData(lists);
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log(res);
          api.showToaster(res);
        }
      })
      .catch((err) => {
        setLoader(false);
        api.showToaster('Could Not Fetch Data');
        console.log(err);
      });
  };

  const checkAssess = (item) => {
    setLoader2(true);
    const param = '/checkaccess/' + user_id + '/ ' + item.document_id + '/';
    console.log(param);
    api
      .getApi(param)
      .then((res) => {
        setLoader2(false);
        console.log(res);
        if (res.status === 200) {
          res.json().then((response) => {
            console.log(response);
            if (response.exist) {
              props.navigation.navigate('pdfViewer', {
                pdfUrl: response.document_url,
              });
            } else {
              setModalVisible({open: true, type: 'grant'});
              setGrantAccessDetail({
                document: item.document_name,
                owner: item.document_ownerid.username,
                document_id: item.document_id,
              });
            }
          });
        } else if (res.status === 400) {
          res.json().then((response) => {
            if (response === 'Sorry Access is not given') {
              setModalVisible({open: true, type: 'grant'});
              setGrantAccessDetail({
                document: item.document_name,
                owner: item.document_ownerid.username,
                document_id: item.document_id,
              });
            }
          });
        }
      })
      .catch((error) => {
        setLoader2(false);
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, paddingBottom: 20}}>
      <SearchComponent />
      <Spinner
        visible={loader2}
        textContent={'Checking Access ...'}
        textStyle={{
          color: '#fff',
        }}
      />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 10,
          marginTop: 10,
          justifyContent: 'flex-end',
        }}
        onPress={() => {
          alert('implement filter and sort');
        }}>
        <Text
          style={{
            textAlign: 'right',
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
        refreshControl={
          <RefreshControl
            refreshing={loader}
            onRefresh={() => {
              getData();
            }}
          />
        }
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            onPress={() => {
              if (item.document_access_type === 'private') {
                checkAssess(item);
              } else {
                props.navigation.navigate('pdfViewer', {
                  pdfUrl: item.document_url,
                });
              }
            }}>
            <View style={styles.itemContainer}>
              <View
                style={{
                  flex: 1,
                  margin: 3,
                  backgroundColor: theme.colors.white,
                  borderRadius: 3,
                  elevation: 5,
                  paddingBottom: 10,
                  paddingTop: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                <Pdf
                  page={0}
                  source={{uri: item.document_url}}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`current page: ${page}`);
                  }}
                  onError={(error) => {
                    console.log(error);
                  }}
                  onPressLink={(uri) => {
                    console.log(`Link presse: ${uri}`);
                  }}
                  style={{
                    width: '100%',
                    height: '80%',
                    // paddingBottom: 50,
                  }}
                  fitWidth={true}
                />
                {/*<Image*/}
                {/*  source={require('../images/pdf.png')}*/}
                {/*  style={{*/}
                {/*    width: '80%',*/}
                {/*    height: '80%',*/}
                {/*    marginRight: 'auto',*/}
                {/*    marginLeft: 'auto',*/}
                {/*  }}*/}
                {/*/>*/}
                <Text
                  style={{
                    marginLeft: 5,
                    marginTop: 10,
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: theme.colors.blue,
                    width: '85%',
                    textTransform: 'capitalize',
                  }}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>
                  {item.document_name}
                </Text>
                <Text
                  style={{left: 5, fontSize: 12, color: theme.colors.black}}>
                  By:-{' '}
                  {item.document_ownerid.user_id === user_id
                    ? 'You'
                    : item.document_ownerid.username}
                </Text>
                <Icon
                  name={
                    item.document_access_type === 'private' ? 'lock' : 'eye'
                  }
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
          <AddDocumentModal
            Close={() => {
              getData();
              setModalVisible({open: false, type: ''});
            }}
          />
        ) : (
          <GrantAccessModal
            Close={() => {
              setModalVisible({open: false, type: ''});
            }}
            DocumentDetail={grantAccessDetail}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
};
export default LandingPage;
