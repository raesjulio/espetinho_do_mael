import { ChangeEvent, DetailedHTMLProps, LabelHTMLAttributes, SyntheticEvent, useEffect, useMemo, useState } from "react"
import { Button, FloatingLabel, Form, FormControlProps, Modal, ToggleButton } from "react-bootstrap"
import styles from "./styles.module.scss"
import { BsDashSquareFill, BsFillPlusSquareFill, BsFillTrashFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Vazio } from "../Vazio/Vazio";
import MaskedInput from "react-maskedinput";
import { pedidos } from "../../utils/pedidos";
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
type TPedido = [{
    total: Number;
    delivery: boolean;
    delivery_datails: [];
    id_pedido: string;

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
interface IOnChangeInfoPedido {
    name: string
    value: string
}
const initialInfoPedido = () => {
    return {
        nome_cliente: "",
        whatsapp: "",
        complemento: "",
        nome_rua: "",
        id_bairro: "",
        numero_casa: "",
        id_forma_pagamento: "",
        entrega: false,
        total: 0,
        nome_bairro: "",
        nome_pagamento: "",
        obs: ""
    }
}
const initialValidaton = () => {
    return {
        nome_cliente: false,
        whatsapp: false,
        nome_rua: false,
        id_bairro: false,
        numero_casa: false,
        id_forma_pagamento: false
    }
}
export const HomeCardapio = (props: List) => {

    const { listProduct, listCategoria } = props
    const [infoPedido, setInfoPedido] = useState<TInfoPedido>(initialInfoPedido)
    const [radioValue, setRadioValue] = useState<String>("")
    const [itensCarrinho, setItensCarrinhos] = useState<TProdudos[]>([])
    const [numeroPedidos, setNumeroPedidos] = useState(0)
    const [show, setShow] = useState(false);
    const [itensComida, setItensComida] = useState([])
    const [validacao, setValidacao] = useState(initialValidaton)
    const [itensComidaBackup, setItensComidaBackup] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [categorias, setCategorias] = useState([])
    const [pedido, setPedido] = useState({ total: 0, entrega: false })
    const bairros = [
        { id: 11, nome: "Centro" },
        { id: 24, nome: "Caverinha" },
        { id: 35, nome: "Cidade Nova" },
        { id: 42, nome: "Primavera" },
        { id: 87, nome: "Murici" },
        { id: 140, nome: "Vitoria" },
        { id: 63, nome: "Mutirão" },
        { id: 171, nome: "Bairro Novo" },
        { id: 211, nome: "12 de outubro" },
    ]
    const formaPagamento = [
        { id_forma_pagamento: 10, nome_pagamento: "Credito" },
        { id_forma_pagamento: 11, nome_pagamento: "Debito" },
        { id_forma_pagamento: 20, nome_pagamento: "Dinheiro" },
        { id_forma_pagamento: 21, nome_pagamento: "PIX" },
    ]
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
            setInfoPedido({ ...infoPedido, total })
            setPedido({ ...pedido, total })

            const qtdPedidos = itensCarrinho.length
            setNumeroPedidos(qtdPedidos)
        } else {
            setInfoPedido({ ...infoPedido, total: 0 })
            setPedido({ ...pedido, total: 0 })
            setNumeroPedidos(0)
        }
    }, [itensCarrinho])

    const handleEntrega = () => {
        setInfoPedido({ ...infoPedido, entrega: !infoPedido.entrega })
    }

    const adicionarItemCarrinho = (idComida: String) => {
        const validacao = itensCarrinho.some(item => {
            if (item['id_item'] === idComida) {
                return true
            } else {
                return false
            }
        })
        if (validacao) {
            return
        }
        let addCarrinho = itensComida.filter(item => {
            if (item.id_item === idComida) {
                return item
            }
        })

        addCarrinho[0].quantidade = 1
        setItensCarrinhos([...itensCarrinho, addCarrinho[0]])
    }

    const adicionarQuantidadeCarrinho = (idComida: string) => {
        let itensCarrinhosAux = itensCarrinho.map(item => item);
        itensCarrinhosAux.forEach((item, index) => {
            if (item['id_item'] === idComida) {
                itensCarrinhosAux[index]['quantidade'] += 1
            }
        })
        setItensCarrinhos(itensCarrinhosAux)
    }

    const removerQuantidadeCarrinho = (idComida: string) => {
        let itensCarrinhosAux = itensCarrinho.map(item => item);
        const validacao = itensCarrinho.some((item, index) => {
            if (item['id_item'] === idComida) {
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
            if (item['id_item'] === idComida) {
                itensCarrinhosAux[index]['quantidade'] -= 1
            }
        })
        setItensCarrinhos(itensCarrinhosAux)
    }
    const removeItemCarrinho = (idComida: string) => {
        let itensCarrinhosAux = itensCarrinho.map(item => item);
        const arrayAux = itensCarrinhosAux.filter((item, index, array) => {
            if (item['id_item'] !== idComida) {
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
    const onChangeInfoPedido = (event: ChangeEvent<FormControlProps | unknown>) => {
        const { name, value } = event.currentTarget as HTMLInputElement

        setInfoPedido({ ...infoPedido, [name]: value })
    }
    useEffect(() => {
        if (infoPedido.id_bairro !== "" || infoPedido.id_forma_pagamento !== "") {
            const nomeBairro = bairros.filter(item => {
                if (item.id.toString() === infoPedido.id_bairro) {
                    return item
                }
            })
            const nomePagamento = formaPagamento.filter(item => {
                if (item.id_forma_pagamento.toString() === infoPedido.id_forma_pagamento) {
                    return item
                }
            })
            setInfoPedido({
                ...infoPedido,
                nome_bairro: nomeBairro.length === 0 ? "" : nomeBairro[0]["nome"],
                nome_pagamento: nomePagamento.length === 0 ? "" : nomePagamento[0]["nome_pagamento"]
            })
        }

    }, [infoPedido.id_bairro, infoPedido.id_forma_pagamento])

    useEffect(() => {
        let nome_cliente = false, whatsapp = false, id_forma_pagamento = false
        let enderecoAux = { nome_rua: false, numero_casa: false, id_bairro: false }
        if (infoPedido?.nome_cliente !== "") {
            if (infoPedido?.nome_cliente?.length > 0) {

                nome_cliente = true
            }
        }
        if (infoPedido?.whatsapp !== "") {
            if (infoPedido?.whatsapp?.replace(/[^0-9]/g, '')?.length > 10) {
                whatsapp = true
            }
        }
        if (infoPedido?.id_forma_pagamento !== "") {
            if (infoPedido?.id_forma_pagamento?.length > 0) {
                id_forma_pagamento = true
            }
        }
        if (infoPedido.entrega === true) {
            Object.keys(enderecoAux).map(item => {
                if (infoPedido[item] !== "" && infoPedido[item]?.length > 0) {
                    enderecoAux[item] = true
                }
            })
        } else {
            Object.keys(enderecoAux).map(item => {
                enderecoAux[item] = false
            })
        }
        return setValidacao({
            ...validacao,
            whatsapp,
            nome_cliente,
            id_forma_pagamento,
            ["nome_rua"]: enderecoAux.nome_rua,
            ["id_bairro"]: enderecoAux.id_bairro,
            ["numero_casa"]: enderecoAux.numero_casa,
        })
    }, [infoPedido])

    console.log(infoPedido);
    
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
                            <div className={styles.itemComida} key={item.id_item}>
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
                                    <button value={item.id_item} type="button" onClick={() => adicionarItemCarrinho(item.id_item)}>Adicionar</button>
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
                                                    <button onClick={() => removerQuantidadeCarrinho(itensCarrinho[item].id_item)}>
                                                        <BsDashSquareFill className={styles.remove} />
                                                    </button>
                                                    <input disabled type="text" value={itensCarrinho[item].quantidade} />
                                                    <button onClick={() => adicionarQuantidadeCarrinho(itensCarrinho[item].id_item)}>
                                                        <BsFillPlusSquareFill className={styles.add} />
                                                    </button>
                                                </div>
                                                <h4>{new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: "BRL"
                                                }).format((itensCarrinho[item].price * itensCarrinho[item].quantidade) / 100)}</h4>


                                            </aside>
                                            <a onClick={() => removeItemCarrinho(itensCarrinho[item].id_item)}>
                                                <BsFillTrashFill /> Remover
                                            </a>
                                        </section>

                                    </aside>
                                </>
                            )
                        })}
                        <FloatingLabel
                            controlId="floatingBairro"
                            label="Observação sobre o pedido?">

                            <Form.Control
                                    className="mb-3"
                                type="text"
                                name="obs"
                                value={infoPedido?.obs}
                                onChange={(e) => onChangeInfoPedido(e)}
                                placeholder="Casa de esquina" />
                        </FloatingLabel>
                        <div className={styles.containerEntregaTotal}>
                            <section className={infoPedido.entrega ? styles.active : ""}>
                                <Form.Check
                                    type="checkbox"
                                    id={`default-checkbox`}
                                    label="PARA ENTREGA?"
                                    checked={infoPedido.entrega}
                                    onChange={handleEntrega}
                                />

                            </section>
                            <div className={styles.containerTotal}>
                                <section>
                                    <FloatingLabel controlId="floatingPagamento" label="Forma de pagamento">
                                        <Form.Select
                                            required
                                            value={infoPedido?.id_forma_pagamento}
                                            isInvalid={!validacao.id_forma_pagamento}
                                            isValid={validacao.id_forma_pagamento}
                                            name="id_forma_pagamento"
                                            onChange={(e) => onChangeInfoPedido(e)}
                                            aria-label="opções">
                                            <option value="">-</option>
                                            {
                                                formaPagamento.map(item => {
                                                    return <option value={item.id_forma_pagamento}>{item.nome_pagamento}</option>
                                                })
                                            }
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            insira a forma de pagamento
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </section>
                                <aside>
                                    <div>
                                        <h2>TOTAL </h2>
                                        <label>{new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: "BRL"
                                        }).format(pedido.total / 100)}</label>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        {infoPedido.entrega && <div className={styles.containerInfoEndereco}>
                            <div>
                                <FloatingLabel
                                    controlId="floatingRua"
                                    label="Insira o nome da rua"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        className={styles.inputLarguraMax}
                                        type="text"
                                        value={infoPedido?.nome_rua}
                                        required
                                        isInvalid={!validacao.nome_rua}
                                        isValid={validacao.nome_rua}
                                        onChange={(e) => onChangeInfoPedido(e)}
                                        name="nome_rua"
                                        placeholder="14 de julho" />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingNumero"
                                    label="Numero">
                                    <Form.Control
                                        type="text"
                                        value={infoPedido?.numero_casa}
                                        required
                                        isInvalid={!validacao.numero_casa}
                                        isValid={validacao.numero_casa}
                                        onChange={(e) => onChangeInfoPedido(e)}
                                        name="numero_casa"
                                        placeholder="45" />
                                </FloatingLabel>
                            </div>
                            <div>
                                <FloatingLabel
                                    className="mb-3"
                                    controlId="floatingComplemento"
                                    label="Bairro">
                                    <Form.Select
                                        value={infoPedido?.id_bairro}
                                        aria-label="Floating label select example"
                                        onChange={(e) => onChangeInfoPedido(e)}
                                        required
                                        isInvalid={!validacao.id_bairro}
                                        isValid={validacao.id_bairro}
                                        name="id_bairro">
                                        <option value="">selecione um bairro</option>
                                        {
                                            bairros.map(item => {
                                                return <option value={item.id}>{item.nome}</option>
                                            })
                                        }

                                    </Form.Select>
                                    <FloatingLabel
                                        controlId="floatingBairro"
                                        label="Complemento">
                                        <Form.Control
                                            type="text"
                                            name="complemento"
                                            value={infoPedido?.complemento}
                                            onChange={(e) => onChangeInfoPedido(e)}
                                            placeholder="Casa de esquina" />
                                    </FloatingLabel>

                                </FloatingLabel>
                            </div>
                        </div>}

                        <div className={styles.containerInfoPedido}>
                            <Form.Group>

                                <FloatingLabel
                                    controlId="floatingNomeCliente"
                                    label="Seu nome"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        onChange={onChangeInfoPedido}
                                        required
                                        isInvalid={!validacao.nome_cliente}
                                        isValid={validacao.nome_cliente}
                                        name="nome_cliente"
                                        value={infoPedido?.nome_cliente ? infoPedido?.nome_cliente : ""}
                                        placeholder="João" />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor insira seu nome
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingNumeroWhatsapp"
                                    label="Whatsapp">
                                    <Form.Control as={MaskedInput}
                                        mask="(11)11111-1111"
                                        value={infoPedido?.whatsapp ? infoPedido?.whatsapp : ""}
                                        type="text"
                                        required
                                        isInvalid={!validacao.whatsapp}
                                        isValid={validacao.whatsapp}
                                        onChange={onChangeInfoPedido}
                                        name="whatsapp"
                                        placeholder="(94)99999-9999" />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor insira seu numero do Whatsapp
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="success" onClick={(e) => pedidos.handlePedido(itensCarrinho, infoPedido, e, validacao)}>Finalizar Pedido</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </section>
    )
}
