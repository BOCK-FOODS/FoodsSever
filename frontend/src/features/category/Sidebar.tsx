import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, { FunctionComponent, useEffect, useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '@utils/Constants';

interface SidebarProps{
    selectedCategory:any;
    categories:any;
    onCategoryPress:(category:any)=>void
}

const Sidebar:FunctionComponent<SidebarProps> = ({selectedCategory,categories,onCategoryPress}) => {
    const scrollViewRef = useRef<ScrollView>(null)
    const indicatorPosition = useSharedValue(0)
    const animatedValues = categories?.map(()=>useSharedValue(0))


    useEffect(()=>{
        let targetIndex = -1;

        categories?.forEach((category:any,index:number)=>{
            const isSelected = selectedCategory?._id === category?._id 
            animatedValues[index].value = withTiming(isSelected?2:-15,{duration:500})
            if (isSelected) targetIndex = index
        });

        if(targetIndex !== -1) {
            indicatorPosition.value = withTiming(targetIndex*100, {duration:500})
            runOnJS(()=> {
                scrollViewRef.current?.scrollTo({
                    y: targetIndex * 100,
                    animated: true
                })
            })
        }
    },[selectedCategory])

    const indicatorStyle = useAnimatedStyle(()=>({
        transform:[{translateY: indicatorPosition.value}]
    }))



    return (
        <View style={styles.sideBar}>
            <ScrollView ref={scrollViewRef} 
            contentContainerStyle={{paddingBottom:50}} 
            showsVerticalScrollIndicator={false}>

                <Animated.View style={[styles.indicator, indicatorStyle]} />

                <Animated.View>
                    {categories?.map((category:any,index:number)=>{


                        const animatedStyle = useAnimatedStyle(() => ({
                            bottom: animatedValues[index].value
                        }))


                        return(
                            <TouchableOpacity 
                            key={index}
                            activeOpacity={1}
                            style={styles.categoryButton}
                            onPress={()=>onCategoryPress(category)}>
                                <View style={[styles.imageContainer
                                    ,selectedCategory?.id === category?._id && styles.selectedImageContainer
                                ]}>
                                    <Animated.Image 
                                    source={{uri:category.image}}
                                    style={[styles.image, animatedStyle]}
                                    />

                                </View>
                                <CustomText 
                                fontSize={RFValue(7)} 
                                style={{textAlign:'center'}}
                                >
                                    {category?.name}
                                </CustomText>

                            </TouchableOpacity>
                        )
                    })}
                </Animated.View>

            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    sideBar:{
        width:'24%',
        backgroundColor:'#fff',
        borderRightWidth:0.8,
        borderRightColor:'#eee',
        position:'relative'
    },
    categoryButton:{
        padding:10,
        height:100,
        paddingVertical:0,
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
    },
    imageContainer:{
        borderRadius:100,
        height:'50%',
        marginBottom:10,
        width:'75%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#F3F4F7",
        overflow:'hidden'
    },
    image:{
        width:'80%',
        height:'80%',
        resizeMode:'contain'
    },
    selectedImageContainer: {
        backgroundColor:"#CFFFDB"
    },
    indicator:{
        position:'absolute',
        right:0,
        width:4,
        height:80,
        top:10,
        alignSelf:'center',
        backgroundColor:Colors.secondary,
        borderTopLeftRadius:15,
        borderBottomLeftRadius:15
    }
})

export default Sidebar

// import { View, StyleSheet, TouchableOpacity } from 'react-native';
// import React, { FunctionComponent, useEffect, useRef } from 'react';
// import { ScrollView } from 'react-native-gesture-handler';
// import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
// import CustomText from '@components/ui/CustomText';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { Colors } from '@utils/Constants';

// interface SidebarProps {
//     selectedCategory: any;
//     categories: any;
//     onCategoryPress: (category: any) => void;
// }

// const Sidebar: FunctionComponent<SidebarProps> = ({ selectedCategory, categories, onCategoryPress }) => {
//     const scrollViewRef = useRef<ScrollView>(null);
//     const indicatorPosition = useSharedValue(0);
//     const animatedValues = useRef(categories?.map(() => useSharedValue(0))).current;

//     useEffect(() => {
//         let targetIndex = -1;

//         categories?.forEach((category: any, index: number) => {
//             const isSelected = selectedCategory?._id === category?._id;
//             animatedValues[index].value = withTiming(isSelected ? 2 : -15, { duration: 500 });
//             if (isSelected) targetIndex = index;
//         });

//         if (targetIndex !== -1) {
//             indicatorPosition.value = withTiming(targetIndex * 100, { duration: 500 });
//             runOnJS(() => {
//                 scrollViewRef.current?.scrollTo({
//                     y: targetIndex * 100,
//                     animated: true,
//                 });
//             })();
//         }
//     }, [selectedCategory, categories, animatedValues]);

//     const indicatorStyle = useAnimatedStyle(() => ({
//         transform: [{ translateY: indicatorPosition.value }],
//     }));

//     return (
//         <View style={styles.sideBar}>
//             <ScrollView
//                 ref={scrollViewRef}
//                 contentContainerStyle={{ paddingBottom: 50 }}
//                 showsVerticalScrollIndicator={false}>
//                 <Animated.View style={[styles.indicator, indicatorStyle]} />

//                 {categories?.map((category: any, index: number) => {
//                     const animatedStyle = useAnimatedStyle(() => ({
//                         bottom: animatedValues[index].value,
//                     }));

//                     const isSelected = selectedCategory?._id === category?._id;

//                     return (
//                         <TouchableOpacity
//                             key={category._id} // Use unique ID for keys
//                             activeOpacity={1}
//                             style={styles.categoryButton}
//                             onPress={() => onCategoryPress(category)}>
//                             <View
//                                 style={[
//                                     styles.imageContainer,
//                                     isSelected && styles.selectedImageContainer,
//                                 ]}>
//                                 <Animated.Image
//                                     source={{ uri: category.image }}
//                                     style={[styles.image, animatedStyle]}
//                                 />
//                             </View>
//                             <CustomText fontSize={RFValue(7)} style={{ textAlign: 'center' }}>
//                                 {category?.name}
//                             </CustomText>
//                         </TouchableOpacity>
//                     );
//                 })}
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     sideBar: {
//         width: '24%',
//         backgroundColor: '#fff',
//         borderRightWidth: 0.8,
//         borderRightColor: '#eee',
//         position: 'relative',
//     },
//     categoryButton: {
//         padding: 10,
//         height: 100,
//         paddingVertical: 0,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//     },
//     imageContainer: {
//         borderRadius: 100,
//         height: '50%',
//         marginBottom: 10,
//         width: '75%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F3F4F7',
//         overflow: 'hidden',
//     },
//     image: {
//         width: '80%',
//         height: '80%',
//         resizeMode: 'contain',
//     },
//     selectedImageContainer: {
//         backgroundColor: '#CFFFDB',
//     },
//     indicator: {
//         position: 'absolute',
//         right: 0,
//         width: 4,
//         height: 80,
//         top: 10,
//         alignSelf: 'center',
//         backgroundColor: Colors.secondary,
//         borderTopLeftRadius: 15,
//         borderBottomLeftRadius: 15,
//     },
// });

// export default Sidebar;


// import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
// import CustomText from '@components/ui/CustomText';
// import { RFValue } from 'react-native-responsive-fontsize';
// import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
// import { Colors } from '@utils/Constants';

// interface SidebarProps {
//     selectedCategory: any;
//     categories: any;
//     onCategoryPress: (category: any) => void;
// }

// const Sidebar: FunctionComponent<SidebarProps> = ({ selectedCategory, categories, onCategoryPress }) => {
//     const scrollViewRef = useRef<ScrollView>(null);
//     const indicatorPosition = useSharedValue(0);

//     useEffect(() => {
//         const targetIndex = categories.findIndex((category: any) => category._id === selectedCategory._id);
//         if (targetIndex !== -1) {
//             indicatorPosition.value = withTiming(targetIndex * 100, { duration: 500 });
//             scrollViewRef.current?.scrollTo({
//                 y: targetIndex * 100,
//                 animated: true,
//             });
//         }
//     }, [selectedCategory, categories]);

//     const indicatorStyle = useAnimatedStyle(() => ({
//         transform: [{ translateY: indicatorPosition.value }],
//     }));

//     return (
//         <View style={styles.sideBar}>
//             <ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
//                 <Animated.View style={[styles.indicator, indicatorStyle]} />
//                 <Animated.View>
//                     {categories?.map((category: any, index: number) => {
//                         const isSelected = selectedCategory._id === category._id;

//                         return (
//                             <TouchableOpacity
//                                 key={index}
//                                 activeOpacity={1}
//                                 style={styles.categoryButton}
//                                 onPress={() => onCategoryPress(category)}>
//                                 <View style={[styles.imageContainer, isSelected && styles.selectedImageContainer]}>
//                                     <Image source={{ uri: category.image }} style={styles.image} />
//                                 </View>
//                                 <CustomText fontSize={RFValue(7)} style={{ textAlign: 'center' }}>
//                                     {category?.name}
//                                 </CustomText>
//                             </TouchableOpacity>
//                         );
//                     })}
//                 </Animated.View>
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     sideBar: {
//         width: '24%',
//         backgroundColor: '#fff',
//         borderRightWidth: 0.8,
//         borderRightColor: '#eee',
//         position: 'relative',
//     },
//     categoryButton: {
//         padding: 10,
//         height: 100,
//         paddingVertical: 0,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//     },
//     imageContainer: {
//         borderRadius: 100,
//         height: '50%',
//         marginBottom: 10,
//         width: '75%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F3F4F7',
//         overflow: 'hidden',
//     },
//     image: {
//         width: '80%',
//         height: '80%',
//         resizeMode: 'contain',
//     },
//     selectedImageContainer: {
//         backgroundColor: '#CFFFDB',
//     },
//     indicator: {
//         position: 'absolute',
//         right: 0,
//         width: 4,
//         height: 80,
//         top: 10,
//         alignSelf: 'center',
//         backgroundColor: Colors.secondary,
//         borderTopLeftRadius: 15,
//         borderBottomLeftRadius: 15,
//     },
// });

// export default Sidebar;

