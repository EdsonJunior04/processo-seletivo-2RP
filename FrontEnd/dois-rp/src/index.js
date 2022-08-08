import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './index.css';
import Cadastro from './pages/cadastro/cadastrarUsuario';
import ListaUsuario from './pages/listaUsuarios/listaUsuarios';
import Login from './pages/login/App';
import Perfil from './pages/perfil/perfil.jsx';
import reportWebVitals from './reportWebVitals';
import { parseJwt, usuarioAutenticado } from './services/auth';
const PermissaoAdm = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '2' | parseJwt().role === '3' ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Perfil" component={Perfil} />
        <PermissaoAdm path="/Cadastro" component={Cadastro} />
        <PermissaoAdm path="/Usuarios" component={ListaUsuario} />
        <Redirect to="/notfound" />
      </Switch>

    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();