import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const buscarProdutos = async () => {
      const querySnapshot = await getDocs(collection(db, "produtos"));
      const lista = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProdutos(lista);
    };

    buscarProdutos();
  }, []);

  const adicionar = (produto) => {
    const existe = carrinho.find(item => item.id === produto.id);

    if (existe) {
      setCarrinho(
        carrinho.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: (item.quantidade || 1) + 1 }
            : item
        )
      );
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  const finalizarPedido = () => {
    const mensagem = carrinho
      .map(item => `${item.nome} (x${item.quantidade}) - R$${item.preco}`)
      .join("%0A");

    const url = `https://wa.me/SEUNUMERO?text=Pedido:%0A${mensagem}%0ATotal: R$${total}`;
    window.open(url, "_blank");
  };

  return (
    <div className="container">
      <h1>🛒 Salvados Matriz</h1>

      <div className="produtos">
        {produtos.map(p => (
          <div className="card" key={p.id}>
            <img
              src={p.imagem?.replace(/"/g, "").trim() || "https://via.placeholder.com/150"}
              alt={p.nome}
            />
            <h3>{p.nome}</h3>
            <p>R$ {p.preco}</p>
            <button onClick={() => adicionar(p)}>
              Adicionar
            </button>
          </div>
        ))}
      </div>

      <div className="carrinho">
        <h2>Carrinho</h2>

        {carrinho.map((item, index) => (
          <p key={index}>
            {item.nome} (x{item.quantidade})
          </p>
        ))}

        <h3>Total: R$ {total}</h3>

        <button onClick={finalizarPedido}>
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}