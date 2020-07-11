import React from 'react';
import {Image, View, ScrollView, TouchableOpacity, Text, Dimensions} from "react-native";
import RNImageToPdf from 'react-native-image-to-pdf';
import {lightTheme} from "../Theme/lightTheme";
import Pdf from "react-native-pdf";

const ScannedImages = (props) => {
    const [pdfUrl, setPdfUrl] = React.useState('');
    const [loader, setLoader] = React.useState(false);
    const makePdf = async () => {
        setLoader(true);
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
            setPdfUrl(pdf.filePath);
            props.navigation.navigate('pdfViewer', {
                pdfUrl: pdf.filePath
            });
            setLoader(false);
        } catch(e) {
            console.log('error', e);
            setLoader(false);
        }
    }
    return (
        <View style={{
            flex: 1
        }}>
            <TouchableOpacity onPress={makePdf} style={{
                position: "absolute",
                bottom: 10,
                width: '100%'
            }}>
                <Text style={{
                    backgroundColor: lightTheme.colors.blue,
                    fontSize: 20,
                    color: lightTheme.colors.white,
                    padding: 10,
                    borderRadius: 5,
                    marginRight: 'auto',
                    marginLeft: 'auto'
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
