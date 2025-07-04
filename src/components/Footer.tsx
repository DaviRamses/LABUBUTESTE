import React from 'react';
import { Shield, CreditCard } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield size={24} className="text-green-600" />
            <span className="text-xl font-semibold">Compre 100% Seguro</span>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-white rounded border">
              <CreditCard size={16} />
              <span className="text-sm">Visa</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white rounded border">
              <CreditCard size={16} />
              <span className="text-sm">Mastercard</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white rounded border">
              <span className="text-sm font-semibold">PIX</span>
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-600">
          <p>&copy; 2024 Labubu Store. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};