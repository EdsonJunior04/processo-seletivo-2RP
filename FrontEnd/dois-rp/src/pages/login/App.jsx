//Hooks
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

//Services
import api from '../../services/api';
import { parseJwt } from "../../services/auth";

//Css
import './App.css';


function Login() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const notify_Logar_Failed = () => toast.error("Email ou Senha inválidos!")

  const history = useHistory();
  const Login = (event) => {
    event.preventDefault();
    api.post('/Login', {
      email: email,
      senha: senha
    })
      .then(resposta => {
        if (resposta.status === 200) {
          localStorage.setItem('usuario-login', resposta.data.token)
          if (parseJwt().role === "1") {
            history.push('/Perfil')
          } else if (parseJwt().role === "2" | parseJwt().role === "3") {
            history.push('/Usuarios')
          } 
        }
      })
      .catch(resposta => {
        notify_Logar_Failed()
      })
  }


  return (
    <div className="container">
      <div className='container_main'>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <div className='box_login'>
          <h1>Login</h1>
          <form onSubmit={Login}>
            <div className='inputLabel'>
              <input
                type="text"
                placeholder='Digite o seu email'
                name='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="Email">Email</label>
            </div>
            <div className='inputLabel'>
              <input
                type="password"
                placeholder='Digite a sua senha'
                name='Senha'
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <label htmlFor="Senha">Senha</label>
            </div>
            <div className='inputLabel'>
              <button type='submit' className='btn_login'> Entrar </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
