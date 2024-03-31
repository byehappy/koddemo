"use client"
import {useFormik} from "formik";
import * as Yup from "yup";
import {signIn} from "next-auth/react";
import {useState} from "react";
import {useRouter} from "next/navigation";


export default function LoginForm() {
    const [serverError, setServerError] = useState("");
    const router = useRouter();

    const formik = useFormik({
            initialValues: {
                login: "",
                password: ""
            },
            onSubmit: async (values) => {
                try {
                    const response = await signIn("credentials", {
                        redirect: false,
                        login: values.login,
                        password: values.password,
                        callbackUrl: `${window.location.origin}`
                    });
                    if (response?.error) {
                        setServerError('Неправильный логин или пароль');
                    } else {
                        setServerError("");
                    }
                    if (response?.url) router.push(response.url);
                } catch (error) {
                    setServerError("Ошибка входа.");
                }
            },
            validationSchema: Yup.object().shape({
                login: Yup.string().required("Введите логин!"),
                password: Yup.string().min(6, "Пароль слишком короткий").required("Пароль обязателен!")
            })
        }
    )
    return (
        <div className={"my-8 mx-auto flex w-big h-big justify-center items-center"}>
            <div className="w-full max-w-md ">
                <form className="bg-white drop-shadow-2xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                    <div className={"w-full flex justify-center mb-3"}>
                        <label className={"text-2xl"}>Авторизация</label>
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

                    <div className={"h-8 mt-5"}>
                        {serverError && <div style={{color: "red"}}>{serverError}</div>}
                    </div>

                    <div className={"w-full flex justify-center"}>
                        <button type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-3 rounded focus:outline-none focus:shadow-outline mt-3">
                            Отправить
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};