import React from 'react';
import { FlatList } from 'react-native';
import HabitCard from './HabitItem';

export default function HabitList({ habits, onToggle, theme, mode = 'today', onDelete, onEdit }) {
  return (
    <FlatList
      data={habits}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <HabitCard
          habit={item}
          onToggle={() => onToggle(item.id)}
          theme={theme}
          mode={mode}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      contentContainerStyle={{ paddingBottom: 30 }}
    />
  );
} 