import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Dummy data
const initialOrders = [
  { id: 1, userName: 'John Doe', delivery: 'Latte', price: 4.99, date: '2024-05-13', status: 'Pending', description: 'This is a delicious Latte with extra foam.' },
  { id: 2, userName: 'Jane Smith', delivery: 'Cappuccino', price: 3.99, date: '2024-05-14', status: 'Pending', description: 'A classic Cappuccino with a sprinkle of cocoa.' },
  { id: 3, userName: 'Alice Johnson', delivery: 'Espresso', price: 2.49, date: '2024-05-13', status: 'Pending', description: 'Strong and intense Espresso shot.' },
  // Add more sample orders here
];

const OrdersPage = ({ navigation }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleDateFilter = (date) => {
    const filtered = orders.filter(order => order.date === date);
    setFilteredOrders(filtered);
  };

  const handleAccept = (id) => {
    navigation.navigate('Map');
  };

  const handleReject = (id) => {
    const updatedOrders = orders.map(order => {
      if (order.id === id) {
        return { ...order, status: 'accepted' };
      }
      return order;
    });

    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    closeModal();
  };

  const handleRestore = (id) => {
    const restoredOrders = orders.map(order => {
      if (order.id === id) {
        return initialOrders.find(initialOrder => initialOrder.id === id);
      }
      return order;
    });

    setOrders(restoredOrders);
    setFilteredOrders(restoredOrders);
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
        {item.status === 'Pending' && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleAccept(item.id)} style={[styles.button, styles.acceptButton]}>
              <Text style={styles.buttonText}>location</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleReject(item.id)} style={[styles.button, styles.rejectButton]}>
              <Text style={styles.buttonText}>shipped</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.statusContainer}>
          <Text>Status: {item.status}</Text>
        </View>
        {item.status !== 'Pending' && (
          <TouchableOpacity onPress={() => handleRestore(item.id)} style={styles.checkmarkContainer}>
            <FontAwesome name="check-square-o" color={'green'} size={30} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => handleDateFilter('2024-05-13')} style={styles.filterButton}>
          <Text style={styles.filterText}>May 22, 2024</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDateFilter('2024-05-14')} style={styles.filterButton}>
          <Text style={styles.filterText}>May 23, 2024</Text>
        </TouchableOpacity>
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
            </View>
          )}
          <View style={styles.buttonContainerpopup}>
            <TouchableOpacity onPress={() => handleAccept(selectedOrder.id)} style={[styles.button, styles.acceptButton]}>
              <Text style={styles.buttonText}>location</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleReject(selectedOrder.id)} style={[styles.button, styles.rejectButton]}>
              <Text style={styles.buttonText}>shipped</Text>
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
    borderRadius: 25,
  },
  filterText: {
    fontWeight: 'bold',
  },
  orderItem: {
   
      backgroundColor: 'white',
      borderRadius: 35,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 10,
    
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
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
    marginRight:10,
    marginTop:  12,
   
  },
  checkmark: {
    fontSize: 20,
    
    color: 'green',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#dba617',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    width: 120,
    height: 50,
    fontSize: 20,
    justifyContent: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrdersPage;
