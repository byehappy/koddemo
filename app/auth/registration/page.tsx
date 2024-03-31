
import type { NextPage } from 'next';
import {Metadata} from "next";
import RegistrationForm from "@/components/auth/registrationForm";

export const metadata: Metadata = {
    title: "Регистрация",
};
const Page:NextPage = () => {



    return (
        <>
            <RegistrationForm/>
        </>
    )
}

export default Page;

