"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { ArrowsClockwise } from "phosphor-react";
export default function Home() {
  const [nomeArquivo, setNomeArquivo] = useState("");
  const [tamanhoArquivo, setTamanhoArquivo] = useState(0);
  const [nomeArquivoExlcuir, setNomeArquivoExlcuir] = useState("");
  let lista:Array<string> = []
  const [maxPositions, setMaxPositions]:any = useState(100)
  const [listaState, setListaState]:any = useState([])
  const [listaDisco, setListaDisco] = useState(new Array(maxPositions).fill(""));
  const tamanho = listaDisco.length;
  const [arquivos, setArquivos]: any = useState({});




  const salvarArquivoEvento = (e: any) => {
    e.preventDefault();
    salvarArquivo(nomeArquivo, tamanhoArquivo);
  };

  const excluirArquivoevento = (e:any) => {
    console.log(nomeArquivoExlcuir)
    e.preventDefault();
    excluirArquivo(nomeArquivoExlcuir);
  };

  const editarCapacidade = () =>{
    const userInput = prompt('Digite a quantidade de espaços que deseja: ') || "100";
    try{
      let numero = parseInt(userInput, 10);
      setListaDisco(new Array(numero).fill(""))
    }
    catch(e){
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const excluirArquivo = (nomeArquivo:string) => {
 
    if (!Object.values(arquivos).includes(nomeArquivo)) {
      console.log(`Erro: O arquivo ${nomeArquivo} não foi encontrado.`);
      toast.error(`Erro: O arquivo ${nomeArquivo} não foi encontrado.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const blocoArquivo = Object.keys(arquivos).find(key => arquivos[key] === nomeArquivo) || "";
    const novaListaDisco = listaDisco.map(bloco => (bloco === blocoArquivo ? '' : bloco));

    setListaDisco(novaListaDisco);
    setArquivos((prevArquivos: any) => {
      const novoObjeto = { ...prevArquivos };
      delete novoObjeto[blocoArquivo];
      return novoObjeto;
    });

    console.log(`Arquivo ${nomeArquivo} excluído com sucesso.`);
  };

  const exibirDisco = () => {
    console.clear()
    console.log("Estado atual do disco:");
    for (let i = 0; i < tamanho; i++) {
      if (listaDisco[i] === "") {
        lista.push(`[${i}] Livre \n`)
       
      } else {
        lista.push(`[${i}] ${arquivos[listaDisco[i]]} \n`)
       
      }
    }
    setListaState(lista)
  };

  const salvarArquivo = (nomeArquivo: any, tamanhoArquivo: number) => {
    if (nomeArquivo.trim() === "" || tamanhoArquivo <= 0) {
      toast.error(`Favor inserir valores válidos`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (Object.values(arquivos).includes(nomeArquivo)) {
      toast.error(`Já existe um arquivo com o nome ${nomeArquivo}.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const posicaoInicial = encontrarEspacoLivre(tamanhoArquivo);
    if (posicaoInicial === null) {
      ;
      toast.error("Não há espaço suficiente para salvar o arquivo.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
    
    toast.success(`Arquivo ${nomeArquivo} salvo com sucesso.`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const encontrarEspacoLivre = (tamanhoArquivo: any) => {
    for (let i = 0; i <= tamanho - tamanhoArquivo; i++) {
      if (
        listaDisco.slice(i, i + tamanhoArquivo).every((bloco) => bloco === "")
      ) {
        return i;
      }
    }
    return null;
  };

  return (
    <main className="p-5 flex flex-col justify-center items-center gap-2">
      <div className="mb-[2rem]">
        Seu disco atual possui <strong>{tamanho}</strong>
       <span> posições</span>
      </div>
      <div className="flex flex-wrap justify-center items-center">
      <button  onClick={editarCapacidade} className="bg-[#121212] text-white border-2 p-2 rounded-md min-w-[10rem] hover:bg-transparent hover:border-[#121212] hover:text-[#121212] duration-200">
           Editar capacidade
          </button>
      <button
        onClick={exibirDisco}
        className="bg-[#121212] text-white border-2 p-2 min-w-[10rem]  rounded-md hover:bg-transparent hover:border-[#121212] hover:text-[#121212] duration-200"
      >
        Mostrar Livre
      </button>

      <Popup
        trigger={
          <button className="bg-[#121212] text-white border-2 p-2 rounded-md min-w-[10rem] hover:bg-transparent hover:border-[#121212] hover:text-[#121212] duration-200">
            Salvar um arquivo
          </button>
        }
        modal
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-lg mb-5">Salvar arquivo</h1>
          <form
            onSubmit={salvarArquivoEvento}
            className="flex flex-col items-center justify-center"
          >
            Nome do arquivo
            <input
              required
              type="text"
              onChange={(e: any) => setNomeArquivo(e.target.value)}
              className="border-2 border-stone-700 max-w-[17rem] rounded-md"
            />
            Tamanho do arquivo
            <input
              required
              type="number"
              onChange={(e: any) => setTamanhoArquivo(e.target.value)}
              className="border-2 border-stone-700 max-w-[17rem] rounded-md mb-5"
            />
            <button className="bg-[#121212] text-white border-2 p-2 rounded-md min-w-[5rem] hover:bg-transparent hover:border-[#121212] hover:text-[#121212] duration-200">
              Enviar
            </button>
          </form>
        </div>
      </Popup>

      <Popup
        trigger={
          <button className="bg-[#121212] text-white border-2 p-2 min-w-[10rem]  rounded-md hover:bg-transparent hover:border-[#121212] hover:text-[#121212] duration-200">
            Excluir um arquivo
          </button>
        }
        modal
      >
        <div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-lg mb-5">Excluir Arquivo</h1>
            <form className="flex flex-col justify-center items-center" onSubmit={excluirArquivoevento}>
              <label className="mb-4">Nome do arquivo</label>
              <input
                required
                onChange={(e: any) => setNomeArquivoExlcuir(e.target.value)}
                type="text"
                className="border-2 border-stone-700 max-w-[17rem] rounded-md mb-5"
              />
              <button className="bg-[#121212] text-white border-2 p-2 rounded-md min-w-[5rem] hover:bg-transparent hover:border-[#121212] hover:text-[#121212] duration-200">
                Excluir
              </button>
            </form>
          </div>
        </div>
      </Popup>
      </div>
     <h1 className="text-lg mt-5">Mapeamento de posições</h1>
     <div className="mt-5 border-2 rounded-lg border-black p-3 flex justify-center items-center  gap-4 flex-wrap">
     <button onClick={exibirDisco} className="bg-[#121212] text-white border-2 p-2 rounded-md hover:bg-transparent hover:border-[#121212] hover:text-[#121212] duration-200">   <ArrowsClockwise size={25} /></button>
     {
  listaState
    ? listaState.map((element:any) => <div key={element} className="border-b-2">{element}</div>)
    : <div>Carregando lista</div>
}
     </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </main>
  );
}
