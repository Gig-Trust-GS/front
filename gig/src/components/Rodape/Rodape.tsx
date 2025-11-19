import React from 'react';

const Rodape: React.FC = () => {
    return (
        <footer className="bg-black text-gray-600 p-6 mt-auto border-t border-gray-800">
            <div className="max-w-6xl mx-auto text-center text-sm">
                <p className="mb-1 font-semibold text-gray-400">
                    Gig-Trust: O Passaporte de Carreira
                </p>
                <p>
                    &copy; {new Date().getFullYear()} Global Solution FIAP. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Rodape;