import AsyncStorage from '@react-native-async-storage/async-storage';

const HABITS_KEY = 'HABITS_DATA';

// Helper to convert log array to object (for backward compatibility)
function normalizeLog(log) {
  if (Array.isArray(log)) {
    const obj = {};
    log.forEach(date => { obj[date] = true; });
    return obj;
  }
  return log || {};
}

// Get all habits
export async function getHabits() {
  try {
    const jsonValue = await AsyncStorage.getItem(HABITS_KEY);
    let habits = jsonValue != null ? JSON.parse(jsonValue) : [];
    // Normalize log to object
    habits = habits.map(h => ({ ...h, logObj: normalizeLog(h.log) }));
    return habits;
  } catch (e) {
    console.error('Failed to load habits', e);
    return [];
  }
}

// Save all habits
export async function saveHabits(habits) {
  try {
    // Save logObj as log (for storage)
    const toSave = habits.map(h => ({ ...h, log: h.logObj }));
    const jsonValue = JSON.stringify(toSave);
    await AsyncStorage.setItem(HABITS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save habits', e);
  }
}

// Add a new habit
export async function addHabit(name) {
  const habits = await getHabits();
  const newHabit = {
    id: Date.now().toString(),
    name,
    streak: 0,
    lastCompleted: null,
    logObj: {},
  };
  const updated = [...habits, newHabit];
  await saveHabits(updated);
  return updated;
}

// Update a habit (by id)
export async function updateHabit(id, updates) {
  const habits = await getHabits();
  const updated = habits.map(habit =>
    habit.id === id ? { ...habit, ...updates } : habit
  );
  await saveHabits(updated);
  return updated;
}

// Remove a habit
export async function removeHabit(id) {
  const habits = await getHabits();
  const updated = habits.filter(habit => habit.id !== id);
  await saveHabits(updated);
  return updated;
}

// Mark habit as completed for today, update streak and log
export async function completeHabitForToday(id) {
  const habits = await getHabits();
  const today = new Date().toISOString().slice(0, 10);
  const updated = habits.map(habit => {
    if (habit.id === id) {
      let newStreak = habit.streak;
      if (habit.lastCompleted) {
        const last = new Date(habit.lastCompleted);
        const diff = (new Date(today) - last) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          newStreak += 1;
        } else if (diff > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }
      // Update logObj
      const logObj = { ...habit.logObj, [today]: true };
      return {
        ...habit,
        streak: newStreak,
        lastCompleted: today,
        logObj,
      };
    }
    return habit;
  });
  await saveHabits(updated);
  return updated;
}

// Check and update streaks for all habits at app start
export async function refreshStreaks() {
  const habits = await getHabits();
  const today = new Date().toISOString().slice(0, 10);
  const updated = habits.map(habit => {
    if (!habit.lastCompleted) return habit;
    const last = new Date(habit.lastCompleted);
    const diff = (new Date(today) - last) / (1000 * 60 * 60 * 24);
    if (diff > 1) {
      return { ...habit, streak: 0 };
    }
    return habit;
  });
  await saveHabits(updated);
  return updated;
} 