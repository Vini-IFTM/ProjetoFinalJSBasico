window.addEventListener("load", function () {
    document.getElementById("btnTestar").addEventListener("click", exibirMsg);

    function exibirMsg() {
        alertWifi(`Olá, tudo bem?`, false, 0, "img/logo.png", 30, "");
    }
});