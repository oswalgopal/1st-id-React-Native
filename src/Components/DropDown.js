import React from 'react';
import {View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useTheme} from '@react-navigation/native';

const DropDown = (props) => {
   const
    return (
    <View
      style={{
        height: 40,
        alignItems: 'center',
        width: '70%',
        color: theme.colors.black,
        borderColor: theme.colors.blue,
        backgroundColor: theme.colors.white,
        borderRadius: 5,
        marginTop: 10,
        paddingLeft: 10,
      }}>
      <RNPickerSelect
        value={year}
        placeholder={props.placeholder}
        items={props.items}
        onValueChange={props.onValueChange}
      />
    </View>
  );
};
export default DropDown;
