import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, Link as LinkIcon, Zap, Loader2, XCircle } from 'lucide-react';
import axios from 'axios'; 

const API_BASE_URL = 'https://gig-java.onrender.com/trabalhador'; 

interface Conexao {
    id: number;
    plataforma: string;
    status: 'Ativa' | 'Inativa';
    icone: React.ReactNode; 
    dataConexao: string;
}

const mockConexoes: Conexao[] = [
    { id: 1, plataforma: "Uber/Uber Eats", status: 'Ativa', icone: <Zap size={20} className="text-yellow-400" />, dataConexao: "15/10/2024" },
    { id: 2, plataforma: "iFood", status: 'Ativa', icone: <Zap size={20} className="text-yellow-400" />, dataConexao: "01/11/2024" },
    { id: 3, plataforma: "GetNinjas (Freelancer)", status: 'Inativa', icone: <Zap size={20} className="text-gray-500" />, dataConexao: "N/A" },
    { id: 4, plataforma: "Workana", status: 'Ativa', icone: <Zap size={20} className="text-yellow-400" />, dataConexao: "01/01/2024" },
];

const Conexoes: React.FC = () => {
    const [conexoes, setConexoes] = useState<Conexao[]>(mockConexoes); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [plataformaNova, setPlataformaNova] = useState('');

    const navigate = useNavigate();
    const userId = "mock-user-id";

    const handleAddConexao = (e: React.FormEvent) => {
        e.preventDefault();
        if (!plataformaNova.trim()) return;

        setLoading(true);
        setError(null);
        
        setTimeout(() => {
            try {
                const novaConexao: Conexao = {
                    id: Date.now(), 
                    plataforma: plataformaNova.trim(),
                    status: 'Ativa',
                    icone: <Zap size={20} className="text-green-400" />,
                    dataConexao: new Date().toLocaleDateString('pt-BR'),
                };
                
                setConexoes(prev => [...prev, novaConexao]);
                setPlataformaNova('');
                setIsModalOpen(false);
                alert(`Plataforma ${plataformaNova} conectada com sucesso!`);
            } catch (err) {
                setError("Falha ao conectar. Tente novamente.");
            } finally {
                setLoading(false);
            }
        }, 1000);
    };

    const handleDeleteConexao = (id: number) => {
        if (!window.confirm("Tem certeza que deseja desativar esta conexão?")) return;
        
        setLoading(true);
        setTimeout(() => {
            setConexoes(prev => prev.filter(c => c.id !== id));
            setLoading(false);
        }, 500);
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex justify-center items-center bg-black">
                <Loader2 className="text-blue-400 animate-spin" size={40} />
                <p className="text-white text-xl ml-4">Carregando conexões...</p>
            </div>
        );
    }
    
    return (
        <div className="bg-black min-h-full text-white p-4 md:p-10">
            <div className="max-w-4xl mx-auto">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-800 pb-4">
                    <h1 className="text-3xl sm:text-4xl font-extrabold flex items-center space-x-3 mb-4 sm:mb-0">
                        <LinkIcon size={32} className="text-blue-400" />
                        <span>Gerenciar <span className="text-green-400">Conexões</span></span>
                    </h1>
                    
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-50 text-sm"
                        disabled={loading}>
                        <PlusCircle size={20} />
                        <span>Adicionar Plataforma</span>
                    </button>
                </div>

                {error && (
                    <div className="text-red-400 p-3 bg-red-900/50 rounded-lg mb-4">{error}</div>
                )}

                <div className="bg-gray-900 rounded-xl shadow-2xl p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-300">Plataformas Conectadas ({conexoes.length})</h2>
                    
                    <div className="space-y-4">
                        {conexoes.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">Nenhuma conexão ativa. Adicione uma para começar a calcular seu Score.</p>
                        ) : (
                            conexoes.map((conexao) => (
                                <div key={conexao.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-800 rounded-xl shadow-md border transition duration-300 hover:border-green-400/50" >
                                    <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                                        {conexao.icone}
                                        <div>
                                            <p className="font-bold text-white text-lg">{conexao.plataforma}</p>
                                            <p className={`text-sm font-medium ${conexao.status === 'Ativa' ? 'text-green-400' : 'text-red-400'}`}>
                                                Status: {conexao.status}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                                        <p className="text-xs sm:text-sm text-gray-500">Conectado em: {conexao.dataConexao}</p>

                                        <button 
                                            onClick={() => handleDeleteConexao(conexao.id)}
                                            className="p-2 text-red-500 hover:text-red-400 transition bg-red-500/10 rounded-full"
                                            title="Desativar Conexão"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 p-8 rounded-xl w-full max-w-sm shadow-2xl border border-blue-400/50">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-3">
                            <h3 className="text-2xl font-bold text-white">Conectar Plataforma</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition">
                                <XCircle size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleAddConexao} className="space-y-4">
                            <p className="text-sm text-gray-400">Simulação: Digite o nome da plataforma e clique em conectar.</p>
                            <input 
                                type="text"
                                value={plataformaNova}
                                onChange={(e) => setPlataformaNova(e.target.value)}
                                placeholder="Ex: Rappi, GetNinjas, etc."
                                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 border-none"
                                required
                            />
                            
                            <button type="submit" className="w-full py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition disabled:opacity-50" disabled={loading}>
                                {loading ? 'Conectando...' : 'Conectar Agora'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Conexoes;