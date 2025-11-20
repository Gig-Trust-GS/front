import React from 'react';
import { Github, Linkedin, Users } from 'lucide-react';
import fotoMatheus from '../../assets/img/fotoMatheus.jpeg';
import fotoJulia from '../../assets/img/fotoJulia.jpeg';
import fotoNicholas from '../../assets/img/fotoNicholas.jpeg';

interface Integrante {
  nome: string;
  rm: string;
  turma: string;
  fotoUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

// DADOS FINAIS DA EQUIPE
const integrantes: Integrante[] = [
  {
    nome: "Matheus Borges Sansão Silva",
    rm: "562896",
    turma: "1TDSPO",
    fotoUrl: fotoMatheus,
    githubUrl: "https://github.com/Matheussansao",
    linkedinUrl: "https://www.linkedin.com/in/matheus-sansao-6a0505171/",
  },
  {
    nome: "Julia Correa e Souza Altino",
    rm: "564870",
    turma: "1TDSPO",
    fotoUrl: fotoJulia,
    githubUrl: "https://github.com/Juliacsou",
    linkedinUrl: "https://www.linkedin.com/in/julia-de-altino-540261258/",
  },
  {
    nome: "Nicholas Camillo Canadas de Paula",
    rm: "561262",
    turma: "1TDSPO",
    fotoUrl: fotoNicholas,
    githubUrl: "https://github.com/Canadas7",
    linkedinUrl: "https://www.linkedin.com/in/nicholas-cañadas-682a21248/",
  },
];

const Integrantes: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-10 md:p-16">

      <div className="max-w-6xl mx-auto py-12">

        <div className="text-center mb-12">
          <Users className="text-blue-400 mx-auto mb-4" size={48} />
          <h1 className="text-5xl font-extrabold text-white tracking-wider">
            Nossa <span className="text-green-400">Equipe</span>
          </h1>
          <p className="text-lg text-gray-400 mt-2">
            Desenvolvedores do Passaporte de Carreira Gig-Trust | Turma *1TDSPO*.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {integrantes.map((integrante) => (
            <div
              key={integrante.rm}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-blue-400/30 shadow-2xl transition duration-300 hover:scale-[1.02] hover:shadow-blue-500/50">
              <div className="text-center">

                <img src={integrante.fotoUrl} alt={Foto de ${integrante.nome}} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-green-400 p-0.5" />

                <h2 className="text-xl font-bold mb-1 text-white">
                  {integrante.nome}
                </h2>

                <p className="text-sm text-gray-400 mb-4">
                  RM: {integrante.rm} | Turma: {integrante.turma}
                </p>

                <div className="flex justify-center space-x-6 pt-4 border-t border-gray-700">
                  <a href={integrante.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white transition duration-200">
                    <Github size={28} />
                  </a>

                  <a href={integrante.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white transition duration-200">
                    <Linkedin size={28} />
                  </a>

                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Integrantes;