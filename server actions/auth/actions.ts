'use server';

import { sendForgotPassEmail, verifyEmail, verifyEmailCode } from "@/services/auth/emailService";
import { resetPassword, verifyResetPasswordCode } from "@/services/auth/passwordServices";

export async function handleForgotPassword(email:string) {
    try {
        const result = await sendForgotPassEmail(email);
        console.log('Forgot Password Result:', result);
        return result;
    } catch (error) {
        console.error('Error sending forgot password email:', error);
        throw new Error('Failed to send forgot password email');
    }
}

export async function handleResetPassword(id:string, code:string, newPassword:string) {
    try {
        const result = await resetPassword(id, code, newPassword);
        console.log('Reset Password Result:', result);
        return result;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw new Error('Failed to reset password');
    }
}

export async function handleVerifyResetPasswordCode(id:string, code:string) {
    try {
        const result = await verifyResetPasswordCode(id, code);
        console.log('Verify Reset Password Code Result:', result);
        return result;
    } catch (error) {
        console.error('Error verifying reset password code:', error);
        throw new Error('Failed to verify reset password code');
    }
}

export async function handleVerifyEmail(email:string) {
    try {
        const result = await verifyEmail(email);
        console.log('Verify Email Result:', result);
        return result;
    } catch (error) {
        console.error('Error verifying email:', error);
        throw new Error('Failed to verify email');
    }
}

export async function handleVerifyEmailCode(email:string, code:string) {
    try {
        const result = await verifyEmailCode(email, code);
        console.log('Verify Email Code Result:', result);
        return result;
    } catch (error) {
        console.error('Error verifying email code:', error);
        throw new Error('Failed to verify email code');
    }
}