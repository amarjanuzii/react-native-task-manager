import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTaskContext } from '../context/TaskContext';
import { TaskCard } from '../components/TaskCard';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { EmptyState } from '../components/EmptyState';
import { fetchRandomQuote, Quote } from '../services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type TaskListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TaskList'
>;

interface TaskListScreenProps {
  navigation: TaskListScreenNavigationProp;
}

export const TaskListScreen: React.FC<TaskListScreenProps> = ({ navigation }) => {
  const {
    filteredTasks,
    tasks,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    isLoading: isTasksLoading,
    toggleTask,
    deleteTask,
  } = useTaskContext();

  const [quote, setQuote] = useState<Quote | null>(null);
  const [isQuoteLoading, setIsQuoteLoading] = useState<boolean>(true);
  const [quoteError, setQuoteError] = useState<boolean>(false);

  // Load quote on mount
  useEffect(() => {
    const getQuote = async () => {
      try {
        setIsQuoteLoading(true);
        setQuoteError(false);
        const data = await fetchRandomQuote();
        setQuote(data);
      } catch (err) {
        setQuoteError(true);
      } finally {
        setIsQuoteLoading(false);
      }
    };
    getQuote();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Quote Section (API Integration) */}
        <View style={styles.quoteSection}>
          <Text style={styles.quoteLabel}>Motivational Quote of the Day</Text>
          {isQuoteLoading ? (
            <ActivityIndicator size="small" color="#007aff" style={styles.quoteLoader} />
          ) : quoteError || !quote ? (
            <Text style={styles.quoteTextError}>
              "Keep moving forward, one task at a time."
            </Text>
          ) : (
            <View>
              <Text style={styles.quoteText}>"{quote.quote}"</Text>
              <Text style={styles.quoteAuthor}>— {quote.author}</Text>
            </View>
          )}
        </View>

        {/* Search and Filter */}
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <FilterBar activeFilter={filter} onFilterChange={setFilter} />

        {/* Task List */}
        {isTasksLoading ? (
          <ActivityIndicator size="large" color="#007aff" style={styles.loader} />
        ) : filteredTasks.length === 0 ? (
          <EmptyState
            title={
              tasks.length === 0
                ? 'No Tasks Yet'
                : 'No Matching Tasks'
            }
            message={
              tasks.length === 0
                ? 'Get started by creating a new task. Tap the plus button to add a task!'
                : 'Try refining your search query or filter settings.'
            }
            icon={tasks.length === 0 ? 'clipboard-outline' : 'search-outline'}
          />
        ) : (
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskCard
                task={item}
                onToggle={() => toggleTask(item.id)}
                onDelete={() => deleteTask(item.id)}
                onPress={() =>
                  navigation.navigate('TaskDetails', { taskId: item.id })
                }
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Floating Action Button */}
      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Ionicons name="add" size={30} color="#ffffff" />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  quoteSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#e5e5ea',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  quoteLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '700',
    color: '#8e8e93',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  quoteLoader: {
    marginVertical: 4,
  },
  quoteText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#1c1c1e',
    lineHeight: 18,
  },
  quoteAuthor: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8e8e93',
    textAlign: 'right',
    marginTop: 4,
  },
  quoteTextError: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#8e8e93',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 80, // Prevent coverage by FAB
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#007aff',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007aff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});
