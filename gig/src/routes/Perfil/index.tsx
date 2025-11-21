import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Calendar, Home as HomeIcon, Save, Loader2, ArrowRight } from 'lucide-react';

const API_BASE_URL = 'https://gig-java.onrender.com/usuario'; 

interface UserProfile {
    cpf_usuario: string;
    nome_usuario: string;
    mail_usuario: string;
    dt_nasc: string;
    end_usuario: string;
    senha?: string; 
}

const maskCpf = (value: string) => value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2').substring(0, 14);
const maskDate = (value: string) => value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 10);

const mockUserProfileBase: UserProfile = {
    cpf_usuario: "", 
    nome_usuario: "Usuário Mockado",
    mail_usuario: "usuario.mock@teste.com",
    dt_nasc: "15/02/1995", 
    end_usuario: "Rua do Teste, 123 - São Paulo",
};


const Perfil: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    const cpfLogado = userData.cpf; 
    const nomeLogado = userData.nome;

    useEffect(() => {
        if (!cpfLogado) {
            navigate('/login');
            return;
        }

        const fetchUser = () => {
            console.log("BYPASS UNIVERSAL ATIVADO: Perfil carregado com dados mock.");
        
            const currentUserProfile: UserProfile = {
                ...mockUserProfileBase,
                cpf_usuario: cpfLogado,
                nome_usuario: nomeLogado || mockUserProfileBase.nome_usuario,
                mail_usuario: `${cpfLogado}@gigtrust.com.br`, 
            };

            setUser(currentUserProfile);
            setLoading(false);
            return;
        };

        fetchUser();
    }, [cpfLogado, navigate, nomeLogado]); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        setLoading(true);

        if (!user) {
            setError('Dados do usuário não carregados.');
            setLoading(false);
            return;
        }

        const convertToBackendDateFormat = (dateString: string): string => {
            const cleanDate = dateString.replace(/\D/g, '');
            if (cleanDate.length === 8) {
                const day = cleanDate.substring(0, 2);
                const month = cleanDate.substring(2, 4);
                const year = cleanDate.substring(4, 8);
                return `${year}-${month}-${day}`; 
            }
            return dateString;
        };

        const cpfClean = user.cpf_usuario.replace(/[^0-9]/g, '');
        const dtNascBackendFormat = convertToBackendDateFormat(user.dt_nasc); 
        
        const requestBody = {
            cpf_usuario: cpfClean, 
            nome_usuario: user.nome_usuario,
            mail_usuario: user.mail_usuario,
            dt_nasc: dtNascBackendFormat, 
            end_usuario: user.end_usuario,
            ...(senha.length > 0 && { senha: senha }) 
        };

        try {
            const response = await fetch(API_BASE_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            
            if (response.status === 202) {
                setSuccess('Perfil atualizado com sucesso!');
                setSenha(''); 
            } else {
                 setError(`Falha ao editar o perfil. Erro: ${response.status} ${response.statusText}`);
            }

        } catch (err) {
            setError(`Falha ao editar o perfil. Erro de Rede.`);
            console.error("Erro na edição do perfil:", err);
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) {
        return (
            <div className="min-h-[80vh] flex justify-center items-center bg-black">
                <Loader2 className="text-blue-400 animate-spin" size={40} />
                <p className="text-white text-xl ml-4">Carregando perfil...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[80vh] flex justify-center items-center bg-black">
                <p className="text-red-500 text-xl">Erro ao carregar o perfil: {error}</p>
                <Link to="/dashboard" className="mt-4 text-blue-400 hover:underline">Ir para Dashboard</Link>
            </div>
        );
    }
    
    if (!user) return null; 

    return (
        <div className="bg-black min-h-full text-white p-4 md:p-10">
            <div className="max-w-xl mx-auto">

                <h1 className="text-4xl font-extrabold mb-8 flex items-center space-x-3">
                    <User size={36} className="text-green-400" />
                    <span>Meu <span className="text-blue-400">Perfil</span></span>
                </h1>
                
                {success && (<div className="text-green-400 p-3 bg-green-900/50 rounded-lg mb-4 text-center font-semibold">{success}</div>)}
                {error && (<div className="text-red-400 p-3 bg-red-900/50 rounded-lg mb-4 text-center">{error}</div>)}

                <div className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">CPF (ID Gig-Trust)</label>
                            <input type="text" value={maskCpf(user.cpf_usuario)} disabled className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-yellow-400/50 text-yellow-400 font-bold cursor-not-allowed"/>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Nome Completo</label>
                            <input type="text" value={user.nome_usuario} onChange={(e) => setUser({ ...user, nome_usuario: e.target.value })} className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500" required/>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">E-mail</label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-3 text-gray-500" size={20} />
                                <input type="email" value={user.mail_usuario} onChange={(e) => setUser({ ...user, mail_usuario: e.target.value })} className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Data de Nascimento</label>
                                <div className="relative flex items-center">
                                    <Calendar className="absolute left-3 text-gray-500" size={20} />
                                    <input
                                        type="text"
                                        value={maskDate(user.dt_nasc)} 
                                        onChange={(e) => setUser({ ...user, dt_nasc: maskDate(e.target.value) })}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="DD/MM/AAAA"
                                        maxLength={10}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Nova Senha (Opcional)</label>
                                <div className="relative flex items-center">
                                    <Lock className="absolute left-3 text-gray-500" size={20} />
                                    <input
                                        type="password"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Deixe vazio para manter a senha"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Endereço</label>
                            <div className="relative flex items-center">
                                <HomeIcon className="absolute left-3 top-3 text-gray-500" size={20} />
                                <textarea
                                    value={user.end_usuario}
                                    onChange={(e) => setUser({ ...user, end_usuario: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
                        >
                            <Save size={20} />
                            <span>{loading ? 'Salvando...' : 'Salvar Alterações'}</span>
                        </button>

                        <Link to="/dashboard" className="text-sm text-center block text-gray-400 hover:text-blue-400 transition duration-150">
                            <ArrowRight size={16} className="inline mr-2" />
                            Voltar para o Dashboard
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Perfil;