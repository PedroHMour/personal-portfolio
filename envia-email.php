<?php
// --- CONFIGURAÇÃO ---
// COLOQUE AQUI O SEU E-MAIL TITAN / HOSTGATOR
$para = "contato@pedrohenriquedev.com"; 
$assunto = "Novo contato do Portfólio";

// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Coleta e Limpa os Dados (Segurança básica)
    $nome = strip_tags(trim($_POST["nome"]));
    $email_cliente = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensagem = strip_tags(trim($_POST["mensagem"]));

    // 2. Validação Simples
    if (empty($nome) || empty($mensagem) || !filter_var($email_cliente, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Por favor, preencha todos os campos corretamente.'); window.history.back();</script>";
        exit;
    }

    // 3. Monta o Corpo do E-mail
    $corpo_email = "Nome: $nome\n";
    $corpo_email .= "Email: $email_cliente\n\n";
    $corpo_email .= "Mensagem:\n$mensagem\n";

    // 4. Cabeçalhos (Headers) - Essencial para não cair no SPAM
    // O 'From' deve ser um e-mail válido DO SEU DOMÍNIO (ex: site@pedrohenrique.com)
    // Se não tiver um, use o próprio $para, mas defina o Reply-To como o e-mail do cliente.
    $headers = "From: $para\r\n";
    $headers .= "Reply-To: $email_cliente\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 5. Envia o E-mail
    if (mail($para, $assunto, $corpo_email, $headers)) {
        // Sucesso: Redireciona de volta com alerta
        echo "<script>
                alert('Mensagem enviada com sucesso! Em breve entrarei em contato.');
                window.location.href = 'index.html'; 
              </script>";
    } else {
        // Erro
        echo "<script>
                alert('Houve um erro ao enviar a mensagem. Tente novamente mais tarde ou contate via LinkedIn.');
                window.history.back();
              </script>";
    }

} else {
    // Se tentarem acessar o arquivo diretamente sem enviar o formulário
    header("Location: index.html");
    exit;
}
?>