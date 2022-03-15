import { SyntheticEvent, useState } from "react"
import { Button, ButtonGroup, Modal, ToggleButton } from "react-bootstrap"
import styles from "./styles.module.scss"
import { AiOutlineShoppingCart } from "react-icons/ai";

export const HomeCardapio = () => {
  const [radioValue, setRadioValue] = useState<String>("")
  const [itensCarrinho, setItensCarrinhos] = useState({ numero_de_pedidos: 0 })
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const categorias = [
    { id: "12", value: "Tudo" },
    { id: "13", value: "Pizzas" },
    { id: "23", value: "Bebidas" },
    { id: "21", value: "Espetinhos" },
  ]
  const itenscoimda = [
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMtvI_EKn66YGnauQhdWazjZEcvu3ARnv-OA&usqp=CAU",
      name: "Hamburguer",
      description: "Alface, Bacon, Batata Palha, Filé de Frango 40g, Hambúrguer de Carne, Maionese, Milho, Molho Especial 30ml-1und., Ovo, Pão, Presunto, Queijo (Fatia), Tomate.",
      price: 24.99,
      id: "123",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfuwP8NlZ3HlDzZlCqzCueuhbpiU5Ph5VW_Q&usqp=CAU",
      name: "Espetinho COmpleto",
      description: "Carne, Arroz, Feijão, Salada",
      price: 10.99,
      id: "214",
    },
    {
      image: "https://emsabara.com.br/wp-content/uploads/2021/08/Disk-Pizza-EM-Sabara.jpg",
      name: "Pizza",
      description: "Molho de tomate, mussarela, calabresa fatiada, cebola e orégano.",
      price: 42.99,
      id: "1245",
    },
    {
      image: "https://img.freepik.com/fotos-gratis/delicioso-copo-de-suco-de-laranja_144627-16581.jpg?size=338&ext=jpg",
      name: "Suco de Laranja",
      description: "Agua, Poupa de Laranja, Gelo, Açucar",
      price: 6.99,
      id: "455",
    },
  ]
  const handleCategory = (event: SyntheticEvent, id_comida: String) => {
    const addCarrinho = itenscoimda.filter(item => {
      if (item.id === id_comida) {
        return item
      }
    })
    let qtd = 0
    const qtdPedidos = Object.keys(itensCarrinho).length

    setItensCarrinhos({ ...itensCarrinho, [addCarrinho[0].id]: addCarrinho[0], numero_de_pedidos: qtdPedidos })
  }
  const handlePedido = () => {
    window.location.href = "https://api.whatsapp.com/send/?phone=5594988110021&text=Gostaria+de+saber+o+pre%C3%A7o+do+apartamento&app_absent=0"
  }

  return (

    <section className={styles.containerCardapioHome}>
      <aside>
        {categorias.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            // variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            className={radioValue === radio.value ? styles.ativo : ""}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.value}
          </ToggleButton>
        ))}

      </aside>

      {
        itenscoimda.map(item => {
          return (
            <div className={styles.itemComida} key={item.id}>
              <img src={item.image} alt={item.name} />
              <aside>
                <div>
                  <h5>{item.name}</h5>
                  <h5>R$ {item.price}</h5>
                </div>
                <p>
                  {item.description}
                </p>
                <button value={item.id} type="button" onClick={(e) => handleCategory(e, item.id)}>Adicionar</button>
              </aside>
            </div>
          )
        })
      }
      {itensCarrinho.numero_de_pedidos > 0 ?
        <div className={styles.containerPedidos}>
          <button onClick={handleShow}>
            <AiOutlineShoppingCart />
            Carrinho  <span>{itensCarrinho.numero_de_pedidos}</span>
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

            <Modal.Title>Finalizar Pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Object.keys(itensCarrinho).map(item => {
              console.log();

              return (
                <>
                  <aside className={styles.itemModal}>
                    <img src={itensCarrinho[item].image} alt={itensCarrinho[item].name} />
                    <div>
                      <h3>{itensCarrinho[item].name}</h3>
                      <h3>{itensCarrinho[item].price}</h3>
                    </div>
                  </aside>
                </>
              )
            })}
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
