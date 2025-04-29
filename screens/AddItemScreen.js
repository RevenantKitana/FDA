import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddItemScreen = () => {
    const navigation = useNavigation();

    // Trạng thái để quản lý các thuộc tính được chọn
    const [selectedOption, setSelectedOption] = useState('Pick up'); // Quản lý lựa chọn Pick up/Delivery
    const [selectedIngredients, setSelectedIngredients] = useState({
        Basic: ['Salt', 'Onion', 'Pappers'],
        Fruit: [],
    }); // Quản lý nguyên liệu được chọn

    // Hàm xử lý chọn Pick up/Delivery
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    // Hàm xử lý chọn nguyên liệu
    const handleIngredientSelect = (category, ingredient) => {
        setSelectedIngredients((prev) => {
            const updatedCategory = [...prev[category]];
            const index = updatedCategory.indexOf(ingredient);
            if (index === -1) {
                updatedCategory.push(ingredient); // Thêm nếu chưa chọn
            } else {
                updatedCategory.splice(index, 1); // Bỏ nếu đã chọn
            }
            return { ...prev, [category]: updatedCategory };
        });
    };

    return (
        <View style={styles.screenContainer}>
            {/* Header cố định */}
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={require('../assets/back.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add New Items</Text>
                <TouchableOpacity>
                    <Text style={styles.resetText}>RESET</Text>
                </TouchableOpacity>
            </View>

            {/* Nội dung cuộn */}
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.innerContainer}>
                    {/* Item Name Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Item Name</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Mazalichiken Halim"
                                placeholderTextColor="#9C9BA6"
                            />
                        </View>
                    </View>

                    {/* Upload Photo/Video Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Upload Photo/Video</Text>
                        <View style={styles.uploadContainer}>
                            <View style={styles.uploadBox}>
                                <View style={styles.uploadPlaceholder} />
                            </View>
                            <TouchableOpacity style={styles.uploadBox}>
                                <View style={styles.addButton}>
                                    <Image source={require('../assets/plus.png')} style={styles.addIcon} />
                                </View>
                                <Text style={styles.addText}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.uploadBox}>
                                <View style={styles.addButton}>
                                    <Image source={require('../assets/plus.png')} style={styles.addIcon} />
                                </View>
                                <Text style={styles.addText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Price Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Price</Text>
                        <View style={styles.priceContainer}>
                            <View style={[styles.inputContainer, { flex: 1 }]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="$50"
                                    placeholderTextColor="#9C9BA6"
                                />
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.optionButton,
                                    selectedOption === 'Pick up' && styles.optionButtonSelected,
                                ]}
                                onPress={() => handleOptionSelect('Pick up')}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        selectedOption === 'Pick up' && styles.optionTextSelected,
                                    ]}
                                >
                                    Pick up
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.optionButton,
                                    selectedOption === 'Delivery' && styles.optionButtonSelected,
                                ]}
                                onPress={() => handleOptionSelect('Delivery')}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        selectedOption === 'Delivery' && styles.optionTextSelected,
                                    ]}
                                >
                                    Delivery
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Ingredients Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ingredients</Text>

                        {/* Basic Ingredients */}
                        <View style={styles.ingredientsCategory}>
                            <Text style={styles.categoryTitle}>Basic</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ingredientsRow}>
                            {['Salt', 'Chicken', 'Onion', 'Garlic', 'Pappers', 'Ginger'].map((ingredient) => (
                                <TouchableOpacity
                                    key={ingredient}
                                    style={[
                                        styles.ingredientButton,
                                        selectedIngredients.Basic.includes(ingredient) && styles.ingredientSelected,
                                    ]}
                                    onPress={() => handleIngredientSelect('Basic', ingredient)}
                                >
                                    <Image source={require('../assets/MyFood.png')} style={styles.ingredientIcon} />
                                    <Text
                                        style={[
                                            styles.ingredientText,
                                            selectedIngredients.Basic.includes(ingredient) && styles.ingredientTextSelected,
                                        ]}
                                    >
                                        {ingredient}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Fruit Ingredients */}
                        <View style={styles.ingredientsCategory}>
                            <Text style={styles.categoryTitle}>Fruit</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ingredientsRow}>
                            {['Avocado', 'Apple', 'Blueberry', 'Broccoli', 'Orange', 'Walnut'].map((ingredient) => (
                                <TouchableOpacity
                                    key={ingredient}
                                    style={[
                                        styles.ingredientButton,
                                        selectedIngredients.Fruit.includes(ingredient) && styles.ingredientSelected,
                                    ]}
                                    onPress={() => handleIngredientSelect('Fruit', ingredient)}
                                >
                                    <Image source={require('../assets/MyFood.png')} style={styles.ingredientIcon} />
                                    <Text
                                        style={[
                                            styles.ingredientText,
                                            selectedIngredients.Fruit.includes(ingredient) && styles.ingredientTextSelected,
                                        ]}
                                    >
                                        {ingredient}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Details Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Details</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, styles.detailsInput]}
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum in vel, mattis et amet dui mauris turpis."
                                placeholderTextColor="#9C9BA6"
                                multiline
                            />
                        </View>
                    </View>

                    {/* Save Changes Button */}
                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F4F9',
    },
    backButton: {
        width: 40,
        height: 40,
        backgroundColor: '#F1F1F1',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        width: 10,
        height: 10,
        tintColor: '#333',
    },
    headerTitle: {
        fontFamily: 'Sen',
        fontSize: 20,
        fontWeight: '600',
        color: '#1E1E1E',
        textAlign: 'center',
        flex: 1,
    },
    resetText: {
        fontFamily: 'Sen',
        fontSize: 14,
        fontWeight: '600',
        color: '#FB6D3A',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100, // Để tránh bị che bởi bottom tab
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontFamily: 'Sen',
        fontSize: 16,
        fontWeight: '600',
        color: '#1E1E1E',
        marginBottom: 15,
    },
    inputContainer: {
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ECECEC',
    },
    input: {
        fontFamily: 'Sen',
        fontSize: 14,
        fontWeight: '400',
        color: '#32343E',
    },
    detailsInput: {
        height: 126,
        textAlignVertical: 'top',
    },
    uploadContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    uploadBox: {
        width: 101,
        height: 101,
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#E8EAED',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
    },
    uploadPlaceholder: {
        width: 101,
        height: 101,
        backgroundColor: '#EAEAEA',
        borderRadius: 14,
    },
    addButton: {
        width: 41.48,
        height: 41.48,
        backgroundColor: '#FFF1F2',
        borderRadius: 20.74,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addIcon: {
        width: 22,
        height: 22,
    },
    addText: {
        fontFamily: 'Sen',
        fontSize: 12,
        fontWeight: '400',
        color: '#9C9BA6',
        marginTop: 5,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    optionButton: {
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#ECECEC',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
    },
    optionButtonSelected: {
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#FB6D3A',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
    },
    optionText: {
        fontFamily: 'Sen',
        fontSize: 14,
        fontWeight: '400',
        color: '#9C9BA6',
    },
    optionTextSelected: {
        fontWeight: '700',
        color: '#FB6D3A',
    },
    ingredientsCategory: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    categoryTitle: {
        fontFamily: 'Sen',
        fontSize: 16,
        fontWeight: '600',
        color: '#1E1E1E',
    },
    seeAllText: {
        fontFamily: 'Sen',
        fontSize: 14,
        fontWeight: '400',
        color: '#9C9BA6',
    },
    ingredientsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    ingredientButton: {
        width: 50,
        height: 70,
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#ECECEC',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    ingredientSelected: {
        backgroundColor: '#FFEDE4',
        borderWidth: 0,
    },
    ingredientIcon: {
        width: 24,
        height: 24,
        marginBottom: 5,
    },
    ingredientText: {
        fontFamily: 'Sen',
        fontSize: 12,
        fontWeight: '400',
        color: '#32343E',
        textAlign: 'center',
    },
    ingredientTextSelected: {
        fontWeight: '700',
        color: '#FB6D3A',
    },
    saveButton: {
        width: 327,
        height: 54,
        backgroundColor: '#FF7622',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
    },
    saveButtonText: {
        fontFamily: 'Sen',
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});

export default AddItemScreen;