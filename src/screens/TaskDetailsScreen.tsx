import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTaskContext } from '../context/TaskContext';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type TaskDetailsScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;
type TaskDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TaskDetails'
>;

interface TaskDetailsScreenProps {
  route: TaskDetailsScreenRouteProp;
  navigation: TaskDetailsScreenNavigationProp;
}

export const TaskDetailsScreen: React.FC<TaskDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { taskId } = route.params;
  const { tasks, toggleTask, deleteTask } = useTaskContext();

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <View style={styles.centeredContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#ff3b30" />
        <Text style={styles.errorText}>Task not found</Text>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const formattedDate = new Date(task.createdAt).toLocaleString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteTask(task.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Status Badge */}
      <View style={styles.header}>
        <View
          style={[
            styles.badge,
            task.completed ? styles.completedBadge : styles.pendingBadge,
          ]}
        >
          <Ionicons
            name={task.completed ? 'checkmark-circle' : 'time'}
            size={16}
            color={task.completed ? '#34c759' : '#ff9500'}
            style={styles.badgeIcon}
          />
          <Text
            style={[
              styles.badgeText,
              task.completed ? styles.completedBadgeText : styles.pendingBadgeText,
            ]}
          >
            {task.completed ? 'Completed' : 'Pending'}
          </Text>
        </View>
        <Text style={styles.dateText}>Created on {formattedDate}</Text>
      </View>

      {/* Task Details Card */}
      <View style={styles.detailsCard}>
        <Text style={styles.title}>{task.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.description}>{task.description}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Pressable
          style={[
            styles.actionButton,
            task.completed ? styles.incompleteButton : styles.completeButton,
          ]}
          onPress={() => toggleTask(task.id)}
        >
          <Ionicons
            name={task.completed ? 'close-circle-outline' : 'checkmark-circle-outline'}
            size={22}
            color="#ffffff"
            style={styles.actionIcon}
          />
          <Text style={styles.actionButtonText}>
            {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Ionicons
            name="trash-outline"
            size={22}
            color="#ffffff"
            style={styles.actionIcon}
          />
          <Text style={styles.actionButtonText}>Delete Task</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 20,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3a3a3c',
    marginTop: 12,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007aff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  completedBadge: {
    backgroundColor: '#e3fbe9',
    borderColor: '#bbf2c8',
  },
  pendingBadge: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeeba',
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  completedBadgeText: {
    color: '#34c759',
  },
  pendingBadgeText: {
    color: '#ff9500',
  },
  dateText: {
    fontSize: 12,
    color: '#8e8e93',
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e5ea',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1c1c1e',
    lineHeight: 28,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e5ea',
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    color: '#3a3a3c',
    lineHeight: 24,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: '#34c759',
  },
  incompleteButton: {
    backgroundColor: '#ff9500',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
  },
});
