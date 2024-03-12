import { ReactNode, useState } from "react";
import { ContactContext } from "./context/InputTypeContext";
import { Outlet } from "react-router-dom";
import ContactValueProvider, { ContactValueContext } from "./context/ContactValueContext";

type ContactProviderProps = { children: ReactNode };

export default function PasswordPage() {
    const [isPhoneNumber, setContact] = useState(false);
    const [contact, setContactValue] = useState("");

    return (
        <ContactValueProvider>
            <ContactValueContext.Provider value={{ contact, setContactValue }}>
                <ContactContext.Provider value={{ isPhoneNumber, setContact }}>
                    <Outlet />
                </ContactContext.Provider>
            </ContactValueContext.Provider>
        </ContactValueProvider>
    );
}
