import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Api} from '../Providers/api';
import {useTheme} from '@react-navigation/native';
const api = new Api();
const SwipeToDelete = () => {
  const theme = useTheme();
  React.useEffect(() => {
    myDocuments();
  }, []);
  const [docs, setDocs] = React.useState([]);
  const myDocuments = () => {
    let param = '';
    api
      .getAsyncData('loginData')
      .then((res) => {
        if (res) {
          console.log(res);
          param = '/document-detail/' + res.user_id;
          api
            .getApi(param)
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                res
                  .json()
                  .then((response) => {
                    console.log('Response->', response);
                    let temp = [];
                    for (let i = 0; i < response.length; i++) {
                      temp.push(response[i]);
                    }
                    setDocs(temp);
                    console.log('Documents->', docs);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                console.log(res);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...docs];
    const prevIndex = docs.findIndex((item) => item.document_id === rowKey);
    newData.splice(prevIndex, 1);
    setDocs(newData);
  };

  const onRowDidOpen = (rowKey) => {
    // console.log('This row opened', rowKey);
  };

  const renderItem = (docs) => {
    console.log(docs);
    return (
      <TouchableHighlight
        onPress={() => console.log('You touched me')}
        style={styles.rowFront}
        underlayColor={'#AAA'}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: theme.colors.blue,
              borderRadius: 100,
              marginHorizontal: 20,
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {docs.item.document_name}{' '}
              <Text style={{fontSize: 12, fontWeight: 'normal'}}>
                ({docs.item.document_access_type})
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 12,
              }}>
              {docs.item.document_semester} Sem {docs.item.document_year} Yr
            </Text>
            <Text
              style={{
                fontSize: 12,
              }}>
              {docs.item.create_date}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      {/*<Text>Left</Text>*/}
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {docs.length === 0 ? (
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            marginTop: 50,
            fontSize: 18,
          }}>
          No Documents found
        </Text>
      ) : null}
      <SwipeListView
        data={docs}
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
};

export default SwipeToDelete;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
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
    // backgroundColor: '#DDD',
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
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
