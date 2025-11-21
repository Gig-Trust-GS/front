import React from 'react';
import { Link } from 'react-router-dom';
import { TriangleAlert, Home } from 'lucide-react';
import Logo from '../../../public/gig-trust-logo.png';

const Error: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-8 relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div className="absolute inset-0 bg-blue-900/50 blur-3xl animate-pulse-slow"></div>
            </div>

            <div className="relative z-10 text-center">
                <div className="mb-8">
                    <img src={Logo} alt="GIG-TRUST Logo" className="h-24 w-auto mx-auto" />
                </div>

                <TriangleAlert className="text-blue-400 mx-auto mb-6" size={80} />

                <h1 className="text-9xl font-extrabold text-blue-400 tracking-wider mb-4">
                    404
                </h1>

                <p className="text-2xl text-gray-300 mb-10">
                    Ops! Esta página não existe no Gig-Trust.
                </p>

                <Link to="/" className="flex items-center space-x-2 justify-center px-8 py-3 text-lg font-semibold bg-white text-black rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105">
                    <Home size={20} />
                    <span>Voltar para Home</span>
                </Link>
            </div>
        </div>
    );
};

export default Error;