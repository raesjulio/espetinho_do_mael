import { SyntheticEvent, useEffect, useMemo, useState } from "react"
import { Button, ButtonGroup, FloatingLabel, Form, Modal, ToggleButton } from "react-bootstrap"
import styles from "./styles.module.scss"
import { BsDashSquareFill, BsFillPlusSquareFill, BsFillTrashFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Vazio } from "../Vazio/Vazio";
import MaskedInput from "react-maskedinput";
interface List {
    listProduct: [{
        id: Number
        name: string
        descricao: string
        image: string
        price: Number
        disponivel: boolean
        ingredientes: string
    }],
    listCategoria: [
        {
            id_category: Number;
            name: String
        }
    ]
}
type TProdudos = [{
    id: Number
    name: string
    image: string
    descricao: string
    price: Number
    disponivel: boolean
    quantidade: string
}]
type TCategorias = [{
    id_category: Number;
    name: String
}]
export const HomeCardapio = (props: List) => {

    const { listProduct, listCategoria } = props

    const [radioValue, setRadioValue] = useState<String>("")
    const [itensCarrinho, setItensCarrinhos] = useState<TProdudos[]>([])
    const [numeroPedidos, setNumeroPedidos] = useState(0)
    const [show, setShow] = useState(false);
    const [itensComida, setItensComida] = useState([])
    const [itensComidaBackup, setItensComidaBackup] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [categorias, setCategorias] = useState([])
    const [pedido, setPedido] = useState({ total: 0 })
    useEffect(() => {
        setItensComida(listProduct)
    }, [listProduct])
    useEffect(() => {
        setItensComidaBackup(listProduct)
    }, [listProduct])
    useEffect(() => {
        if (listCategoria.length > 0) {
            listCategoria.sort(function (a, b) {
                return a.id_category < b.id_category ? -1 : a.id_category > b.id_category ? 1 : 0;
            });
        }
        setCategorias(listCategoria)
    }, [listCategoria])
    useMemo(() => {
        if (itensCarrinho.length > 0) {
            const total = itensCarrinho.reduce((total, item) => {
                return total + (item["price"] * item["quantidade"]);
            }, 0)
            console.log(total);

            setPedido({ total })

            const qtdPedidos = itensCarrinho.length
            setNumeroPedidos(qtdPedidos)
        } else {
            setPedido({ total: 0 })
            setNumeroPedidos(0)
        }
    }, [itensCarrinho])


    const adicionarItemCarrinho = (idComida: String) => {
        const validacao = itensCarrinho.some(item => {
            if (item['id'] === idComida) {
                return true
            } else {
                return false
            }
        })
        if (validacao) {
            return
        }
        let addCarrinho = itensComida.filter(item => {
            if (item.id === idComida) {
                return item
            }
        })

        addCarrinho[0].quantidade = 1
        setItensCarrinhos([...itensCarrinho, addCarrinho[0]])
    }
    const handlePedido = () => {
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

        window.location.href = `https://api.whatsapp.com/send/?phone=5594988110021&text=${txt}&app_absent=0`
    }
    const adicionarQuantidadeCarrinho = (idComida: string) => {
        let itensCarrinhosAux = itensCarrinho.map(item => item);
        itensCarrinhosAux.forEach((item, index) => {
            if (item['id'] === idComida) {
                itensCarrinhosAux[index]['quantidade'] += 1
            }
        })
        setItensCarrinhos(itensCarrinhosAux)
    }
    const calcularToTal = () => {
        let total = 0
        itensCarrinho.forEach(item => {
            console.log(item);

        })
    }
    const removerQuantidadeCarrinho = (idComida: string) => {
        let itensCarrinhosAux = itensCarrinho.map(item => item);
        const validacao = itensCarrinho.some((item, index) => {
            if (item['id'] === idComida) {
                if (itensCarrinho[index]['quantidade'] <= 1) {
                    return false
                } else {
                    return true
                }
            }
        })
        if (!validacao) {
            return
        }
        itensCarrinhosAux.forEach((item, index) => {
            if (item['id'] === idComida) {
                itensCarrinhosAux[index]['quantidade'] -= 1
            }
        })
        setItensCarrinhos(itensCarrinhosAux)
    }
    const removeItemCarrinho = (idComida: string) => {
        let itensCarrinhosAux = itensCarrinho.map(item => item);
        const arrayAux = itensCarrinhosAux.filter((item, index, array) => {
            if (item['id'] !== idComida) {
                return item
            }
        })
        setItensCarrinhos(arrayAux)
    }
    const filtrarCategoria = (idCategoria: string) => {
        setRadioValue(idCategoria)
        let itensComidaBackupAux = itensComidaBackup.map(item => item)
        if (idCategoria == "0") {
            return setItensComida(itensComidaBackupAux)
        }
        const itensFiltrados = itensComidaBackupAux.filter((item) => {
            if (item.id_category === idCategoria) {
                return item
            }
        })
        setItensComida(itensFiltrados)
    }
    return (
        <section className={styles.containerCardapioHome}>
            <aside>
                {categorias.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="outline-light"
                        name="radio"
                        value={radio.id_category}
                        checked={radioValue === radio.id_category}
                        className={radioValue === radio.id_category ? styles.ativo : ""}
                        onChange={() => filtrarCategoria(radio.id_category)}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}

            </aside>
            <div className={styles.containeritensComida}>
                {itensComida.length === 0 ? <Vazio /> : ""}
                {
                    itensComida.map(item => {
                        return (
                            <div className={styles.itemComida} key={item.id}>
                                <img src={item.image} alt={item.name} />
                                <aside>
                                    <div>
                                        <h5>{item.name}</h5>
                                        <h5>{new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: "BRL"
                                        }).format(item.price / 100)}</h5>
                                    </div>
                                    <p>
                                        {item.description}
                                    </p>
                                    <button value={item.id} type="button" onClick={() => adicionarItemCarrinho(item.id)}>Adicionar</button>
                                </aside>
                            </div>
                        )
                    })
                }
            </div>

            {numeroPedidos > 0 ?
                <div className={styles.containerPedidos}>
                    <button onClick={handleShow}>
                        <AiOutlineShoppingCart />
                        Carrinho  <span>{numeroPedidos}</span>
                    </button>

                </div>
                : ""}

            <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className={styles.modal}
                >
                    <Modal.Header closeButton>

                        <Modal.Title>
                            <h4>Pedidos</h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {itensCarrinho.length === 0 ? <Vazio /> : ""}
                        {Object.keys(itensCarrinho).map((item) => {
                            return (
                                <>
                                    <aside key={itensCarrinho[item].name} className={styles.itemModal}>
                                        <img src={itensCarrinho[item].image} alt={itensCarrinho[item].name} />

                                        <section>
                                            <div>
                                                <h3>{itensCarrinho[item].name}</h3>
                                            </div>
                                            <aside>
                                                <div>
                                                    <button onClick={() => removerQuantidadeCarrinho(itensCarrinho[item].id)}>
                                                        <BsDashSquareFill className={styles.remove} />
                                                    </button>
                                                    <input disabled type="text" value={itensCarrinho[item].quantidade} />
                                                    <button onClick={() => adicionarQuantidadeCarrinho(itensCarrinho[item].id)}>
                                                        <BsFillPlusSquareFill className={styles.add} />
                                                    </button>
                                                </div>
                                                <h3>{new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: "BRL"
                                                }).format((itensCarrinho[item].price * itensCarrinho[item].quantidade) / 100)}</h3>


                                            </aside>
                                            <a onClick={() => removeItemCarrinho(itensCarrinho[item].id)}>
                                                <BsFillTrashFill /> Remover
                                            </a>
                                        </section>

                                    </aside>
                                </>
                            )
                        })}
                        <div className={styles.containerEntregaTotal}>
                            <section>
                                <Form.Check
                                    type="checkbox"
                                    id={`default-checkbox`}
                                    label="PARA ENTREGA?"
                                />

                            </section>
                            <div className={styles.containerTotal}>
                                <div>
                                    <h2>TOTAL </h2>
                                    <h2>{new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: "BRL"
                                    }).format(pedido.total / 100)}</h2>
                                </div>
                            </div>
                        </div>


                        <div className={styles.containerInfoPedido}>
                            <FloatingLabel
                                controlId="floatingNomeCliente"
                                label="Seu nome"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="João" />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingNumeroWhatsapp"
                                label="Whatsapp">
                                <Form.Control as={MaskedInput}
                                    mask="(11)11111-1111"
                                    type="text"
                                    placeholder="(94)99999-9999" />
                            </FloatingLabel>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" onClick={handlePedido}>Finalizar Pedido</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </section>
    )
}
