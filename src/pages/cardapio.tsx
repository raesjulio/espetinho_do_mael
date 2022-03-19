import axios from "axios";
import { GetStaticProps } from "next";
import { HomeCardapio } from "../components/Cardapio/HomeCardapio";
import { supabase } from "../utils/supabase";
type ICardapio = {
  id: Number
  name: string
  descricao: string
  image: string
  price: Number
  disponivel: boolean
  ingredientes: string
}
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
  listCategoria: [{
    id_category: Number;
    name: String
  }]
}
interface ICategory {
  id_category: Number;
  name: String
}
export default function Cardapio({ listProduct, listCategoria }: List) {
  return (
    <>
      <HomeCardapio listProduct={listProduct} listCategoria={listCategoria} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const listCardapio = await supabase.from<ICardapio[]>("cardapio").select("*").then(response => {
    return response.body
  })
  const listCategoria = await supabase.from<ICategory[]>("category").select("id_category, name").then(response => {
    return response.body
  })
  return {
    props: {
      listProduct: listCardapio,
      listCategoria: listCategoria
    },
    revalidate: 60 * 60 * 24, //24horas
  }
}