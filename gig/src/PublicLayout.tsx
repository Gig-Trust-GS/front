import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LogIn, Menu, X, ArrowRight, User } from 'lucide-react';
import Logo from './assets/img/gig-trust-logo.png'; 

// Componente de Rodapé Público
const PublicFooter: React.FC = () => (
    <footer className="relative z-10 w-full py-6 text-center border-t border-gray-800 mt-12 bg-black"> 
        <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Gig-Trust. Solução desenvolvida para a Global Solution FIAP.
        </p>
    </footer>
);

// PublicHeader
const PublicHeader: React.FC<{ onToggleMenu: () => void, isMenuOpen: boolean }> = ({ onToggleMenu, isMenuOpen }) => {
    const location = useLocation(); 
    
    const getLinkClass = (path: string) => {
        const isActive = location.pathname === path;
        
        return `font-medium text-lg pb-1 transition duration-150 ${
            isActive 
            ? 'text-blue-400 border-b-2 border-blue-400' 
            : 'text-white hover:text-blue-400'
        }`;
    };

    return (
        <header className="sticky top-0 z-50 flex justify-between items-center py-6 px-4 md:px-16 bg-black border-b border-gray-800">
            <div className="flex items-center space-x-3">
                <Link to="/">
                    <img src={Logo} alt="Gig-Trust Logo" className="h-12 w-auto" /> 
                </Link>
                <span className="text-2xl font-bold text-white tracking-wider hidden sm:inline">Gig-Trust</span>
            </div>
            
            {/* Menu Desktop */}
            <nav className="hidden md:flex space-x-10">
                <Link to="/" className={getLinkClass('/')}>Home</Link>
                <Link to="/sobre" className={getLinkClass('/sobre')}>Sobre</Link>
                <Link to="/integrantes" className={getLinkClass('/integrantes')}>Integrantes</Link>
                <Link to="/faq" className={getLinkClass('/faq')}>FAQ</Link>
            </nav>
            
            <div className="flex items-center space-x-4 md:space-x-6">
                
                {/* Botão Hamburger */}
                <button 
                    onClick={onToggleMenu} 
                    className="p-2 md:hidden text-white hover:text-blue-400 transition"
                    aria-label="Abrir Menu"
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
                
                {/* Botão Entrar (Mantido para o Desktop) */}
                <Link 
                    to="/login" 
                    className="hidden md:flex items-center space-x-2 px-5 py-2 text-white border border-white rounded-full hover:bg-white hover:text-gray-900 transition duration-300"
                >
                    <LogIn size={20} />
                    <span>Entrar</span>
                </Link>
            </div>
        </header>
    );
};

// PublicLayout
const PublicLayout: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    React.useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };
    
    const getCreativeLinkClass = (path: string) => {
        const isActive = location.pathname === path;
        return `block text-xl font-semibold px-6 py-4 transition duration-200 
            ${
            isActive 
            ? 'text-green-400 border-l-4 border-green-400 bg-gray-800/50'
            : 'text-white hover:bg-gray-800 hover:text-blue-400'
        }`;
    };


    return (
        <div className="min-h-screen bg-black flex flex-col">
            <PublicHeader onToggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            
            {/* Menu Lateral Hamburger */}
            <nav 
                className={`fixed top-0 left-0 w-full h-full bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    
                    {/* Topo do Menu */}
                    <div className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700">
                        <div className="flex items-center space-x-2">
                            <img src={Logo} alt="Gig-Trust" className="h-8" />
                            <span className="text-xl font-bold text-white">Gig-Trust</span>
                        </div>
                        {/* Botão Fechar */}
                        <button onClick={toggleMenu} className="p-2 text-white hover:text-red-400">
                            <X size={28} />
                        </button>
                    </div>

                    {/* Links de Navegação */}
                    <div className="flex flex-col flex-grow overflow-y-auto pt-4">
                        <Link to="/" onClick={toggleMenu} className={getCreativeLinkClass('/')}>Home</Link>
                        <Link to="/sobre" onClick={toggleMenu} className={getCreativeLinkClass('/sobre')}>Sobre</Link>
                        <Link to="/integrantes" onClick={toggleMenu} className={getCreativeLinkClass('/integrantes')}>Integrantes</Link>
                        <Link to="/faq" onClick={toggleMenu} className={getCreativeLinkClass('/faq')}>FAQ</Link>
                    </div>
                    
                    {/* Botão de Ação */}
                    <div className="p-6 bg-gray-800 border-t border-gray-700">
                         <Link 
                            to="/login" 
                            onClick={toggleMenu}
                            className="w-full flex items-center justify-center space-x-2 py-3 text-lg font-bold bg-green-500 text-gray-900 rounded-full hover:bg-green-600 transition duration-300"
                        >
                            <span>Entrar na Plataforma</span>
                            <ArrowRight size={20} />
                        </Link>
                    </div>

                </div>
            </nav>


            <main className="flex-grow relative z-10">
                <Outlet />
            </main>
            <PublicFooter />
        </div>
    );
};

export default PublicLayout;