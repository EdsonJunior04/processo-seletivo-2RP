//Hooks
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

//Services
import api from '../../services/api'
import { parseJwt } from '../../services/auth';

//Css
import "../../assets/css/global.css"
import './header.css'


export default function Header() {
    const [listaUsuarios, setListaUsuario] = useState([])
    function buscarLogado() {
        api.get('/Usuarios/BuscarUsuario', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaUsuario(resposta.data)
                }
            })
    }
    useEffect(buscarLogado, [])

    let history = useHistory();
    function logOut() {
        localStorage.removeItem("usuario-login");
        history.push("/");
    }



    return (

        <header>
            <div className='container'>
                <div className='box_header'>
                    <div className='box_fotoPerfil'>
                        <div className='box_img'>
                            <Link to='/Perfil'> <img src={"http://localhost:5000/StaticFiles/" + listaUsuarios.imagem} alt="Foto Perfil" /> </Link>
                        </div>
                        <Link to='/Perfil'><p>{listaUsuarios.nome}</p></Link>
                    </div>
                    <div className='box_navigation'>
                        <Link to='/Cadastro'> {parseJwt().role === "2" | parseJwt().role === "3" ? <p> Cadastrar </p> : null}  </Link>
                        <Link to='/Usuarios'> {parseJwt().role === "2" | parseJwt().role === "3" ? <p> Usuarios </p> : null}  </Link>
                        <p className='logout' onClick={logOut} >Sair</p>
                    </div>
                </div>
            </div>
        </header>

    )
}


