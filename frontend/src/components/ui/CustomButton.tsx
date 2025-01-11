import { FunctionComponent } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import CustomText from "./CustomText";
import { Fonts } from "@utils/Constants";

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    disabled: boolean;
    loading: boolean;
}

const Colors = {
    secondary: '#28a745', // Green color
    disabled: '#cccccc'  // Light gray color
};

const CustomButton:
FunctionComponent<CustomButtonProps>
=({onPress,title,disabled,loading}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
            style={[styles.btn, {
                backgroundColor: disabled ? Colors.disabled: Colors.secondary
            }]}
        >
            {loading ?
                <ActivityIndicator color='white' size='small'/>:
                <CustomText variant="h6" style={styles.text} fontFamily={Fonts.SemiBold}>
                    {title}
                </CustomText>
            }

        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
        marginVertical: 15,
        width: '100%'
    },
    text: {
        color: '#fff'
    }
})

export default CustomButton