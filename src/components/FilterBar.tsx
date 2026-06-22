import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TaskFilter } from '../hooks/useTasks';

interface FilterBarProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const filters: { label: string; value: TaskFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <View style={styles.container}>
      {filters.map((item) => {
        const isActive = activeFilter === item.value;
        return (
          <Pressable
            key={item.value}
            onPress={() => onFilterChange(item.value)}
            style={[
              styles.pill,
              isActive && styles.activePill,
            ]}
          >
            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f2f2f7',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e5ea',
  },
  activePill: {
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  label: {
    fontSize: 14,
    color: '#8e8e93',
    fontWeight: '600',
  },
  activeLabel: {
    color: '#ffffff',
  },
});
