import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";
interface IRequestBody {
    [key: string]: string | string[]
    // id_status: string
}
export default async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === "GET") {
        const { id_pedido } = request.query as IRequestBody
        const { data, error } = await supabase
            .from('pedido')
            .select("*, item_pedido(id_item, quantidade, nome_item), detalhe_entrega(rua, complemento, numero, id_bairro)")
            .eq('id_pedido', id_pedido)
            if (data) {
                return response.status(200).json(data)
            }else{
                return response.status(400).json({error: "Erro ao buscas pedidos", e:error})
            }
    }
    return response.status(400).json({error: "Erro ao buscas pedidos"})
    
}