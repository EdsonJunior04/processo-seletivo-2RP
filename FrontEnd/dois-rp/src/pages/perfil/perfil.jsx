//Hooks
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

//Services
import api from '../../services/api'
import { parseJwt } from "../../services/auth";

//Imagens
import iconeEnviarArquivo from '../../assets/imgs/iconeEnviarArquivo.png'

//Css
import './perfil.css'
import "../../assets/css/global.css"


export default function Perfil() {
    const notify_Logar_Failed = () => toast.error("Você esqueceu de algum campo, por favor tente novamente!")
    const notify_cadastro_sucess = () => toast.success("Atualizado com sucesso!")
    const [listaUsuarios, setListaUsuarios] = useState([])
    const [nomeTipoU, setNomeTipoU] = useState('')
    function buscarLogado() {
        api.get('/Usuarios/BuscarUsuario', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaUsuarios(resposta.data)
                    setNomeTipoU(resposta.data.idTipoUsuarioNavigation.nomeTipoUsuario)
                }
            })
            .catch(resposta => {
                notify_Logar_Failed();
            })
    }
    useEffect(buscarLogado, [])

    const [nome, setNome] = useState('')
    const [imagem, setImagem] = useState('')
    const [email, setEmail] = useState('')
    function atualizar(event) {
        event.preventDefault();
        var formData = new FormData();
        const element = document.getElementById('img-input')
        const file = element.files[0]
        if (element.value === "") {
            formData.append('FotoUsuario', null)
        } else {
            formData.append('FotoUsuario', file, file.name)
        }
        formData.append('nome', nome);
        formData.append('imagem', imagem);
        formData.append('email', email);
        api({
            method: "put",
            url: "/Usuarios/Atualizar/PerfilGeral/" + parseJwt().jti,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }

        })
            .then(function (response) {
                if (response.status === 200) {
                    notify_cadastro_sucess();
                    limparInput();
                    buscarLogado();
                }
            })
            .catch(erro => { notify_Logar_Failed(); console.log(erro) })
    }
    function limparInput() {
        setEmail('')
        setNome('')
        setImagem('')
    }


    return (
        <div>
            <Header />
            <div className='container'>
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
                <form onSubmit={atualizar}>
                    <div className='box_perfil'>

                        <div className='box_img_perfil'>
                            <div className='img_perfil'>
                                <img src={"http://localhost:5000/StaticFiles/" + listaUsuarios.imagem} alt="imagem perfil" />
                            </div>
                            <div className='box_foto'>
                                <label htmlFor="img-input" className="label_arquivo_cadastroEmpresa_g2"><img className="img_file_cadastro_empresa_g2" src={iconeEnviarArquivo} alt="iconeEnviarArquivo" /> Inserir Foto</label>
                                <input
                                    type='file'
                                    className="input_file_cadastroEmpresa_g2"
                                    name='imagem'
                                    id="img-input"
                                />
                            </div>
                        </div>
                        <div className='dados_perfil'>
                            <h1>Dados Pessoais</h1>
                            <div className='input_alterar'>
                                <label htmlFor="Nome"></label>
                                <input
                                    type="text"
                                    name='Nome'
                                    placeholder={listaUsuarios.nome}
                                    value={nome}
                                    onChange={(event) => setNome(event.target.value)}
                                />
                            </div>
                            <div className='input_alterar'>
                                <label htmlFor="email"></label>
                                <input
                                    type="text"
                                    name='email'
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder={listaUsuarios.email}
                                />
                            </div>
                            <div className='inputLabel'>
                                <label htmlFor="tipoU">{nomeTipoU}</label>
                                <input
                                    type="text"
                                    name='tipoU'
                                    disabled
                                />
                            </div>
                            <div className='inputLabel'>
                                <label htmlFor="tipoU">{listaUsuarios.situacao === true ? "Ativo" : "Inativo"}</label>
                                <input
                                    type="text"
                                    name='tipoU'
                                    disabled
                                />
                            </div>
                            <button className='btn_alterar' type='submit'>Alterar</button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}