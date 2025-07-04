import React from 'react';
import { getShippingPrice } from './ShippingSection';

interface PaymentSummaryProps {
  selectedShipping: string;
  productPrice: number;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({ 
  selectedShipping, 
  productPrice 
}) => {
  const shippingPrice = getShippingPrice(selectedShipping);
  const total = productPrice + shippingPrice;

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Produto:</span>
          <span className="font-semibold">R$ {productPrice.toFixed(2).replace('.', ',')}</span>
        </div>
        <div className="flex justify-between">
          <span>Frete:</span>
          <span className="font-semibold">R$ {shippingPrice.toFixed(2).replace('.', ',')}</span>
        </div>
        <div className="border-t pt-2">
          <div className="flex justify-between text-lg font-bold">
            <span>Total a Pagar:</span>
            <span className="text-green-600">R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};