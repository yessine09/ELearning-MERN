import { createContext } from "react";
type DisplayContextType = {
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const displayContext = createContext<DisplayContextType>({
    showForm: false,
    setShowForm: () => { },
});
export default displayContext;
