import { ReactNode, createContext, useState } from 'react';

interface ContactContextType {
    contact: string;
    setContactValue: React.Dispatch<React.SetStateAction<string>>;
}

export const ContactValueContext = createContext<ContactContextType>({
    contact: '',
    setContactValue: () => { }
});

type ContactValueProviderProps = {
    children: ReactNode;
};

export default function ContactValueProvider({ children }: ContactValueProviderProps) {
    const [contact, setContactValue] = useState('');

    return (
        <ContactValueContext.Provider value={{ contact, setContactValue }}>
            {children}
        </ContactValueContext.Provider>
    );
};
