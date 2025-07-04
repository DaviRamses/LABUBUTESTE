import React from 'react';
import { User, MapPin } from 'lucide-react';

interface CustomerFormProps {
  customerData: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement: string;
  };
  onUpdateCustomer: (data: Partial<CustomerFormProps['customerData']>) => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ customerData, onUpdateCustomer }) => {
  const handleChange = (field: keyof CustomerFormProps['customerData'], value: string) => {
    onUpdateCustomer({ [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <User size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold">Suas Informações</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Nome Completo"
          value={customerData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={customerData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Telefone"
          value={customerData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="CPF"
          value={customerData.cpf}
          onChange={(e) => handleChange('cpf', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <MapPin size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold">Endereço de Entrega</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="CEP"
          value={customerData.cep}
          onChange={(e) => handleChange('cep', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Estado"
          value={customerData.state}
          onChange={(e) => handleChange('state', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Cidade"
          value={customerData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Bairro"
          value={customerData.neighborhood}
          onChange={(e) => handleChange('neighborhood', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Rua"
          value={customerData.street}
          onChange={(e) => handleChange('street', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Número"
          value={customerData.number}
          onChange={(e) => handleChange('number', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Complemento (Opcional)"
          value={customerData.complement}
          onChange={(e) => handleChange('complement', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 md:col-span-2"
        />
      </div>
    </div>
  );
};