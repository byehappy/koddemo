import {Metadata} from "next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth";
import {Post} from "@/interface/post";
import {redirect} from "next/navigation";
import Link from "next/link";
import {revalidateTag} from "next/cache";

export const metadata: Metadata = {
    title: "Мои заявления",
};
export default async function Page() {
    revalidateTag("statemates")
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/")
    }

    const statemates = await getStatemates(session!.user.id)
    return (
        <div className={"mt-10 mx-20 w-auto"}>
            <div className={"w-auto flex justify-end"}>
                <Link href={"/statemate/create"}
                      className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-2.5 mb-3 rounded focus:outline-none focus:shadow-outline mt-3"}>
                    Создать новое заявление
                </Link>
            </div>
            <ul className={"grid grid-cols-3 gap-10"}>
                {statemates.map((item) => {
                    return <div key={item.id}>

                        <li className={"list-decimal text-2xl border-2 rounded-3xl py-1 pl-3"}>
                            Номер авто: {item.number_auto}<br/>
                            <div className={"overflow-hidden"}>Описание: {item.descr}<br/></div>
                            Статус: {item.status}
                        </li>
                    </div>
                })}
            </ul>
        </div>
    )
}

async function getStatemates(userid: number): Promise<Post[]> {
    const res = await fetch(`http://localhost:3001/post?user_id=${userid}`, {next: {tags: ["statemates"]}})
    return res.json()
}