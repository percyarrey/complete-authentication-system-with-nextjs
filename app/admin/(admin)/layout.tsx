import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
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

interface PrivateLayoutProps {
    children: React.ReactNode; // Correctly define the children prop type
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
    const data = await getServerSession(authOptions);
    
    // Type assertion for the session
    const session = data as CustomSession;

    if (session?.user) {
        if (!session.user.isVerified) {
            redirect('/auth/verifyemail');
        }
        if (session.user.role !== 'admin') {
            redirect('/');
        }
    } else {
        redirect('/auth/login');
    }

    return {children};
}