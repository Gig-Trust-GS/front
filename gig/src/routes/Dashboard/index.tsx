import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Award, Zap, TrendingUp, DollarSign, Target, Briefcase, Star, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'https://gig-java.onrender.com/trabalhador';

interface Competencia { nome: string; nivel: number; descricao: string; }
interface DashboardData {
    nomeUsuario: string;
    scoreEstabilidade: number;
    previsaoRenda3Meses: number;
    competencias: Competencia[];
    ultimaAtualizacao: string;
}

const fetchDashboardData = async (userId: string): Promise<DashboardData> => {
    if (userId) {
        const userName = localStorage.getItem('user_data') ? JSON.parse(localStorage.getItem('user_data')!).nome || 'Usuário Logado' : 'Usuário Logado';

        return {
            nomeUsuario: userName,
            scoreEstabilidade: 85,
            previsaoRenda3Meses: 7850.50,
            competencias: [
                { nome: 'Logística de Última Milha', nivel: 92, descricao: 'Otimização de rotas e entregas rápidas.' },
                { nome: 'Atendimento ao Cliente', nivel: 85, descricao: 'Alta satisfação e resolução rápida de problemas.' },
                { nome: 'Gestão de Tempo', nivel: 70, descricao: 'Eficiência no cumprimento de prazos.' },
                { nome: 'Comunicação Interpessoal', nivel: 65, descricao: 'Habilidade de se comunicar com clareza com clientes e equipes.' },
            ],
            ultimaAtualizacao: '18/11/2025',
        };
    }
    throw new Error("Falha ao carregar dados do Dashboard.");
};


const Dashboard: React.FC = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user_data');
        if (!userData) { navigate('/login'); return; }

        let userCpf: string = '';
        try {
            const parsedData = JSON.parse(userData);
            userCpf = parsedData.cpf;
        } catch (e) {
            setError('Falha ao obter ID do usuário logado. Refaça o login.');
            setLoading(false);
            return;
        }

        fetchDashboardData(userCpf)
            .then(data => setData(data))
            .catch(err => console.error("Erro no fetch da API:", err))
            .finally(() => setLoading(false));

    }, [navigate]);

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-400 border-green-400';
        if (score >= 60) return 'text-yellow-400 border-yellow-400';
        return 'text-red-400 border-red-400';
    };

    const formatCpfDisplay = (cpf: string | undefined) => {
        if (!cpf || typeof cpf !== 'string') return 'CPF não encontrado';
        const digits = cpf.replace(/\D/g, '');
        if (digits.length === 11) {
            return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        }
        return 'CPF inválido';
    };

    const CompetenciaCard: React.FC<{ competencia: Competencia }> = ({ competencia }) => {
        const getLevelColor = (nivel: number) => {
            if (nivel >= 80) return 'bg-green-500';
            if (nivel >= 60) return 'bg-yellow-500';
            return 'bg-red-500';
        };

        return (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-400 transition duration-300">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
                    <Star size={18} className="text-yellow-400" />
                    <span>{competencia.nome}</span>
                </h3>
                <p className="text-sm text-gray-400 mb-3">{competencia.descricao}</p>

                <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${getLevelColor(competencia.nivel)}`} style={{ width: `${competencia.nivel}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Nível: {competencia.nivel}%</p>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex justify-center items-center bg-black">
                <Loader2 className="text-blue-400 animate-spin" size={40} />
                <p className="text-white text-xl ml-4">Carregando Passaporte de Carreira...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[80vh] flex justify-center items-center bg-black">
                <p className="text-red-500 text-xl">Erro ao carregar dados: {error}</p>
            </div>
        );
    }

    if (!data) return null;

    const userCpfRaw = localStorage.getItem('user_data') ? JSON.parse(localStorage.getItem('user_data')!).cpf : undefined;
    const userCpfDisplay = formatCpfDisplay(userCpfRaw);


    return (
        <div className="bg-black min-h-full text-white p-4 md:p-10">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-extrabold mb-8">
                    Dashboard, <span className="text-blue-400">{data.nomeUsuario}</span>
                </h1>

                <div className="bg-blue-900/40 p-4 rounded-lg mb-8 border border-blue-600 flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base space-y-2 sm:space-y-0">
                    <p className="text-sm text-gray-200">
                        Seu **ID Gig-Trust** (a ser compartilhado para avaliações) é: <span className="text-yellow-300 font-extrabold ml-2">{userCpfDisplay}</span>
                    </p>
                    <Link to="/avaliar-trabalhador" className="text-xs sm:text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition">
                        Avaliar Outro
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-8">


                        <div className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold flex items-center space-x-2">
                                    <Award className="text-yellow-400" size={24} />
                                    <span>Score de Estabilidade de Renda</span>
                                </h2>
                                <p className="text-sm text-gray-400">Última atualização: {data.ultimaAtualizacao}</p>
                            </div>

                            <div className="flex flex-col md:flex-row items-center md:space-x-12 space-y-6 md:space-y-0 text-center md:text-left">

                                <div className={`w-32 h-32 flex items-center justify-center rounded-full border-4 ${getScoreColor(data.scoreEstabilidade)}`}>
                                    <span className="text-4xl font-extrabold">{data.scoreEstabilidade}</span>
                                </div>

                                <div>
                                    <div className="flex items-center justify-center md:justify-start space-x-2 text-green-400 mb-2">
                                        <TrendingUp size={24} />
                                        <h3 className="text-lg sm:text-xl font-semibold">Previsão Média de Renda (3 Meses)</h3>
                                    </div>
                                    <p className="text-4xl sm:text-5xl font-extrabold"> {/* Reduzindo fonte para mobile */}
                                        {data.previsaoRenda3Meses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </p>
                                    <p className="text-gray-400 mt-1 text-sm">Confiabilidade para Bancos e Imobiliárias.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800 min-h-[200px]">
                            <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center space-x-2">
                                <Target className="text-blue-400" size={24} />
                                <span>Mapa de Competências Ocultas</span>
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {data.competencias.map((comp) => (
                                    <CompetenciaCard key={comp.nome} competencia={comp} />
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                Estas competências são identificadas por IA via agrupamento e análise de texto (NLP) em suas avaliações.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-8">

                        <div className="bg-gray-900 p-6 rounded-xl shadow-xl border border-green-400/50">
                            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center space-x-2">
                                <Briefcase size={20} />
                                <span>Próximos Passos (Reskilling)</span>
                            </h3>
                            <p className="text-gray-300 mb-4">
                                Baseado no seu Mapa (Alta pontuação em Logística), a IA sugere:
                            </p>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="hover:text-white cursor-pointer transition border-b border-gray-800 pb-1">
                                    → Curso: Gestão de Frota e Otimização de Rotas.
                                </li>
                                <li className="hover:text-white cursor-pointer transition border-b border-gray-800 pb-1">
                                    → Vaga: Analista de Logística Júnior (Empresa X).
                                </li>
                                <li className="hover:text-white cursor-pointer transition">
                                    <Link to="/reskilling" className="text-blue-400 hover:underline">Ver todas as sugestões</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-700">
                            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                                <DollarSign size={20} className="text-gray-400" />
                                <span>Conexões Ativas</span>
                            </h3>
                            <p className="text-gray-400 mb-4">
                                Mantenha seus dados atualizados para um Score preciso.
                            </p>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-yellow-400">3/5 Plataformas Conectadas</span>
                                <Link to="/conexoes" className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                                    Gerenciar Conexões
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;