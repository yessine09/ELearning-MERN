import { createContext, useContext } from "react";

export interface CustomData {
    clientId: string;
    softSkills: {
        data: {
            skill: string;
        }[];
    };
    skillsets: {
        data: {
            skill: string;
            level: string;
            isSoftSkill: boolean;
        }[];
    };
    links: {
        data: {
            title: string;
            url: string;
        }[];
    };
    studies: {
        data: {
            local: string;
            specialty: string;
            degree: string;
            startDate: Date;
            endDate: Date;
            establishment: string;
            student: boolean;
        }[];
    };
    professional_experience: {
        data: {
            period: string;
            company: string;
            job: string;
            local: string;
        }[];
    };
}

interface CustomContextType {
    customData: CustomData;
    setCustomData: React.Dispatch<React.SetStateAction<CustomData>>;
}

export const CustomContext = createContext<CustomContextType>({
    customData: {
        clientId: "",
        softSkills: {
            data: [{ skill: "" }],
        },
        skillsets: {
            data: [{ skill: "", level: "Beginner", isSoftSkill: true }],
        },
        links: {
            data: [{ title: "", url: "" }],
        },
        studies: {
            data: [
                {
                    local: "",
                    specialty: "",
                    degree: "",
                    startDate: new Date(),
                    endDate: new Date(),
                    establishment: "",
                    student: false,
                },
            ],
        },
        professional_experience: {
            data: [{ period: "", company: "", job: "", local: "" }],
        },
    },
    setCustomData: () => { },
});

export const useCustomContext = () => useContext(CustomContext);


