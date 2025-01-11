// import {View, Text, StyleSheet} from 'react-native'
// import React, { FunctionComponent } from 'react'
// import { NativeViewGestureHandler } from 'react-native-gesture-handler'
// import ScalePress from '@components/ui/ScalePress'
// import { navigate } from '@utils/NavigationUtils'
// import { Image } from 'react-native'
// import CustomText from '@components/ui/CustomText'
// import { Fonts } from '@utils/Constants'


// const CategoryContainer:FunctionComponent<{data:any}> = ({data}) => {

//     const renderItems = (items: any[]) => {
//         return (
//         <>{items.map((item, index) => {
//             return (
//                 <ScalePress onPress={()=>navigate('ProductCategories')} key={index} style={styles.item}>
//                     <View style={styles.imageContainer}>
//                         <Image source={item.image} style={styles.image} />
//                     </View>
//                     <CustomText style={styles.text} variant='h8' fontFamily={Fonts.Medium}></CustomText>
//                 </ScalePress>
//             )
//         })}</>)
//     }
//     return (
//         <View style={styles.container}>
//             <View style={styles.row}>{renderItems(data?.slice(0,4))}</View>
//             <View style={styles.row}>{renderItems(data?.slice(4))}</View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container:{
//         marginVertical:15
//     },
//     row: {
//         flexDirection:'row',
//         justifyContent:'space-between',
//         alignItems:'baseline',
//         flexWrap: 'wrap',
//         marginBottom:25
//     },
//     text: {
//         textAlign:'center'
//     },
//     item: {
//         width:'22%',
//         justifyContent:'center',
//         alignItems:'center'
//     },
//     imageContainer: {
//         width:'100%',
//         height:80,
//         justifyContent:'center',
//         alignItems:'center',
//         borderRadius:10,
//         padding:6,
//         backgroundColor:"#E5F3F3",
//         marginBottom:8
//     },
//     image: {
//         width:'100%',
//         height:'100%',
//         resizeMode:'contain'
//     }
// })

// export default CategoryContainer


import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import React, { FunctionComponent } from 'react';
import ScalePress from '@components/ui/ScalePress';
import { navigate } from '@utils/NavigationUtils';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';

const { width } = Dimensions.get('window'); // Get screen width

const CategoryContainer: FunctionComponent<{ data: any }> = ({ data }) => {

  const renderItem = ({ item, index }: any) => {
    return (
      <ScalePress onPress={() => navigate('ProductCategories')} key={index} style={styles.item}>
        <View style={styles.imageContainer}>
          {/* Ensure the image source is properly handled */}
          <Image source={item.image} style={styles.image} />
        </View>
        <CustomText style={styles.text} variant="h8" fontFamily={Fonts.Medium}>
          {item.title}
        </CustomText>
      </ScalePress>
    );
  };

  return (
    <View style={styles.container}>
      {/* Using FlatList for performance and static positioning */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Use unique identifier if possible
        numColumns={4} // This will create 4 items per row
        contentContainerStyle={styles.row} // Apply the row style to the FlatList content container
        showsVerticalScrollIndicator={false} // Optional: Hides the vertical scrollbar
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow container to take up full screen space
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',  // Ensures the items wrap to the next row when necessary
    marginBottom: 25,
  },
  text: {
    textAlign: 'center',
  },
  item: {
    width: (width - 30) / 4, // Adjust width to fit 4 items across the screen with margins
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Added margin for spacing
  },
  imageContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 6,
    backgroundColor: '#E5F3F3',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default CategoryContainer;
