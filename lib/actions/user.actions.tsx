'use server';

import { ID } from 'node-appwrite';
import { createAdminClient, createSessionClient } from '../appwrite';
import { parseStringify } from '../utils';
import { cookies } from 'next/headers';

export const signIn = async (p0: { email: string; password: string; }) => {
    const { email, password } = p0;

    try {
        const { account } = await createAdminClient();

        const session = await account.createEmailPasswordSession(email, password);

        // Set session cookie
        cookies().set('appwrite-session', session.secret, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });

        return { success: true };
    } catch (error) {
        console.error('Error signing in:', error);
        return { success: false, message: 'Failed to sign in' };
    }
};

export const signUp = async (userData: { email: string; password: string; firstName: string; lastName: string; }) => {
    const { email, password, firstName, lastName } = userData;

    try {
        const { account } = await createAdminClient();
        const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
        const session = await account.createEmailPasswordSession(email, password);

        // Set session cookie
        cookies().set('appwrite-session', session.secret, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });

        return parseStringify(newUserAccount);
    } catch (error) {
        console.error('Error signing up:', error);
        return { success: false, message: 'Failed to sign up' };
    }
};

export const getLoggedInUser = async () => {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();

        return parseStringify(user);
    } catch (error) {
        console.error('Error fetching logged in user:', error);
        return null;
    }
};
