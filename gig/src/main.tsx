import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './globals.css';
import AppLayout from './AppLayout.tsx';
import PublicLayout from './PublicLayout.tsx';
import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Error from './routes/Error';
import Sobre from './routes/Sobre';
import Integrantes from './routes/Integrantes';
import FAQ from './routes/FAQ';
import Dashboard from './routes/Dashboard';
import Conexoes from './routes/Conexoes';
import Reskilling from './routes/Reskilling';
import AvaliarTrabalhador from './routes/AvaliarTrabalhador';
import Perfil from './routes/Perfil';

const router = createBrowserRouter([

  // ROTAS PÚBLICAS - Aninhadas sob o PublicLayout
  {
    element: <PublicLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/integrantes", element: <Integrantes /> },
      { path: "/faq", element: <FAQ /> },
    ]
  },

  // ROTAS STANDALONE - Não usam Layouts Aninhados - Login e Cadastro
  { path: "/login", element: <Login />, errorElement: <Error /> },
  { path: "/signup", element: <Signup />, errorElement: <Error /> },

  // C) ROTAS LOGADAS - Aninhadas sob o AppLayout
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/conexoes", element: <Conexoes /> },
      { path: "/reskilling", element: <Reskilling /> },
      { path: "/avaliar-trabalhador", element: <AvaliarTrabalhador /> },
      { path: "/perfil", element: <Perfil /> },
    ]
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
);
