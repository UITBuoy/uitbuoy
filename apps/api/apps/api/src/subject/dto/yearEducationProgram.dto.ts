export type YearEducationProgram = {
    yearName: string;
    majors: {
        majorName: string;
        link: string;
        totalCredit: any;
        deepMajor: [];
        sections: {
            name: string;
            subjects: {
                code: string;
                type?: string;
                isRequired: boolean;
            }[];
        }[];
    }[];
};
