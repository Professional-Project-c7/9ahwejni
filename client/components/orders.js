import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';

// Dummy data
const dummyOrders = [
  { id: 1, userName: 'John Doe', delivery: 'Latte', price: 4.99, date: '2024-05-13', status: 'Pending', description: 'This is a delicious Latte with extra foam.' },
  { id: 2, userName: 'Jane Smith', delivery: 'Cappuccino', price: 3.99, date: '2024-05-14', status: 'Pending', description: 'A classic Cappuccino with a sprinkle of cocoa.' },
  { id: 3, userName: 'Alice Johnson', delivery: 'Espresso', price: 2.49, date: '2024-05-13', status: 'Pending', description: 'Strong and intense Espresso shot.' },
  // Add more sample orders here
];

const OrdersPage = () => {
  const [filteredOrders, setFilteredOrders] = useState(dummyOrders); // Initially set filtered orders to all orders
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateFilter = (date) => {
    // Filter orders based on selected date
    const filtered = dummyOrders.filter(order => order.date === date);
    setFilteredOrders(filtered);
  };

  const handleAccept = (id) => {
    // Handle accept action
    // You can implement the logic to update the order status in your application
  };

  const handleReject = (id) => {
    // Handle reject action
    // You can implement the logic to update the order status in your application
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.orderItem}>
        <Text style={styles.orderName}>{item.userName}</Text>
        <Text style={styles.orderDetails}>{item.delivery}</Text>
        <Text style={styles.orderDetails}>Price: {item.price}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleAccept(item.id)} style={[styles.button, styles.acceptButton]}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleReject(item.id)} style={[styles.button, styles.rejectButton]}>
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statusContainer}>
          <Text>Status: {item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => handleDateFilter('2024-05-13')} style={styles.filterButton}>
          <Text style={styles.filterText}>May 13, 2024</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDateFilter('2024-05-14')} style={styles.filterButton}>
          <Text style={styles.filterText}>May 14, 2024</Text>
        </TouchableOpacity>
        {/* Add more filter options here */}
      </View>
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Order Details</Text>
          {selectedOrder && (
            <View>
              <Text>Delivery: {selectedOrder.delivery}</Text>
              <Text>Description: {selectedOrder.description}</Text>
              {/* Add more details to display */}
            </View>
          )}
           <View style={styles.buttonContainerpopup}>
          <TouchableOpacity onPress={() => handleAccept(item.id)} style={[styles.button, styles.acceptButton]}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleReject(item.id)} style={[styles.button, styles.rejectButton]}>
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    marginRight: 20,
    backgroundColor: '#dba617',
    padding: 10,
    borderRadius: 5,
  },
  filterText: {
    fontWeight: 'bold',
  },
  orderItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderColor:'#dba617',
    borderRadius: 5,
  },
  orderName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderDetails: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonContainerpopup: {
    marginTop: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  acceptButton: {
    backgroundColor: '#dba617',
  },
  rejectButton: {
    backgroundColor: '#dba617',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#EEEEEE',
    margin: 50,
    height:600,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 340,
    marginRight: 70,
    backgroundColor: '#dba617',
    padding: 10,
    borderRadius: 30,
    // flex: 1,
    alignItems: 'center',
    alignSelf: 'flex-end',
    width:120,
    height:50,
    fontSize: 20,
  
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrdersPage;
