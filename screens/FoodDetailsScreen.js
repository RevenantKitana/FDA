import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const backIcon = require('../assets/back.png'); // Icon back trong thư mục assets

const FoodDetailsScreen = ({ navigation, route }) => {
    // Lấy dữ liệu món ăn từ route params
    const { food } = route.params;

    // Mock data cho danh sách nguyên liệu
    const ingredients = [
        { id: '1', name: 'Salt', icon: 'salt', allergy: false },
        { id: '2', name: 'Chicken', icon: 'chicken', allergy: false },
        { id: '3', name: 'Onion', icon: 'onion', allergy: true },
        { id: '4', name: 'Garlic', icon: 'garlic', allergy: false },
        { id: '5', name: 'Pappers', icon: 'peppers', allergy: true },
        { id: '6', name: 'Ginger', icon: 'ginger', allergy: false },
        { id: '7', name: 'Broccoli', icon: 'broccoli', allergy: false },
        { id: '8', name: 'Orange', icon: 'orange', allergy: false },
        { id: '9', name: 'Walnut', icon: 'walnut', allergy: false },
    ];

    // Render item cho danh sách nguyên liệu
    const renderIngredient = ({ item }) => (
        <View style={styles.ingredientItem}>
            <View style={styles.ingredientIconPlaceholder} />
            <Text style={styles.ingredientName}>{item.name}</Text>
            {item.allergy && (
                <View style={styles.allergyTag}>
                    <Text style={styles.allergyText}>Allergy</Text>
                </View>
            )}
        </View>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Top Header */}
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.backButton}>
                        <Image source={backIcon} style={styles.backIcon} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.headerText}>Food Details</Text>
                <TouchableOpacity>
                    <Text style={styles.editButton}>EDIT</Text>
                </TouchableOpacity>
            </View>

            {/* Hình ảnh món ăn */}
            <View style={styles.foodImagePlaceholder} />

            {/* Tag và trạng thái */}
            <View style={styles.tagStatusContainer}>
                <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>{food.tag}</Text>
                </View>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>Delivery</Text>
                </View>
            </View>

            {/* Thông tin món ăn */}
            <View style={styles.foodInfo}>
                <View style={styles.foodInfoLeft}>
                    <Text style={styles.foodName}>{food.name}</Text>
                    <View style={styles.addressContainer}>
                        <Icon name="map-pin" size={16} color="#AFAFAF" />
                        <Text style={styles.addressText}>{food.address}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <Icon name="star" size={16} color="#FB6D3A" />
                        <Text style={styles.ratingText}>{food.rating}</Text>
                        <Text style={styles.reviewsText}>({food.reviews} Reviews)</Text>
                    </View>
                </View>
                <Text style={styles.priceText}>{food.price}</Text>
            </View>

            {/* Nguyên liệu */}
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <FlatList
                data={ingredients}
                renderItem={renderIngredient}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={styles.ingredientRow}
                style={styles.ingredientList}
            />

            {/* Mô tả */}
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{food.description}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F1F1F1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        width: 10,
        height: 10,
        tintColor: '#333',
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1E1E1E',
    },
    editButton: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FB6D3A',
    },
    foodImagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: '#EAEAEA',
        borderRadius: 14,
        marginBottom: 15,
    },
    tagStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    tagContainer: {
        backgroundColor: '#FFEDE4',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    tagText: {
        fontSize: 12,
        color: '#FB6D3A',
        fontWeight: '500',
    },
    statusContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#AFAFAF',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    statusText: {
        fontSize: 12,
        color: '#AFAFAF',
        fontWeight: '500',
    },
    foodInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    foodInfoLeft: {
        flex: 1,
    },
    foodName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#32343E',
        marginBottom: 5,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    addressText: {
        fontSize: 14,
        color: '#AFAFAF',
        marginLeft: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FB6D3A',
        marginLeft: 5,
        marginRight: 5,
    },
    reviewsText: {
        fontSize: 14,
        color: '#AFAFAF',
    },
    priceText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#32343E',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E1E1E',
        marginBottom: 15,
    },
    ingredientList: {
        marginBottom: 20,
    },
    ingredientRow: {
        justifyContent: 'space-between',
    },
    ingredientItem: {
        alignItems: 'center',
        width: '30%',
        marginBottom: 15,
    },
    ingredientIconPlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: '#FFF1F2',
        borderRadius: 25,
        marginBottom: 5,
    },
    ingredientName: {
        fontSize: 12,
        color: '#32343E',
        textAlign: 'center',
    },
    allergyTag: {
        backgroundColor: '#FFEDE4',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginTop: 3,
    },
    allergyText: {
        fontSize: 10,
        color: '#FB6D3A',
    },
    descriptionText: {
        fontSize: 14,
        color: '#AFAFAF',
        lineHeight: 20,
    },
});

export default FoodDetailsScreen;