# Task Manager Mobile App

A React Native mobile application built with Expo, TypeScript, and React Navigation. It helps users manage personal tasks with local persistence and a motivational quote pulled from a public Quote API.

## Core Features

- **Task Management**: Create, read, update status, and delete tasks instantly.
- **Search**: Search tasks in real time by title.
- **Filtering**: View tasks by status: *All*, *Pending*, and *Completed*.
- **Local Storage**: Persist tasks locally using `@react-native-async-storage/async-storage`.
- **Public API Integration**: Fetch and display a "Motivational Quote of the Day" with loading and error states.
- **Form Validation**: Validate title and description before task creation.

---

## Tech Stack & Architecture

- **Framework**: [Expo](https://expo.dev/) (SDK 56) with React Native
- **Language**: TypeScript
- **Navigation**: React Navigation Stack (`@react-navigation/native-stack`)
- **State Management**: React Context API (`TaskContext`) for cross-screen state synchronization.
- **Local Storage**: AsyncStorage

### Project Structure

```text
src/
components/       Reusable UI elements
context/          React Context provider
hooks/            Task logic and storage hooks
navigation/       Navigation routes
screens/          Application screens
services/         Public API integration
storage/          Local persistence utilities
types/            Task type definitions
```

---

## Setup & Running the Application

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Navigate to the project directory:

   ```bash
   cd task-manager
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the App

Start the Expo development server:

```bash
npx expo start
```

You can then run it on:

- **Android Emulator**: Press `a` (requires Android Studio / virtual device running).
- **iOS Simulator**: Press `i` (requires macOS and Xcode).
- **Web Browser**: Press `w`.
- **Physical Device**: Scan the QR code using the Expo Go app (Android) or the Camera app (iOS, connected to the same Wi-Fi network).
