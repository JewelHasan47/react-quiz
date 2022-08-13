import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './components/Layout';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Quiz from './components/pages/Quiz';
import Result from './components/pages/Result';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Layout>
                    <Routes>
                        <Route exact={ true } path={ '/' } element={ <Home/> }/>
                        <Route exact={ true } path={ '/signup' } element={ <Signup/> }/>
                        <Route exact={ true } path={ '/login' } element={ <Login/> }/>
                        <Route exact={ true } path={ '/quiz' } element={ <Quiz/> }/>
                        <Route exact={ true } path={ '/result' } element={ <Result/> }/>
                    </Routes>
                </Layout>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
