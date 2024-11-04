'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ProviderProps {
    children: ReactNode;
    session?: any;
}

export default function Provider({ children, session }: ProviderProps) {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
}