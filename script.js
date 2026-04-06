/* ============================================
   VALIDADOR INTELIGENTE - JavaScript Profissional
   ============================================ */

// Elementos do DOM
const form = document.getElementById('validatorForm');
const resultsSection = document.getElementById('results');
const resultsContent = document.getElementById('results-content');
const btnValidate = document.getElementById('btn-validate');

// ============================================
// UTILITÁRIOS
// ============================================

// Esconder/mostrar loading no botão
function setLoading(isLoading) {
    if (isLoading) {
        btnValidate.classList.add('loading');
        btnValidate.disabled = true;
    } else {
        btnValidate.classList.remove('loading');
        btnValidate.disabled = false;
    }
}

// Atualizar classe visual do input
function setInputStatus(groupId, status) {
    const group = document.getElementById(groupId);
    group.classList.remove('input-valid', 'input-error', 'input-warning');
    if (status) {
        group.classList.add('input-' + status);
    }
}

// Mostrar feedback
function showFeedback(elementId, type, message, suggestion = null) {
    const feedback = document.getElementById(elementId);
    const icon = type === 'valid' ? '✓' : type === 'warning' ? '⚠' : '✗';
    
    let html = `
        <span class="feedback-icon">${icon}</span>
        <div class="feedback-content">
            <div class="main-message">${message}</div>
    `;
    
    if (suggestion) {
        html += `<div class="suggestion">💡 Sugestão: ${suggestion}</div>`;
    }
    
    html += '</div>';
    
    feedback.innerHTML = html;
    feedback.className = `feedback show ${type}`;
    
    // Atualizar status visual do input
    const groupId = elementId.replace('-feedback', '-group');
    setInputStatus(groupId, type);
}

// ============================================
// VALIDAÇÃO DE NOME
// ============================================
function validarNome(nome) {
    if (!nome || nome.trim() === '') {
        showFeedback('nome-feedback', 'error', 'Nome é obrigatório');
        return { valido: false, mensagem: 'Nome é obrigatório', sugestao: null };
    }
    
    // Verificar se tem pelo menos nome e sobrenome
    const partes = nome.trim().split(/\s+/);
    
    if (partes.length < 2) {
        showFeedback('nome-feedback', 'warning', 'Nome incompleto. Forneça pelo menos nome e sobrenome.', 'Complete com seu sobrenome');
        return { valido: false, mensagem: 'Nome incompleto', sugestao: 'Forneça pelo menos nome e sobrenome' };
    }
    
    // Verificar capitalização correta
    const nomeCapitalizado = capitalizarNome(nome);
    
    if (nome !== nomeCapitalizado) {
        showFeedback('nome-feedback', 'warning', 'Nome formatado incorretamente.', `"${nomeCapitalizado}"`);
        return { valido: true, mensagem: 'Nome válido (com correção)', sugestao: nomeCapitalizado };
    }
    
    showFeedback('nome-feedback', 'valid', 'Nome válido ✓');
    return { valido: true, mensagem: 'Nome válido', sugestao: null };
}

// Capitalizar nome
function capitalizarNome(nome) {
    return nome.toLowerCase().split(' ')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(' ');
}

// ============================================
// VALIDAÇÃO DE EMAIL
// ============================================
function validarEmail(email) {
    if (!email || email.trim() === '') {
        showFeedback('email-feedback', 'error', 'Email é obrigatório');
        return { valido: false, mensagem: 'Email é obrigatório', sugestao: null };
    }
    
    const emailMin = email.toLowerCase().trim();
    let emailCorrigido = emailMin;
    let sugestao = null;
    
    // Corrigir erros comuns
    if (emailMin.includes(' .@')) {
        emailCorrigido = emailMin.replace(' .@', '.@');
        sugestao = emailCorrigido;
    }
    
    if (emailCorrigido.includes(',') && emailCorrigido.includes('@')) {
        emailCorrigido = emailCorrigido.replace(',', '.');
        sugestao = emailCorrigido;
    }
    
    if (emailCorrigido.includes('..')) {
        emailCorrigido = emailCorrigido.replace(/\.\./g, '.');
        sugestao = emailCorrigido;
    }
    
    if (emailCorrigido.includes(' ')) {
        emailCorrigido = emailCorrigido.replace(/\s+/g, '');
        sugestao = emailCorrigido;
    }
    
    // Regex de validação
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!regexEmail.test(emailCorrigido)) {
        if (sugestao) {
            showFeedback('email-feedback', 'warning', 'Email com formato incorreto.', `"${sugestao}"`);
            return { valido: false, mensagem: 'Email inválido', sugestao: sugestao };
        }
        showFeedback('email-feedback', 'error', 'Email inválido. Use o formato: usuario@dominio.com');
        return { valido: false, mensagem: 'Email inválido', sugestao: null };
    }
    
    if (sugestao) {
        showFeedback('email-feedback', 'warning', 'Email corrigido automaticamente.', `"${sugestao}"`);
        return { valido: true, mensagem: 'Email válido (corrigido)', sugestao: sugestao };
    }
    
    showFeedback('email-feedback', 'valid', 'Email válido ✓');
    return { valido: true, mensagem: 'Email válido', sugestao: null };
}

