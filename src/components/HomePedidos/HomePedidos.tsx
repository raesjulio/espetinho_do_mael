import { RealtimeSubscription } from '@supabase/supabase-js'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { api } from '../../utils/api'
import { supabase } from '../../utils/supabase'
import { ModalInfo } from '../Modal/ModalInfo'
import styles from "./styles.module.scss"
interface ISupabasePedido {
  new: {}
}
export type TArrayPedidos = {
  created_at: Date
  delivery: boolean
  id: Number
  id_forma_pagamento: Number
  id_pedido: string
  nome_cliente: string
  total: Number
  whatsapp: string
  status: Number
  item_pedido: [
    {
      id_item: Number,
      quantidade: Number,
      nome_item: string
    }]
}
export const HomePedidos = () => {
  const [novoPedido, setNovoPedido] = useState<TArrayPedidos[]>([])
  const [showModalInfo, setShowModalInfo] = useState(false)
  const [valueCheck, setValueCheck] = useState(1)
  const [count, setCount] = useState(0)

  const [itemModal, setItemModal] = useState<TArrayPedidos | null>()
  const [pedidosBuscadosInicial, setPedidosBuscadosInicial] = useState<TArrayPedidos[]>([])
  useEffect(() => {
    buscarPedidos()
    supabase
      .from('pedido')
      .on('INSERT', payload => {
        setNovoPedido([payload.new]);
      }).on('UPDATE', payload => {
        setNovoPedido([payload.new]);
      }).subscribe()
  }, [])

  useEffect(() => {
    if (count > 0) {
      const arrayAux = pedidosBuscadosInicial.filter(item => {
        if (item.id !== itemModal?.id) {
          return item
        }
      })
      setPedidosBuscadosInicial(arrayAux)
      setCount(0)
    }
  }, [count, showModalInfo])


  const buscarPedidos = useCallback(async () => {
    const response = await api.get("buscarpedidos", { params: { id_status: 1 } })
    const pedidosAux: TArrayPedidos[] = response.data.map(item => item)
    pedidosAux.sort((a, b) => {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    })
    setPedidosBuscadosInicial(pedidosAux)
  }, [])
  useEffect(() => {
    if (novoPedido.length > 0) {
      buscaInfoNovoPedido()
    }
  }, [novoPedido])
  const buscaInfoNovoPedido = async () => {
    const response = await api.get("buscaritempedido", { params: { id_pedido: novoPedido[0].id_pedido } })
    const pedidosAux = pedidosBuscadosInicial.map(item => item)
    pedidosAux.sort((a, b) => {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    })
    setPedidosBuscadosInicial([response.data[0], ...pedidosAux])
  }
  const handleClickShowModal = (item: TArrayPedidos) => {
    setItemModal(item)
    setShowModalInfo(!showModalInfo)
  }
  const coresStatus = { "2": "#a2c243", "1": "#f3bf03", "3": "#055e9a" }
  const statusCheck = [{
    status: 1,
    name_status: "Aberto"
  }, {
    status: 3,
    name_status: "Em Preparo"
  }, {
    status: 2,
    name_status: "Finalizado"
  }]
  const onChangeCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const response = await api.get("buscarpedidos", { params: { id_status: e.target.value } })
    setPedidosBuscadosInicial(response.data)
    setValueCheck(parseInt(e.target.value))
  }

  return (
    <>
      <aside className={styles.containerCheck}>
        {statusCheck.map(item => {
          return <>
            <input
              checked={valueCheck === item.status}
              value={item.status}
              type="checkbox"
              name={item.name_status}
              id={`checkbox` + item.status}
              onChange={e => onChangeCheck(e)}
            ></input>
            <label
              style={
                {
                  background: valueCheck === item.status ? coresStatus[item.status] : "",
                }
              }
              className={valueCheck === item.status ? styles.checked : ""}
              htmlFor={`checkbox` + item.status}
            >{item.name_status}
            </label>
          </>

        })}
      </aside>
      <div className={styles.container}>

        <section>
          {pedidosBuscadosInicial.map(item => {
            return (<>
              <div className={styles.containerCard} key={item.id_pedido}>
                <section key={item.id_pedido} style={{ background: coresStatus[item.status.toString()] }}>
                  <div>
                    <ul style={{ color: item.status === 1 ? "#000" : "#FFF" }}>
                      {item.item_pedido.map(evt => {
                        return <li key={evt.nome_item}>{evt.quantidade} x <label>{evt.nome_item}</label></li>
                      })}
                    </ul>
                    <p style={{ color: item.status === 1 ? "#000" : "#FFF" }}>TOTAL - {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: "BRL"
                    }).format(Number(item.total) / 100)}</p>
                    {item.delivery === true && <label>Para entrega</label>}
                    <div key={item.id_pedido}>

                      <button onClick={() => handleClickShowModal(item)}>Info</button>
                    </div>
                  </div>
                </section>
                <div >
                  <div >
                    <h1>Pedido - {item.id}</h1>

                    <h3>{item.nome_cliente}</h3>
                  </div>
                  <aside >
                    <h6>{item.created_at.toLocaleString().slice(11, 16)}</h6>
                  </aside>
                </div>
              </div>
            </>
            )
          })}
        </section>
        {showModalInfo && <ModalInfo
          showModalInfo={showModalInfo}
          setShowModalInfo={setShowModalInfo}
          itemModal={itemModal}
          setCount={setCount}
        />}
      </div>
    </>
  )
}
