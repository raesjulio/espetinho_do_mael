import React, { MouseEvent } from "react"
import { api } from "./api"

type TProdudos = [{
    id: Number
    name: string
    image: string
    descricao: string
    price: Number
    disponivel: boolean
    quantidade: string
}]
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
    nome_bairro: string
    nome_pagamento: string
    obs: string
}
interface IResponsePedido {
    id: string
}
export const pedidos = {
    handlePedido: async (itensCarrinho: TProdudos[], infoPedido: TInfoPedido, event: MouseEvent<HTMLButtonElement>, validacao: Object) => {
        let conteudoValido = true

        if (infoPedido.entrega) {
            Object.keys(validacao).filter((item, index) => {
                if (validacao[item] === false) {
                    return conteudoValido = false
                }
            })
        } else {
            if (infoPedido.nome_cliente === "" ||
                infoPedido.id_forma_pagamento === "" ||
                infoPedido.whatsapp === "") {
                conteudoValido = false
            }

        }
        if (!conteudoValido || itensCarrinho.length === 0) {
            return
        }

        let arrayItensPedidos = []
        itensCarrinho.forEach(item => {
            arrayItensPedidos.push({
                nome_item: item["name"],
                quantidade: item["quantidade"],
                id_item: item["id_item"]
            })
        })

        const obj = {
            nome_cliente: infoPedido.nome_cliente,
            whatsapp: infoPedido.whatsapp,
            id_forma_pagamento: infoPedido.id_forma_pagamento,
            delivery: infoPedido.entrega,
            total: infoPedido.total,
            id_itens: arrayItensPedidos,
            rua: infoPedido.nome_rua,
            complemento: infoPedido.complemento,
            numero: infoPedido.numero_casa,
            id_bairro: infoPedido.id_bairro,
            entrega: infoPedido.entrega
        }

        const response = await api.post("pedidos", obj)
        const { id } = response.data as IResponsePedido
        
        let txt = `%20%0A____________`,total = 0
        txt+=`%20%0A_*PEDIDO:%20${id}*_`

        itensCarrinho.forEach(item => {
            txt += `%20%0A${item["quantidade"]}x%20${item["name"]}%20`
            txt += `--%20${new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: "BRL"
            }).format((item["price"] / 100) * item["quantidade"])}`
            total += (item["price"] / 100) * item["quantidade"]
        })
        txt += `%20%0A`
        txt += `%20%0ATOTAL:*%20${new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: "BRL"
        }).format(total)}*`
        txt += `%20%0A`
        txt += `%20%0A____________`
        txt += `%20%0A_*OBSERVAÇÃO%20PEDIDO*_`
        txt +=`%20%0A${infoPedido.obs}`
        if (infoPedido.entrega) {
            txt += `%20%0A`
            txt += `%20%0A____________%20%0A`
            txt += "_*ENDEREÇO%20PARA%20ENTREGA*_"
            txt += `%20%0A*Bairro*:%20${infoPedido.nome_bairro}`
            txt += `%20%0A*Rua*:%20${infoPedido.nome_rua}`
            txt += `%20%0A*Numero*:%20${infoPedido.numero_casa}`
            txt += infoPedido.complemento ==="" ? "%20%0A":`%20%0ACOMPLEMENTO:%20${infoPedido.complemento}`
            txt += `%20%0A`
        }

        console.log(`https://api.whatsapp.com/send/?phone=5594988110021&text=${txt}&app_absent=0`);


        window.location.href = `https://api.whatsapp.com/send/?phone=5594988110021&text=${txt}&app_absent=0`
    }
}