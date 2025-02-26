// app/auth/layout.js
import React, { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import ClientRedirect from '../components/ClientRedirect';
import { redirect } from 'next/navigation';
interface CustomSession {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string | null;
        isVerified?: boolean | null;
    };
    expires: string; // or ISODateString if you have that type defined
}
export default async function PrivateLayout({ children }:{children:ReactNode}) {

    const data = await getServerSession(authOptions)
        // Type assertion for the session
        const session = data as CustomSession;
    if (session?.user && session?.user?.isVerified) {
        redirect('/');
    }

    return (
        <>
            <ClientRedirect />
            {children}
        </>
    );
}