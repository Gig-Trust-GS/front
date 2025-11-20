import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, GraduationCap, Globe, ShieldCheck, ArrowRight } from 'lucide-react';

const Sobre: React.FC = () => {
  return (
    <div className="bg-black text-white p-4 sm:p-10 md:p-16">
      <div className="max-w-4xl mx-auto py-12">

        {/* Título Principal */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-white mb-4">
            Sobre o Gig-Trust: Propriedade e Estabilidade de Dados
          </h1>
          <p className="text-xl text-gray-400">
            A solução que transforma a renda volátil da Gig Economy em confiança e oportunidade de requalificação.
          </p>
        </div>

        {/* O Desafio da Estabilidade de Renda */}
        <section className="mb-12 p-6 bg-gray-900 rounded-xl shadow-xl border border-gray-800">
          <h2 className="text-3xl font-bold text-red-500 mb-4 flex items-center space-x-3">
            <Zap size={28} />
            <span>O Problema: Fragilidade na Gig Economy</span>
          </h2>
          <p className="text-lg text-gray-300 mb-4">
            Milhões de trabalhadores em plataformas (motoristas, entregadores, freelancers) enfrentam um dilema: a ausência de um holerite. A renda, embora real, é volátil e dispersa em múltiplas fontes, tornando quase impossível comprovar estabilidade financeira para acessar crédito, moradia ou financiamentos, o que agrava a desigualdade social.
          </p>
        </section>

        {/* Nosso Conceito: O Passaporte de Carreira */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-400 mb-4 flex items-center space-x-3">
            <Globe size={28} />
            <span>O Conceito: Devolvendo o Controle ao Trabalhador</span>
          </h2>
          <p className="text-lg text-gray-300 mb-4">
            O Gig-Trust utiliza Inteligência Artificial para agregar todos os dados de performance do trabalhador (histórico de ganhos, avaliações, tempo de atividade) em um *Passaporte de Carreira* unificado. O foco é devolver ao trabalhador a posse e o controle sobre seus dados. Geramos duas métricas principais:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li><span className="font-semibold text-white">Score de Estabilidade de Renda:</span> Número confiável, gerado por Regressão, que bancos podem usar.</li>
            <li><span className="font-semibold text-white">Mapa de Competências:</span> Identifica habilidades invisíveis (logística, atendimento) para direcionar o Reskilling.</li>
          </ul>
        </section>

        {/* Integridade: O Papel da Avaliação Externa */}
        <section className="mb-12 p-6 bg-gray-900 rounded-xl shadow-xl border border-gray-800">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4 flex items-center space-x-3">
            <ShieldCheck size={28} />
            <span>Integridade: O Papel do Avaliador e da IA</span>
          </h2>
          <p className="text-lg text-gray-300 mb-4">
            A confiabilidade da plataforma é sustentada pela rastreabilidade e pela IA. O sistema permite que qualquer usuário logado (gestor, cliente ou outro trabalhador) avalie a performance. Esta avaliação externa é essencial para validar a experiência, e o sistema registra o CPF do avaliador para garantir a integridade dos dados, mantendo o Passaporte sempre atualizado e crível.
          </p>
        </section>

        {/* Reskilling e Oportunidades */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-400 mb-4 flex items-center space-x-3">
            <GraduationCap size={28} />
            <span>Reskilling e Oportunidades de Carreira</span>
          </h2>
          <p className="text-lg text-gray-300">
            A requalificação (Reskilling) é uma exigência do futuro do trabalho. Usando o *Mapa de Competências*, o Gig-Trust sugere cursos e trilhas de aprendizado que aproveitam as habilidades já adquiridas pelo trabalhador na prática. Transformamos a experiência de 'gigs' em um plano de carreira tangível.
          </p>
        </section>


        {/* Simulação de Busca Rápida */}
        <div className="pt-8 border-t border-gray-800 mt-12 bg-gray-800 p-6 rounded-lg shadow-inner">
          <h2 className="text-3xl font-bold mb-4">
            Consultar Score Rápido (Simulação)
          </h2>
          <p className="text-lg text-gray-400 mb-5">
            Esta é uma funcionalidade pública (não exige login) para demonstrar a busca rápida do Score, crucial para parceiros (bancos/imobiliárias). Insira um ID (CPF) para visualizar um Score mockado.
          </p>
          <form className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <input
              type="text"
              placeholder="Digite o CPF (ID Gig-Trust) do usuário"
              className="flex-grow px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              maxLength={14}
            />
            <button
              type="submit"
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Buscar Score
            </button>
          </form>
        </div>

        <div className="text-center pt-8 border-t border-gray-800 mt-12">
          <h2 className="text-2xl font-bold text-white mb-3">Pronto para assumir o controle da sua carreira?</h2>
          <Link
            to="/signup"
            className="inline-flex items-center space-x-2 px-8 py-3 text-xl font-bold bg-green-500 text-black rounded-full shadow-lg hover:shadow-2xl hover:bg-green-600 transition duration-300 transform hover:scale-105 mt-4"
          >
            Criar Meu Passaporte Agora <ArrowRight size={22} />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Sobre;