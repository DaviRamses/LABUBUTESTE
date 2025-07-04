import React from 'react';

interface PIXSectionProps {
  pixCode: string;
  isVisible: boolean;
  total: number;
}

export const PIXSection: React.FC<PIXSectionProps> = ({ pixCode, isVisible, total }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixCode);
    alert('Código PIX copiado para a área de transferência!');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-center">PIX Gerado com Sucesso!</h3>
      <div className="text-center mb-4">
        <div className="text-xl font-bold text-green-600">
          Valor: R$ {total.toFixed(2).replace('.', ',')}
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código PIX (Copia e Cola):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={pixCode}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Copiar
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Copie o código PIX para realizar o pagamento</p>
      </div>
    </div>
  );
};