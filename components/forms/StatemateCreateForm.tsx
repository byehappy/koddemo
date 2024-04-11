"use client"
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import * as Yup from "yup";
import {useState} from "react";
import {revalidateTag} from "next/cache";
import {actionStatemates} from "@/components/buttons/actions";

export default function StatemateCreateForm ({user_id}: { user_id: number }) {
    const [serverError, setServerError] = useState("");
    const router = useRouter();

    const formik = useFormik({
        initialValues:{
            number_auto:"",
            descr:""
        },
        onSubmit:(values)=>{
            const res = fetch("http://localhost:3001/post/",{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    ...values,
                    user_id,
                    status:"новое"
                })
            }).catch((e)=>setServerError(e)).then(()=>(
                actionStatemates(),
                router.push("/statemate")
            ))
        },
        validationSchema: Yup.object().shape({
            number_auto: Yup.string().required("Введите номер машины!"),
            descr: Yup.string().required("Введите описание!")
        })
    })
    return(
        <div className={"my-8 mx-auto flex h-big justify-center items-center"}>
            <div className="w-full max-w-md ">
                <form className="bg-white drop-shadow-2xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                    <div className={"w-full flex justify-center mb-3"}>
                        <label className={"text-2xl"}>Авторизация</label>
                    </div>
                    <div className="mb-3 h-14">
                        <input
                            type="text"
                            name="number_auto"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Номер машины"
                            value={formik.values.number_auto}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.number_auto && (
                            <div className="text-red-500">{formik.errors.number_auto}</div>
                        )}
                    </div>

                    <div className="mb-3 h-14">
                        <textarea
                            name="descr"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Описание нарушения"
                            value={formik.values.descr}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.descr && (
                            <div className="text-red-500">{formik.errors.descr}</div>
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
    )
}
