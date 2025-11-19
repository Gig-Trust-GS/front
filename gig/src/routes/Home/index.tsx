import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, GraduationCap } from 'lucide-react';
import { Star } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="relative bg-black text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: 'url(../../assets/img/abstract-tech-pattern.png)' }} />

            {/* Seção Principal */}
            <main className="relative z-10 py-16 px-4 md:px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between">
                    <div className="w-full lg:w-3/5 space-y-8 text-center lg:text-left mb-16 lg:mb-0 pt-10">
                        <p className="text-xl text-green-400 font-semibold uppercase tracking-widest">
                            O Futuro do Trabalho Já Começou.
                        </p>

                        <h1 className="text-7xl font-extrabold leading-none tracking-tighter">
                            Seu Passaporte de Carreira na <span className="text-blue-400"> Gig Economy</span>.
                        </h1>
                        <p className="text-2xl text-gray-300 max-w-xl mx-auto lg:mx-0">
                            O Gig-Trust transforma seus dados de performance em Score de Estabilidade de Renda (para crédito) e seu Mapa de Competências (para Reskilling). Seja o dono da sua reputação.
                        </p>

                        {/* Botão de Ação Principal */}
                        <div className="pt-4">
                            <Link to="/signup" className="flex items-center space-x-2 px-6 py-3 text-lg font-bold bg-white text-black rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-200 transition duration-300 transform hover:scale-105">
                                Criar Meu Passaporte <ArrowRight size={20} />
                            </Link>
                        </div>

                        {/* Cards de Destaque */}
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 pt-12">
                            <div className="p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl flex items-start space-x-4 w-full">
                                <Zap className="text-yellow-400 mt-1" size={32} />
                                <div>
                                    <p className="text-lg font-bold tracking-wide">
                                        Score de Renda
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Transforme renda volátil em crédito bancário e acesso à moradia.
                                    </p>
                                </div>
                            </div>
                            <div className="p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl flex items-start space-x-4 w-full">
                                <GraduationCap className="text-blue-400 mt-1" size={32} />
                                <div>
                                    <p className="text-lg font-bold tracking-wide">
                                        Mapa de Competências
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Identifique habilidades ocultas (logística, atendimento) para Requalificação (Reskilling).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/5 flex justify-center lg:justify-end py-10">
                        <div className="relative w-full max-w-sm h-96 p-8 flex flex-col justify-between items-center">

                            <div className="absolute inset-0 bg-gray-900/50 rounded-2xl border border-blue-400/30 backdrop-blur-md shadow-2xl animate-pulse-slow"></div>
                            <h3 className="relative z-10 text-xl font-bold text-green-400 mt-4">
                                PASSAPORTE DE DADOS
                            </h3>

                            {/* Score Card Flutuante */}
                            <div className="relative z-10 p-4 bg-white/10 rounded-lg shadow-xl border border-yellow-400/50 w-full text-center mt-6">
                                <Star size={24} className="text-yellow-400 mx-auto mb-1" />
                                <p className="text-sm text-gray-300">
                                    SCORE ATUAL
                                </p>
                                <p className="text-5xl font-extrabold text-white">
                                    85
                                </p>
                            </div>

                            {/* Mapa Conceitual */}
                            <div className="relative z-10 p-4 mt-auto mb-4 bg-gray-900/80 rounded-lg border border-blue-400/50 w-full">
                                <div className="flex items-center space-x-2 mb-2 justify-center">
                                    <GraduationCap size={20} className="text-blue-400" />
                                    <p className="text-sm font-semibold text-gray-300">
                                        MAPA DE COMPETÊNCIAS
                                    </p>
                                </div>
                                <div className="text-xs text-gray-400 flex flex-wrap justify-center gap-2">
                                    <span className="bg-blue-600/50 px-2 py-1 rounded">Logística</span>
                                    <span className="bg-blue-600/50 px-2 py-1 rounded">Atendimento</span>
                                    <span className="bg-green-600/50 px-2 py-1 rounded">Gestão Tempo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;