export type SectionEducationProgram = {
    name: string;
    order?: number;
    subjects: {
        code: string;
        type?: string;
        minimumOptionalCredit?: number;
        isRequired: boolean;
    }[];
};
