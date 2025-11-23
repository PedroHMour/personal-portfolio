<?php
// ==========================================================================
// CONFIGURAÇÕES OBRIGATÓRIAS
// ==========================================================================

// 1. Para onde devem ir as mensagens? (Seu e-mail pessoal ou profissional)
$para_onde_vai = "henriquesilvamoura81@gmail.com"; 

// 2. Qual e-mail vai fazer a entrega técnica?
// IMPORTANTE: Este e-mail PRECISA existir no seu painel da HostGator/Titan.
// Não use Gmail/Hotmail aqui. Use algo como: contato@seusite.com.br
$quem_entrega = "contato@pedrohenrique.com"; 

// ==========================================================================
// LÓGICA DE ENVIO (NÃO PRECISA MEXER ABAIXO)
// ==========================================================================

$assunto = "Novo Contato do Site";

// Verifica se o formulário foi submetido via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Coleta e Limpa os Dados
    $nome_cliente = strip_tags(trim($_POST["nome"]));
    $email_cliente = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensagem_cliente = strip_tags(trim($_POST["mensagem"]));

    // 2. Validação Básica
    if (empty($nome_cliente) || empty($mensagem_cliente) || !filter_var($email_cliente, FILTER_VALIDATE_EMAIL)) {
        echo "<script>
                alert('Por favor, preencha todos os campos corretamente.');
                window.history.back();
              </script>";
        exit;
    }

    // 3. Monta o Corpo do E-mail
    $corpo_email = "Você recebeu uma nova mensagem pelo site.\n\n";
    $corpo_email .= "Nome: $nome_cliente\n";
    $corpo_email .= "E-mail: $email_cliente\n";
    $corpo_email .= "------------------------------------\n";
    $corpo_email .= "Mensagem:\n$mensagem_cliente\n";

    // 4. Configura os Cabeçalhos (Headers)
    // O 'From' deve ser o e-mail do servidor (HostGator) para não cair no SPAM
    $headers = "From: $quem_entrega\r\n";
    
    // O 'Reply-To' é o e-mail do cliente. Ao clicar em responder, vai para ele.
    $headers .= "Reply-To: $email_cliente\r\n";
    
    // Identificação do sistema de envio
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 5. Tenta Enviar o E-mail
    // O parâmetro "-f" força o remetente no envelope do e-mail (Crucial para HostGator)
    if (mail($para_onde_vai, $assunto, $corpo_email, $headers, "-f$quem_entrega")) {
        // Sucesso
        echo "<script>
                alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
                window.location.href = 'index.html'; 
              </script>";
    } else {
        // Erro no servidor
        echo "<script>
                alert('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.');
                window.history.back();
              </script>";
    }

} else {
    // Se tentar acessar o arquivo diretamente pela URL
    header("Location: index.html");
    exit;
}
?>