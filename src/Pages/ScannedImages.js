import React from 'react';
import {Image, View, ScrollView, TouchableOpacity, Text, Dimensions} from "react-native";
import RNImageToPdf from 'react-native-image-to-pdf';
import {lightTheme} from "../Theme/lightTheme";

const ScannedImages = (props) => {
    const makePdf = async () => {
        // console.log(props.route.params.images);
        const temp = [];
        for (let i =0 ; i < props.route.params.images.length ; i++) {
            const img = props.route.params.images[i].slice(7, props.route.params.images[i].length)
            temp.push(img);
        }
        // console.log('temp', temp);
        try {
            const options = {
                imagePaths:
                    temp,
                name:  'Scanned Name',
        };
            // console.log(options);
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
