import React from 'react';
import { StyleSheet, View, SafeAreaView, useColorScheme, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import AddHabit from './AddHabit';
import HabitList from './HabitList';
import { Feather } from '@expo/vector-icons';

export default function TodayScreen({
  habits,
  loading,
  onAddHabit,
  onToggleHabit,
  onDeleteHabit,
  onEditHabit,
  addHabitRef,
  handleFabPress
}) {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={[styles.container, colorScheme === 'dark' ? styles.dark : styles.light]}>
      <AddHabit ref={addHabitRef} onAdd={onAddHabit} theme={colorScheme} />
      {loading ? (
        <ActivityIndicator size="large" color={colorScheme === 'dark' ? '#7ed957' : '#4caf50'} style={{ marginTop: 40 }} />
      ) : habits.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateTitle}>No habits yet!</Text>
          <Text style={styles.emptyStateText}>Tap the + button to add your first habit.</Text>
        </View>
      ) : (
        <HabitList habits={habits} onToggle={onToggleHabit} theme={colorScheme} onDelete={onDeleteHabit} onEdit={onEditHabit} />
      )}
      <TouchableOpacity style={styles.fab} onPress={handleFabPress} activeOpacity={0.85}>
        <Feather name="plus" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  light: {
    backgroundColor: '#f7f7fa',
  },
  dark: {
    backgroundColor: '#18181f',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#388e3c',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 100,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyStateTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
  },
}); 