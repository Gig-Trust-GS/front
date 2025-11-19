import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Cabecalho from './components/Cabecalho/Cabecalho';
import Rodape from './components/Rodape/Rodape';
import { LayoutDashboard, Zap, User, Briefcase, ChevronRight } from 'lucide-react';

const AppLayout: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    React.useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const getLinkClassMobile = (path: string) => {
        const isActive = location.pathname === path;
        return `flex items-center justify-between px-6 py-4 text-white font-medium hover:bg-gray-800 transition ${isActive ? 'bg-gray-800 text-green-400 border-l-4 border-green-400' : 'text-gray-300'
            }`;
    };

    return (

        <div className="flex flex-col min-h-screen bg-black">
            {/* O Cabecalho recebe a função de toggle para controlar o menu a partir do ícone Hamburger. */}
            <Cabecalho onToggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

            {/* Menu Lateral Hamburger (Mobile - Logado) */}
            <nav
                className={`fixed top-[70px] left-0 w-full h-full bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Conteúdo do Menu Mobile... */}
            </nav>


            {/* Área de conteúdo principal. O Outlet renderiza a rota filha ativa. */}
            <main className="flex-grow relative z-10">
                <Outlet />
            </main>
            <Rodape />
        </div>
    );
};

export default AppLayout;
