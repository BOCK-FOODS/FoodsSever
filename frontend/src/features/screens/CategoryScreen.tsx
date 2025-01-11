import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Sidebar from '@features/category/Sidebar';
import CustomText from '@components/ui/CustomText';  // CustomText to show the selected category

const CategoryScreen = () => {
    // Sample category data with ID, name, and image URL
    const categories = [
        {
            _id: '675d8a79ceb9d07a9ec7cf56',
            name: 'Vegetables & Fruits',
            image: 'https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/uic8gcnbzknosdvva13o.png',
        },
        {
            _id: '675d8a79ceb9d07a9ec7cf54',
            name: 'Milk, Curd & Paneer',
            image: 'https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/cq7m7yxuttemyb4tkidp.png',
        },
        {
            _id: '675d8a79ceb9d07a9ec7cf57',
            name: 'Munchies',
            image: 'https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/vyakccm3axdyt8yei8wc.png',
        },
        {
            _id: '675d8a79ceb9d07a9ec7cf59',
            name: 'Baby Care',
            image: 'https://res.cloudinary.com/dponzgerb/image/upload/v1723444870/category/f6er254kgnmymlbguddd.png',
        },
        {
            _id: '675d8a79ceb9d07a9ec7cf5b',
            name: 'Cleaning Essentials',
            image: 'https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/pfbuktnsxdub5njww7tj.png',
        },
        {
            _id: '675d8a79ceb9d07a9ec7cf55',
            name: 'Pharma & Wellness',
            image: 'https://res.cloudinary.com/dponzgerb/image/upload/v1723444870/category/n438dcddfgrhyq9mck3z.png',
        },
        {
            _id: '675d8a79ceb9d07a9ec7cf5a',
            name: 'Ata, Rice & Dal',
            image: 'https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/flyjbsigiuxsd4pbwpjb.png',
        },
        {
            _id: '675d8a79ceb9d07a9ec7cf58',
            name: 'Home & Office',
            image: 'https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/diucqrlsuqympqtwdkip.png',
        },
    ];

    // State to hold the selected category
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);  // Default to the first category

    // Function to handle category selection
    const handleCategoryPress = (category: any) => {
        setSelectedCategory(category);  // Update the selected category when a category is pressed
    };

    return (
        <View style={styles.container}>
            {/* Sidebar Component */}
            <Sidebar
                selectedCategory={selectedCategory}  // Pass the selected category
                categories={categories}  // Pass all categories
                onCategoryPress={handleCategoryPress}  // Pass the onCategoryPress function
            />

            {/* Display the selected category name */}
            <View style={styles.selectedCategory}>
                <CustomText variant="h6">Selected Category: {selectedCategory?.name}</CustomText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',  // To display sidebar and content side by side
        flex: 1,
    },
    selectedCategory: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default CategoryScreen;
