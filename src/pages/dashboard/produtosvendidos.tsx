import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useQuery } from "react-query";
import { HomePedidos } from "../../components/HomePedidos/HomePedidos";
import { api } from "../../utils/api";
interface IProdutosVendas { nome_item: String, id_item: String, qtd: 4 }
export default function ProdutosVendidos() {
    const [produtosVendidos, setProdutosVendidos] = useState<IProdutosVendas[]>([])
    const [fetching, setFetching] = useState<Boolean>()
    const { data, isFetching } = useQuery<IProdutosVendas[] | undefined>("produtosvendidos", async () => {
        const response = await api.get("/produtosvendidos")
        return response.data
    })
    console.log(data);
    useEffect(() => {
        if (data) {
            let arrayPrin = []
            arrayPrin.push(["Produto", "Quantidade"])
            const teste = data.map(item => {
                arrayPrin.push([item.nome_item, item.qtd])
                return
            })
            arrayPrin = arrayPrin.filter((item, index) => {
                if (index < 11) {
                    return item
                }
            })
            setProdutosVendidos(arrayPrin)
        }
    }, [data])
    const options = {
        legend: { position: "top" },
        // chart: {
        //     title: "Population of Largest U.S. Cities",
        //     subtitle: "Based on most recent and previous census data",
        // },
        hAxis: {
            title: "Top 10 produtos mais vendidos",
            minValue: 0,
        },
        // vAxis: {
        //     title: "City",
        // },
        bars: "horizontal",
        // axes: {
        //     y: {
        //         0: { side: "right" },
        //     },
        // },
        chartArea: { width: "50%" },
        bar: { groupWidth: "50%" },
    };
    return (
        <>
            <div>
                <Chart
                    chartType="BarChart"
                    width="100%"
                    height="400px"
                    data={produtosVendidos}
                    options={options}
                />
            </div>


        </>
    )
}
