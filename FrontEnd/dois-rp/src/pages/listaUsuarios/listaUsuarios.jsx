//Hooks
import { useEffect, useState } from "react";

//Components
import  { ModalUsuario } from "../../components/modal/modal";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";

//Services
import api from "../../services/api";

//Imagem
import mais from '../../assets/imgs/mais.png'
//Css
import './listaUsuario.css'
import "../../assets/css/global.css"

export default function ListaUsuario() {
    const [showModal, setShowModal] = useState(false);
    const [idUsuarioModal, setIdUsuarioModal] = useState()
    const [listaUsuarios, setListaUsuarios] = useState([]);

    function buscarUsuarios() {
        api('/Usuarios', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaUsuarios(resposta.data)
                }
            })
            .catch(erro => {
            })
    }
    useEffect(buscarUsuarios, []);

    const OpenModal = () => {
        setShowModal(prev => !prev);
    }
    const [searchInput, setSearchInput] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = listaUsuarios.filter((item) => {
                return Object.values(item.nome).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        } else {
            setFilteredResults(listaUsuarios)
        }
    }



    return (
        <div>
            <ModalUsuario buscarUsuarios={buscarUsuarios} listaUsuarios={listaUsuarios.find(usuario => usuario.idUsuario === idUsuarioModal)} idUsuarioModal={idUsuarioModal} showModal={showModal} setShowModal={setShowModal} />
            <Header />
            <div className="container">
                <div className="box_title">
                    <h1>Tabela de Usuários</h1>
                </div>
                <div className='caixa_pesquisa'>

                    <div className='inputLabel'>
                        <input
                            type="search"
                            placeholder='Pesquisar'
                            name='pesquisar'
                            onChange={(e) => searchItems(e.target.value)}
                        />
                        <label htmlFor="pesquisar">Pesquisar</label>
                    </div>
                </div>

                <div className="wrap_usuario">
                    <div className="container_wrap_usuario">
                        {
                            searchInput.length > 0 ?
                                filteredResults.map((u) => {
                                    return (
                                        <div>
                                            <div className="container_usuario">
                                                <div className="box_usuario">
                                                    <div className="center_img">
                                                        <img src={"http://localhost:5000/StaticFiles/" + u.imagem} alt="imagem perfil" />
                                                    </div>
                                                    <div className="dados_lista_usuario">
                                                        <p>{u.nome}</p>
                                                        <p>{u.email}</p>
                                                        <p>{u.situacao === true ? 'Ativo' : 'Inativo'}</p>
                                                        <p>{u.idTipoUsuarioNavigation.nomeTipoUsuario}</p>
                                                    </div>
                                                    <div className="mais_informações">
                                                        <div className="circulo_info">
                                                            <img onClick={() => {OpenModal()}}  onClickCapture={() => setIdUsuarioModal(u.idUsuario)} src={mais} alt="mais info" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : listaUsuarios.map((u) => {
                                    return (
                                        <div>
                                            <div className="container_usuario">
                                                <div className="box_usuario">
                                                    <div className="center_img">
                                                        <img src={"http://localhost:5000/StaticFiles/" + u.imagem} alt="imagem perfil" />
                                                    </div>
                                                    <div className="dados_lista_usuario">
                                                        <p>{u.nome}</p>
                                                        <p>{u.email}</p>
                                                        <p>{u.situacao === true ? 'Ativo' : 'Inativo'}</p>
                                                        <p>{u.idTipoUsuarioNavigation.nomeTipoUsuario}</p>
                                                    </div>
                                                    <div className="mais_informações">
                                                        <div className="circulo_info">
                                                            <img onClick={() => {OpenModal()}}  onClickCapture={() => setIdUsuarioModal(u.idUsuario)} src={mais} alt="mais info" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}