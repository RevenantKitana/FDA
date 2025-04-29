import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigation = useNavigation();

    return (
        <View style={styles.screenContainer}>
            {/* Header cố định (màu đỏ) */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={require('../assets/back.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Profile</Text>
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Available Balance</Text>
                    <Text style={styles.balanceAmount}>$500.00</Text>
                    <TouchableOpacity
                        style={styles.withdrawButton}
                        onPress={() => setIsModalVisible(true)}
                    >
                        <Text style={styles.withdrawButtonText}>Withdraw</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Nội dung cuộn (Menu Items) */}
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.innerContainer}>
                    {/* Menu Items */}
                    <View style={styles.menuContainer}>
                        {/* Personal Info */}
                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require('../assets/user.png')} style={styles.menuIcon} />
                            <Text style={styles.menuText}>Personal Info</Text>
                            <Image source={require('../assets/Polygon 1.png')} style={styles.arrowIcon} />
                        </TouchableOpacity>

                        {/* Settings */}
                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require('../assets/eye.png')} style={styles.menuIcon} />
                            <Text style={styles.menuText}>Settings</Text>
                            <Image source={require('../assets/Polygon 1.png')} style={styles.arrowIcon} />
                        </TouchableOpacity>

                        {/* Withdraw History */}
                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require('../assets/credit-card.png')} style={styles.menuIcon} />
                            <Text style={styles.menuText}>Withdraw History</Text>
                            <Image source={require('../assets/Polygon 1.png')} style={styles.arrowIcon} />
                        </TouchableOpacity>

                        {/* Number of Orders */}
                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require('../assets/bell.png')} style={styles.menuIcon} />
                            <Text style={styles.menuText}>Number of Orders</Text>
                            <Text style={styles.ordersCount}>29K</Text>
                            <Image source={require('../assets/Polygon 1.png')} style={styles.arrowIcon} />
                        </TouchableOpacity>

                        {/* User Reviews */}
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => navigation.navigate('ReviewScreen')}
                        >
                            <Image source={require('../assets/info.png')} style={styles.menuIcon} />
                            <Text style={styles.menuText}>User Reviews</Text>
                            <Image source={require('../assets/Polygon 1.png')} style={styles.arrowIcon} />
                        </TouchableOpacity>

                        {/* Log Out */}
                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require('../assets/Logout.png')} style={styles.menuIcon} />
                            <Text style={styles.menuTextLogout}>Log Out</Text>
                            <Image source={require('../assets/Polygon 1.png')} style={styles.arrowIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Withdraw Successful Modal */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Checkmark Icon with Sparkles */}
                        <View style={styles.checkmarkContainer}>
                            <Image source={require('../assets/withdraw.png')} style={styles.checkmarkIcon} />
                            <View style={[styles.sparkle, styles.sparkle1]} />
                            <View style={[styles.sparkle, styles.sparkle2]} />
                            <View style={[styles.sparkle, styles.sparkle3]} />
                            <View style={[styles.sparkle, styles.sparkle4]} />
                            <View style={[styles.sparkle, styles.sparkle5]} />
                        </View>

                        {/* Withdraw Successful Text */}
                        <Text style={styles.modalText}>Withdraw Successful</Text>

                        {/* OK Button */}
                        <TouchableOpacity
                            style={styles.okButton}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text style={styles.okButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25, // Bo góc trên trái
        borderTopRightRadius: 25, // Bo góc trên phải
        paddingTop: 30, // Căn lề trên cho phần header màu đỏ
    },
    header: {
        height: '38%',
        backgroundColor: '#FF7622',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        paddingHorizontal: 24,
        paddingTop: 10, // Giảm paddingTop vì đã có paddingTop ở screenContainer
    },
    backButton: {
        width: 40,
        height: 40,
        backgroundColor: '#FFFFFF',
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
        color: '#FFFFFF',
        marginTop: 15,
    },
    balanceContainer: {
        alignItems: 'flex-start',
        marginTop: 30,
    },
    balanceLabel: {
        fontFamily: 'Sen',
        fontSize: 16,
        fontWeight: '400',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    balanceAmount: {
        fontFamily: 'Sen',
        fontSize: 36,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    withdrawButton: {
        width: 120,
        height: 40,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    withdrawButtonText: {
        fontFamily: 'Sen',
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
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
    },
    menuContainer: {
        paddingHorizontal: 24, // Khoảng cách viền màn hình
        paddingTop: 25,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        paddingHorizontal: 16,
        paddingVertical: 15,
        borderRadius: 14,
        marginBottom: 15,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    menuIcon: {
        width: 24,
        height: 24,
        marginRight: 15,
    },
    menuText: {
        flex: 1,
        fontFamily: 'Sen',
        fontSize: 16,
        fontWeight: '400',
        color: '#32343E',
    },
    menuTextLogout: {
        flex: 1,
        fontFamily: 'Sen',
        fontSize: 16,
        fontWeight: '400',
        color: '#D20F0F',
    },
    ordersCount: {
        fontFamily: 'Sen',
        fontSize: 16,
        fontWeight: '600',
        color: '#9C9BA6',
        marginRight: 10,
    },
    arrowIcon: {
        width: 16,
        height: 16,
        tintColor: '#9C9BA6',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 20,
        alignItems: 'center',
        width: '80%',
        maxWidth: 400,
    },
    checkmarkContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    checkmarkIcon: {
        width: 100,
        height: 100,
    },
    sparkle: {
        position: 'absolute',
        backgroundColor: '#FF7622',
        borderRadius: 10,
    },
    sparkle1: {
        width: 10,
        height: 10,
        top: -10,
        left: 20,
    },
    sparkle2: {
        width: 15,
        height: 15,
        top: 0,
        right: -15,
    },
    sparkle3: {
        width: 10,
        height: 8,
        bottom: -10,
        left: 10,
    },
    sparkle4: {
        width: 12,
        height: 12,
        bottom: 0,
        right: -10,
    },
    sparkle5: {
        width: 6,
        height: 6,
        top: 20,
        left: -10,
    },
    modalText: {
        fontFamily: 'Sen',
        fontSize: 20,
        fontWeight: '600',
        color: '#32343E',
        marginBottom: 20,
    },
    okButton: {
        width: 200,
        height: 50,
        backgroundColor: '#FF7622',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    okButtonText: {
        fontFamily: 'Sen',
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});

export default ProfileScreen;