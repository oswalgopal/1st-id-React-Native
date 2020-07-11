import React from 'react';
import {Image, View, ScrollView} from "react-native";

const ScannedImages = (props) => {
    return (
        <View>
        <ScrollView>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
            {
                props.route.params.images.map(item => (
                    <Image source={{
                        uri: item
                    }}
                           style={{
                               height: 150,
                               margin: 10,
                               width: '48%',
                               marginLeft: 'auto',
                               marginRight: 'auto'
                           }}
                           width={150}
                           height={150}
                    />
                ))
            }
            </View>
        </ScrollView>
        </View>
    );
};

export default ScannedImages;