// ============================================
// VALIDAÇÃO DE SENHA
// ============================================
function validarSenha(senha) {
    // Verificações
    const temMinimo8 = senha.length >= 8;
    const temMaiuscula = /[A-Z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
    
    // Atualizar requisitos visuais
    atualizarRequisito('length', temMinimo8);
    atualizarRequisito('upper', temMaiuscula);
    atualizarRequisito('number', temNumero);
    atualizarRequisito('special', temEspecial);
    
    // Atualizar barra de força
    let forca = 0;
    if (temMinimo8) forca++;
    if (temMaiuscula) forca++;
    if (temNumero) forca++;
    if (temEspecial) forca++;
    
    atualizarBarraForca(forca);
    
    // Verificar se é válida
    const valida = temMinimo8 && temMaiuscula && temNumero && temEspecial;
    
    if (!senha || senha === '') {
        showFeedback('senha-feedback', 'error', 'Senha é obrigatória');
        return { valido: false, mensagem: 'Senha é obrigatória', sugestao: null, forca: 0 };
    }
    
    if (!valida) {
        const faltando = [];
        if (!temMinimo8) faltando.push('8 caracteres');
        if (!temMaiuscula) faltando.push('maiúscula');
        if (!temNumero) faltando.push('número');
        if (!temEspecial) faltando.push('especial');
        
        const sugestao = gerarSenhaForte();
        showFeedback('senha-feedback', 'warning', `Faltam: ${faltando.join(', ')}`, `"${sugestao}"`);
        return { valido: false, mensagem: 'Senha incompleta', sugestao: sugestao, forca: forca };
    }
    
    showFeedback('senha-feedback', 'valid', 'Senha forte ✓');
    return { valido: true, mensagem: 'Senha válida', sugestao: null, forca: forca };
}

// Atualizar requisito visual
function atualizarRequisito(tipo, cumprido) {
    const req = document.querySelector(`[data-req="${tipo}"]`);
    if (req) {
        req.classList.toggle('met', cumprido);
        req.querySelector('.check').textContent = cumprido ? '✓' : '✗';
    }
}

// Atualizar barra de força
function atualizarBarraForca(forca) {
    const bar = document.getElementById('strength-bar');
    const text = document.getElementById('strength-text');
    
    bar.className = 'strength-bar';
    
    if (forca === 0) {
        text.innerHTML = '';
        text.className = 'strength-text';
    } else if (forca <= 1) {
        bar.classList.add('weak');
        text.innerHTML = '<span>⚠️</span> Fraca';
        text.className = 'strength-text weak';
    } else if (forca <= 2) {
        bar.classList.add('medium');
        text.innerHTML = '<span>🟡</span> Média';
        text.className = 'strength-text medium';
    } else {
        bar.classList.add('strong');
        text.innerHTML = '<span>✅</span> Forte';
        text.className = 'strength-text strong';
    }
}

// Gerar senha forte
function gerarSenhaForte() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let senha = '';
    for (let i = 0; i < 12; i++) {
        senha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return senha;
}

// ============================================
// VALIDAÇÃO DE CPF
// ============================================
function validarCPF(cpf) {
    if (!cpf || cpf.trim() === '') {
        showFeedback('cpf-feedback', 'error', 'CPF é obrigatório');
        return { valido: false, mensagem: 'CPF é obrigatório', sugestao: null };
    }
    
    const cpfNumeros = cpf.replace(/\D/g, '');
    
    if (cpfNumeros.length !== 11) {
        showFeedback('cpf-feedback', 'warning', 'CPF deve ter 11 dígitos.', 'Use o formato: 000.000.000-00');
        return { valido: false, mensagem: 'CPF incompleto', sugestao: null };
    }
    
    // Verificar CPFs inválidos conhecidos
    if (/^(\d)\1{10}$/.test(cpfNumeros)) {
        showFeedback('cpf-feedback', 'error', 'CPF inválido (dígitos repetidos)');
        return { valido: false, mensagem: 'CPF inválido', sugestao: null };
    }
    
    // Validar dígitos verificadores
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpfNumeros[i]) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpfNumeros[i]) * (11 - i);
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;
    
    if (parseInt(cpfNumeros[9]) !== digito1 || parseInt(cpfNumeros[10]) !== digito2) {
        showFeedback('cpf-feedback', 'error', 'CPF inválido (dígitos verificadores incorretos)');
        return { valido: false, mensagem: 'CPF inválido', sugestao: null };
    }
    
    showFeedback('cpf-feedback', 'valid', 'CPF válido ✓');
    return { valido: true, mensagem: 'CPF válido', sugestao: null };
}

