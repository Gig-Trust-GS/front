import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, EyeOff, Eye, ArrowLeft, Loader2 } from 'lucide-react'; 
import axios from 'axios'; 
import Logo from '../../../public/gig-trust-logo.png'; 

const API_BASE_URL = 'https://gig-java.onrender.com/usuario'; 

const maskCpf = (value: string) => {
  return value
    .replace(/\D/g, '') 
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .substring(0, 14); 
};

const Login: React.FC = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cpfParaApi = cpf.replace(/[^0-9]/g, '');

    if (cpfParaApi.length !== 11 || !senha) { 
        setError('O CPF deve ter 11 dígitos e a Senha deve ser preenchida.');
        setLoading(false);
        return;
    }

    try {
      const url = `${API_BASE_URL}/validar/${cpfParaApi}/${senha}`;
      const response = await axios.get(url);
      
      if (response.status === 200) {
        
        const userObject = response.data || {};
        const userCpf = userObject.cpf || userObject.cpf_usuario || cpfParaApi; 
        
        localStorage.setItem('user_data', JSON.stringify({
            ...userObject, 
            cpf: userCpf, 
            nome: userObject.nome_usuario || 'Usuário' 
        })); 
        
        navigate('/dashboard'); 
      }
      
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && (err.response.status === 404 || err.response.status === 400)) {
        setError('CPF ou Senha incorretos.');
      } else {
        setError('Erro de conexão com a API.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-xl shadow-2xl border border-blue-400/50 flex flex-col items-center">
        <div className="flex justify-between items-center w-full mb-7 relative">
            <Link to="/" className="absolute -left-0 top-1/2 transform -translate-y-11 text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition shadow-lg">
                <ArrowLeft size={24} />
            </Link>

            <div className="flex flex-col items-center flex-grow">
                <img src={Logo} alt="GIG-TRUST Logo" className="h-70 w-auto" />
                <h2 className="text-3xl font-bold text-white mt-3">Login</h2>
            </div>
        </div>

        <form className="w-full space-y-6" onSubmit={handleSubmit}> 
          
          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/50 p-2 rounded">
              {error}
            </div>
          )}

          {/* Input CPF */}
          <div className="relative flex items-center">
            <User className="absolute left-3 text-gray-400" size={20} />
            <input
              id="cpf" 
              type="text"
              required
              className="w-full pl-10 pr-3 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(maskCpf(e.target.value))} 
              maxLength={14}
            />
          </div>

          {/* Input Senha */}
          <div className="relative flex items-center">
            <Lock className="absolute left-3 text-gray-400" size={20} />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'} 
              required
              className="w-full pl-10 pr-10 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {showPassword ? (
              <Eye 
                className="absolute right-3 text-gray-400 cursor-pointer" 
                size={20} 
                onClick={() => setShowPassword(false)} 
              />
            ) : (
              <EyeOff 
                className="absolute right-3 text-gray-400 cursor-pointer" 
                size={20} 
                onClick={() => setShowPassword(true)} 
              />
            )}
          </div>

          {/* Lembrar de mim & Esqueceu a Senha? */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-blue-500 bg-gray-700 border-gray-600 rounded" />
              <span className="text-gray-300">Lembrar de mim</span>
            </label>
            <Link to="#" className="text-blue-400 hover:underline">Esqueceu a Senha?</Link>
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition duration-200 shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Entrar'}
          </button>
        </form>

        <div className="text-sm mt-8">
          <span className="text-gray-300">Não tem uma conta? </span>
          <Link to="/signup" className="text-blue-400 hover:underline">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;