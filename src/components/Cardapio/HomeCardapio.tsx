import { SyntheticEvent, useState } from "react"
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap"
import styles from "./styles.module.scss"


export const HomeCardapio = () => {
  const [radioValue, setRadioValue] = useState<String>("")
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
  const handleCategory = (event: SyntheticEvent) => {
    console.log(event.target);
    // const {value} = event.target
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
            className={radioValue === radio.value ? styles.ativo: ""}
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
                <button value={item.id} type="button" onClick={handleCategory}>Adicionar</button>
              </aside>
            </div>
          )
        })
      }
    </section>
  )
}
