import {View, Text, StyleSheet, ImageBackground} from 'react-native'
import React, { FunctionComponent } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { screenWidth } from '@utils/Scaling'
import Carousel from 'react-native-reanimated-carousel'
import { adData } from '@utils/dummyData'
import { Image } from 'react-native'
import ScalePress from '@components/ui/ScalePress'



const AdCarousal:FunctionComponent<{adData:any}> = ({adData}) => {
    const progressValue = useSharedValue(0)
    const baseOptions={
        vertical:false,
        width:screenWidth,
        height:screenWidth*0.5
    }
    return (
        <View style={{left:-20,marginVertical:20}}>
            {/* <Carousel 
            {...baseOptions}
            loop
            pagingEnabled
            snapEnabled
            autoPlay
            autoPlayInterval={3000}
            mode='parallax'
            // mode="default"
            data={adData}
            modeConfig={{
                // parallaxScrollingOffset: 0.94,
                // parallaxScrollingOffset: parseFloat((0.94).toFixed(3)),
                parallaxScrollingOffset: 0,

                parallaxScrollingScale:0.94,
            }}
            renderItem={({item}: any) => {
                return(
                    <ScalePress style={styles.imageContainer}>
                    <Image
                    source={item}
                    style={styles.img}
                    />
                    </ScalePress>
                )
            }}
            /> */}
            <Carousel
            {...baseOptions}
            loop
            pagingEnabled
            snapEnabled
            autoPlay
            autoPlayInterval={3000}
            mode={"default" as any }// Change to default mode
            // mode="parallax"
            // modeConfig={{
            //     parallaxScrollingOffset: 0,

            //     parallaxScrollingScale:0.94,
            // }}
            
            data={adData}
            renderItem={({ item }: any) => {
                
                return (
                    <ScalePress style={styles.imageContainer}>
                    <Image source={item} style={styles.img} />
                    </ScalePress>
                )
            }}
            />

        </View>
    )
}

const styles=StyleSheet.create({
    imageContainer: {
        width:'100%',
        height:'100%'
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20

    }
})

export default AdCarousal