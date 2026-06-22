import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onPress: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggle,
  onDelete,
  onPress,
}) => {
  const formattedDate = new Date(task.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Pressable onPress={onToggle} style={styles.checkboxContainer}>
        <Ionicons
          name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={task.completed ? '#34c759' : '#c7c7cc'}
        />
      </Pressable>

      <View style={styles.content}>
        <Text
          numberOfLines={1}
          style={[styles.title, task.completed && styles.completedText]}
        >
          {task.title}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>

      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color="#ff3b30" />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e5ea',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#8e8e93',
  },
  date: {
    fontSize: 12,
    color: '#8e8e93',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
});
