import React from 'react';
import { Briefcase, ArrowRight, BookOpen, Clock, Zap } from 'lucide-react';

const mockHighSkills = [
    { name: "Logística de Última Milha", level: 92, target: "Gestão de Frota" },
    { name: "Atendimento ao Cliente", level: 85, target: "Vendas B2B" },
    { name: "Gestão de Tempo", level: 70, target: "Assistente Virtual" },
];
interface Sugestao {
    id: number;
    area: string;
    titulo: string;
    descricao: string;
    link: string;
    icon: React.ReactNode;
}

const sugestoes: Sugestao[] = [
    {
        id: 1,
        area: "Logística (Recomendado)",
        titulo: "Curso de Otimização e Gestão de Rotas",
        descricao: "Aproveite sua alta performance em entregas para migrar para a gestão de cadeias de suprimentos e frotas.",
        link: "https://www.coursera.org/course/logistics-management",
        icon: <Briefcase size={20} className="text-blue-400" />,
    },
    {
        id: 2,
        area: "Atendimento (Upskilling)",
        titulo: "Certificação em Customer Success",
        descricao: "Use sua habilidade em comunicação para funções de Sucesso do Cliente, retendo clientes de longo prazo.",
        link: "https://www.linkedin.com/learning/customer-success-certification",
        icon: <BookOpen size={20} className="text-green-400" />,
    },
    {
        id: 3,
        area: "Gestão (Nova Carreira)",
        titulo: "Trilha para Assistente Virtual / Freelancer",
        descricao: "Sua alta gestão de tempo pode ser monetizada em serviços administrativos remotos para empresas.",
        link: "https://www.upwork.com/hire/virtual-assistants/",
        icon: <Clock size={20} className="text-yellow-400" />,
    },
];

const Reskilling: React.FC = () => {
    const userSkills = mockHighSkills;

    return (
        <div className="bg-black min-h-full text-white p-4 md:p-10">
            <div className="max-w-7xl mx-auto">

                <div className="mb-10 border-b border-gray-800 pb-4">
                    <h1 className="text-4xl font-extrabold flex items-center space-x-3 mb-2">
                        <Zap size={32} className="text-green-400" />
                        <span>Seu Plano de <span className="text-blue-400">Reskilling</span></span>
                    </h1>
                    <p className="text-lg text-gray-400">
                        Aproveite as habilidades que a IA mapeou em você para construir sua próxima carreira.
                    </p>
                </div>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-gray-300">
                        Suas Habilidades em Destaque
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {userSkills.map((skill, index) => (
                            <div key={index} className="p-5 bg-gray-900 rounded-xl shadow-lg border border-yellow-400/50">
                                <p className="text-xl font-bold text-yellow-400">{skill.name}</p>
                                <p className="text-sm text-gray-400 mt-1">Nível: {skill.level}%</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Sugestão de Carreira: <span className="text-white font-semibold">{skill.target}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-gray-300">
                        Próximos Passos Recomendados
                    </h2>
                    <div className="space-y-4">
                        {sugestoes.map((sugestao) => (
                            <div key={sugestao.id} className="flex items-center justify-between p-5 bg-gray-900 rounded-xl border border-gray-700 hover:border-blue-400 transition duration-300">
                                <div className="flex items-start space-x-4">
                                    {sugestao.icon}
                                    <div>
                                        <p className="font-bold text-xl">{sugestao.titulo}</p>
                                        <p className="text-sm text-gray-400">{sugestao.descricao}</p>
                                        <span className={`text-xs font-semibold mt-1 inline-block px-2 py-0.5 rounded-full ${sugestao.area.includes('Recomendado') ? 'bg-green-600/50 text-green-300' : 'bg-gray-700 text-gray-300'}`}>
                                            {sugestao.area}
                                        </span>
                                    </div>
                                </div>

                                <a href={sugestao.link} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-400 hover:text-white transition">
                                    <span>Ver Detalhes</span>
                                    <ArrowRight size={20} />
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Reskilling;