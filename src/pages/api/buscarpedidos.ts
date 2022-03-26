import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";
interface IRequestBody {
    [key: string]: string | string[]
    // id_status: string
}
export default async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === "GET") {
        
        const { id_status } = request.query as IRequestBody
        console.log(id_status);
        
        

        const { data, error } = await supabase
            .from('pedido')
            .select("*, item_pedido(id_item, quantidade, nome_item)")
            .eq('status', id_status)
            if (data) {
                return response.status(200).json(data)
            }else{
                return response.status(400).json({error: "Erro ao buscas pedidos", e:error})
            }
        // const { data, error } = await supabase
        // .from("item_pedido")
        // .select("*")
        // return response.status(200).json(data)
    }
    return response.status(400).json({error: "Erro ao buscas pedidos"})
    
}