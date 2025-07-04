import React from 'react';
import { Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-center mb-8">O que nossos clientes dizem</h2>
      
      <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150" 
            alt="Letícia Ferreira"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold">Letícia Ferreira</h4>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 italic">
          "Muito muito feliz!!! as peças do labubu são de ótima qualidade, amei!!!"
        </p>
      </div>
    </div>
  );
};