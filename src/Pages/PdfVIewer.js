import React from 'react';
import Pdf from "react-native-pdf";
import {View, TouchableOpacity, Text} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
const PdfVIewer = (props) => {
    return (
        <View style={{
            flex: 1
        }}>
        <Pdf
            page={0}
            source={{uri: props.route.params.pdfUrl}}
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
                console.log(`Link presse: ${uri}`)
            }}
            style={{
                width: '100%',
                height: '100%',
                paddingBottom: 50
            }}
            fitWidth={true}
        />
            <View style={{
                position: "absolute",
                bottom: 0,
                width: '100%',
                height: 50,
                backgroundColor: 'blue',
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center"
            }}>
                <TouchableOpacity style={{
                    width: '30%',
                    height: 35,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                }}>
                    <Icon name={'save'} size={15} color={'#000'}/>
                    <Text style={{
                        marginLeft: 5,
                        fontWeight: "bold"
                    }}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '30%',
                    height: 35,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                }}>
                    <Icon name={'file'} size={15} color={'#000'}/>
                    <Text style={{
                        marginLeft: 5,
                        fontWeight: "bold"
                    }}>Documents</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '30%',
                    height: 35,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                }}>
                    <Icon name={'share'} size={15} color={'#000'}/>
                    <Text style={{
                        marginLeft: 5,
                        fontWeight: "bold"
                    }}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PdfVIewer;
