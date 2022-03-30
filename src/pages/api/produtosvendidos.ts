import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";

export default async (request: NextApiRequest, response: NextApiResponse) =>{
    if (request.method === "GET") {
        const { data, error } = await supabase.rpc("get_list_produt_vendidos")
        if (data) {
            return response.status(200).json(data)
        }
        return response.status(400).json(error)
    }
}