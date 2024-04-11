import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { AuthEntity, Course } from '../gql/graphql';

export type IRecentCourse = {
    recentCourses: Partial<Course>[];
    addRecentCourse: (course: Partial<Course>) => Partial<Course>[];
};

export const useRecentCourse = create<
    IRecentCourse,
    [['zustand/persist', never], ['zustand/immer', never]]
>(
    persist(
        immer<IRecentCourse>((set, get) => ({
            recentCourses: [],
            addRecentCourse(course) {
                const newCourseList = [
                    course,
                    ...get().recentCourses.filter(({ id }) => id !== course.id),
                ].slice(0, 3);
                set((state) => {
                    state.recentCourses = newCourseList;
                });
                return newCourseList;
            },
        })),
        {
            name: 'recent-course',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
