
import type { NextPage } from 'next';
import {Metadata} from "next";
import LoginForm from "@/components/auth/loginForm";

export const metadata: Metadata = {
    title: "Вход",
};
const Page:NextPage = () => {



    return (
        <>
           <LoginForm/>
        </>
    )
}

export default Page;

