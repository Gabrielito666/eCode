document.addEventListener('DOMContentLoaded', () => {
    const dHtml = document.getElementById('d_html');
    const dScript = document.getElementById('d_script');
    const dPage = document.getElementById('d_page');

    const sBody = document.getElementById('s_body');
    const sScript = document.getElementById('s_script');
    const sConsole = document.getElementById('s_console');

    const bHtml = document.getElementById('b_html');
    const bScript = document.getElementById('b_script');
    const bPage  = document.getElementById('b_page');

    const tHtml = document.getElementById('t_html');
    const tScript = document.getElementById('t_script');

    bHtml.disabled = false;
    bScript.disabled = false;
    bPage.disabled = false;

    bHtml.onclick = ()=>{borraConsola(); cambiarPantalla(dHtml)};
    bScript.onclick = ()=>{borraConsola();cambiarPantalla(dScript)};
    bPage.onclick = ()=>{cambiarContenido(); cambiarPantalla(dPage)};

    function cambiarPantalla (pantalla) {
        dHtml.hidden = true;
        dPage.hidden = true;
        dScript.hidden = true;
        pantalla.hidden = false;
    };
    function cambiarContenido(){
        sBody.innerHTML = tHtml.value;
        
        let antiguoScript = document.getElementById('s_script');
        if (antiguoScript) {antiguoScript.remove();}
    
        let nuevoScript = document.createElement('script');
        nuevoScript.id = 's_script';
        nuevoScript.textContent = `(function() {${tScript.value}})();`;
    
        document.body.appendChild(nuevoScript);   
    };
    function borraConsola(){
        sConsole.innerHTML = "";
    }

    // Guarda los manejadores de eventos originales fuera de la función
    let oldLog = console.log;
    let oldError = console.error;
    let oldOnError = window.onerror;

    console.log = function (message) {
        sConsole.innerHTML += '<br>' + message;
        oldLog.apply(console, arguments);
        sConsole.scrollTop = sConsole.scrollHeight;
    };

    console.error = function (message) {
        sConsole.innerHTML += '<br>' + message;
        oldError.apply(console, arguments);
        sConsole.scrollTop = sConsole.scrollHeight;
    };

    window.onerror = function(message, source, lineno, colno, error) {
        sConsole.innerHTML += '<br>' + message;
        sConsole.scrollTop = sConsole.scrollHeight;
    };

    function tabulaciones(e) {
        if (e.key === 'Tab') {
            e.preventDefault(); // Evita que el foco salte al siguiente elemento
            const start = this.selectionStart;
            const end = this.selectionEnd;
    
            // Inserta la tabulación en la posición actual del cursor
            this.value = this.value.substring(0, start) + '   ' + this.value.substring(end);
    
            // Coloca el cursor después de la tabulación
            this.selectionStart = this.selectionEnd = start + 3;
        }
    }
    
    document.getElementById('t_html').addEventListener('keydown', tabulaciones);
    document.getElementById('t_script').addEventListener('keydown', tabulaciones);
});