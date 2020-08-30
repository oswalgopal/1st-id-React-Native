import React from 'react';
import {Image, View, ScrollView, TouchableOpacity, Text, Dimensions, Button} from "react-native";
import RNImageToPdf from 'react-native-image-to-pdf';
import Spinner from "react-native-loading-spinner-overlay";

const ScannedImages = (props) => {
    const [pdfUrl, setPdfUrl] = React.useState('');
    const [loader, setLoader] = React.useState(false);
    const makePdf = async () => {
        setLoader(true);
        console.log(props.route.params.images);
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
                name:  'Notespedia Document ',
        };
            // console.log(options);
            const pdf = await RNImageToPdf.createPDFbyImages(options);
            console.log(pdf);
            setPdfUrl(pdf.filePath);
            props.navigation.navigate('pdfViewer', {
                pdfUrl: pdf.filePath,
                file: pdf
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
            <Spinner
                visible={loader}
                textContent={'Generating Pdf ...'}
                textStyle={{
                    color: '#fff'
                }}
            />
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
            <TouchableOpacity onPress={makePdf} style={{
                margin: 10,
                position: "absolute",
                bottom: 10,
                width: 150,
                marginLeft: Dimensions.get('screen').width / 2 - 75
            }}>
                <Button title={'Convert to Pdf'} onPress={makePdf} />
            </TouchableOpacity>
        </View>
    );
};

export default ScannedImages;
