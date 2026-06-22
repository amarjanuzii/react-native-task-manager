import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const STORAGE_KEY = '@tasks_list';

export const taskStorage = {
  /**
   * Retrieves all tasks from AsyncStorage
   */
  getTasks: async (): Promise<Task[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Failed to fetch tasks from AsyncStorage', e);
      return [];
    }
  },

  /**
   * Saves the provided array of tasks to AsyncStorage
   */
  saveTasks: async (tasks: Task[]): Promise<boolean> => {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      return true;
    } catch (e) {
      console.error('Failed to save tasks to AsyncStorage', e);
      return false;
    }
  },

  /**
   * Clears all tasks from AsyncStorage
   */
  clearTasks: async (): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      console.error('Failed to clear tasks from AsyncStorage', e);
      return false;
    }
  },
};
