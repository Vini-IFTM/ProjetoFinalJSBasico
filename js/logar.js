window.addEventListener("load", function(){
    const musicaFundo = new Audio('musica/backgroud-music.mp3');
    const musicaErro = new Audio('musica/error-sound.mp3');
    const musicaNot = new Audio('musica/notification-sound.mp3');
    const musicaEndGame = new Audio('musica/end-game-sound.mp3');

    document.getElementById("btnEntrar").addEventListener("click", verificaLogin);

    function verificaLogin(){
        var user = document.getElementById("user").value;
        var senha = document.getElementById("pwd").value;
        var vetUsuarios;

        if(user === "" || senha === ""){
            musicaNot.play();
            alertWifi("Preencha todas as informações", false, 0, "", 30, "");
        } else {
            vetUsuarios = localStorage.getItem("vetUsuarios");
            if(!vetUsuarios) {
                musicaErro.play();
                alertWifi("Ainda não há nenhum usuário cadastrado", false, 0, "", 30, "");
            } else {
                vetUsuarios = JSON.parse(vetUsuarios);
                var achou = false;
                for(var i = 0; i < vetUsuarios.length; i++){
                    if(vetUsuarios[i].nome === user && vetUsuarios[i].senha === senha){
                        achou = true;
                        break;
                    }
                }
                if(achou){
                    musicaNot.play();
                    alertWifi("Usuário Encontrado!", false, 0, "", 30, "");
                    setTimeout(function() {
                        window.location.href = "jogo.html";;
                    }, 2000);
                    
                } else {
                    musicaErro.play();
                    alertWifi("Usuário não Encontrado!", false, 0, "", 30, "");
                }
            }
        }
    }
});