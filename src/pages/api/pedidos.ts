import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "../../utils/supabase";

interface TBody {
    id_forma_pagamento: Number
    delivery: boolean
    total: Number
    nome_cliente: string
    whatsapp: string
    id_itens: [{
        id_item: string
        quantidade: Number
        nome_item: string
    }]
    rua: string
    complemento: string
    numero: string
    id_bairro: Number
}
type TInfoPedido = {
    nome_cliente: string
    whatsapp: string
    complemento: string
    nome_rua: string
    id_bairro: string
    numero_casa: string
    id_forma_pagamento: string
    entrega: boolean
    total: Number

}
interface IRespostaCliente {
    id: Number
}
export default async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === "POST") {
        const idPedido = uuidv4();
        const {
            delivery,
            id_forma_pagamento,
            nome_cliente,
            whatsapp,
            total,
            id_itens,
            rua,
            complemento,
            numero,
            id_bairro,
        } = request.body as TBody

        const obj = [{
            id_pedido: idPedido,
            delivery,
            id_forma_pagamento,
            nome_cliente,
            whatsapp,
            total
        }]
        const { data: dataPedidos, error: errorPedidos } = await supabase
            .from('pedido')
            .insert(obj)
        const { id: idRespostaCliente } = dataPedidos[0] as IRespostaCliente
        let arrayItensPedidos = []
        id_itens.forEach(item => {
            arrayItensPedidos.push({
                id_pedido: idPedido,
                quantidade: item.quantidade,
                id_item: item.id_item,
                nome_item: item.nome_item
            })
        })
        await supabase.from('item_pedido').insert(arrayItensPedidos)
        if (delivery) {
            const objEntrega =[{
                id_pedido: idPedido,
                rua,
                complemento,
                numero,
                id_bairro,
            }]
            await supabase.from('detalhe_entrega').insert(objEntrega)
        }
        return response.status(200).json({ id: idRespostaCliente})
    }
}