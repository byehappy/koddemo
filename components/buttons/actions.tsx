"use server"

import { revalidateTag } from "next/cache";

export default async function action(item_id:string) {
    revalidateTag(item_id);
}