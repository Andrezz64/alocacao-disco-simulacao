import React, { useState } from 'react';

const DiscoSimulado = ({ tamanho }) => {
  const [listaDisco, setListaDisco] = useState(new Array(tamanho).fill(''));
  const [arquivos, setArquivos] = useState({});
  const [nomeArquivo, setNomeArquivo] = useState('');
  const [tamanhoArquivo, setTamanhoArquivo] = useState('');

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

  const salvarArquivo = () => {
    if (nomeArquivo.trim() === '' || tamanhoArquivo <= 0) {
      console.log("Erro: Por favor, insira um nome de arquivo e um tamanho válido.");
      return;
    }

    if (arquivos.hasOwnProperty(nomeArquivo)) {
      console.log(`Erro: Já existe um arquivo com o nome ${nomeArquivo}.`);
      return;
    }

    excluirArquivoevento = () => {
        excluirArquivo(nomeArquivo)
    }

    const excluirArquivo = (nomeArquivo) => {
        if (!arquivos.hasOwnProperty(nomeArquivo)) {
          console.log(`Erro: O arquivo ${nomeArquivo} não foi encontrado.`);
          return;
        }

    const tamanhoArquivoInt = parseInt(tamanhoArquivo, 10);
    const posicaoInicial = encontrarEspacoLivre(tamanhoArquivoInt);
    
    if (posicaoInicial === null) {
      console.log("Erro: Não há espaço suficiente para salvar o arquivo.");
      return;
    }

    const blocoArquivo = posicaoInicial.toString();
    const novaListaDisco = [...listaDisco];
    for (let i = 0; i < tamanhoArquivoInt; i++) {
      novaListaDisco[posicaoInicial + i] = blocoArquivo;
    }

    setListaDisco(novaListaDisco);
    setArquivos({ ...arquivos, [blocoArquivo]: nomeArquivo });
    setNomeArquivo('');
    setTamanhoArquivo('');
    console.log(`Arquivo ${nomeArquivo} salvo com sucesso.`);
  };

  const encontrarEspacoLivre = (tamanhoArquivo) => {
    for (let i = 0; i <= tamanho - tamanhoArquivo; i++) {
      if (listaDisco.slice(i, i + tamanhoArquivo).every(bloco => bloco === '')) {
        return i;
      }
    }
    return null;
  };

  return (
    <div>
      <button onClick={exibirDisco}>Exibir Disco</button>

      <form onSubmit={(e) => { e.preventDefault(); salvarArquivo(); }}>
        <label>
          Nome do Arquivo:
          <input
            type="text"
            value={nomeArquivo}
            onChange={(e) => setNomeArquivo(e.target.value)}
          />
        </label>
        <label>
          Tamanho do Arquivo:
          <input
            type="number"
            value={tamanhoArquivo}
            onChange={(e) => setTamanhoArquivo(e.target.value)}
          />
        </label>
        <button type="submit">Salvar Arquivo</button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Simulação de Disco com Alocação Contígua</h1>
      <DiscoSimulado tamanho={100} />
    </div>
  );
};
}
export default App;
