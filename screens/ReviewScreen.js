import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Để hiển thị sao rating

const ReviewScreen = () => {
    const navigation = useNavigation();

    // Mock data cho danh sách đánh giá
    const reviewsData = [
        {
            id: '1',
            rating: 5,
            title: 'Great Food & Service',
            content: 'This food is tasty & healthy. Breakfast friendly, I’m really chef for Home Food Order. Thanks.',
            date: '20/12/2020',
        },
        {
            id: '2',
            rating: 5,
            title: 'Awesome and Nice',
            content: 'This is so tasty & healthy. Breakfast so fast delivered in my place.',
            date: '20/12/2020',
        },
        {
            id: '3',
            rating: 5,
            title: 'Awesome and Nice',
            content: 'This is so tasty & healthy.',
            date: '20/12/2020',
        },
        {
            id: '4',
            rating: 4,
            title: 'Nice',
            content: 'This is so tasty & healthy. Breakfast so fast delivered in my place.',
            date: '20/12/2020',
        },
    ];

    // Hàm render sao rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Icon
                    key={i}
                    name="star"
                    size={16}
                    color={i <= rating ? '#FF7622' : '#D3D3D3'}
                    style={styles.star}
                />
            );
        }
        return stars;
    };

    // Render item cho danh sách đánh giá
    const renderReviewItem = ({ item, index }) => (
        <View style={styles.reviewItem}>
            <View style={styles.avatarPlaceholder} />
            <View style={styles.reviewContent}>
                <View style={styles.ratingContainer}>
                    {renderStars(item.rating)}
                </View>
                <Text style={styles.reviewTitle}>{item.title}</Text>
                <Text style={styles.reviewText}>{item.content}</Text>
                <Text style={styles.reviewDate}>{item.date}</Text>
            </View>
            {index < reviewsData.length - 1 && <View style={styles.divider} />}
        </View>
    );

    return (
        <View style={styles.screenContainer}>
            {/* Header Section */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Image source={require('../assets/back.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Reviews</Text>

            {/* Danh sách đánh giá */}
            <FlatList
                data={reviewsData}
                renderItem={renderReviewItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 24,
        width: 40,
        height: 40,
        backgroundColor: '#F1F1F1',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
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
        marginTop: 58,
        marginBottom: 20,
    },
    list: {
        flex: 1,
        paddingHorizontal: 24,
    },
    listContent: {
        paddingBottom: 100, // Để tránh bị che bởi bottom tab
    },
    reviewItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        position: 'relative',
    },
    avatarPlaceholder: {
        width: 54,
        height: 54,
        backgroundColor: '#98A8B8',
        borderRadius: 27,
        marginRight: 15,
    },
    reviewContent: {
        flex: 1,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    star: {
        marginRight: 5,
    },
    reviewTitle: {
        fontFamily: 'Sen',
        fontSize: 16,
        fontWeight: '600',
        color: '#32343E',
        marginBottom: 5,
    },
    reviewText: {
        fontFamily: 'Sen',
        fontSize: 14,
        fontWeight: '400',
        color: '#9C9BA6',
        marginBottom: 5,
    },
    reviewDate: {
        fontFamily: 'Sen',
        fontSize: 12,
        fontWeight: '400',
        color: '#9C9BA6',
    },
    divider: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#F0F4F9',
    },
});

export default ReviewScreen;