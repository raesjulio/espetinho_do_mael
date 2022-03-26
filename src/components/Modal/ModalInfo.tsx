import { useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { TArrayPedidos } from "../HomePedidos/HomePedidos";
import styles from "./styles.module.scss"

export const ModalInfo = ({showModalInfo, setShowModalInfo, itemModal} ) => {
    console.log(itemModal);
    
    const handleClose = () => setShowModalInfo(false);
    const handleShow = () => setShowModalInfo(true);
    return (
        <div >

            <Modal className={styles.container} show={showModalInfo} centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>INOFRMAÇÕES DO PEDIDO</Modal.Title>
                </Modal.Header>
                <Modal.Body>{itemModal.nome_cliente}</Modal.Body>
                <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                <Modal.Footer>
                   
                   
                </Modal.Footer>
            </Modal>
        </div>
    )
}
