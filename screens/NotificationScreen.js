import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const backIcon = require('../assets/back.png'); // Icon back trong thư mục assets

const NotificationScreen = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState('Notifications');

    // Mock data cho danh sách thông báo
    const notificationData = [
        { id: '1', content: 'Tanbir Ahmed Placed a new order', time: '20 min ago' },
        { id: '2', content: 'Salim Smith left a 5 star review', time: '20 min ago' },
        { id: '3', content: 'Royal Bengol agreed to cancel', time: '20 min ago' },
        { id: '4', content: 'Pabel Vuiya Placed a new order', time: '20 min ago' },
    ];

    // Mock data cho tab Messages
    const messagesData = [
        { id: '1', sender: 'Royal Parvej!', content: 'Sounds awesome!', time: '19:37', unreadCount: 1 },
        { id: '2', sender: 'Cameron Williamson', content: 'Ok, just hurry little bit...', time: '19:37', unreadCount: 2 },
        { id: '3', sender: 'Ralph Edwards', content: 'Thanks dude.', time: '19:37', unreadCount: 0 },
        { id: '4', sender: 'Cody Fisher', content: 'How is going...?', time: '19:37', unreadCount: 0 },
        { id: '5', sender: 'Eleanor Pena', content: 'Thanks for the awesome food man...', time: '19:37', unreadCount: 0 },
    ];

    // Dữ liệu hiển thị dựa trên tab được chọn
    const dataToShow = selectedTab === 'Notifications' ? notificationData : messagesData;

    // Render item cho danh sách thông báo
    const renderNotificationItem = ({ item, index }) => (
        <View style={styles.notificationItem}>
            <View style={styles.avatarPlaceholder} />
            <View style={styles.notificationContent}>
                <Text style={styles.contentText}>{item.content}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <View style={styles.imagePlaceholder} />
            {index < dataToShow.length - 1 && <View style={styles.divider} />}
        </View>
    );

    // Render item cho danh sách tin nhắn
    const renderMessageItem = ({ item, index }) => (
        <View style={styles.notificationItem}>
            <View style={styles.avatarContainer}>
                <View style={styles.avatarPlaceholder} />
                <View style={styles.onlineDot} />
            </View>
            <View style={styles.notificationContent}>
                <Text style={styles.senderText}>{item.sender}</Text>
                <Text style={styles.messageContentText}>{item.content}</Text>
            </View>
            <View style={styles.messageActions}>
                <Text style={styles.timeText}>{item.time}</Text>
                {item.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadCount}>{item.unreadCount}</Text>
                    </View>
                )}
            </View>
            {index < dataToShow.length - 1 && <View style={styles.divider} />}
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
                <Text style={styles.headerText}>Notifications</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => setSelectedTab('Notifications')}
                >
                    <Text style={[styles.tabText, selectedTab === 'Notifications' && styles.tabTextActive]}>
                        Notifications
                    </Text>
                    {selectedTab === 'Notifications' && <View style={styles.tabUnderline} />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => setSelectedTab('Messages')}
                >
                    <Text style={[styles.tabText, selectedTab === 'Messages' && styles.tabTextActive]}>
                        Messages (3)
                    </Text>
                    {selectedTab === 'Messages' && <View style={styles.tabUnderline} />}
                </TouchableOpacity>
            </View>
            <View style={styles.tabDivider} />

            {/* Danh sách thông báo hoặc tin nhắn */}
            <FlatList
                data={dataToShow}
                renderItem={selectedTab === 'Notifications' ? renderNotificationItem : renderMessageItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 166,
        height: 45,
        marginTop: 50,
        marginLeft: 24,
    },
    backButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#ECF0F4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        width: 10,
        height: 10,
    },
    headerText: {
        fontFamily: 'Sen',
        fontSize: 17,
        fontWeight: '400',
        color: '#181C2E',
        marginLeft: 40,
    },
    tabContainer: {
        flexDirection: 'row',
        width: 376,
        height: 33,
        marginTop: 24,
        marginLeft: -1,
    },
    tab: {
        flex: 1, // Chia đều 50% chiều rộng
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontFamily: 'Sen',
        fontSize: 14,
        fontWeight: '400',
        color: '#A5A7B9',
        textAlign: 'center',
    },
    tabTextActive: {
        fontWeight: '700',
        color: '#FF7622',
    },
    tabUnderline: {
        width: 146,
        height: 2,
        backgroundColor: '#FF7622',
        marginTop: 5,
    },
    tabDivider: {
        width: '100%',
        height: 1,
        backgroundColor: '#CED7DF',
        opacity: 0.5,
        marginLeft: -1,
        marginTop: 5,
    },
    list: {
        flex: 1,
        marginTop: 15,
    },
    listContent: {
        paddingBottom: 100, // Để tránh bị che bởi bottom tab
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        marginLeft: 5,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 15,
    },
    avatarPlaceholder: {
        width: 54,
        height: 54,
        backgroundColor: '#98A8B8',
        borderRadius: 27,
        marginRight: 10,
    },
    onlineDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 16,
        height: 16,
        backgroundColor: '#34C759',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    notificationContent: {
        flex: 1,
    },
    senderText: {
        fontFamily: 'Sen',
        fontSize: 13,
        fontWeight: '400',
        color: '#32343E',
        marginBottom: 5,
    },
    contentText: {
        fontFamily: 'Sen',
        fontSize: 13,
        fontWeight: '400',
        color: '#32343E',
        marginBottom: 5,
    },
    messageContentText: {
        fontFamily: 'Sen',
        fontSize: 10,
        fontWeight: '400',
        color: '#9C9BA6',
    },
    timeText: {
        fontFamily: 'Sen',
        fontSize: 10,
        fontWeight: '400',
        color: '#9C9BA6',
        marginRight: 10,
    },
    imagePlaceholder: {
        width: 54,
        height: 54,
        backgroundColor: '#98A8B8',
        borderRadius: 10,
        marginRight: 10,
    },
    messageActions: {
        alignItems: 'flex-end',
    },
    unreadBadge: {
        width: 20,
        height: 20,
        backgroundColor: '#FF7622',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginRight: 10,
    },
    unreadCount: {
        fontFamily: 'Sen',
        fontSize: 10,
        fontWeight: '400',
        color: '#FFFFFF',
    },
    divider: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 327,
        height: 1,
        backgroundColor: '#F0F4F9',
    },
});

export default NotificationScreen;