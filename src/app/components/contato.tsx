import React from 'react';

export default function Contato(props: any) {
  return (
    <div className="group hover:scale-110 transition-transform duration-300 ease-in-out flex flex-col justify-center items-center bg-[#121212] text-white p-2 rounded-lg">
      <img className="rounded-full border-2 border-green-500" src={props.avatarUrl} width={100} alt="" />
      <div>{props.nome}</div>
      <div>Matrícula: {props.matricula}</div>
    </div>
  );
}
