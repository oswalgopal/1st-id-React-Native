import React from 'react';
import {Image, View, ScrollView, TouchableOpacity, Text, Dimensions} from "react-native";
import RNImageToPdf from 'react-native-image-to-pdf';
import {lightTheme} from "../Theme/lightTheme";

const ScannedImages = (props) => {
    const makePdf = async () => {
        console.log(props.route.params.images);
        try {
            const options = {
                imagePaths:
                    [
                        "/data/user/0/com.notespedia/cache/Camera/bb3be46b-8507-44fd-ac9c-7df8e42d4329.jpg",
                        "/data/user/0/com.notespedia/cache/Camera/5c098b14-023f-4f6f-9adb-40d0dee2a3ad.jpg"
                    ],
                name:  'Scanned Name',
        };
            const pdf = await RNImageToPdf.createPDFbyImages(options);
            console.log(pdf);
        } catch(e) {
            console.log('error', e);
        }
    }
    return (
        <View>
            <TouchableOpacity onPress={makePdf}>
                <Text style={{
                    backgroundColor: lightTheme.colors.blue,
                    fontSize: 20,
                }}>
                        Convert To Pdf
                </Text>
            </TouchableOpacity>
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
                               height: 250,
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
