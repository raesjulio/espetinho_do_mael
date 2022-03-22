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
}
export const pedidos = {
    handlePedido: async (itensCarrinho: TProdudos[], infoPedido: TInfoPedido, event: MouseEvent<HTMLButtonElement>, validacao :Object) => {
        let conteudoValido =true
       Object.keys(validacao).filter((item, index)=>{
            if (validacao[item] === false) {
                return conteudoValido= false
            }
        })
        if (conteudoValido) {
            return
        }
        return
      
        let arrayItensPedidos = []
        itensCarrinho.forEach(item => {
            arrayItensPedidos.push({
                nome_item: item["name"],
                quantidade: item["quantidade"],
                id_item: item["id_item"]
            })
        })
        
        const obj = {
            nome_cliente: "Julio",
            whatsapp: "94988110021",
            id_forma_pagamento: 11,
            delivery: false,
            total: 4399,
            id_itens: arrayItensPedidos
        }

        await api.post("pedidos", obj)





        let txt = "Pedido:", total = 0
        txt += `%20%0A`
        itensCarrinho.forEach(item => {
            txt += `%20%0A${item["quantidade"]}x%20${item["name"]}%20%20`
            txt += `----%20%20%20${new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: "BRL"
            }).format((item["price"] / 100) * item["quantidade"])}`
            total += (item["price"] / 100) * item["quantidade"]
        })
        txt += `%20%0A`
        txt += `%20%0ATOTAL:${new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: "BRL"
        }).format(total)} `




        // window.location.href = `https://api.whatsapp.com/send/?phone=5594988110021&text=${txt}&app_absent=0`
    }
}