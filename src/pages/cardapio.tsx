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
  }]
}

export default function Cardapio({ listProduct }: List) {
    return (
    <>
      <HomeCardapio listProduct={listProduct} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await supabase.from<ICardapio[]>("cardapio").select("*").then(response => {
    return response.body
  })
  return {
    props: {
      listProduct: data
    },
    revalidate: 60 * 60 * 24, //24horas
  }
}