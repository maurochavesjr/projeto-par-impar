let vitorias = 0;
let vitoriasConsecutivas = 0;

function verificarSomaParImpar(n1, n2) {
    const soma = n1 + n2;
    return soma;
}

function limparEntradas() {
    document.getElementById('escolha').value = '';
    document.getElementById('valor_jogador').value = '';
}

function jogar() {
    const jogador = document.getElementById('escolha').value.toUpperCase();
    const valor_j = parseInt(document.getElementById('valor_jogador').value);
    
    if (!jogador || (jogador !== 'P' && jogador !== 'I') || isNaN(valor_j)) {
        alert('Preencha os campos com valores válidos.');
        return; // Sai da função se houver erro de validação
    }
    
    const valor_c = Math.floor(Math.random() * 101);

    const resultadoDiv = document.getElementById('resultado');
    const computadorDiv = document.getElementById('computador');
    let resultado = '';

    const res = verificarSomaParImpar(valor_j, valor_c);

    computadorDiv.classList.remove('hidden');
    document.getElementById('numero_computador').textContent = valor_c;

    if ((jogador === 'P' && res % 2 === 0) || (jogador === 'I' && res % 2 !== 0)) {
        resultado = `Você Venceu! O resultado da soma é ${res}.`;
        vitorias++;
        vitoriasConsecutivas++;
    } else {
        resultado = `Você perdeu. O resultado da soma é ${res}.`;
        vitoriasConsecutivas = 0; // Reinicia a contagem de vitórias consecutivas
        vitorias = 0; // Zera as vitórias
    }

    resultadoDiv.innerHTML = resultado;

    // Exibe o alerta após 1 segundo
    setTimeout(() => {
        const continuarJogando = confirm('Deseja continuar jogando?');
        limparEntradas();
        resultadoDiv.innerHTML = '';
        computadorDiv.classList.add('hidden');
        document.getElementById('numero_computador').textContent = '';

        if (!continuarJogando) {
            vitorias = 0; // Zera as vitórias quando o usuário escolher não continuar jogando
            vitoriasConsecutivas = 0; // Zera as vitórias consecutivas
        } else {
            // Volta o foco para o seletor de escolha (Par ou Ímpar)
            document.getElementById('escolha').focus();
        }

        document.getElementById('vitorias').textContent = vitorias;
        document.getElementById('vitorias-consecutivas').textContent = vitoriasConsecutivas;
    }, 1000); // O alerta será exibido após 1 segundo.
}

document.getElementById('jogar').addEventListener('click', jogar);

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        jogar();
    }
});
