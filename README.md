# HabitTracker

A cross-platform mobile app to help you build and maintain positive habits, track your progress, and visualize your streaks. Built with React Native and Expo.

---

## Features

### 1. Add, Edit, and Delete Habits
- **Add new habits** with a simple input and button.
- **Edit existing habits** via a modal dialog, allowing you to rename habits.
- **Delete habits** instantly with a single tap.

### 2. Daily, Weekly, and Overall Tracking
- **Today Tab:** See all your habits for the day, mark them as completed, and view your current streak.
- **Weekly Tab:** Visualize your habit completion for each day of the week.
- **Overall Tab:** See a grid/calendar view of your habit completion history, helping you spot long-term trends.

### 3. Streaks and Progress Visualization
- **Streak Counter:** Each habit displays a fire badge showing your current streak in days.
- **Calendar/Weekly Grid:** Visual feedback for each day you complete a habit, motivating you to keep your streak alive.

### 4. Persistent Storage
- All habits and their completion logs are stored locally on your device using `AsyncStorage`, so your data is safe even if you close the app.

### 5. Responsive and Themed UI
- **Light and Dark Mode:** The app automatically adapts to your device’s color scheme.
- **Modern UI:** Uses custom tab navigation, floating action buttons, and smooth transitions for a delightful user experience.
- **Emoji and Color Coding:** Each habit gets a unique emoji and pastel color for easy identification.

### 6. Cross-Platform Support
- Runs on Android, iOS, and web (via Expo).

---

## Technologies Used

- **React Native:** Core framework for building native mobile apps using JavaScript and React.
- **Expo:** Toolchain for rapid React Native development, providing build, deployment, and device APIs.
- **React Navigation:** For managing navigation and tabs (`@react-navigation/native`, `@react-navigation/material-top-tabs`).
- **AsyncStorage:** For persistent local storage of habits and logs (`@react-native-async-storage/async-storage`).
- **Expo StatusBar:** For status bar control and theming.
- **React Native Gesture Handler & Reanimated:** For smooth gestures and animations.
- **Expo Vector Icons:** For beautiful, scalable icons (Feather icons).
- **Modern JavaScript (ES6+) and React Hooks:** For state management, side effects, and component logic.

---

## How It Works

1. **App Structure:**  
   - The main app uses a top tab navigator with three screens: Today, Weekly, and Overall.
   - Each screen displays a list of habits, with the Today screen allowing marking as complete, editing, and deleting.

2. **Habit Management:**  
   - Adding a habit creates a new entry with a unique ID, name, streak counter, and log object.
   - Completing a habit updates its streak and logs the completion date.
   - Editing and deleting habits update the local storage and UI in real time.

3. **Persistence:**  
   - All habit data is stored in `AsyncStorage` as JSON, ensuring persistence across app restarts.

4. **UI/UX:**  
   - The app uses custom styles for a clean, modern look.
   - Color scheme adapts to system settings.
   - Floating action button (FAB) for quick habit addition.

---

## How I Made It

- **Component-Based Design:** Broke down the UI into reusable components (`AddHabit`, `HabitList`, `HabitItem`, etc.).
- **State Management:** Used React hooks (`useState`, `useEffect`, `useRef`) for local state and side effects.
- **Navigation:** Implemented with React Navigation’s material top tabs for a native feel.
- **Persistence:** Leveraged AsyncStorage for robust, device-local data storage.
- **User Experience:** Focused on minimal taps for common actions, instant feedback, and motivational visuals (streaks, emojis, colors).
- **Cross-Platform Testing:** Ensured the app works on Android, iOS, and web using Expo’s development tools.

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/habit-tracker-app.git
   cd habit-tracker-app/HabitTracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the app:**
   ```bash
   npm start
   ```
   - Use Expo Go on your phone, or run on an emulator/simulator.

---

## Screenshots

https://github.com/user-attachments/assets/305be27f-2dcd-4234-9ea0-302a6c1125a4


<img width="1080" height="2400" alt="Screenshot_20250716-194117 Expo Go" src="https://github.com/user-attachments/assets/7d8cf051-0a99-4ab2-bacc-3deba92d7c70" />
<img width="1080" height="2400" alt="Screenshot_20250716-144704 Expo Go" src="https://github.com/user-attachments/assets/5ee80daf-4426-469e-b676-6cc343aa877e" />
<img width="1080" height="2400" alt="Screenshot_20250716-144711 Expo Go" src="https://github.com/user-attachments/assets/3023228d-9f66-4aa6-9bce-ce7472305cb8" />
<img width="1080" height="2400" alt="Screenshot_20250716-144718 Expo Go" src="https://github.com/user-attachments/assets/7122e9fd-a920-413e-bc09-3e7db6d4aa54" />
