import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddHabit = forwardRef(function AddHabit({ onAdd, theme }, ref) {
  const [text, setText] = useState('');
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      if (inputRef.current) inputRef.current.focus();
    },
    blurInput: () => {
      if (inputRef.current) inputRef.current.blur();
    }
  }));

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
      if (inputRef.current) inputRef.current.blur();
    }
  };

  return (
    <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
      <TextInput
        ref={inputRef}
        style={[styles.input, theme === 'dark' ? styles.inputDark : styles.inputLight]}
        placeholder="Add a new habit..."
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#888'}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />
      <Button title="Add" onPress={handleAdd} color={theme === 'dark' ? '#7ed957' : '#4caf50'} />
    </View>
  );
});

export default AddHabit;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    borderRadius: 10,
    padding: 6,
  },
  light: {
    backgroundColor: '#f7f7fa',
  },
  dark: {
    backgroundColor: '#23232b',
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  inputLight: {
    backgroundColor: '#fff',
    color: '#222',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  inputDark: {
    backgroundColor: '#2c2c36',
    color: '#f7f7fa',
    borderColor: '#444',
    borderWidth: 1,
  },
}); 