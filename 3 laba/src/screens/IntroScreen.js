import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import * as ImagePicker from 'expo-image-picker'
import * as Permission from 'expo-permissions'

export const IntroScreen = ({navigation}) => {

    async function askForPermission() {
        const {status} = await Permission.askAsync(
            Permission.CAMERA,
            Permission.CAMERA_ROLL
        );
        if (status !== 'granted') {
            Alert.alert('К сожалению, у вас нет прав!');
            return false
        }
        return true
    }

    const takePhotoHandler = async () => {
        const hasPermissions = await askForPermission();
        if (!hasPermissions) {
            return
        }

        const img = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: true,
            aspect: [3, 4]
        });

        navigation.navigate('Review', {image: img.uri})
    };

    return (
        <View style={styles.container}>
                <Text style={styles.text}>Фотонож</Text>
                <Text style={styles.textLow}>Приложение для обрезки фотографий</Text>
                <TouchableOpacity
                    style={styles.goButton}
                    onPress={takePhotoHandler}
                >
                    <Text style={styles.goButtonText}>Сделать фотографию</Text>
                </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#545454'
    },
    text: {
        color: '#751236',
        fontSize: 32
    },
    textLow: {
        color: '#a5fdf9',
        fontSize: 16
    },
    goButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#f55f55',
        padding: 10,
        width: '50%',
        marginTop: 20
    },
    goButtonText: {
        color: '#ff9999',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});