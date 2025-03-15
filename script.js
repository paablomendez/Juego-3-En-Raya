document.addEventListener('DOMContentLoaded', () => {
    const casillas = document.querySelectorAll('.casilla');
    const mensaje = document.getElementById('mensaje');
    const botonReiniciar = document.getElementById('reiniciar');
    
    let turnoX = true; // true para X, false para O
    let contadorMovimientos = 0;
    let juegoTerminado = false;
    let tablero = Array(9).fill('');
    
    // Combinaciones ganadoras (índices)
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
        [0, 4, 8], [2, 4, 6]             // diagonales
    ];
    
    // Inicializar el juego
    iniciarJuego();
    
    function iniciarJuego() {
        casillas.forEach(casilla => {
            casilla.textContent = '';
            casilla.classList.remove('x', 'o');
            casilla.addEventListener('click', manejarClick, { once: true });
        });
        
        turnoX = true;
        contadorMovimientos = 0;
        juegoTerminado = false;
        tablero = Array(9).fill('');
        mensaje.textContent = 'Turno de X';
    }
    
    function manejarClick(e) {
        if (juegoTerminado) return;
        
        const casilla = e.target;
        const indice = parseInt(casilla.getAttribute('data-index'));
        const claseActual = turnoX ? 'x' : 'o';
        
        // Marcar la casilla
        casilla.textContent = turnoX ? 'X' : 'O';
        casilla.classList.add(claseActual);
        tablero[indice] = claseActual;
        
        contadorMovimientos++;
        
        // Verificar si hay ganador
        if (verificarGanador(claseActual)) {
            juegoTerminado = true;
            mensaje.textContent = `¡${turnoX ? 'X' : 'O'} ha ganado!`;
            deshabilitarCasillas();
            return;
        }
        
        // Verificar si hay empate
        if (contadorMovimientos === 9) {
            juegoTerminado = true;
            mensaje.textContent = '¡Empate!';
            return;
        }
        
        // Cambiar turno
        turnoX = !turnoX;
        mensaje.textContent = `Turno de ${turnoX ? 'X' : 'O'}`;
    }
    
    function verificarGanador(jugador) {
        return combinacionesGanadoras.some(combinacion => {
            return combinacion.every(indice => tablero[indice] === jugador);
        });
    }
    
    function deshabilitarCasillas() {
        casillas.forEach(casilla => {
            casilla.removeEventListener('click', manejarClick);
        });
    }
    
    // Evento para reiniciar el juego
    botonReiniciar.addEventListener('click', iniciarJuego);
});