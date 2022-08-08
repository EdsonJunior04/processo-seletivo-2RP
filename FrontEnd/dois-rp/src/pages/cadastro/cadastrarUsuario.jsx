//Hooks
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Services
import api from '../../services/api';

//Css
import './cadastrarUsuario.css'

//Imagens
import iconeEnviarArquivo from '../../assets/imgs/iconeEnviarArquivo.png'

//Components
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';


export default function Cadastro() {
    const notify_Logar_Failed = () => toast.error("Você esqueceu de algum campo, por favor tente novamente!")
    const notify_cadastro_sucess = () => toast.success("Cadastro realizado com sucesso!")


    const [fotoUsuario, setFotoUsuario] = useState([]);
    const [nome, setNome] = useState('');
    const [idTipoUsuario, setIdTipoUsuario] = useState(0);
    const [imagem, setImagem] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [situacao, setSituacao] = useState(true)
    const listaTipoU = [1, 2, 3]

    function checkValidar() {
        setSituacao(!situacao)
    }

    const CadastrarUsuario = (event) => {
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
        formData.append('idTipoUsuario', idTipoUsuario);
        formData.append('email', email);
        formData.append('senha', senha);
        formData.append('imagem', imagem);
        formData.append('situacao', situacao);

        api.post("/Usuarios/Cadastrar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        })
            .then(async function (response) {
                if (response.status === 201) {
                    notify_cadastro_sucess();
                    limparInput();
                }
            })
            .catch(erro => { notify_Logar_Failed(); console.log(erro) })
    }

    function limparInput() {
        setEmail('')
        setNome('')
        setImagem('')
        setIdTipoUsuario(0)
        setSenha('')
        setSituacao(false)
    }


    return (
        <div >
            <Header />
            <div className='container'>
                <div className='container_cadastro'>
                    <div>
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
                        <form onSubmit={CadastrarUsuario} className='box_forms'>
                            <div className='box_cadastro'>
                                <h1>Cadastro</h1>

                                <div className='inputLabel'>
                                    <input
                                        type="text"
                                        placeholder='Digite o seu nome'
                                        name='Nome'
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                    <label htmlFor="Nome">Nome</label>
                                </div>
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
                                        name='senha'
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                    <label htmlFor="senha">Senha</label>
                                </div>
                                <div className='inputLabel'>
                                    <select
                                        className="select_cadastro"
                                        name="idTipoU"
                                        value={idTipoUsuario}
                                        onChange={(campo) => setIdTipoUsuario(campo.target.value)}
                                    >
                                        <option value="0">Selecione o Cargo</option>

                                        <option value={listaTipoU[0]}>Geral</option>
                                        <option value={listaTipoU[1]}>Adm</option>
                                        <option value={listaTipoU[2]}>Root</option>
                                    </select>
                                </div>

                                <div className='div_ToggleValidar'>
                                    <div className="organizar">
                                        <div className='box_foto'>
                                            <label htmlFor="img-input" className="label_arquivo_cadastroEmpresa_g2"><img className="img_file_cadastro_empresa_g2" src={iconeEnviarArquivo} alt="iconeEnviarArquivo" /> Inserir Foto</label>
                                            <input
                                                type='file'
                                                className="input_file_cadastroEmpresa_g2"
                                                name='imagem'
                                                id="img-input"
                                                value={fotoUsuario}
                                                onChange={(event) => setFotoUsuario(event.target.value)}
                                            />
                                        </div>


                                        <label className="label_precisaValidar"></label>
                                        <div className='organizar_switchBtn'>
                                            <input className="checkbox_switch"
                                                type="checkbox"
                                                id="switch"
                                                name="validar"
                                                value={situacao}
                                                onClick={checkValidar}
                                            />
                                            {situacao && (
                                                <div>
                                                    <label className='label_switch active' htmlFor="switch"></label>
                                                    <p className='text_switch'>
                                                        Ativo
                                                    </p>
                                                </div>
                                            )}
                                            {!situacao && (
                                                <div>
                                                    <label className='label_switch' htmlFor="switch"></label>
                                                    <p className='text_switch'>
                                                        Inativo
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className='inputLabel'>
                                    <button type='submit' className='btn_login'> Cadastrar </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div>
            <Footer />
        </div >
    )
}