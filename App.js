import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, useColorScheme, View, Text, TextInput, TouchableOpacity, Animated, Easing } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather } from '@expo/vector-icons';
import TodayScreen from './TodayScreen';
import HabitList from './HabitList';
import { getHabits, addHabit, completeHabitForToday, refreshStreaks, removeHabit, updateHabit } from './storage';

function WeeklyScreen(props) {
  const colorScheme = useColorScheme();
  return (
    <HabitList
      habits={props.habits}
      onToggle={props.onToggleHabit}
      theme={colorScheme}
      mode="weekly"
      onDelete={props.onDeleteHabit}
      onEdit={props.onEditHabit}
    />
  );
}

function OverallScreen(props) {
  const colorScheme = useColorScheme();
  return (
    <HabitList
      habits={props.habits}
      onToggle={props.onToggleHabit}
      theme={colorScheme}
      mode="overall"
      onDelete={props.onDeleteHabit}
      onEdit={props.onEditHabit}
    />
  );
}

const Tab = createMaterialTopTabNavigator();

function CustomTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => navigation.navigate(route.name)}
            style={[styles.tabItem, isFocused && styles.tabItemActive]}
            activeOpacity={0.85}
          >
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function AppTitleBar({ colorScheme }) {
  return (
    <View style={[styles.titleBar, colorScheme === 'dark' ? styles.titleBarDark : styles.titleBarLight]}>
      <Text style={[styles.titleText, { color: '#222' }]}>Habit <Text style={{ color: '#388e3c' }}>Tracker</Text></Text>
    </View>
  );
}

export default function App() {
  const systemColorScheme = useColorScheme();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editHabit, setEditHabit] = useState(null);
  const [editText, setEditText] = useState('');
  const addHabitRef = useRef();

  useEffect(() => {
    async function load() {
      await refreshStreaks();
      const loaded = await getHabits();
      setHabits(markCompletedToday(loaded));
      setLoading(false);
    }
    load();
  }, []);

  function markCompletedToday(habits) {
    const today = new Date().toISOString().slice(0, 10);
    return habits.map(habit => ({
      ...habit,
      completedToday: habit.lastCompleted === today
    }));
  }

  const handleAddHabit = async (name) => {
    setLoading(true);
    const updated = await addHabit(name);
    setHabits(markCompletedToday(updated));
    setLoading(false);
  };

  const handleToggleHabit = async (id) => {
    setLoading(true);
    const updated = await completeHabitForToday(id);
    setHabits(markCompletedToday(updated));
    setLoading(false);
  };

  const handleDeleteHabit = async (id) => {
    setLoading(true);
    const updated = await removeHabit(id);
    setHabits(markCompletedToday(updated));
    setLoading(false);
  };

  const handleEditHabit = (habit) => {
    setEditHabit(habit);
    setEditText(habit.name);
    setEditModalVisible(true);
  };

  const handleEditSave = async () => {
    if (editHabit && editText.trim()) {
      setLoading(true);
      await updateHabit(editHabit.id, { name: editText.trim() });
      const updated = await getHabits();
      setHabits(markCompletedToday(updated));
      setEditModalVisible(false);
      setEditHabit(null);
      setEditText('');
      setLoading(false);
    }
  };

  // Focus AddHabit input when FAB is pressed
  const handleFabPress = () => {
    if (addHabitRef.current && addHabitRef.current.focusInput) {
      addHabitRef.current.focusInput();
    }
  };

  return (
    <NavigationContainer>
      <StatusBar style={systemColorScheme === 'dark' ? 'light' : 'dark'} />
      <AppTitleBar colorScheme={systemColorScheme} />
      <Tab.Navigator
        initialRouteName="Today"
        tabBar={props => <CustomTabBar {...props} theme={systemColorScheme} />}
        screenOptions={{
          tabBarActiveTintColor: '#388e3c',
          tabBarLabelStyle: { fontWeight: 'bold', fontSize: 16, textAlign: 'center', letterSpacing: 0.5 },
          tabBarStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            height: 54,
          },
        }}
      >
        <Tab.Screen name="Today">
          {() => (
            <TodayScreen
              habits={habits}
              loading={loading}
              onAddHabit={handleAddHabit}
              onToggleHabit={handleToggleHabit}
              onDeleteHabit={handleDeleteHabit}
              onEditHabit={handleEditHabit}
              addHabitRef={addHabitRef}
              editModalVisible={editModalVisible}
              editHabit={editHabit}
              editText={editText}
              setEditText={setEditText}
              setEditModalVisible={setEditModalVisible}
              handleEditSave={handleEditSave}
              handleFabPress={handleFabPress}
              theme={systemColorScheme}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Weekly">
          {() => (
            <WeeklyScreen
              habits={habits}
              onToggleHabit={handleToggleHabit}
              onDeleteHabit={handleDeleteHabit}
              onEditHabit={handleEditHabit}
              theme={systemColorScheme}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Overall">
          {() => (
            <OverallScreen
              habits={habits}
              onToggleHabit={handleToggleHabit}
              onDeleteHabit={handleDeleteHabit}
              onEditHabit={handleEditHabit}
              theme={systemColorScheme}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
      {/* Edit Modal for all tabs */}
      {editModalVisible && (
        <View style={styles.modalOverlay} pointerEvents="box-none">
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Habit</Text>
            <TextInput
              style={styles.modalInput}
              value={editText}
              onChangeText={setEditText}
              autoFocus
              placeholder="Habit name"
              returnKeyType="done"
              onSubmitEditing={handleEditSave}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBtn} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.modalBtnSave]} onPress={handleEditSave}>
                <Text style={[styles.modalBtnText, styles.modalBtnSaveText]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  titleBar: {
    paddingTop: 54,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0,
    zIndex: 10,
  },
  titleBarLight: {
    backgroundColor: '#fff',
  },
  titleBarDark: {
    backgroundColor: '#18181f',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 300,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  modalInput: {
    width: '100%',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 18,
    color: '#222',
    backgroundColor: '#f7f7fa',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  modalBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginLeft: 8,
  },
  modalBtnText: {
    fontSize: 16,
    color: '#222',
  },
  modalBtnSave: {
    backgroundColor: '#388e3c',
  },
  modalBtnSaveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#f7f7fa',
    borderRadius: 16,
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 4,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemActive: {
    backgroundColor: '#b6f5c3',
    borderRadius: 12,
    shadowColor: '#388e3c',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tabLabel: {
    color: '#222',
    fontWeight: '600',
    fontSize: 16,
  },
  tabLabelActive: {
    color: '#388e3c',
    fontWeight: 'bold',
  },
  themeToggleBtn: {
    position: 'absolute',
    right: 18,
    top: 10,
    padding: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(220,220,220,0.25)',
  },
});
