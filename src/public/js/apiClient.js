window.enviarParaAPI = async (url, dados, metodo = 'POST') => {
    // Garante que qualquer alerta vermelho anterior suma antes de tentar de novo
    if (typeof window.limparErroGlobal === 'function') {
        window.limparErroGlobal();
    }

    // Coleta o token salvo no crachá do navegador após o login
    const token = localStorage.getItem('token');
    
    // Monta os cabeçalhos padrão
    const headers = { 'Content-Type': 'application/json' };
    
    // Se o usuário estiver logado, anexa automaticamente o Bearer Token para passar no seu middleware authenticate
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const configFetch = {
            method: metodo,
            headers: headers
        };

        // Regra do Fetch: Métodos GET e DELETE não podem enviar body, senão o navegador quebra
        if (metodo !== 'GET' && metodo !== 'DELETE' && dados) {
            configFetch.body = JSON.stringify(dados);
        }

        const res = await fetch(url, configFetch);

        // Se a resposta da API for sucesso (200, 201), retorna os dados ou true
        if (res.ok) {
            return { sucesso: true, status: res.status };
        }

        // SE A API FALHAR: Captura o JSON estruturado do seu globalErrorHandler
        const errorJson = await res.json();
        
        // Dispara a mensagem que veio diretamente da API na tela atual com efeito shake
        if (typeof window.mostrarErroGlobal === 'function') {
            window.mostrarErroGlobal(errorJson.message || "Erro ao processar requisição.");
        }
        
        return { sucesso: false, erro: errorJson.message };

    } catch (err) {
        console.error("Erro na comunicação centralizada:", err);
        if (typeof window.mostrarErroGlobal === 'function') {
            window.mostrarErroGlobal("Erro crítico ao tentar se comunicar com o servidor.");
        }
        return { sucesso: false, erro: "Falha de rede." };
    }
};
