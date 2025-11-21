import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export default function Tasks() {
  const tasks = [
    { id: '1', title: 'Book dinner reservation', done: false },
    { id: '2', title: 'Write a love note', done: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks & Ideas</Text>
        <Button title="+ Add" onPress={() => {}} style={styles.addButton} textStyle={styles.addButtonText} />
      </View>
      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card style={[styles.card, item.done && styles.cardDone]}>
            <View style={styles.cardContent}>
              <Text style={[styles.taskTitle, item.done && styles.taskTitleDone]}>{item.title}</Text>
              <Button 
                title={item.done ? "Undo" : "Done"} 
                variant={item.done ? "outline" : "primary"}
                onPress={() => {}} 
                style={styles.actionButton} 
                textStyle={styles.actionButtonText} 
              />
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
  cardDone: {
    opacity: 0.6,
    backgroundColor: '#F5F5F5',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    minWidth: 60,
  },
  actionButtonText: {
    fontSize: 12,
  },
});
