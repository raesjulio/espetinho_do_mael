import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";

export default async (request: NextApiRequest, response: NextApiResponse) =>{
    if (request.method === "GET") {
        const { data, error, count } = await supabase
        .from('pedido').select("total",{count: "exact"}).gt('status', "2")
        console.log(count);
        
        return response.status(200).json(data)
    }
}