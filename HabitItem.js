import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Helper to pick an emoji/icon based on habit name (simple for now)
function getHabitIcon(name) {
  if (/gym|workout|exercise/i.test(name)) return '🏋️‍♂️';
  if (/meditate|yoga/i.test(name)) return '🧘';
  if (/code|coding|program/i.test(name)) return '🤓';
  if (/fifa|game|play/i.test(name)) return '🎮';
  return '✨';
}

function getHabitColor(name) {
  // Pastel palette
  const colors = [
    '#ffe6e6', // soft pink
    '#e6f7ff', // soft blue
    '#e6ffe6', // soft green
    '#fffbe6', // soft yellow
    '#f3e6ff', // soft purple
    '#ffe6fa', // soft magenta
    '#e6fff7', // soft teal
    '#fff0e6', // soft orange
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return colors[hash % colors.length];
}

const ACCENT_GREEN = '#7ed957';
const MAIN_TEXT = '#222';
const SECONDARY_TEXT = '#888';
const DELETE_RED = '#ff7f7f';

export default function HabitCard({ habit, onToggle, theme, mode = 'today', onEdit, onDelete }) {
  const bgColor = habit.color || getHabitColor(habit.name);
  return (
    <View style={[styles.card, { backgroundColor: bgColor }, mode === 'today' && styles.cardToday]}>  
      <View style={styles.header}>
        <Text style={styles.icon}>{getHabitIcon(habit.name)}</Text>
        <View style={styles.headerText}>
          <Text style={[styles.name, { color: MAIN_TEXT }]}>{habit.name}</Text>
          <View style={styles.streakRow}>
            <Text style={[styles.streakBadge, { color: ACCENT_GREEN }]}>🔥 {habit.streak} Days</Text>
          </View>
        </View>
        {mode === 'today' && (
          <>
            <TouchableOpacity onPress={onToggle} style={styles.checkBtnToday}>
              {habit.completedToday ? (
                <View style={[styles.roundedCheckCompleted, { backgroundColor: ACCENT_GREEN }] }>
                  <Feather name="check" size={16} color="#fff" />
                </View>
              ) : (
                <View style={styles.roundedCheckIncomplete}>
                  <Feather name="check" size={16} color={SECONDARY_TEXT} />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onEdit && onEdit(habit)} style={styles.editBtn}>
              <Feather name="edit-2" size={18} color={SECONDARY_TEXT} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete && onDelete(habit.id)} style={styles.deleteBtn}>
              <Feather name="trash-2" size={18} color={DELETE_RED} />
            </TouchableOpacity>
          </>
        )}
      </View>
      {/* Placeholder for grid/calendar or weekly checkmarks */}
      <View style={styles.placeholder}>
        {mode === 'overall' ? (
          <View style={styles.gridContainer}>
            {[...Array(8)].map((_, rowIdx) => (
              <View key={rowIdx} style={styles.gridRow}>
                {[...Array(30)].map((_, colIdx) => {
                  const today = new Date();
                  const cellDate = new Date(today);
                  cellDate.setDate(today.getDate() - (30 * (7 - rowIdx) + (29 - colIdx)));
                  const dateStr = cellDate.toISOString().slice(0, 10);
                  const completed = habit.logObj && habit.logObj[dateStr];
                  return (
                    <View key={colIdx} style={styles.gridDotWrap}>
                      <View style={[styles.gridDotSquare, { backgroundColor: completed ? '#388e3c' : '#e0e0e0', opacity: completed ? 1 : 0.3 }]} />
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        ) : mode === 'weekly' ? (
          <View style={styles.weekRow}>
            {['Sat','Sun','Mon','Tue','Wed','Thu','Fri'].map((day, idx) => {
              const today = new Date();
              const first = today.getDate() - today.getDay();
              const date = new Date(today.setDate(first + idx));
              const dateStr = date.toISOString().slice(0,10);
              const completed = habit.logObj && habit.logObj[dateStr];
              return (
                <View key={day} style={styles.weekDay}>
                  <Text style={styles.weekDayLabel}>{day}</Text>
                  {completed ? (
                    <View style={styles.roundedCheckCompleted}>
                      <Feather name="check" size={16} color="#fff" />
                    </View>
                  ) : (
                    <View style={styles.roundedCheckIncomplete}>
                      <Feather name="check" size={16} color="#d3d3d3" />
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    marginVertical: 14,
    marginHorizontal: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
  },
  cardToday: {
    padding: 12,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  streakBadge: {
    backgroundColor: '#fff',
    color: '#388e3c',
    fontWeight: 'bold',
    fontSize: 13,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    overflow: 'hidden',
    marginTop: 2,
    marginBottom: 2,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 1,
  },
  checkBtn: {
    marginLeft: 10,
    padding: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#388e3c',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 2,
  },
  checkBtnActive: {
    backgroundColor: '#388e3c',
    borderColor: '#388e3c',
  },
  checkBtnToday: {
    marginLeft: 10,
  },
  placeholder: {
    marginTop: 12,
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#bbb',
    fontSize: 13,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 2,
  },
  weekDay: {
    alignItems: 'center',
    flex: 1,
  },
  weekDayLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  weekCheck: {
    fontSize: 18,
  },
  gridContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  gridDotWrap: {
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
  },
  gridDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  roundedCheckCompleted: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#7ed957',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedCheckIncomplete: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtn: {
    marginLeft: 8,
    padding: 4,
    alignSelf: 'center',
  },
  deleteBtn: {
    marginLeft: 8,
    padding: 4,
    alignSelf: 'center',
  },
  cardOverall: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 8,
    shadowColor: '#388e3c',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRowOverall: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTextOverall: {
    flex: 1,
    justifyContent: 'center',
  },
  nameOverall: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  streakOverall: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  heatmapGrid: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 2,
  },
  heatmapRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  heatmapDotWrap: {
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heatmapDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  gridDotSquare: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
}); 