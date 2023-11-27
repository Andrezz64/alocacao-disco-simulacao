# EmulaDisco v1

### introdução🚀  
Emuladisco é um projeto desenvolvido como um trabalho avaliativo da matéria de Sistemas operacionais do curso de Ciência da computação, da universidade Unifeso.

### Objetivo✅

O objetivo nesse trabalho é simular as operações realizadas pelo sistema operacional em relação a memória secundária, utilizando o método de alocação contígua, cujo principio se baseia nos dados do arquivo que são dispostos de forma sequencial sobre um conjunto de blocos consecutivos no disco, sem “buracos” entre os blocos. Assim, a localização do conteúdo do arquivo no disco é definida pelo endereço de seu primeiro bloco. 

### Documentação📕

A aplicação é baseada em Nextjs e utilza Tailwindcss como framework css. Tendo duas páginas estaticamente geradas pelo Nextjs com todo o poder de estados do React. Essa aplicação não possui Back-end e tudo é processado por meio de controles de estado e funções JS, armazenados em memória em tempo de execução da página.

| Rota | Função |
|--|--|
| / | Página principal do web app |
|/sobre|Informações do projeto|

### Rodando o servidor web on-promise

Rodando servidor no modo development (Com fast reload):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

[Mais informações de build e production enviroment](https://nextjs.org/docs/app/building-your-application) 
