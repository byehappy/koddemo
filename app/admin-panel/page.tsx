import type { NextPage } from 'next';
import { Metadata } from 'next';
import { Post, Status } from '@/interface/post';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Role, User } from '@/interface/user';
import { ButtonConfirm, ButtonDecline } from '@/components/buttons/Buttons';

export const metadata: Metadata = {
    title: 'Админ панель',
};

interface UserStatemate extends Post {
    userFio: string;
}

const Page: NextPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role === Role.user) {
        redirect('/');
    }
    const statemates = await getStatematesWithAdminRole();

    return (
        <div className={'mt-10 mx-20 w-auto'}>
            <ul className={'flex flex-col gap-10'}>
                {statemates.map((item) => (
                    <li className={'list-decimal text-2xl'} key={item.id}>
                        <div className={'flex flex-row justify-between h-10'}>
                            Номер авто: {item.number_auto} Описание: {item.descr} Статус: {item.status} ФИО: {item.userFio}
                            {item.status === Status.новое && (
                                <div className={'flex gap-5'}>
                                    <ButtonConfirm item_id={item.id} />
                                    <ButtonDecline item_id={item.id} />
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;

async function getStatematesWithAdminRole(): Promise<UserStatemate[]> {
    const res = await fetch(`http://localhost:3001/post`);
    const posts: Post[] = await res.json();

    const statematesWithUserFioPromises = posts.map(async (post) => {
        const userFio = await getUserFio(post.user_id);
        return { ...post, userFio };
    });

    return Promise.all(statematesWithUserFioPromises);
}

async function getUserFio(userId: number): Promise<string> {
    const res = await fetch(`http://localhost:3001/user?id=${userId}`);
    const user: User[] = await res.json();
    return user[0].fio;
}
