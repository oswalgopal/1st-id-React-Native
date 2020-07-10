import React from 'react';
import {Text, View, TouchableOpacity, ScrollView, Dimensions, Image} from "react-native";
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import {lightTheme} from "../Theme/lightTheme";
const ScanDocuments = () => {
    const [hasPermission, setHasPermission] = React.useState(null);
    const [type, setType] = React.useState(Camera.Constants.Type.back);
    const [imageUrl, setImageUrl] = React.useState('');
    const cameraRef = React.useRef(null);

    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    const capture = async () => {
            let image = await cameraRef.current.takePictureAsync();
            console.log(image)
        setImageUrl(image.uri);
    }
    return (
        <View style={{ flex: 1}}>
            <Camera
                style={{
                    flex: 1,
                }}
                type={type}
                ref={cameraRef}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        position: "absolute",
                        bottom: 10,
                        width: '100%',
                        padding: 10,
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Icon
                            name={'repeat'}
                            size={50}
                            color={lightTheme.colors.white}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                        }}
                        onPress={capture}>
                        <Icon
                            name={'circle'}
                            size={50}
                            color={lightTheme.colors.white}
                        />
                    </TouchableOpacity>
                    <View style={{
                        width: 50,
                        backgroundColor: 'red'
                    }}>
                    <ScrollView>
                        <Image source={{
                            uri: imageUrl
                        }}
                               style={{
                                   width: 50,
                                   height: 50
                               }}
                               width={50}
                               height={50}
                        />
                    </ScrollView>
                </View>
                </View>
            </Camera>
        </View>
    );
};

export default ScanDocuments;
