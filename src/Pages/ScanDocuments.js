import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import {lightTheme} from "../Theme/lightTheme";

const ScanDocuments = (props) => {
    const camera = React.useRef(null);
    const [flash, setFlash] = React.useState(RNCamera.Constants.FlashMode.on);
    const [cameratype, setCameraType] = React.useState(RNCamera.Constants.Type.back);
    const [imageUrl, setImageUrl] = React.useState([]);
    const takePicture = async () => {
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const data = await camera.current.takePictureAsync(options);
            console.log(data.uri);
            setImageUrl(prevState => [...prevState, data.uri]);
        }
    };
    return (
        <View style={styles.container}>
            <RNCamera
                ref={camera}
                style={styles.preview}
                type={cameratype}
                flashMode={flash}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            />
            <View style={{
                position: "absolute",
                left: 10,
                top: 20,
            }}>
                <TouchableOpacity
                    onPress={() => {
                        setCameraType(
                            cameratype === RNCamera.Constants.Type.back
                                ? RNCamera.Constants.Type.front
                                : RNCamera.Constants.Type.back
                        )
                    }}
                    style={{
                        width: 50,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 1000
                    }}>
                    <Icon name={'repeat'} size={30} color={lightTheme.colors.white}/>
                </TouchableOpacity>
            </View>
            <View style={{
                position: "absolute",
                right: 10,
                top: 20,
            }}>
                <TouchableOpacity
                    onPress={() => {
                        setFlash(
                            flash === RNCamera.Constants.FlashMode.on
                                ? RNCamera.Constants.FlashMode.off
                                : RNCamera.Constants.FlashMode.on
                        )
                    }}
                    style={{
                    width: 50,
                    height: 50,
                    backgroundColor:lightTheme.colors.blue,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 1000
                }}>
                    <Icon name={'flash'} size={30} color={ flash === RNCamera.Constants.FlashMode.off ? lightTheme.colors.white: 'yellow'}/>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => {}} style={styles.capture}>
                    {
                        imageUrl.length > 0 && (
                            <Image source={{
                                uri: imageUrl[imageUrl.length - 1]
                            }}
                                   style={{
                                       width: 50,
                                       height: 50
                                   }}
                                   width={50}
                                   height={50}
                            />
                        )
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={takePicture} style={styles.capture}>
                    <Icon name={'circle'} size={70} color={ lightTheme.colors.white}/>
                    <Icon name={'camera'} style={{
                        position: 'absolute',
                        top: 35,
                        left: 34
                    }} size={30} color={ lightTheme.colors.blue}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if (imageUrl.length > 0) {
                        props.navigation.navigate('scanImages', {
                            images: imageUrl
                        })
                    }
                }} style={styles.capture}>
                    {
                        imageUrl.length > 0 && (
                    <Icon name={'check'} size={50} color={ lightTheme.colors.white}/>
                        )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ScanDocuments;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
        width: 100
    },
});
