import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions , Modal } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Notification from './Notification';
import { IconButton } from 'react-native-paper';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('Week');
  const [somme, setSomme] = useState(0);
  const [nawsomme, setNawsomme] = useState(0);
console.log(somme);
const [showNotification, setShowNotification] = useState(false);

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('IdUser');
      const storedBalance = await AsyncStorage.getItem(`PAYMENT_AMOUNT_${userId}`);
      console.log("userId",userId);

      if (storedBalance !== null) {
        setSomme(parseFloat(storedBalance));
      } 
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Update AsyncStorage with the new sum whenever nawsomme changes
    async function updateAsyncStorage() {
      try {
        const userId = await AsyncStorage.getItem('IdUser');
        const oldStoredBalance = await AsyncStorage.getItem(`PAYMENT_AMOUNT_${userId}`);
        const oldSomme = parseFloat(oldStoredBalance) || 0;
        const newSomme = oldSomme + nawsomme;
        setSomme(newSomme); // Update the state
        await AsyncStorage.setItem(`PAYMENT_AMOUNT_${userId}`, JSON.stringify(newSomme)); // Update AsyncStorage
      } catch (error) {
        console.log('Error updating AsyncStorage:', error);
      }
    }

    updateAsyncStorage();
  }, [nawsomme]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const chartData = {
    Day: {
      labels: ["0:00", "6:00", "12:00", "18:00", "24:00"],
      datasets: [
        {
          data: [1500, 2000, 1800, 2200, 2500],
          color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
          strokeWidth: 2,
        }
      ],
      legend: ["Balance"],
    },
    Week: {
      labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      datasets: [
        {
          data: [15000, 16000, 17000, 18000, 12000, 22000, 20000],
          color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
          strokeWidth: 2,
        }
      ],
      legend: ["Balance"],
    },
    Month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          data: [50000, 60000, 70000, 80000],
          color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
          strokeWidth: 2,
        }
      ],
      legend: ["Balance"],
    },
    Year: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          data: [200000, 210000, 220000, 230000, 240000, 250000, 260000, 270000, 280000, 290000, 300000, 310000],
          color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
          strokeWidth: 2,
        }
      ],
      legend: ["Balance"],
    }
  };
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };
  const transactions = [
    { initials: "JW", name: "Jenny Wilson", amount: "-$9", color: "#FFCC80", time: "Today, 12:30 pm" },
    { initials: "WW", name: "Wade Warren", amount: "-$7", color: "#E1BEE7", time: "Today, 12:30 pm" },
    { initials: "CW", name: "Cameron Williamson", amount: "-$12", color: "#80DEEA", time: "Today, 12:30 pm" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Statement</Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Day' ? styles.activeTab : {}]}
            onPress={() => handleTabPress('Day')}
          >
            <Text style={[styles.tabText, activeTab === 'Day' ? styles.activeTabText : {}]}>Day</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Week' ? styles.activeTab : {}]}
            onPress={() => handleTabPress('Week')}
          >
            <Text style={[styles.tabText, activeTab === 'Week' ? styles.activeTabText : {}]}>Week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Month' ? styles.activeTab : {}]}
            onPress={() => handleTabPress('Month')}
          >
            <Text style={[styles.tabText, activeTab === 'Month' ? styles.activeTabText : {}]}>Month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Year' ? styles.activeTab : {}]}
            onPress={() => handleTabPress('Year')}
          >
            <Text style={[styles.tabText, activeTab === 'Year' ? styles.activeTabText : {}]}>Year</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.chartSection}>
        <View style={styles.dateRange}>
          <Text>12 Sep, 2023 - 18 Sep, 2023</Text>
          <Text>USD</Text>
        </View>
        <LineChart
          data={chartData[activeTab]}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.summarySection}>
        <View style={[styles.summaryBox, styles.balanceBox]}>
          <Text style={styles.summaryAmount} onPress={toggleNotification}   >show</Text>
   
        </View>
      </View>

      <View style={styles.transactionSection}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionTitle}>Transactions</Text>
          <View style={styles.exportButtons}>
            <TouchableOpacity style={styles.exportButton}><Text>PDF</Text></TouchableOpacity>
            <TouchableOpacity style={styles.exportButton}><Text>CSV</Text></TouchableOpacity>
          </View>
        </View>
        {transactions.map((transaction, index) => (
          <View key={index} style={styles.transactionItem}>
            <View style={[styles.initialsCircle, { backgroundColor: transaction.color }]}>
              <Text style={styles.initialsText}>{transaction.initials}</Text>
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}></Text>
              <Text style={styles.transactionTime}>{transaction.time}</Text>
            </View>
            <Text style={styles.transactionAmount}>{transaction.amount}</Text>
          </View>
        ))}
      </View>
      <Modal
        visible={showNotification}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleNotification}
      >
        <View style={styles.notificationModal}>
         <Notification/>
          <IconButton icon="close" color="#000" onPress={toggleNotification} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8FAFB',
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    padding: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: '#dba617',
  },
  tabText: {
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
  },
  chartSection: {
    marginBottom: 20,
  },
  dateRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
  },
  summarySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryBox: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  balanceBox: {
    backgroundColor: '#dba617',
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  summaryLabel: {
    fontSize: 14,
    color: 'white',
  },
  transactionSection: {
    marginBottom: 20,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  notificationModal: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  exportButtons: {
    flexDirection: 'row',
  },
  exportButton: {
    marginLeft: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  initialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: 'white',
    fontWeight: 'bold',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionTime: {
    color: '#999',
    marginBottom: 19
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Transactions;
