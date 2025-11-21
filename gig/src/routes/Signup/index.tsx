import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Calendar, Home as HomeIcon, Send, Loader2, ArrowLeft } from 'lucide-react'; 
import axios from 'axios';

import Logo from '../../../public/gig-trust-logo.png'; 

const API_BASE_URL = 'https://gig-java.onrender.com/usuario'; 

const maskCpf = (value: string) => value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2').substring(0, 14);
const maskDate = (value: string) => value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 10);

const Signup: React.FC = () => {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [dtNasc, setDtNasc] = useState('');
    const [endereco, setEndereco] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const cpfParaApi = cpf.replace(/[^0-9]/g, '');
        const dtNascParaApi = dtNasc; 

        if (cpfParaApi.length !== 11 || !nome || !email || !senha || !dtNascParaApi || !endereco) {
            setError('Todos os campos são obrigatórios e o CPF deve ter 11 dígitos.');
            setLoading(false);
            return;
        }
        
        try {
            const requestBody = {
                cpf_usuario: cpfParaApi,
                nome_usuario: nome,
                dt_nasc: dtNascParaApi.replace(/[^0-9]/g, ''), 
                end_usuario: endereco,
                mail_usuario: email,
                senha: senha,
            };

            const response = await axios.post(API_BASE_URL, requestBody);
            
            if (response.status === 201) {
                alert('Cadastro realizado com sucesso! Faça login.');
                navigate('/login'); 
            }
            
        } catch (err) {
            if (axios.isAxiosError(err) && err.response && err.response.status === 400) {
                setError('O usuário já existe ou dados estão inválidos (Erro 400).');
            } else {
                setError('Erro ao conectar com a API ou falha de rede.');
            }
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-xl shadow-2xl border border-blue-400/50 flex flex-col items-center">

        <div className="flex justify-between items-center w-full mb-6 relative">
            <Link to="/login" className="absolute -left-0 top-1/2 transform -translate-y-11 text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition shadow-lg">
                <ArrowLeft size={24} />
            </Link>

            <div className="flex flex-col items-center flex-grow">
                <img src={Logo} alt="GIG-TRUST Logo" className="h-70 w-auto mb-2" />
                <h2 className="text-3xl font-bold text-white">Cadastro</h2>
            </div>
        </div>
        
        {error && (<div className="text-red-400 text-sm text-center bg-red-900/50 p-2 rounded mb-4">{error}</div>)}
        {success && (<div className="text-green-400 p-3 bg-green-900/50 rounded-lg mb-4 text-center font-semibold">{success}</div>)}

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Nome Completo */}
          <div className="relative flex items-center">
            <User className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              required
              className="w-full pl-10 pr-3 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nome Completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          
          {/* CPF */}
          <div className="relative flex items-center">
            <User className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              required
              className="w-full pl-10 pr-3 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(maskCpf(e.target.value))}
              maxLength={14}
            />
          </div>

          {/* E-mail */}
          <div className="relative flex items-center">
            <Mail className="absolute left-3 text-gray-400" size={20} />
            <input
              type="email"
              required
              className="w-full pl-10 pr-3 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {/* Data de Nascimento */}
          <div className="relative flex items-center">
            <Calendar className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              required
              className="w-full pl-10 pr-3 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Data de Nasc. (DD/MM/AAAA)"
              value={dtNasc}
              onChange={(e) => setDtNasc(maskDate(e.target.value))}
              maxLength={10}
            />
          </div>

          {/* Endereço */}
          <div className="relative flex items-center">
            <HomeIcon className="absolute left-3 top-3 text-gray-400" size={20} />
            <textarea
              required
              className="w-full pl-10 pr-3 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-500 focus:outline-none min-h-[40px]"
              placeholder="Endereço (Rua, Número, Cidade)"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            ></textarea>
          </div>

          {/* Criar Senha */}
          <div className="relative flex items-center">
            <Lock className="absolute left-3 text-gray-400" size={20} />
            <input
              type="password"
              required
              className="w-full pl-10 pr-3 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Criar Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {/* Botão Cadastrar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-600 transition duration-200 shadow-lg mt-6 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Cadastrar'}
          </button>
        </form>

        <div className="text-sm mt-8">
          <span className="text-gray-300">Já tem uma conta? </span>
          <Link to="/login" className="text-blue-400 hover:underline">Fazer Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;