import { router } from 'expo-router';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Subject } from '../gql/graphql';
import { DeepPartial } from '@apollo/client/utilities';

type ISubject = {
    code?: string;
    nameVN?: string;
    nameEN?: string;
    summary?: string;
    theoreticalCredit?: number;
    practicalCredit?: number;
    previousSubjects?: DeepPartial<Subject>[];
    requiredSubjects?: DeepPartial<Subject>[];
};

export type ISubjectDetailRouter = {
    subject?: ISubject;
    navigateSubject: (subject: ISubject) => any;
};

export const useDetailSubjectRouter = create<
    ISubjectDetailRouter,
    [['zustand/immer', never]]
>(
    immer<ISubjectDetailRouter>((set, get) => ({
        navigateSubject: (subject) => {
            set((state) => {
                state.subject = subject;
            });
            router.push({
                pathname: '/modals/detail-subject',
                params: { id: get().subject.code },
            });
        },
    })),
);
