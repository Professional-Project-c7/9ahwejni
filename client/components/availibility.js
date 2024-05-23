import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

const Availability = () => {
  const [weekdays, setWeekdays] = useState([
    {
      day: 'Monday',
      startTime: null,
      endTime: null,
      isSelected: false,
      showTimeInput: false,
      showStartPicker: false,
      showEndPicker: false,
    },
    {
      day: 'Tuesday',
      startTime: null,
      endTime: null,
      isSelected: false,
      showTimeInput: false,
      showStartPicker: false,
      showEndPicker: false,
    },
    {
      day: 'Wednesday',
      startTime: null,
      endTime: null,
      isSelected: false,
      showTimeInput: false,
      showStartPicker: false,
      showEndPicker: false,
    },
    {
      day: 'Thursday',
      startTime: null,
      endTime: null,
      isSelected: false,
      showTimeInput: false,
      showStartPicker: false,
      showEndPicker: false,
    },
    {
      day: 'Friday',
      startTime: null,
      endTime: null,
      isSelected: false,
      showTimeInput: false,
      showStartPicker: false,
      showEndPicker: false,
    },
    {
      day: 'Saturday',
      startTime: null,
      endTime: null,
      isSelected: false,
      showTimeInput: false,
      showStartPicker: false,
      showEndPicker: false,
    },
    {
      day: 'Sunday',
      startTime: null,
      endTime: null,
      isSelected: false,
      showTimeInput: false,
      showStartPicker: false,
      showEndPicker: false,
    },
  ]);

  const [submitted, setSubmitted] = useState(false);
  const [submittedTimes, setSubmittedTimes] = useState([]);

  const toggleDaySelection = (day) => {
    setWeekdays(
      weekdays.map((item) =>
        item.day === day
          ? { ...item, isSelected: !item.isSelected, showTimeInput: !item.showTimeInput }
          : item
      )
    );
  };

  const handleTimeChange = (day, event, selectedTime, type) => {
    setWeekdays(
      weekdays.map((item) => {
        if (item.day === day) {
          if (type === 'start') {
            return {
              ...item,
              startTime: selectedTime,
              showStartPicker: Platform.OS === 'ios',
            };
          }
          if (type === 'end') {
            return {
              ...item,
              endTime: selectedTime,
              showEndPicker: Platform.OS === 'ios',
            };
          }
        }
        return item;
      })
    );
  };

  const handleSubmit = () => {
    const submittedTimes = weekdays.filter((item) => item.isSelected);
    setSubmittedTimes(submittedTimes);
    setSubmitted(true);
  };

  const renderDay = ({ day, startTime, endTime, isSelected, showTimeInput, showStartPicker, showEndPicker }) => {
    return (
      <TouchableOpacity
        key={day}
        onPress={() => toggleDaySelection(day)}
        style={[
          styles.dayContainer,
          isSelected && styles.selectedDay,
        ]}
      >
        <Text style={styles.dayText}>{day}</Text>
        {isSelected && <View style={styles.dot} />}
        {showTimeInput && (
          <View style={styles.timeInputContainer}>
            <TouchableOpacity
              onPress={() =>
                setWeekdays(
                  weekdays.map((item) =>
                    item.day === day ? { ...item, showStartPicker: true } : item
                  )
                )
              }
              style={styles.timePickerButton}
            >
              <Text style={styles.timePickerText}>
                {startTime ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Start Time'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setWeekdays(
                  weekdays.map((item) =>
                    item.day === day ? { ...item, showEndPicker: true } : item
                  )
                )
              }
              style={styles.timePickerButton}
            >
              <Text style={styles.timePickerText}>
                {endTime ? endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select End Time'}
              </Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startTime || new Date()}
                mode="time"
                display="default"
                onChange={(event, selectedTime) =>
                  handleTimeChange(day, event, selectedTime, 'start')
                }
              />
            )}
            {showEndPicker && (
              <DateTimePicker
                value={endTime || new Date()}
                mode="time"
                display="default"
                onChange={(event, selectedTime) =>
                  handleTimeChange(day, event, selectedTime, 'end')
                }
              />
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderSubmittedTime = ({ day, startTime, endTime }) => {
    return (
      <View key={day} style={styles.submittedTimeContainer}>
        <Text style={styles.submittedTimeText}>{day}</Text>
        <Text style={styles.submittedTimeText}>
          {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          markedDates={{}}
        />
        <ScrollView style={styles.savedTimesContainer}>
          {weekdays.map((weekday) => renderDay(weekday))}
        </ScrollView>
        {submitted && (
          <FlatList
            data={submittedTimes}
            renderItem={({ item }) => renderSubmittedTime(item)}
            keyExtractor={(item) => item.day}
            style={styles.submittedTimesContainer}
          />
        )}
        <TouchableOpacity style={[styles.submitButton, submitted && styles.submitButtonDisabled]} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#dba617',
    marginBottom: 20,
    borderRadius: 10,
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginVertical:5,
    borderWidth: 1,
    borderColor: '#dba617',
    borderRadius: 20,
  },
  selectedDay: {
    backgroundColor: 'white',
  },
  dayText: {
    color: '#dba617',
    fontSize: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginTop: 2,
  },
  timeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  timePickerButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dba617',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  timePickerText: {
    fontSize: 16,
  },
  savedTimesContainer: {
    marginTop: 20,
  },
  submittedTimesContainer: {
    marginTop: 20,
  },
  submittedTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  submittedTimeText: {
    color: '#dba617',
    fontSize: 16,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#dba617',
    padding: 10,
    borderRadius: 30,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Availability;