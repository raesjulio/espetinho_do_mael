// import { ContainerHeader } from './styles'
import styles from "./styles.module.scss"
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import Link from "next/link";
export const Header = () => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <header className={styles.containerHeader}>
            <div>
                <nav>
                    <h1>Espetinho do Mael</h1>
                    <aside className={show ? styles.active : ""} onClick={() => setShow(!show)}>
                        <FaBars />
                    </aside>
                </nav>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                   <div className={styles.containerButton}>
                   <Link href="/dashboard/pedidos"><button>Pedidos</button></Link>
                    <Link href="/dashboard/produtosvendidos"><button>Produtos Vendidos</button></Link>
                   </div>
            
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </header>
    )
}
