import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Card } from '../components/Card';

export default function Favorites() {
  const favorites = [
    { id: '1', category: 'Flowers', title: 'Peonies', notes: 'She loves pink ones.' },
    { id: '2', category: 'Food', title: 'Sushi', notes: 'Salmon sashimi is her fav.' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Her Favorites</Text>
      </View>
      
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.itemTitle}>{item.title}</Text>
            {item.notes && <Text style={styles.notes}>{item.notes}</Text>}
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
  listContent: {
    padding: 20,
  },
  card: {
    marginBottom: 12,
  },
  category: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notes: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});
