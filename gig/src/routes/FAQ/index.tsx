import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; 
import { Link } from 'react-router-dom'; 

interface FAQItem {
    id: number;
    pergunta: string;
    resposta: string;
}

// Dados de FAQ
const faqData: FAQItem[] = [
    {
        id: 1,
        pergunta: "O que é o Score de Estabilidade de Renda e qual IA o calcula?",
        resposta: "O Score é a métrica principal do Gig-Trust. Ele é calculado por um modelo de **Inteligência Artificial (Regressão Linear)** que analisa seu histórico de ganhos, sazonalidade, reputação e frequência de trabalho. Este número resolve a dificuldade de comprovar renda para instituições financeiras, aluguel de imóveis ou acesso a crédito."
    },
    {
        id: 2,
        pergunta: "Como o Mapa de Competências é gerado e qual a IA envolvida?",
        resposta: "O Mapa é gerado por um segundo modelo de IA (**Agrupamento e Processamento de Linguagem Natural - NLP**). Ele analisa avaliações de clientes e padrões de trabalho para 'traduzir' experiências em habilidades transferíveis (ex: 'Gestão de Tempo', 'Logística'). É essencial para o Reskilling, pois revela as competências do trabalhador."
    },
    {
        id: 3,
        pergunta: "Quem pode avaliar um trabalhador Gig no sistema e qual é o fluxo?",
        resposta: "Qualquer usuário autenticado no sistema (outro trabalhador, gestor, ou cliente logado) pode avaliar. O avaliador precisa do ID Gig-Trust (CPF) do trabalhador. O sistema registra o CPF do avaliador, garantindo a rastreabilidade e a integridade da avaliação, que é essencial para o Score e o Mapa."
    },
    {
        id: 4,
        pergunta: "Onde o Passaporte de Carreira se encaixa no futuro do trabalho?",
        resposta: "A solução responde ao desafio global de requalificação (Reskilling) e estabilidade financeira. Ela oferece aos trabalhadores uma ferramenta para se adaptar às mudanças do mercado e comprovar seu valor e capacidade de gerar renda, superando a instabilidade da Gig Economy e facilitando a transição de carreira."
    },
    {
        id: 5,
        pergunta: "Quais são as tabelas mínimas do banco de dados (Oracle) para suportar a solução?",
        resposta: "O modelo de dados mínimo exige 4 tabelas. As principais entidades são: **TB_TRABALHADOR** (dados cadastrais), **TB_CONEXAO_PLATAFORMA** (para integrar com Uber/iFood), **TB_REGISTRO_GIG** (dados brutos de trabalho/avaliações) e **TB_SCORE_RENDA** (onde o resultado da IA é salvo e consultado)."
    },
    {
        id: 6,
        pergunta: "O Front-End (React) se comunica diretamente com o banco de dados?",
        resposta: "Não. O Front-End usa o **Domain Driven Design (DDD)** e se comunica via **API Restful (Java/Quarkus)**. O backend em Java é responsável por buscar os dados no banco (Oracle) e consultar os resultados do modelo de IA (Python), entregando ao React apenas o Score e o Mapa prontos para exibição."
    }
];

const Acordeao: React.FC<FAQItem> = ({ pergunta, resposta }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-700">
            <button className="flex justify-between items-center w-full py-4 text-left font-semibold text-lg hover:text-blue-400 transition duration-300" onClick={() => setIsOpen(!isOpen)}>
                {pergunta}
                {isOpen ? <ChevronUp size={24} className="text-blue-400" /> : <ChevronDown size={24} className="text-gray-400" />}
            </button>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${ isOpen ? 'max-h-96 opacity-100 py-3' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-300 pb-4 text-base">
                    {resposta}
                </p>
            </div>

        </div>
    );
};


const FAQ: React.FC = () => {
  return (
    <div className="bg-black text-white p-4 sm:p-10 md:p-16 min-h-screen">
      <div className="max-w-4xl mx-auto py-12">
        
        <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-white mb-3">
                Perguntas Frequentes (FAQ)
            </h1>
            <p className="text-xl text-gray-400">
                Tire suas dúvidas sobre o Score de Renda, o Mapa de Competências e o funcionamento do Gig-Trust.
            </p>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-6 shadow-2xl">
            {faqData.map((item) => (
                <Acordeao key={item.id} {...item} />
            ))}
        </div>
        
        <div className="text-center pt-12 border-t border-gray-800 mt-12">
            <h2 className="text-2xl font-bold text-white mb-3">
                Pronto para criar seu Passaporte de Carreira?
            </h2>

            <Link  to="/signup" className="inline-block px-8 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition duration-300 text-lg">
                Comece Agora
            </Link>
        </div>
      </div>
    </div>
  );
}

export default FAQ;