"use client";

import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";

type Props = {
    children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
    return <SessionProvider>
        <Header/>
        {children}
    </SessionProvider>;
};
