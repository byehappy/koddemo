"use client"
import React from 'react';
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {Role} from "@/interface/user";

const Header = () => {
    const {data: session, status} = useSession();

    if (status === "loading") {
        return <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold"><Link href={'/'} className="hover:text-gray-300">Нарушения.Нет</Link>
                </h1>
                    <div className="flex space-x-4">
                        <div>Проверка авторизации...</div>
                    </div>
            </div>
        </header>;
    }

    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold"><Link href={'/'} className="hover:text-gray-300">Нарушения.Нет</Link>
                </h1>
                    <div className="flex space-x-4">
                        {session && (
                            <div className={"flex gap-8 w-auto"}>
                                {session.user.role == Role.admin && (
                                    <Link href={"/admin-panel"}>Панель администратора</Link>
                                )}
                                {session.user.role == Role.user && (
                                    <Link href={'/statemate'}>Мои заявления</Link>
                                )}
                                <button onClick={() => signOut()}>Выйти</button>
                            </div>
                        )}
                        {!session && (
                            <>
                                <a href="/auth/registration" className="hover:text-gray-300">Регистрация</a>
                                <a href="/auth/login" className="hover:text-gray-300">Авторизация</a>
                            </>
                        )}
                    </div>
            </div>
        </header>
    );
};

export default Header;
