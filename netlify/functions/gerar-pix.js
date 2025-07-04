// netlify/functions/gerar-pix.js
const fetch = require('node-fetch'); // Importa a biblioteca para fazer requisições HTTP

exports.handler = async function(event, context) {
  // Garante que a função só responda a requisições POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método não permitido. Utilize POST.' };
  }

  try {
    const { name, email, cpf, phone, amount, // Dados obrigatórios do formulário
            cep, street, number, complement, district, city, state } = JSON.parse(event.body); // Dados de endereço (opcionais na API, mas bons de enviar se disponíveis)

    // Validação de dados obrigatórios antes de chamar a API
    if (!name || !email || !cpf || !phone || !amount) {
      console.error('Dados obrigatórios ausentes na requisição:', { name, email, cpf, phone, amount });
      return { statusCode: 400, body: 'Dados do cliente ou valor da transação ausentes.' };
    }

    // Obtém a Secret Key das variáveis de ambiente do Netlify [cite: 25]
    const secretKey = process.env.GHOSTPAY_API_KEY; 

    if (!secretKey) {
      console.error('Erro: Variável de ambiente GHOSTPAY_API_KEY não configurada.');
      return { statusCode: 500, body: 'Chave de API da GhostPay não configurada no ambiente.' };
    }

    // Monta o corpo da requisição conforme a documentação da GhostPay para PIX [cite: 77, 78, 140-155]
    const requestBody = {
      name: name,
      email: email,
      cpf: cpf,
      phone: phone, // A API espera telefone com código do país (ex: +5516999999999) [cite: 336]
      paymentMethod: "PIX", // Especifica o método de pagamento [cite: 145]
      amount: Math.round(amount * 100), // Converte o valor total para centavos [cite: 333] - Mínimo 500 centavos [cite: 337]
      traceable: true, // Habilita o rastreamento da transação [cite: 338]
      items: [
        {
          unitPrice: Math.round(amount * 100), // Preço unitário em centavos [cite: 90]
          title: "Labubu Anjo das Nuvens + Frete", // Título do item [cite: 90]
          quantity: 1, // Quantidade do item [cite: 90]
          tangible: true // Item é tangível (Boneco é físico) [cite: 90]
        }
      ],
      // Endereço (campos opcionais na API, mas incluídos se vierem do front-end) [cite: 77]
      cep: cep || undefined, // undefined para não enviar se estiver vazio
      street: street || undefined,
      number: number || undefined,
      complement: complement || undefined,
      district: district || undefined,
      city: city || undefined,
      state: state || undefined,
      // URL para receber notificações de postback (webhook) [cite: 78]
      postbackUrl: process.env.URL ? `${process.env.URL}/.netlify/functions/ghostpay-webhook` : undefined,
    };

    // **ATENÇÃO: SUBSTITUA 'https://example.com.br' PELO DOMÍNIO REAL DA API DA GHOSTPAY!** [cite: 39, 71]
    const GHOSTPAY_API_ENDPOINT = 'https://app.ghostspaysv1.com/api/v1/transaction.purchase'; 

    console.log('DEBUG: Enviando requisição para GhostPay:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(GHOSTPAY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': secretKey // Autenticação com a Secret Key [cite: 43, 75]
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json(); // Analisa a resposta da API [cite: 156]

    // Tratamento de erros da resposta da API
    if (!response.ok) {
      console.error('Erro da API GhostPay. Status:', response.status, 'Resposta:', data);
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: data.message || 'Erro ao gerar PIX na GhostPay.', details: data })
      };
    }

    // Extrai os dados do PIX da resposta [cite: 172, 173]
    // A documentação menciona pixQrCode e pixCode na resposta de getPayment e webhook payload.
    // Assumimos que para uma transação PIX, eles estarão presentes na resposta de purchase.
    const pixCode = data.pixCode; 
    const pixQrCode = data.pixQrCode; 

    // Valida se os dados essenciais do PIX foram retornados
    if (!pixCode && !pixQrCode) {
      console.error('Resposta da GhostPay bem-sucedida, mas não contém pixCode ou pixQrCode esperados:', data);
      return { statusCode: 500, body: 'Falha ao obter dados do PIX da GhostPay na resposta.' };
    }

    console.log('DEBUG: PIX gerado com sucesso pela GhostPay.');

    // Retorna os dados do PIX para o front-end
    return {
      statusCode: 200,
      body: JSON.stringify({
        pixCode: pixCode,
        qrCodeImage: pixQrCode, // Renomeado para 'qrCodeImage' para consistência no front-end
        transactionId: data.id || data.transactionId // ID da transação [cite: 159, 162, 208]
      })
    };

  } catch (error) {
    console.error('Erro na execução da função gerar-pix:', error);
    return { statusCode: 500, body: 'Erro interno do servidor ao processar a requisição.' };
  }
};