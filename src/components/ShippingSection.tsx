import React from 'react';
import { Package } from 'lucide-react';

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ShippingSectionProps {
  selectedShipping: string;
  onSelectShipping: (shippingId: string) => void;
}

const shippingOptions: ShippingOption[] = [
  { id: 'sedex', name: 'SEDEX', description: '1 a 2 dias', price: 29.90 },
  { id: 'pac', name: 'PAC', description: '5 a 7 dias', price: 24.49 },
  { id: 'correios', name: 'CORREIOS', description: '7 a 14 dias', price: 20.65 },
];

export const ShippingSection: React.FC<ShippingSectionProps> = ({ 
  selectedShipping, 
  onSelectShipping 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Package size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold">Escolha o Frete</h2>
      </div>
      
      <div className="space-y-3">
        {shippingOptions.map((option) => (
          <label
            key={option.id}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
              selectedShipping === option.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="shipping"
                value={option.id}
                checked={selectedShipping === option.id}
                onChange={() => onSelectShipping(option.id)}
                className="text-green-500 focus:ring-green-500"
              />
              <div>
                <div className="font-semibold">{option.name}</div>
                <div className="text-sm text-gray-600">{option.description}</div>
              </div>
            </div>
            <div className="font-semibold text-green-600">
              R$ {option.price.toFixed(2).replace('.', ',')}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export const getShippingPrice = (shippingId: string): number => {
  const option = shippingOptions.find(opt => opt.id === shippingId);
  return option ? option.price : 0;
};