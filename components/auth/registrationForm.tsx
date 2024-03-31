"use client"
import {useFormik} from "formik";
import * as Yup from "yup";
import {useState} from "react";

export default function RegistrationForm(){
    const [serverError, setServerError] = useState("");
    const [serverSucssesful, setServerSucssesful] = useState<boolean>(false);
    const isUserExists = async (username:string) => {
        try {
            const response = await fetch(`http://localhost:3001/user?login=${username}`);
            const data = await response.json();
            return Array.isArray(data) && data.length > 0;
        } catch (error) {
            return false;
        }
    };

    const formik = useFormik({
            initialValues:{
                login:"",
                password:"",
                fio:"",
                phone_number:"",
                email:"",
                role:""
            },
            onSubmit:async (values) => {
                setServerError('')
                setServerSucssesful(false)
                values.role = "user"
                try {
                    const userExists = await isUserExists(values.login);

                    if (userExists) {
                        setServerError("Данный пользователь уже существует.");
                        return;
                    }

                    const response = await fetch("http://localhost:3001/user", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                    });

                    if (!response.ok) {
                        const data = await response.json();
                        setServerError(data.message || "Произошла ошибка");
                    } else {
                        setServerSucssesful(true)
                    }
                } catch (err: any) {
                    setServerError("Произошла ошибка");
                }
            },
            validationSchema: Yup.object().shape({
                login: Yup.string().required("Введите логин!"),
                password: Yup.string().min(6,"Пароль слишком короткий").required("Пароль обязателен!"),
                email: Yup.string().email().required("Введите почту"),
                phone_number: Yup.string().required("Введите номер телефона"),
                fio:Yup.string().required("Введите свое ФИО"),
                role: Yup.string()
            })
        }
    )
    return (
        <div className={"my-8 mx-auto flex w-big h-big justify-center items-center"}>
            <div className="w-full max-w-md ">
                <form className="bg-white drop-shadow-2xl rounded px-8 pt-6 pb-8 mb-4 " onSubmit={formik.handleSubmit}>
                    <div className={"w-full flex justify-center mb-3"}>
                        <label className={"text-2xl"}>Регистрация</label>
                    </div>
                    <div className="mb-3 h-14">
                        <input
                            type="text"
                            name="login"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Логин"
                            value={formik.values.login}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.login && (
                            <div className="text-red-500">{formik.errors.login}</div>
                        )}
                    </div>

                    <div className="mb-3 h-14">
                        <input
                            type="password"
                            name="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Пароль"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && (
                            <div className="text-red-500">{formik.errors.password}</div>
                        )}
                    </div>
                    <div className="mb-3 h-14">
                        <input
                            type="text"
                            name="fio"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="ФИО"
                            value={formik.values.fio}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.fio && (
                            <div className="text-red-500">{formik.errors.fio}</div>
                        )}
                    </div>
                    <div className="mb-3 h-14">
                        <input
                            type="tel"
                            pattern={"\\+7\\(\\d{3}\\)-\\d{3}-\\d{2}-\\d{2}"}
                            name="phone_number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="+7(XXX)-XXX-XX-XX"
                            value={formik.values.phone_number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.phone_number && (
                            <div className="text-red-500">{formik.errors.phone_number}</div>
                        )}
                    </div>
                    <div className="mb-3 h-14">
                        <input
                            type="email"
                            name="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Почта"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && (
                            <div className="text-red-500">{formik.errors.email}</div>
                        )}
                    </div>

                    <div className={"h-10 mt-5"}>
                        {serverError && <div style={{color: "red"}}>{serverError}</div>}
                        {serverSucssesful ? <div>Аккаунт был успешно зарегестрирован.<br/> Пожалуйста авторизуйтесь.</div>: <></>}
                    </div>

                    <div className={"w-full flex justify-center"}>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3">
                            Отправить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};