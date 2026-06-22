import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TaskListScreen } from '../screens/TaskListScreen';
import { AddTaskScreen } from '../screens/AddTaskScreen';
import { TaskDetailsScreen } from '../screens/TaskDetailsScreen';

export type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
  TaskDetails: { taskId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TaskList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: '#007aff',
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{
          title: 'My Tasks',
        }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{
          title: 'Add New Task',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="TaskDetails"
        component={TaskDetailsScreen}
        options={{
          title: 'Task Details',
        }}
      />
    </Stack.Navigator>
  );
};
