import {View, Text, StyleSheet, Image, Alert} from 'react-native'
import React, { FunctionComponent, useEffect } from 'react'
import { Colors } from '@utils/Constants'
import { screenWidth, screenHeight } from '@utils/Scaling'
import Logo from '@assets/images/splash_logo.jpeg'
import Geolocation from '@react-native-community/geolocation'
import { useAuthStore } from '@state/authStore'
import { tokenStorage } from '@state/storage'
import { resetAndNavigate } from '@utils/NavigationUtils'
import { jwtDecode } from 'jwt-decode'
import { refetchUser, refresh_tokens } from '@service/authService'


Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto'
})

interface DecodedToken {
    exp: number;
}

const SplashScreen: FunctionComponent = () => {
    const { user, setUser } = useAuthStore()


    const tokenCheck = async()=>{
        const accessToken = tokenStorage.getString('accessToken') as string
        const refreshToken = tokenStorage.getString('refreshToken') as string

        if(accessToken){
            const decodedAcessToken = jwtDecode<DecodedToken>(accessToken)
            const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken)

            const currentTime = Date.now()/1000;

            if(decodedRefreshToken?.exp < currentTime){
                resetAndNavigate('CustomerLogin')
                Alert.alert("Session Expired","Please login again")
                return false
            }

            if(decodedAcessToken?.exp < currentTime){
                try{
                    refresh_tokens()
                    await refetchUser(setUser)
                }catch(error){
                    console.log(error)
                    Alert.alert("There was an error refreshing token!")
                    return false
                }
            }

            if(user?.role === 'Customer'){
                resetAndNavigate("ProductDashboard")
            }else{
                resetAndNavigate("DeliveryDashboard")
            }

            return true

        }
        resetAndNavigate("CustomerLogin")
        return false
    }

    useEffect(() => {
        const fetchUserLocation = async() => {
            try{
                Geolocation.requestAuthorization()
                tokenCheck()
            }catch(error){
                Alert.alert("Sorry we need location service to give you better shopping experience")
            }
        }
        const timeoutId = setTimeout(fetchUserLocation,1000)
        return () => clearTimeout(timeoutId)
    },[])
    return (
        <View style={styles.container}>
        <Image source={Logo} style={styles.logoImage}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage:{
        height:screenHeight * 0.7,
        width: screenWidth * 0.7,
        resizeMode: 'contain'
    }
})

export default SplashScreen