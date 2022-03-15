import Link from "next/link"
import styles from "./styles.module.scss"


export const CardHome = () => {
    return (
        <section className={styles.containerCardHome}>
            <div>
                <h1>
                    Dinheiro bem gasto,
                </h1>
                <h1>
                é dinheiro gasto com comida.
                </h1>
            </div>
            <section>
                <p>o que vai pedir hoje?</p>
                <Link href="cardapio">
                    <button>
                        Cardapio
                    </button>

                </Link>
            </section>
        </section>
    )
}
