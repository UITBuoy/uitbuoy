import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { SectionSubject } from '../gql/graphql';
import { DeepPartial } from '@apollo/client/utilities';

export type ISubjectSelection = {
    subjects: DeepPartial<SectionSubject>[];
    addSubject: (subject: DeepPartial<SectionSubject>) => any;
    removeSubject: (code: string) => any;
    removeAll: () => any;
};

export const useSubjectSelection = create<
    ISubjectSelection,
    [['zustand/immer', never]]
>(
    immer<ISubjectSelection>((set, get) => ({
        subjects: [],
        addSubject(subject) {
            set((state) => {
                state.subjects = state.subjects.filter(
                    (s) => s.code !== subject.code,
                );
                state.subjects.push(subject);
            });
        },
        removeSubject(code) {
            set((state) => {
                state.subjects = [
                    ...state.subjects.filter((s) => s.code !== code),
                ];
            });
        },
        removeAll() {
            set((state) => {
                state.subjects = [];
            });
        },
    })),
);
