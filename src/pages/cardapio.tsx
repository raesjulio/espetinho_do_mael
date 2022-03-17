import axios from "axios";
import { GetStaticProps } from "next";
import { HomeCardapio } from "../components/Cardapio/HomeCardapio";
import { supabase } from "../utils/supabase";
type ICardapio = {
  id: Number
  nome: string
  descricao: string
  preco: Number
  disponivel: boolean
}
interface List {
  listProduct:[{
    id: Number
    nome: string
    descricao: string
    preco: Number
    disponivel: boolean
  }]
}

export default function Cardapio({ listProduct}: List) {
  console.log(listProduct);
  
  return (
    <>
      <HomeCardapio />
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