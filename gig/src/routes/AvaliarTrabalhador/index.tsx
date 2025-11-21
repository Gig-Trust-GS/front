import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { Star, MessageSquare, Send, Loader2, Search, Zap } from 'lucide-react';

const API_BASE_URL = 'https://gig-java.onrender.com/avaliacao';

interface TrabalhadorMock { cpf: string; nome: string; plataforma: string; }
const trabalhadoresMock: TrabalhadorMock[] = [
    { cpf: "12345678911", nome: "João Silva (Logística)", plataforma: "Uber" },
    { cpf: "98765432100", nome: "Maria Souza (Atendimento)", plataforma: "iFood" },
    { cpf: "55566677788", nome: "Pedro Rocha (Freelancer)", plataforma: "GetNinjas" },
    { cpf: "11122233344", nome: "Ana Santos (Entregas)", plataforma: "Rappi" },
    { cpf: "99988877766", nome: "Carlos Lima (Motorista)", plataforma: "99" },
    { cpf: "44455566677", nome: "Lucia Mendes (Babá)", plataforma: "GetNinjas" },
    { cpf: "22334455667", nome: "Marcos Freitas (Consultor)", plataforma: "Bicos Já" },
    { cpf: "77889900112", nome: "Rafaela Costa (Designer)", plataforma: "Workana" },
];

const maskCpf = (value: string) => value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2').substring(0, 14);

const AvaliarTrabalhador: React.FC = () => {
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    const cpfAvaliador = userData.cpf || '';
    const cpfAvaliadorDisplay = maskCpf(cpfAvaliador);

    const [cpfAvaliado, setCpfAvaliado] = useState('');
    const [nota, setNota] = useState(5);
    const [comentario, setComentario] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    //const navigate = useNavigate();

    const filteredTrabalhadores = trabalhadoresMock.filter(worker =>
        worker.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.cpf.includes(searchTerm.replace(/\D/g, ''))
    );

    const handleSelectWorker = (cpf: string) => {
        setCpfAvaliado(maskCpf(cpf));
        setSearchTerm('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const cpfAvaliadoApi = cpfAvaliado.replace(/[^0-9]/g, '');
        const cpfAvaliadorApi = cpfAvaliador.replace(/[^0-9]/g, '');

        if (cpfAvaliadorApi === cpfAvaliadoApi) {
            setError('Você não pode avaliar a si mesmo.');
            setLoading(false);
            return;
        }

        if (!cpfAvaliadoApi || !comentario || nota < 1 || !cpfAvaliadorApi) {
            setError('Preencha todos os campos e garanta que o CPF do avaliador foi carregado.');
            setLoading(false);
            return;
        }

        try {
            const requestBody = {
                com_avaliacao: comentario,
                nota: nota,
                avaliador: { cpf_usuario: cpfAvaliadorApi },
                avaliado: { cpf_usuario: cpfAvaliadoApi }
            };

            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.status === 201) {
                setSuccess('Avaliação enviada com sucesso!');
                setCpfAvaliado('');
                setComentario('');
            } else {
                 setError(`Erro ${response.status}: Verifique se o CPF do Trabalhador Gig existe no banco.`);
            }

        } catch (err) {
            setError('Erro de rede.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black min-h-full text-white p-4 md:p-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-8">
                    Avaliar <span className="text-blue-400">Trabalhador Gig</span>
                </h1>

                <div className="bg-blue-900/40 p-4 rounded-lg mb-6 border border-yellow-400/50">
                    <p className="text-sm text-gray-300">
                        Você está avaliando como: <span className="font-semibold text-white">{cpfAvaliadorDisplay || "CPF NÃO ENCONTRADO"}</span>
                    </p>
                </div>

                {success && (<div className="text-green-400 p-3 bg-green-900/50 rounded-lg mb-4 text-center font-semibold">{success}</div>)}
                {error && (<div className="text-red-400 p-3 bg-red-900/50 rounded-lg mb-4 text-center">{error}</div>)}

                <div className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <h2 className="text-xl font-bold text-gray-200 border-b border-gray-700 pb-2">1. Selecione ou Digite o Avaliado</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Pesquisar por Nome ou CPF:
                            </label>
                            <div className="relative flex items-center">
                                <Search className="absolute left-3 text-gray-500" size={20} />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ex: Maria, João, ou CPF..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                CPF do Avaliado (Selecionado):
                            </label>
                            <input
                                type="text"
                                value={cpfAvaliado}
                                onChange={(e) => setCpfAvaliado(maskCpf(e.target.value))}
                                className="w-full pl-3 pr-3 py-2 bg-gray-800 rounded-lg border border-yellow-400/50 text-white font-semibold"
                                placeholder="CPF aparecerá aqui após a seleção ou digitação"
                                maxLength={14}
                                required
                            />
                        </div>

                        <div className="pt-4 border-t border-gray-700">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Lista de Trabalhadores ({filteredTrabalhadores.length})
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-2">
                                {filteredTrabalhadores.length === 0 ? (
                                    <p className="text-gray-500 col-span-3">Nenhum trabalhador encontrado.</p>
                                ) : (
                                    filteredTrabalhadores.map(worker => (
                                        <div
                                            key={worker.cpf}
                                            onClick={() => handleSelectWorker(worker.cpf)}
                                            className={`p-3 rounded-lg border cursor-pointer transition duration-200 
                                                        ${cpfAvaliado.replace(/\D/g, '') === worker.cpf ? 'bg-blue-600 border-blue-400 shadow-lg' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
                                        >
                                            <Zap size={16} className="text-yellow-400 mb-1" />
                                            <p className="text-sm font-semibold">{worker.nome}</p>
                                            <p className="text-xs text-gray-400">Plat.: {worker.plataforma}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-gray-200 border-b border-gray-700 pb-2 pt-4">2. Detalhes da Avaliação</h2>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <label className="block text-sm font-medium text-gray-300 mb-1">Nota (1 a 5)</label>
                                <div className="relative flex items-center">
                                    <Star className="absolute left-3 text-yellow-500" size={20} />
                                    <select
                                        value={nota}
                                        onChange={(e) => setNota(parseInt(e.target.value))}
                                        className="w-full pl-10 pr-3 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                    >
                                        <option value={5}>5 Estrelas</option>
                                        <option value={4}>4 Estrelas</option>
                                        <option value={3}>3 Estrelas</option>
                                        <option value={2}>2 Estrelas</option>
                                        <option value={1}>1 Estrela</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-2/3">
                                <label className="block text-sm font-medium text-gray-300 mb-1">Comentário</label>
                                <div className="relative flex items-center">
                                    <MessageSquare className="absolute left-3 top-3 text-gray-500" size={20} />
                                    <textarea
                                        value={comentario}
                                        onChange={(e) => setComentario(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500 min-h-20"
                                        placeholder="Detalhes sobre a performance..."
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-600 transition disabled:opacity-50 flex items-center justify-center space-x-2"
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                            <span>{loading ? 'Enviando...' : 'Enviar Avaliação'}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AvaliarTrabalhador;