"use server"

import { revalidateTag } from "next/cache";

export  async function action(item_id:string) {
    revalidateTag(item_id);
}

export  async function actionStatemates() {
    revalidateTag("statemates")
}