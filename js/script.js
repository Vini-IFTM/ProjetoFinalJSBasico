window.addEventListener("load", function () {
    const musicaFundo = new Audio('musica/backgroud-music.mp3');
    const musicaErro = new Audio('musica/error-sound.mp3');
    const musicaNot = new Audio('musica/notification-sound.mp3');
    const musicaEndGame = new Audio('musica/end-game-sound.mp3');
    var seletorDificuldade = document.getElementById('nivel');
    var tempoElement = document.getElementById('tempo');
    var intervalo;
    var tmpIntervalo;
    var milisegundos;
    var btnIniciar = document.getElementById('btnIniciar');
    var btnParar = document.getElementById('btnParar');
    var btnPausar = document.getElementById('btnPausar');
    var numAleatorio = document.getElementById('numAleatorio');
    var gerador;
    var contadorPares = 0;
    var paresSorteados = document.getElementById('paresSorteados');
    var acertos = 0;
    var porcentagemAcertos = document.getElementById('porcentagemAcertos');
    var numAcertos = document.getElementById('acertos');
    var erros = 0;
    var numErros = document.getElementById('erros');
    var total = 0;
    var tempoSegundos = 0;
    
    seletorDificuldade.addEventListener('change', function () {
        musicaFundo.play();
        musicaFundo.loop = true;
        musicaFundo.volume = 0.4;
        tempoSegundos = parseInt(seletorDificuldade.value);
        atualizarTempo(tempoSegundos);
        if (tempoSegundos == 105) {
            milisegundos = 1000;
        } else if (tempoSegundos == 75) {
            milisegundos = 700;
        } else if (tempoSegundos == 30) {
            milisegundos = 400;
        }   
    });

    function atualizarTempo(tempoSegundos) {
        var minutos = Math.floor(tempoSegundos / 60);
        var segundos = tempoSegundos % 60;
        var minutosStr = minutos < 10 ? '0' + minutos : minutos;
        var segundosStr = segundos < 10 ? '0' + segundos : segundos;
        tempoElement.textContent = minutosStr + ':' + segundosStr;
    }

    function exibir() {
        gerador = Math.round(Math.random() * 100) + 1;
        numAleatorio.textContent = gerador;
        total++;
        if (gerador % 2 == 0) {
            contadorPares++;
            paresSorteados.textContent = contadorPares;
            var porcentagem = (acertos / contadorPares) * 100;
            porcentagemAcertos.textContent = porcentagem.toFixed(1) + '%';
        }

        numAleatorio.addEventListener('click', function () {
            if (gerador % 2 == 0) {
                numAleatorio.style.color = 'green';
            } else {
                numAleatorio.style.color = 'red';
            }
        });
        numAleatorio.style.color = 'white';
    }

    function iniciarIntervalo() {
        intervalo = setInterval(exibir, milisegundos);

        tmpIntervalo = setInterval(function () {

            if (tempoSegundos <= 0) {
                clearInterval(intervalo);
                clearInterval(tmpIntervalo);
                tempoElement.textContent = "00:00";
                musicaFundo.volume = 0.2;
                musicaEndGame.play();
                musicaFundo.pause();
                alertWifi("Tempo esgotado! Fim de Jogo.", false, 0, "", 30, "")
                return;
            }
            atualizarTempo(tempoSegundos);
            tempoSegundos--;  
        }, 1000);

    }

    btnIniciar.addEventListener('click', function () {
        while (tempoSegundos <= 0) {
            musicaErro.play();
            alertWifi("Selecione um nível antes de começar!", false, 0, "", 30, "")
            return;
        }
        iniciarIntervalo();
    });

    btnParar.addEventListener('click', function () {
        clearInterval(intervalo);
        clearInterval(tmpIntervalo);
        numAleatorio.textContent = '-';
        numAleatorio.style.color = '';
        contadorPares = 0;
        paresSorteados.textContent = contadorPares;
        porcentagemAcertos.textContent = "0.00%";
        numAcertos.textContent = "0";
        numErros.textContent = "0";
        tempoElement.textContent = "00:00";
        acertos = 0;
        erros = 0;
        total = 0;
        musicaFundo.pause();
    });

    btnPausar.addEventListener('click', function () {
        clearInterval(intervalo);
        clearInterval(tmpIntervalo);
    });

    numAleatorio.addEventListener('click', function () {
        if (gerador % 2 == 0) {
            acertos++;
        } else {
            erros++;
        }
        numAcertos.textContent = acertos;
        numErros.textContent = erros;
    });
});
