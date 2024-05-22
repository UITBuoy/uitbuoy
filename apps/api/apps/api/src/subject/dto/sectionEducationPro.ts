export type SectionEducationProgram = {
    name: string;
    subjects: {
        code: string;
        type?: string;
        isRequired: boolean;
    }[];
};
