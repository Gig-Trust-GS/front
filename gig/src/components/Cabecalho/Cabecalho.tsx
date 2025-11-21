import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Zap, User } from 'lucide-react';
import Logo from '../../../public/gig-trust-logo.png';

type CabecalhoProps = {
  onToggleMenu: () => void;
  isMenuOpen: boolean;
};

const Cabecalho: React.FC<CabecalhoProps> = ({ onToggleMenu, isMenuOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user_data');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-xl border-b border-gray-800">
      <nav className="flex justify-between items-center max-w-7xl mx-auto p-4">

        {/* Logo/Título */}
        <Link to="/dashboard" className="flex items-center space-x-2 text-2xl font-extrabold tracking-wider transition hover:text-blue-400">
          <img src={Logo} alt="Gig-Trust" className="h-9 inline" />
          <span className="hidden sm:inline">Gig-Trust</span>
        </Link>

        {/* Exemplo de botão para abrir/fechar o menu mobile */}
        <button
          className="md:hidden px-3 py-2 border rounded"
          onClick={onToggleMenu}
        >
          {isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        </button>

        {/* Menu de Navegação Logada (Desktop) */}
        <div className="space-x-8 flex items-center">

          <Link to="/dashboard" className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition font-medium">
            <LayoutDashboard size={20} />
            <span className="hidden md:inline">Dashboard</span>
          </Link>

          <Link to="/conexoes" className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition font-medium">
            <Zap size={20} />
            <span className="hidden md:inline">Conexões</span>
          </Link>

          <Link to="/perfil" className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition font-medium">
            <User size={20} />
            <span className="hidden md:inline">Perfil</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold transition hover:bg-red-700"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Cabecalho;
