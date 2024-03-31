import { User } from "@/interface/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {NextAuthOptions} from "next-auth";

declare module "next-auth" {
    interface Session {
        user: User;
    }
}

export const authOptions:NextAuthOptions ={
    providers:[
        CredentialsProvider({
            id: 'credentials',
            name:'koddemo',
            credentials:{
                password: { label: 'Password', type: 'password' },
                login:{label: 'Login', type: 'login'}
            },
            async authorize(credentials: any, req,) {
                const userRes = await fetch(`http://localhost:3001/user?login=${credentials.login}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const userData = await userRes.json();
                if (!userRes.ok) {
                    throw new Error(userData.message);
                }

                if (userData[0].password == credentials.password) {
                    return userData[0]
                } else {
                    throw new Error('Неправильный логин или пароль');
                }
            },
        }),
    ],
    secret:process.env.JWT_SECRET,
    pages:{
        signIn:'',
        signOut:''
    },
    session:{
        strategy:'jwt'
    },
    callbacks:{
        async jwt({ token, user, account }:any) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.token,
                    refreshToken: user.refreshToken,
                    userData:user
                };
            }

            return token;
        },

        async session({ session, token }:any) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.accessTokenExpires = token.accessTokenExpires;
            session.user = token.userData;


            return Promise.resolve(session);
        },
    },
}


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }