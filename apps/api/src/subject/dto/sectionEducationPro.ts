export type SectionEducationProgram = {
    name: string;
    subjects: {
        code: string;
        type?: string;
        minimumOptionalCredit?: number;
        isRequired: boolean;
    }[];
};
