"use client"
import React from 'react';
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

const Header = () => {
    const session = useSession();
    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold"><Link href={'/'} className="hover:text-gray-300">Нарушения.Нет</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        {session.status == "authenticated" && (
                            <button onClick={() => signOut()}>Выйти</button>

                        )}
                        {session.status === "loading" && (<>Проверка авторизации</>)}
                        {session.status === "unauthenticated" && (<>
                            <li><a href="/auth/registration" className="hover:text-gray-300">Регистрация</a></li>
                            <li><a href="/auth/login" className="hover:text-gray-300">Авторизация</a></li>
                        </>)}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
