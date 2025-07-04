// netlify/functions/ghostpay-webhook.js
exports.handler = async function(event, context) {
  // Garante que a função só responda a requisições POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método não permitido. Utilize POST.' };
  }

  try {
    const payload = JSON.parse(event.body); // Analisa o payload JSON enviado pela GhostPay [cite: 261, 262]

    console.log('WEBHOOK RECEBIDO: Payload completo da GhostPay:', JSON.stringify(payload, null, 2));

    // Extrai informações chave do payload do webhook [cite: 263, 264]
    const paymentId = payload.paymentId;
    const externalId = payload.externalId; // Identificador externo, se fornecido [cite: 263]
    const status = payload.status;
    const paymentMethod = payload.paymentMethod;
    const totalValue = payload.totalValue; // Corrigido para 'totalValue' com 'V' maiúsculo
    const pixCode = payload.pixCode; // Código PIX (se aplicável) [cite: 263]
    const pixQrCode = payload.pixQrCode; // QR Code PIX (se aplicável) [cite: 263]
    const customer = payload.customer; // Objeto com detalhes do cliente [cite: 265, 266]

    console.log(`WEBHOOK INFO: Payment ID: ${paymentId}, Status: ${status}, Método: ${paymentMethod}, Valor: ${totalValue / 100} R$`);
    if (customer && customer.email) {
      console.log(`WEBHOOK INFO: Cliente: ${customer.name || 'N/A'}, Email: ${customer.email}`);
    }

    // **LÓGICA DE NEGÓCIO PARA PROCESSAR EVENTOS DO WEBHOOK:**
    // [cite: 31, 32, 33]
    if (status === 'APPROVED' && paymentMethod === 'PIX') {
      console.log('--- PIX APROVADO! ---');
      console.log(`Transação ID: ${paymentId}. Cliente: ${customer?.name || 'N/A'}. Valor: R$ ${totalValue / 100}.`);
      // Ex: Lógica para marcar o pedido como pago no seu banco de dados
      // Ex: Enviar e-mail de confirmação para o cliente
      // Ex: Liberar acesso ao produto digital
    } else if (status === 'PENDING' && paymentMethod === 'PIX') {
      console.log('--- PIX PENDENTE ---');
      console.log(`Transação ID: ${paymentId}. Aguardando confirmação de pagamento.`);
    } else if (status === 'REJECTED') {
      console.log('--- PAGAMENTO REJEITADO ---');
      console.log(`Transação ID: ${paymentId}. Motivo: ${payload.reason || 'N/A'}`); // Se houver um campo 'reason' na API
    } else if (status === 'CHARGEBACK') {
      console.log('--- CHARGEBACK REGISTRADO ---');
      console.log(`Transação ID: ${paymentId}. Necessita atenção manual.`);
    } else if (status === 'REFUNDED') {
      console.log('--- PAGAMENTO REEMBOLSADO ---');
      console.log(`Transação ID: ${paymentId}. O valor foi devolvido.`);
    } else if (status === 'IN_REVIEW') { // Pode ocorrer para PIX pendente também dependendo da configuração
        console.log('--- TRANSAÇÃO EM ANÁLISE ---');
        console.log(`Transação ID: ${paymentId}. Pode necessitar revisão manual.`);
    } else {
      console.log(`--- STATUS DESCONHECIDO OU NÃO PROCESSADO: ${status} para ${paymentMethod} ---`);
    }

    // Retorna status 200 OK para a GhostPay, indicando que o webhook foi recebido com sucesso [cite: 260]
    return { statusCode: 200, body: JSON.stringify({ message: 'Webhook recebido e processado com sucesso.' }) };

  } catch (error) {
    console.error('Erro ao processar o webhook da GhostPay:', error);
    // Retorna status 500 para a GhostPay, indicando que houve um erro no processamento
    return { statusCode: 500, body: 'Erro interno do servidor ao processar o webhook.' };
  }
};