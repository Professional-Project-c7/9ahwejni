import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Calendar from 'react-native-calendars';

const Availability = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const markedDates = {
    '2023-06-01': { marked: true, dotColor: 'red' },
    '2023-06-05': { marked: true, dotColor: 'red' },
    '2023-06-10': { marked: true, dotColor: 'red' },
  };

  const renderDay = (day, markedDates) => {
    const isMarked = markedDates[day.dateString] && markedDates[day.dateString].marked;

    return (
      <View style={[styles.dayContainer, isMarked && styles.selectedDay]}>
        <Text style={styles.dayText}>{day.day}</Text>
        {isMarked && <View style={styles.dot} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        renderDay={renderDay}
      />
      {selectedDate && (
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>Select time for {selectedDate}</Text>
          {/* Add your time picker component here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDay: {
    backgroundColor: 'lightgray',
  },
  dayText: {
    color: 'black',
    fontSize: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    marginTop: 2,
  },
  timeContainer: {
    marginTop: 20,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Availability;