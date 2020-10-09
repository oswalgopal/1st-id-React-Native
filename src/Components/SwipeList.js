import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
const api = new Api();
import {useTheme} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Api} from '../Providers/api';
import Spinner from 'react-native-loading-spinner-overlay';

export default function SwipeList() {
  const [listData, setListData] = useState([]);
  const [loader, setLoader] = React.useState(false);
  const [user_id, setUserId] = React.useState('');

  React.useEffect(() => {
    api
      .getAsyncData('loginData')
      .then((res) => {
        if (res) {
          console.log(res);
          setUserId(res.user_id);
          getNotification(res.user_id);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getNotification = (user_id) => {
    setLoader(true);
    const param = '/notifications/' + user_id;
    console.log(param);
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
              setListData(response);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log(res);
          api.showToaster('Could not fetch data ' + res.status);
        }
      })
      .catch((err) => {
        setLoader(false);
        api.showToaster('Could Not Fetch Data');
        console.log(err);
      });
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const theme = useTheme();
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => console.log('You touched me')}
      style={{
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: theme.colors.blue,
        margin: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: 80,
        elevation: 5,
      }}
      underlayColor={'#AAA'}>
      <View>
        <Icon
          name="user-circle"
          size={40}
          color={theme.colors.blue}
          style={{left: 10, top: 10}}
        />
        <Text style={{left: 80, bottom: 20, textTransform: 'capitalize'}}>
          {data.item.notification_label}
        </Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      {/* <Text style={{fontWeight:'bold'}}>Right -></Text> */}
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}>
        <Icon name="times-circle" size={25} color="#fff" />
        <Text style={styles.backTextWhite}>Reject</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}>
        <Icon name="check-circle" size={25} color="#fff" />
        <Text style={styles.backTextWhite}>Accept</Text>
      </TouchableOpacity>
    </View>
  );

  const deleteNotification = (notification_id) => {
    const param = 'deleteNotification/' + notification_id;
    api
      .deleteApi(param)
      .then((res) => {
        if (res.status === 200) {
          res
            .json()
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={loader}
        textContent={'Please wait ...'}
        textStyle={{
          color: '#fff',
        }}
      />
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    // alignItems: 'center',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#0080FE',
    margin: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 80,
    elevation: 5,
  },
  rowBack: {
    alignItems: 'center',
    // backgroundColor: '#F8F800',
    flex: 1,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    height: 80,
  },
  backRightBtnLeft: {
    backgroundColor: 'red',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'blue',
    right: 0,
  },
});