// Máscara de CPF
function aplicarMascaraCPF(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (value.length > 3) {
        value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
    }
    input.value = value;
}

// ============================================
// EXIBIR RESULTADOS
// ============================================
function exibirResultados(resultados) {
    resultsSection.classList.add('show');
    
    let html = '';
    
    const campos = [
        { id: 'nome', titulo: 'Nome', icon: '👤', value: document.getElementById('nome').value },
        { id: 'email', titulo: 'Email', icon: '📧', value: document.getElementById('email').value },
        { id: 'senha', titulo: 'Senha', icon: '🔐', value: '••••••••' },
        { id: 'cpf', titulo: 'CPF', icon: '🪪', value: document.getElementById('cpf').value }
    ];
    
    campos.forEach(campo => {
        const resultado = resultados[campo.id];
        const statusClass = resultado.valido ? 'valid' : 'invalid';
        const iconStatus = resultado.valido ? '✅' : '❌';
        
        html += `
            <div class="result-item ${statusClass}">
                <div class="result-icon">${iconStatus}</div>
                <div class="result-content">
                    <h3>${campo.icon} ${campo.titulo}</h3>
                    <p class="value">${resultado.mensagem}</p>
                    ${resultado.sugestao ? `
                        <div class="suggestion-box">
                            <div class="label">💡 Correção sugerida</div>
                            <div class="correction">${resultado.sugestao}</div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    });
    
    resultsContent.innerHTML = html;
    
    // Rolar para resultados
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// ============================================
// TOGGLE PASSWORD
// ============================================
function togglePassword() {
    const input = document.getElementById('senha');
    const button = document.querySelector('.toggle-password');
    
    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈';
    } else {
        input.type = 'password';
        button.textContent = '👁️';
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Máscara de CPF
document.getElementById('cpf').addEventListener('input', function(e) {
    aplicarMascaraCPF(e.target);
});

// Validações em tempo real
document.getElementById('nome').addEventListener('blur', function(e) {
    validarNome(e.target.value);
});

document.getElementById('email').addEventListener('blur', function(e) {
    validarEmail(e.target.value);
});

document.getElementById('senha').addEventListener('input', function(e) {
    validarSenha(e.target.value);
});

document.getElementById('cpf').addEventListener('blur', function(e) {
    validarCPF(e.target.value);
});

// Submit do formulário
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Mostrar loading
    setLoading(true);
    
    // Pequeno delay para efeito visual
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Obter valores
    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        cpf: document.getElementById('cpf').value
    };
    
    // Validar todos
    const resultados = {
        nome: validarNome(dados.nome),
        email: validarEmail(dados.email),
        senha: validarSenha(dados.senha),
        cpf: validarCPF(dados.cpf)
    };
    
    // Esconder loading
    setLoading(false);
    
    // Exibir resultados
    exibirResultados(resultados);
});

// Log de inicialização
console.log('✅ Validador Inteligente carregado com sucesso!');
