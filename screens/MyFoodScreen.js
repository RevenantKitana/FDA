import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const backIcon = require('../assets/back.png'); // Icon back trong thư mục assets

const MyFoodScreen = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState('All');

    const foodData = [
        { id: '1', name: 'Chicken Thai Biriyani', tag: 'Breakfast', rating: '4.9', reviews: '10', price: '$60', status: 'Pick Up', address: 'Kentucky 37945', description: 'Lorem ipsum dolor sit amet, consectetur Maton adipiscing elit. Bibendum in vel, mattis et amet dui mauris turpis.' },
        { id: '2', name: 'Chicken Bhuna', tag: 'Lunch', rating: '4.9', reviews: '10', price: '$30', status: 'Pick Up', address: 'New York 10001', description: 'A spicy chicken dish with rich flavors.' },
        { id: '3', name: 'Mazalichiken Halim', tag: 'Dinner', rating: '4.9', reviews: '10', price: '$25', status: 'Pick Up', address: 'California 90210', description: 'A delicious halal chicken dish.' },
        { id: '4', name: 'Egg Curry', tag: 'Lunch', rating: '4.8', reviews: '8', price: '$20', status: 'Pick Up', address: 'Texas 75001', description: 'A flavorful egg curry with spices.' },
    ];

    const filteredFoodData = selectedTab === 'All'
        ? foodData
        : foodData.filter(item => item.tag === selectedTab);

    const renderFoodItem = ({ item }) => (
        <View style={styles.foodItem}>
            <View style={styles.foodImagePlaceholder} />
            <View style={styles.foodDetails}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('FoodDetails', { food: item })}
                >
                    <Text style={styles.foodName}>{item.name}</Text>
                </TouchableOpacity>
                <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>{item.tag}</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Icon name="star" size={16} color="#FB6D3A" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Text style={styles.reviewsText}>({item.reviews} Reviews)</Text>
                </View>
            </View>
            <View style={styles.foodActions}>
                <Text style={styles.priceText}>{item.price}</Text>
                <Text style={styles.statusText}>{item.status}</Text>
                <TouchableOpacity>
                    <Icon name="more-vertical" size={20} color="#32343E" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Top Header */}
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.backButton}>
                        <Image source={backIcon} style={styles.backIcon} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.headerText}>My Food List</Text>
            </View>

            {/* Top Tabs */}
            <View style={styles.topTabs}>
                {['All', 'Breakfast', 'Lunch', 'Dinner'].map((tab) => (
                    <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
                        <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>{tab}</Text>
                        {selectedTab === tab && <View style={styles.tabUnderline} />}
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.tabDivider} />

            {/* Tổng số món */}
            <Text style={styles.totalItems}>Total {filteredFoodData.length} items</Text>

            {/* Danh sách món ăn */}
            <FlatList
                data={filteredFoodData}
                renderItem={renderFoodItem}
                keyExtractor={(item) => item.id}
                style={styles.foodList}
                contentContainerStyle={styles.foodListContent}
            />
        </View>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
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
        marginLeft: 20,
    },
    topTabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#9C9BA6',
        paddingBottom: 5,
    },
    tabTextActive: {
        color: '#FB6D3A',
        fontWeight: '700',
    },
    tabUnderline: {
        height: 3,
        backgroundColor: '#FB6D3A',
        marginTop: 2,
        borderRadius: 2,
    },
    tabDivider: {
        height: 1,
        backgroundColor: '#ECECEC',
        marginTop: 10,
        marginBottom: 10,
    },
    totalItems: {
        fontSize: 14,
        color: '#A0A0A0',
        marginBottom: 10,
    },
    foodList: {
        flex: 1,
    },
    foodListContent: {
        paddingBottom: 100,
    },
    foodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        padding: 15,
        borderRadius: 16,
        marginBottom: 15,
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
    },
    foodImagePlaceholder: {
        width: 70,
        height: 70,
        backgroundColor: '#EAEAEA',
        borderRadius: 14,
        marginRight: 15,
    },
    foodDetails: {
        flex: 1,
    },
    foodName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#32343E',
        marginBottom: 4,
    },
    tagContainer: {
        backgroundColor: '#FFEDE4',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 3,
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    tagText: {
        fontSize: 12,
        color: '#FB6D3A',
        fontWeight: '500',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    ratingText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#FB6D3A',
        marginLeft: 5,
    },
    reviewsText: {
        fontSize: 12,
        color: '#999',
        marginLeft: 4,
    },
    foodActions: {
        alignItems: 'flex-end',
    },
    priceText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#32343E',
        marginBottom: 4,
    },
    statusText: {
        fontSize: 12,
        color: '#999',
        marginBottom: 6,
    },
});

export default MyFoodScreen;