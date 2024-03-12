import { ReactNode, createContext, useState } from 'react';

interface ContactContextType {
    isPhoneNumber: boolean;
    setContact: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContactContext = createContext<ContactContextType>({
    isPhoneNumber: false,
    setContact: () => { }
});
type ContactProviderProps = { children: ReactNode }

export default function ContactProvider({ children }: ContactProviderProps) {
    const [isPhoneNumber, setContact] = useState(false);

    return (
        <ContactContext.Provider value={{ isPhoneNumber, setContact }}>
            {children}
        </ContactContext.Provider>
    );
};
