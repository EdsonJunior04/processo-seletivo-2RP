//Hooks
import React, { useEffect, useCallback, useState } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';

//Services
import { parseJwt } from "../../services/auth";
import api from '../../services/api';

//Imagens
import fechar from '../../assets/imgs/fechar.png'
import iconeEnviarArquivo from '../../assets/imgs/iconeEnviarArquivo.png'

//Css
import './modal.css'
import "../../assets/css/global.css"

export const ModalUsuario = ({ showModal, setShowModal, listaUsuarios, idUsuarioModal, buscarUsuarios }) => {

    const notify_Logar_Failed = () => toast.error("Você esqueceu de algum campo, por favor tente novamente!")
    const notify_cadastro_sucess = () => toast.success("Atualizado com sucesso!!!")



    const closeModal = e => {
        setShowModal(false);
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
            }
        },
        [setShowModal, showModal]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );


    function Excluir() {

        api.delete('/Usuarios/' + idUsuarioModal, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(function (response) {
                notify_cadastro_sucess();
                closeModal()
                buscarUsuarios()
            })
            .catch((erro) => { console.log(erro); notify_Logar_Failed() })
    }


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

    const AtualizarUsuario = (event) => {
        event.preventDefault();

        var formData = new FormData();

        const element = document.getElementById('img-input')
        const file = element.files[0]


        if (element.value === "") {
            formData.append('fotoUsuario', null)
        } else {
            formData.append('fotoUsuario', file, file.name)
        }

        formData.append('nome', nome);
        formData.append('idTipoUsuario', idTipoUsuario);
        formData.append('email', email);
        formData.append('senha', senha);
        formData.append('imagem', imagem);
        formData.append('situacao', situacao);
        api.put("/Usuarios/Atualizar/Adm/" + idUsuarioModal, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        })
            .then(async function (response) {
                if (response.status === 200) {
                    notify_cadastro_sucess();
                    limparInput();
                    closeModal();
                    buscarUsuarios();
                }
            })
            .catch(erro => { notify_Logar_Failed(); console.log(erro) })
    }

    function limparInput() {
        setIdTipoUsuario(0)
        setNome('')
        setEmail('')
        setSenha('')
        setImagem('')
        setSituacao(false)
    }


    return (
        <>
            {showModal ? (
                <Modal
                    isOpen={showModal}
                    onRequestClose={closeModal}
                >
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

                    <div className='fechar'>
                        <img onClick={closeModal} src={fechar} alt="fechar modal" />
                    </div>

                    <div className='container_modal'>
                        <div className='box_imagem_modal'>
                            <img src={"http://localhost:5000/StaticFiles/" + listaUsuarios.imagem} alt="imagem perfil" />
                            <div className='posicao_btn_excluir'>
                                {parseJwt().role === "3" ? <button onClick={() => { Excluir() }} className='btn_excluir'>Excluir</button> : null}
                            </div>
                        </div>
                        <div>

                        </div>
                        <div>
                            <form onSubmit={AtualizarUsuario} className='box_forms'>
                                <div className='box_cadastro'>
                                    <h1>Atualizar</h1>

                                    <div className='inputLabel'>
                                        <input
                                            type="text"
                                            placeholder='Digite o seu nome'
                                            name='Nome'
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                        />
                                        <label for="Nome">Nome</label>
                                    </div>
                                    <div className='inputLabel'>
                                        <input
                                            type="text"
                                            placeholder='Digite o seu email'
                                            name='Email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label for="Email">Email</label>
                                    </div>
                                    <div className='inputLabel'>
                                        <input
                                            type="password"
                                            placeholder='Digite a sua senha'
                                            name='senha'
                                            value={senha}
                                            onChange={(e) => setSenha(e.target.value)}
                                        />
                                        <label for="senha">Senha</label>
                                    </div>
                                    <div className='inputLabel'>
                                        <select
                                            className="select_cadastro"
                                            name="idTipoU"
                                            value={idTipoUsuario}
                                            onChange={(campo) => setIdTipoUsuario(campo.target.value)}
                                        >
                                            <option value={listaUsuarios.idTipoUsuario}>{listaUsuarios.idTipoUsuarioNavigation.nomeTipoUsuario}</option>
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
                                        <button type='submit' className='btn_login'> Atualizar </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            ) : null
            }
        </>
    );

}