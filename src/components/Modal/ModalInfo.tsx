import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { supabase } from "../../utils/supabase";
import { TArrayPedidos } from "../HomePedidos/HomePedidos";
import styles from "./styles.module.scss"
interface IStatus {
    name_status: string,
    status: Number
}
export const ModalInfo = ({ showModalInfo, setShowModalInfo, itemModal }) => {
    const handleClose = () => setShowModalInfo(false);
    const handleShow = () => setShowModalInfo(true);
    const [optionsStatus, setOptionsStatus] = useState<IStatus[]>([])
    const [valueStatusSelect, setValueStatusSelect]= useState<String>("")
    useEffect(() => {
        setValueStatusSelect(itemModal.status.toString())
        buscarStatus()
    }, [])
    const buscarStatus = async () => {
        const { data, error } = await supabase.from("status").select('name_status, status')
        setOptionsStatus(data)
    }
    
    const mudarStatusPedido = async()=>{
        if (valueStatusSelect === "") {
            return
        }
        const {data, error}= await supabase.from("pedido").update({status: valueStatusSelect, update_at: "now()"}).match({id_pedido: itemModal.id_pedido})
        if (data) {
            setShowModalInfo(false)
        }
    }
    return (
        <div >

            <Modal className={styles.container} show={showModalInfo} centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>INOFRMAÇÕES DO PEDIDO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {itemModal.nome_cliente}

                </Modal.Body>
                <select name="status" id="" value={valueStatusSelect.toString()} onChange={(e)=>setValueStatusSelect(e.target.value)}>
                    {
                        optionsStatus.map(item => {
                            return <option value={item.status.toString()}>{item.name_status}</option>
                        })
                    }
                </select>
                <button onClick={handleClose}>fechar</button>
                <button onClick={()=>mudarStatusPedido()}>Mudar Status Pedido</button>
                <Modal.Footer>


                </Modal.Footer>
            </Modal>
        </div>
    )
}
