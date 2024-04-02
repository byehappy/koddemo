import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import StatemateCreateForm from "@/components/forms/StatemateCreateForm";

export default async function Page() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/")
    }
    return(
        <>
            <StatemateCreateForm  user_id={session.user.id}/>
        </>
    )
}