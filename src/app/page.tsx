"use client"
import Image from "next/image";
import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
export default function Home() {
  
  const [nomeArquivo, setNomeArquivo] = useState();
  const [tamanhoArquivo, setTamanhoArquivo] = useState(0);

  const [listaDisco, setListaDisco] = useState(new Array(100).fill(''));
  const tamanho = listaDisco.length
  const [arquivos, setArquivos]:any = useState({});


  const salvarArquivoEvento = (e:any) => {
    e.preventDefault()
    salvarArquivo(nomeArquivo,tamanhoArquivo)
  }

  const exibirDisco = () => {
    console.log("Estado atual do disco:");
    for (let i = 0; i < tamanho; i++) {
      if (listaDisco[i] === '') {
        console.log(`[${i}] Livre`);
      } else {
        console.log(`[${i}] ${arquivos[listaDisco[i]]}`);
      }
    }
  };

  const salvarArquivo = (nomeArquivo:any, tamanhoArquivo:number) => {
    if (arquivos.hasOwnProperty(nomeArquivo)) {
      console.log(`Erro: Já existe um arquivo com o nome ${nomeArquivo}.`);
      return;
    }

    const posicaoInicial = encontrarEspacoLivre(tamanhoArquivo);
    if (posicaoInicial === null) {
      console.log("Erro: Não há espaço suficiente para salvar o arquivo.");
      return;
    }

    const blocoArquivo = posicaoInicial.toString();
    const novaListaDisco = [...listaDisco];
    for (let i = 0; i < tamanhoArquivo; i++) {
      novaListaDisco[posicaoInicial + i] = blocoArquivo;
    }

    setListaDisco(novaListaDisco);
    setArquivos({ ...arquivos, [blocoArquivo]: nomeArquivo });
    console.log(`Arquivo ${nomeArquivo} salvo com sucesso.`);
  };
  
  const encontrarEspacoLivre = (tamanhoArquivo:any) => {
    for (let i = 0; i <= tamanho - tamanhoArquivo; i++) {
      if (listaDisco.slice(i, i + tamanhoArquivo).every(bloco => bloco === '')) {
        return i;
      }
    }
    return null;
  };


  return (
    <main className="p-5">
      <div>
        Sua lista atual possui <strong className="">{tamanho}</strong>{" "}
        posições
        <button onClick={exibirDisco}>mostrar Livre</button>
      </div>
      <Popup trigger={<button className="button">Salvar um arquivo</button>} modal>
       <div className="text-black">
       
          <form onSubmit={salvarArquivoEvento} className="flex flex-col">
            Nome do arquivo
            <input type="text" onChange={(e:any)=>setNomeArquivo(e.target.value)} className="border-2 border-stone-700 max-w-[17rem] rounded-md"/>
            Tamanho do arquivo
            <input type="number" onChange={(e:any)=>setTamanhoArquivo(e.target.value)} className="border-2 border-stone-700 max-w-[17rem] rounded-md"/>
          <button className="max-w-[10rem] bg-green-500 mt-5 rounded-lg p-2">Enviar</button>
          </form>
    
       </div>
      </Popup>
    </main>
  );
}
