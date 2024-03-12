import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

type StackArgs = {
    items: Array<ReactNode>;
    push: (element: ReactNode) => void;
    pop: () => void;
};

const initialState: StackArgs = {
    items: [],
    push: (element: ReactNode) => {
        throw new Error("Function not implemented.");
    },
    pop: () => {
        throw new Error("Function not implemented.");
    },
};

const StackContext = createContext<StackArgs>(initialState);
export const useStack = () => useContext(StackContext);

type StackProps = { children: ReactNode };
export default function StackProvider({ children }: StackProps) {
    const [stack, setStack] = useState<Array<ReactNode>>([]);

    const push = useCallback((element: ReactNode) => {
        setStack((prev) => {
            return [...prev, element];
        });
    }, []);

    const pop = useCallback(() => {
        setStack((prev) => {
            if (prev.length === 0) return prev;
            return prev.slice(0, prev.length - 1);
        });
    }, []);

    const state = useMemo(() => {
        return { items: stack, push, pop };
    }, [stack, push, pop]);

    return (
        <StackContext.Provider value={state}>{children}</StackContext.Provider>
    );
}