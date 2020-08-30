import React from 'react';
import Pdf from "react-native-pdf";
import {View, Share, TouchableOpacity, Text} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import S3 from "aws-sdk/clients/s3";
import {Api} from "../Providers/api";
const fs = require('react-native-fs');
const api = new Api();
const PdfVIewer = (props) => {
    const [uploadType, setUpload] = React.useState(false);
    const [s3docUrl, setS3DocUrl] = React.useState('');
    const shareDocument = async () => {
        try {
            if (uploadType) {

            } else {
                await upload(props.route.params.pdfUrl)
            }
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const upload = async uri => {
        console.log('upload function called');
        let arrayBuffer;
        const base64 = await fs.readFile(uri, 'base64').then(res => {
            console.log('res', res);
            arrayBuffer = _base64ToArrayBuffer(res);
            console.log('arrayBuffer ', arrayBuffer);
            console.log('base64 ', base64);
            // const arrayBuffer = _base64ToArrayBuffer(base64);
            // console.log('arrayBuffer ', arrayBuffer);
            uploadFunction(arrayBuffer);
        }).catch(error => {
            console.log(error);
            api.showToaster('couldnot upload the pdf to cloud');
        });
    }

    const uploadFunction = (arrayBuffer) => {
        console.log('upload started');
        const s3bucket = new S3({
            accessKeyId: 'AKIAYVYWOBA4MAHIQJGS',
            secretAccessKey:'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',
            Bucket: '1staid',
            signatureVersion:'v4',
        });
        let contentDeposition = 'inline;filename="' + 'Notespedia ' + new Date().toLocaleString() + '"';
        const params ={
            Bucket:'1staid',
            Key: 'Notespedia ' + new Date().toLocaleString(),
            Body: arrayBuffer,
            ContentDisposition: contentDeposition,
            ContentType: 'application/pdf',
            ACL: 'public-read',
        }
        s3bucket.putObject(params, (err, data) => {
            if (err) {
                console.log(err) ;
                console.log('error in callback');
            }
            console.log('success');
            console.log("Response URL : "+ data);
            console.log("data Response URL : "+ JSON.stringify(data));
        })
    }


    function _base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    const saveFile = () => {
        console.log('called save file');
        var path = fs.DocumentDirectoryPath + '/Notespedia.pdf';
        console.log(path);
        const base64 = fs.readFile(props.route.params.pdfUrl, 'base64').then(res => {
            console.log('res ', 'data:base64/' + res);
            fs.writeFile(path, res, 'base64').then(response => {
                console.log('response', response);
            }).catch(error => {
                console.log('error', error);
            })
        }).catch(error => {
            console.log(error);
        })
    }

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
                <TouchableOpacity onPress={saveFile} style={{
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
                <TouchableOpacity onPress={shareDocument} style={{
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
