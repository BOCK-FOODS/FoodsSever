import {View, Text, ViewStyle, StyleSheet, SafeAreaView} from 'react-native'
import React, { FunctionComponent, ReactNode } from 'react'

interface CustomSafeAreaViewProps{
    children:ReactNode,
    style?:ViewStyle
}

const CustomSafeAreaView: 
FunctionComponent<CustomSafeAreaViewProps> 
= ({children,style}) => {
    return (
        <SafeAreaView style={[styles.container,style]}>
            <View style={[styles.container, style]}>{children}</View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    }
})

export default CustomSafeAreaView