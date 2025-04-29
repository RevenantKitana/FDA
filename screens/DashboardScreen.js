import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

// Đường dẫn tới icon
const menuIcon = require('../assets/menu.png');
const userIcon = require('../assets/user.png');

const DashboardScreen = () => {
    const navigation = useNavigation();
    const [isRunningOrdersVisible, setRunningOrdersVisible] = useState(false);
    const [isOrderRequestsVisible, setOrderRequestsVisible] = useState(false);

    // Mock data cho Running Orders
    const runningOrdersData = [
        { id: '32053', name: 'Chicken Thai Biryani', price: '$60' },
        { id: '15253', name: 'Chicken Bhuna', price: '$30' },
        { id: '21200', name: 'Vegetarian Poutine', price: '$35' },
    ];

    // Mock data cho Order Requests
    const orderRequestsData = [
        { id: '45001', name: 'Beef Curry', price: '$45' },
        { id: '45002', name: 'Vegan Salad', price: '$25' },
        { id: '45003', name: 'Fish Tikka', price: '$50' },
        { id: '45004', name: 'Chicken Wrap', price: '$20' },
        { id: '45005', name: 'Paneer Masala', price: '$40' },
    ];

    // Render item cho danh sách trong bottom sheet
    const renderOrderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <View style={styles.orderImagePlaceholder} />
            <View style={styles.orderDetails}>
                <Text style={styles.orderName}>#Breakfast</Text>
                <Text style={styles.orderName}>{item.name}</Text>
                <Text style={styles.orderId}>ID: {item.id}</Text>
                <Text style={styles.orderPrice}>{item.price}</Text>
            </View>
            <View style={styles.orderActions}>
                <TouchableOpacity style={styles.doneButton}>
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Top Header */}
            <View style={styles.top}>
                <TouchableOpacity>
                    <Image source={menuIcon} style={styles.headerIcon} />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>LOCATION: Halal Lab office</Text>
                    <Icon name="chevron-down" size={16} color="#000" style={styles.headerChevron} />
                </View>
                <TouchableOpacity>
                    <View style={styles.avatar}>
                        <Image source={userIcon} style={styles.headerIcon} />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Running Orders và Order Requests */}
            <View style={styles.ordersContainer}>
                <TouchableOpacity
                    style={styles.runningOrders}
                    onPress={() => setRunningOrdersVisible(true)}
                >
                    <Text style={styles.cardNumber}>20</Text>
                    <Text style={styles.cardLabel}>RUNNING ORDERS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.orderRequests}
                    onPress={() => setOrderRequestsVisible(true)}
                >
                    <Text style={styles.cardNumber}>05</Text>
                    <Text style={styles.cardLabel}>ORDER REQUEST</Text>
                </TouchableOpacity>
            </View>

            {/* Total Revenue */}
            <View style={styles.revenue}>
                <View style={styles.revenueHeader}>
                    <Text style={styles.sectionTitle}>Total Revenue $2,241</Text>
                    <View style={styles.revenueActions}>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={styles.dropdownText}>Daily</Text>
                            <Icon name="chevron-down" size={16} color="#AFAFAF" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.seeDetails}>See Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.chartPlaceholder}>
                    <View style={styles.chartPeak}>
                        <Text style={styles.peakText}>$500</Text>
                    </View>
                    <Text style={styles.placeholderText}>Chart Placeholder</Text>
                    <Text style={styles.chartLabels}>10AM 11AM 12PM 01PM 02PM 03PM 04PM</Text>
                </View>
            </View>

            {/* Reviews */}
            <View style={styles.reviews}>
                <View style={styles.reviewsHeader}>
                    <Text style={styles.sectionTitle}>Reviews</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileStack', { screen: 'ReviewScreen' })}>
                        <Text style={styles.seeAll}>See All Reviews</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.reviewsContent}>
                    <Icon name="star" size={20} color="#FF7622" />
                    <Text style={styles.reviewRating}>4.9</Text>
                    <Text style={styles.reviewText}>Total 20 Reviews</Text>
                </View>
            </View>

            {/* Popular Items This Week */}
            <View style={styles.popularItems}>
                <View style={styles.popularHeader}>
                    <Text style={styles.sectionTitle}>Popular Items This Week</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.itemCard}>
                        <Text style={styles.placeholderText}>Item 1</Text>
                    </View>
                    <View style={styles.itemCard}>
                        <Text style={styles.placeholderText}>Item 2</Text>
                    </View>
                    <View style={styles.itemCard}>
                        <Text style={styles.placeholderText}>Item 3</Text>
                    </View>
                </ScrollView>
            </View>

            {/* Bottom Sheet cho Running Orders */}
            <Modal
                isVisible={isRunningOrdersVisible}
                onSwipeComplete={() => setRunningOrdersVisible(false)}
                swipeDirection="down"
                style={styles.modal}
            >
                <View style={styles.bottomSheet}>
                    <View style={styles.sheetHandle} />
                    <Text style={styles.sheetTitle}>20 Running Orders</Text>
                    <FlatList
                        data={runningOrdersData}
                        renderItem={renderOrderItem}
                        keyExtractor={(item) => item.id}
                        style={styles.sheetList}
                    />
                </View>
            </Modal>

            {/* Bottom Sheet cho Order Requests */}
            <Modal
                isVisible={isOrderRequestsVisible}
                onSwipeComplete={() => setOrderRequestsVisible(false)}
                swipeDirection="down"
                style={styles.modal}
            >
                <View style={styles.bottomSheet}>
                    <View style={styles.sheetHandle} />
                    <Text style={styles.sheetTitle}>05 Order Requests</Text>
                    <FlatList
                        data={orderRequestsData}
                        renderItem={renderOrderItem}
                        keyExtractor={(item) => item.id}
                        style={styles.sheetList}
                    />
                </View>
            </Modal>
        </ScrollView>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    contentContainer: {
        paddingBottom: 100,
        alignItems: 'center',
    },
    top: {
        width: 327,
        height: 45,
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerIcon: {
        width: 24,
        height: 24,
    },
    headerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    headerChevron: {
        marginLeft: 5,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ordersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 327,
        marginTop: 24,
    },
    runningOrders: {
        width: 156.96,
        height: 115.1,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    orderRequests: {
        width: 157,
        height: 115,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardNumber: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    cardLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: '#AFAFAF',
        marginTop: 8,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    revenue: {
        width: 327,
        height: 204.05,
        marginTop: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    revenueHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    revenueActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginRight: 10,
    },
    dropdownText: {
        fontSize: 12,
        color: '#000',
        marginRight: 5,
    },
    seeDetails: {
        fontSize: 12,
        color: '#FF7622',
        fontWeight: '600',
    },
    chartPlaceholder: {
        flex: 1,
        backgroundColor: '#FFF1F2',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    chartPeak: {
        position: 'absolute',
        top: 20,
        left: 50,
        backgroundColor: '#000',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    peakText: {
        fontSize: 12,
        color: '#FFF',
        fontWeight: '600',
    },
    placeholderText: {
        fontSize: 12,
        color: '#AFAFAF',
    },
    chartLabels: {
        fontSize: 10,
        color: '#AFAFAF',
        marginTop: 10,
        textAlign: 'center',
    },
    reviews: {
        width: 327,
        height: 94.18,
        marginTop: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    reviewsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    reviewsContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewRating: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 8,
        marginRight: 15,
    },
    reviewText: {
        fontSize: 12,
        color: '#AFAFAF',
    },
    seeAll: {
        fontSize: 12,
        color: '#FF7622',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    popularItems: {
        width: 327,
        height: 220,
        marginTop: 15,
        marginBottom: 20,
    },
    popularHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    itemCard: {
        width: 150,
        height: 150,
        backgroundColor: '#E0E0E0',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    bottomSheet: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        height: '80%',
    },
    sheetHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#AFAFAF',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 10,
    },
    sheetTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 20,
    },
    sheetList: {
        flex: 1,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    orderImagePlaceholder: {
        width: 60,
        height: 60,
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        marginRight: 15,
    },
    orderDetails: {
        flex: 1,
    },
    orderName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    orderId: {
        fontSize: 12,
        color: '#AFAFAF',
        marginTop: 5,
    },
    orderPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginTop: 5,
    },
    orderActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    doneButton: {
        backgroundColor: '#FF7622',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: '#FF0000',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    buttonText: {
        fontSize: 12,
        color: '#FFF',
        fontWeight: '600',
    },
});

export default DashboardScreen;