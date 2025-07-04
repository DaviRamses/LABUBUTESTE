import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CountdownTimer } from './components/CountdownTimer';
import { ProductSection } from './components/ProductSection';
import { CustomerForm } from './components/CustomerForm';
import { ShippingSection, getShippingPrice } from './components/ShippingSection';
import { PaymentSummary } from './components/PaymentSummary';
import { PIXSection } from './components/PIXSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

function App() {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    cep: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
    complement: '',
  });

  const [selectedShipping, setSelectedShipping] = useState('pac');
  const [pixCode, setPixCode] = useState('');
  const [showPIX, setShowPIX] = useState(false);

  const productPrice = 47.90;

  const handleUpdateCustomer = (data: Partial<typeof customerData>) => {
    setCustomerData(prev => ({ ...prev, ...data }));
  };

  const handleGeneratePIX = () => {
    // Validação simples dos campos obrigatórios
    if (!customerData.name || !customerData.email || !customerData.phone || !customerData.cpf) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    // Gera um código PIX aleatório
    const randomPIXCode = uuidv4().replace(/-/g, '').toUpperCase();
    setPixCode(randomPIXCode);
    setShowPIX(true);

    const total = productPrice + getShippingPrice(selectedShipping);
    alert(`PIX gerado com sucesso! Valor total: R$ ${total.toFixed(2).replace('.', ',')}`);
  };

  const total = productPrice + getShippingPrice(selectedShipping);

  return (
    <div className="min-h-screen bg-gray-50">
      <CountdownTimer />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <ProductSection />
          
          <CustomerForm 
            customerData={customerData}
            onUpdateCustomer={handleUpdateCustomer}
          />
          
          <ShippingSection 
            selectedShipping={selectedShipping}
            onSelectShipping={setSelectedShipping}
          />
          
          <PaymentSummary 
            selectedShipping={selectedShipping}
            productPrice={productPrice}
          />
          
          <button
            onClick={handleGeneratePIX}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            GERAR PIX
          </button>
          
          <PIXSection 
            pixCode={pixCode}
            isVisible={showPIX}
            total={total}
          />
        </div>
        
        <TestimonialsSection />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;