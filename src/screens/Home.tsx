import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { CycleBadge } from '../components/CycleBadge';

export default function Home({ navigation }: any) {
  // Mock data - replace with real data later
  const partnerName = "Sarah";
  const cyclePhase = "Follicular";
  const cycleDay = 8;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.title}>Loving {partnerName} Right</Text>
        </View>

        <Card style={styles.cycleCard}>
          <View style={styles.cycleHeader}>
            <Text style={styles.cardTitle}>Current Status</Text>
            <CycleBadge phase={cyclePhase as any} day={cycleDay} />
          </View>
          <Text style={styles.cycleTip}>
            She's likely feeling energetic and creative today. Great time for a fun date!
          </Text>
        </Card>

        <Card style={styles.tipCard}>
          <Text style={styles.cardTitle}>Today's Tip</Text>
          <Text style={styles.tipText}>
            Have you sent her a "thinking of you" text yet?
          </Text>
          <Button 
            title="Send Message" 
            variant="outline" 
            onPress={() => {}} 
            style={styles.actionButton}
          />
        </Card>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <Button 
              title="Add Task" 
              onPress={() => navigation.navigate('Tasks')} 
              style={styles.gridButton}
              variant="secondary"
            />
            <Button 
              title="Log Date" 
              onPress={() => navigation.navigate('Calendar')} 
              style={styles.gridButton}
              variant="secondary"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  cycleCard: {
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4ECDC4',
  },
  cycleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cycleTip: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  tipCard: {
    marginBottom: 24,
  },
  tipText: {
    fontSize: 16,
    color: '#444',
    marginVertical: 12,
    fontStyle: 'italic',
  },
  actionButton: {
    marginTop: 8,
  },
  quickActions: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  gridButton: {
    flex: 1,
  },
});
