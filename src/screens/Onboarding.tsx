import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from '../components/Button';

export default function Onboarding({ navigation }: any) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [partnerName, setPartnerName] = useState('');

  const handleNext = () => {
    if (step === 1 && name.trim()) {
      setStep(2);
    } else if (step === 2 && partnerName.trim()) {
      // Save data logic here (e.g., to Context or Firebase)
      navigation.replace('Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {step === 1 ? "Let's get to know you" : "Tell us about her"}
          </Text>
          <Text style={styles.subtitle}>
            {step === 1 
              ? "First things first, what should we call you?" 
              : "What is your partner's name?"}
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={step === 1 ? "Your Name" : "Her Name"}
            value={step === 1 ? name : partnerName}
            onChangeText={step === 1 ? setName : setPartnerName}
            autoFocus
          />
        </View>

        <View style={styles.footer}>
          <Button 
            title={step === 1 ? "Next" : "Get Started"} 
            onPress={handleNext}
            disabled={step === 1 ? !name.trim() : !partnerName.trim()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#333',
  },
  footer: {
    marginBottom: 20,
  },
});
