import { useState, useEffect, useMemo } from 'react';
import { Task } from '../types/task';
import { taskStorage } from '../storage/taskStorage';

export type TaskFilter = 'all' | 'completed' | 'pending';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load tasks on component mount
  useEffect(() => {
    const loadInitialTasks = async () => {
      try {
        const loadedTasks = await taskStorage.getTasks();
        setTasks(loadedTasks);
      } catch (error) {
        console.error('Failed to load tasks during hook initialization', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialTasks();
  }, []);

  // Save tasks to AsyncStorage whenever they change
  const saveAndSetTasks = async (newTasks: Task[]) => {
    setTasks(newTasks);
    await taskStorage.saveTasks(newTasks);
  };

  /**
   * Adds a new task to the list
   */
  const addTask = async (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(), // Simple unique ID generator
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [newTask, ...tasks];
    await saveAndSetTasks(updatedTasks);
  };

  /**
   * Toggles the completion status of a task
   */
  const toggleTask = async (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    await saveAndSetTasks(updatedTasks);
  };

  /**
   * Deletes a task from the list
   */
  const deleteTask = async (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    await saveAndSetTasks(updatedTasks);
  };

  /**
   * Computes the filtered and searched tasks list
   */
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Apply Search Filter
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Apply Filter Category
      if (filter === 'completed') {
        return matchesSearch && task.completed;
      }
      if (filter === 'pending') {
        return matchesSearch && !task.completed;
      }
      return matchesSearch;
    });
  }, [tasks, searchQuery, filter]);

  return {
    tasks,
    filteredTasks,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    isLoading,
    addTask,
    toggleTask,
    deleteTask,
  };
};
