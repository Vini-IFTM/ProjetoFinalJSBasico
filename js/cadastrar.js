window.addEventListener("load", function(){
    const musicaFundo = new Audio('musica/backgroud-music.mp3');
    const musicaErro = new Audio('musica/error-sound.mp3');
    const musicaNot = new Audio('musica/notification-sound.mp3');

    btnCadastrar = document.getElementById("btnCadastrar").addEventListener("click", CadastrarUser)

function CadastrarUser(){
    var user = document.getElementById("user").value
    var senha = document.getElementById("pwd").value
    var checkSenha = document.getElementById("checkPwd").value

    if(user== null && senha==null && checkSenha==null){
        musicaErro.play()
        alertWifi("Dados Incompletos.", false, 0, "", 30, "")
    }
    else{
        if(senha == checkSenha){
            var novoUsuario = {nome: user, senha: senha}
            var vetUsuarios = localStorage.getItem("vetUsuarios")
            
            if(!vetUsuarios){
                var vet = []
                vet.push(novoUsuario)
                localStorage.setItem("vetUsuarios", JSON.stringify(vet))
            }
            else{
                vet = JSON.parse(vetUsuarios)
                vet.push(novoUsuario)
                localStorage.setItem("vetUsuarios", JSON.stringify(vet))
            }
            musicaNot.play()
        alertWifi("Cadastro Completo!", false, 0, "", 30, "")
    }
    else{
        musicaErro.play()
        alertWifi("Senhas DIFERENTES, Confirme-as!", false, 0, "", 30, "")
    }
}

}})