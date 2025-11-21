import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export default function Reminders() {
  const reminders = [
    { id: '1', title: 'Buy flowers', time: '10:00 AM', type: 'Weekly' },
    { id: '2', title: 'Date night planning', time: '6:00 PM', type: 'Monthly' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reminders</Text>
        <Button title="+ New" onPress={() => {}} style={styles.addButton} textStyle={styles.addButtonText} />
      </View>
      
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.reminderTitle}>{item.title}</Text>
                <Text style={styles.reminderMeta}>{item.time} • {item.type}</Text>
              </View>
              <Button title="Edit" variant="outline" onPress={() => {}} style={styles.editButton} textStyle={styles.editButtonText} />
            </View>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 80,
  },
  addButtonText: {
    fontSize: 14,
  },
  listContent: {
    padding: 20,
  },
  card: {
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  reminderMeta: {
    fontSize: 14,
    color: '#888',
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    minWidth: 60,
  },
  editButtonText: {
    fontSize: 12,
  },
});
