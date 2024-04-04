import { router } from 'expo-router';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { CourseModuleEntity } from '../gql/graphql';

export type IFolderDetailRouter = {
    folder?: CourseModuleEntity;
    navigateFolder: (folder: CourseModuleEntity) => any;
};

export const useDetailFolderRouter = create<
    IFolderDetailRouter,
    [['zustand/immer', never]]
>(
    immer<IFolderDetailRouter>((set, get) => ({
        navigateFolder: (folder) => {
            set((state) => {
                state.folder = folder;
            });
            router.push({
                pathname: '/modals/detail-folder',
                params: { id: get().folder.name },
            });
        },
    })),
);
