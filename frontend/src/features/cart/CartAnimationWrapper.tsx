// import { FunctionComponent, useEffect, useRef, useState } from "react"
// import Animated from "react-native-reanimated"
// import { hocStyles } from "styles/globalStyles"

// // import { opacity } from "react-native-reanimated/lib/typescript/Colors"


// interface CartAnimationWrapperProps{
//     cartCount:number
//     children:React.ReactNode

// }

// const CartAnimationWrapper:FunctionComponent<CartAnimationWrapperProps>=({cartCount,children}) => {

//     const slideAnim = useRef(new Animated.Value(0)).current 

//     const [hasAnimated, setHasAnimated] = useState(false)

//     useEffect(()=>{
//         if(cartCount>0 && !hasAnimated){
//             Animated.timing(slideAnim, {
//                 toValue:1,
//                 duration:300,
//                 useNativeDriver:true
//             }).start(()=>{
//                 setHasAnimated(true)
//             })
//         } else if(cartCount === 0 && hasAnimated) {
//             Animated.timing(slideAnim, {
//                 toValue:0,
//                 duration:300,
//                 useNativeDriver: true
//             }).start(()=>{
//                 setHasAnimated(false)
//             })
//         }
//     }, [cartCount, hasAnimated])

//     const slideUpStyle = {
//         transform: [
//             {
//                 translateY: slideAnim.interpolate({
//                     inputRange: [0,1],
//                     outputRange: [100, 0]
//                 })
//             }
//         ],
//         opacity:slideAnim
//     }


//     return (
//         <Animated.View style={[hocStyles.cartContainer, slideUpStyle]} >{children}</Animated.View>
//     )
// }

// export default CartAnimationWrapper


import React, { FunctionComponent, useEffect } from "react";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
} from "react-native-reanimated";
import { hocStyles } from "@styles/GlobalStyles";

interface CartAnimationWrapperProps {
    cartCount: number;
    children: React.ReactNode;
}

const CartAnimationWrapper: FunctionComponent<CartAnimationWrapperProps> = ({ cartCount, children }) => {
    const slideAnim = useSharedValue(0); // Replaces Animated.Value
    const hasAnimated = useSharedValue(false);

    useEffect(() => {
        if (cartCount > 0 && !hasAnimated.value) {
            slideAnim.value = withTiming(1, { duration: 300 }, () => {
                hasAnimated.value = true;
            });
        } else if (cartCount === 0 && hasAnimated.value) {
            slideAnim.value = withTiming(0, { duration: 300 }, () => {
                hasAnimated.value = false;
            });
        }
    }, [cartCount]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: interpolate(slideAnim.value, [0, 1], [100, 0]),
            },
        ],
        opacity: slideAnim.value,
    }));

    return (
        <Animated.View style={[hocStyles.cartContainer, animatedStyle]}>
            {children}
        </Animated.View>
    );
};

export default CartAnimationWrapper;
