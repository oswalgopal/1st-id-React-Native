import AsyncStorage from '@react-native-community/async-storage';
import {Alert, Platform, ToastAndroid} from 'react-native';
export class Api {
  serverPath = 'http://13.235.174.237';
  // serverPath='http://ed79b417ed3b.ngrok.io';
  /**
   * function to call the get api
   * @param: url which we will be hitting the get api
   */
  async getApi(param) {
    // let token = null;
    var myHeaders = new Headers();
    await this.getAsyncData('loginData')
      .then(res => {
        if (res) {
          let token = res.auth_token;
          myHeaders.set('Authorization', token);
        }
      })
      .catch(err => {
        console.log(err);
      });
    return fetch(this.serverPath + param, {
      method: 'GET',
      headers: myHeaders,
    })
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  }

  async postApi(param) {
    console.log(param);
    // let token = null;
    var myHeaders = new Headers();
    myHeaders.set('Accept', 'application/json');
    myHeaders.set('Content-Type', 'application/json');
    await this.getAsyncData('loginData')
      .then(res => {
        if (res) {
          let token = res.auth_token;
          myHeaders.set('Authorization', token);
        }
      })
      .catch(err => {
        console.log(err);
      });
    return fetch(this.serverPath + param.api, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(param.data),
    })
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  }
  async postFormDataApi(param) {
    console.log(param);
    // let token = null;
    var myHeaders = new Headers();
    // myHeaders.set('Accept', 'application/json');
    // myHeaders.set('Content-Type', 'application/json');
    await this.getAsyncData('loginData')
        .then(res => {
          if (res) {
            let token = res.auth_token;
            myHeaders.set('Authorization', token);
          }
        })
        .catch(err => {
          console.log(err);
        })
    console.log(this.serverPath + param.api);
    console.log('data', param.data);
    return fetch(this.serverPath + param.api, {
      method: 'POST',
      headers: myHeaders,
      body: param.data,
    })
        .then(res => {
          return res;
        })
        .catch(err => {
          return err;
        });
  }
  async deleteApi(param){
    // let token = null ;
    var myHeaders = new Headers();
    await this.getAsyncData('loginData')
     .then(res => {
        if (res) {
          let token = res.auth_token;
          myHeaders.set('Authorization', token);
        }
      })
      .catch(err => {
        console.log(err);
      });
    return fetch(this.serverPath + param ,{
      method: 'DELETE',
      headers: myHeaders
    })
    .then(res => {
        return res;
      })
    .catch(err => {
        return err;
      });
  }
  /**
   * function for the PUT api
   * @param: api: name of the api to be hit
   * @parma: data: data to be sent to the post api
   */
  async putApi(param) {
    // let token = null;
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');
    await this.getAsyncData('loginData')
      .then(res => {
        if (res) {
          let token = res.auth_token;
          myHeaders.set('Authorization', token);
        }
      })
      .catch(err => {
        console.log(err);
      });
    console.log(param);
    console.log(myHeaders);
    return fetch(this.serverPath + param.api, {
      method: 'PUT',
      body: JSON.stringify(param.data),
      headers: myHeaders,
    })
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  /***
   * function to set the data in async storage
   */
  setAsyncData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      this.showAlert('Error', error);
    }
  };
  /***
   * function to get the data in async storage
   */
  getAsyncData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    }
    catch (error) {
      this.showAlert('Error', error);
      return error;
      // Error retrieving data
    }
  };
  /**
   * function to clear the async storage
   */
  clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      this.showAlert('Error', error);
    }
  };

  /**
   * function to show the alert
   * @param title: title for the alert
   * @param message: message for the alert
   */
  showAlert(title, message) {
    Alert.alert(title, message);
  }

  /***
   * function to show the toaster
   */
  showToaster = message => {
    if (Platform.OS === 'ios') {
      this.showAlert('Error!', message);
    } else {
      ToastAndroid.show(message, ToastAndroid.CENTER, ToastAndroid.CENTER);
    }
  };
}
