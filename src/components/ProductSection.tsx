import React from 'react';
import { Star, Tag } from 'lucide-react';

export const ProductSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Tag size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold">Produto</h2>
      </div>
      
      <div className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded inline-block mb-4">
        100% OFF
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3">
          <img 
            src="https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=400" 
            alt="Labubu Anjo das Nuvens"
            className="w-full rounded-lg"
          />
        </div>
        
        <div className="md:w-2/3">
          <h3 className="text-xl font-bold mb-2">Labubu Anjo das Nuvens</h3>
          <p className="text-gray-600 mb-4">
            Boneco colecionável exclusivo da temporada Do Inverno
          </p>
          
          <div className="mb-4">
            <span className="text-gray-500 line-through text-sm">DE R$ 890,90</span>
            <div className="text-2xl font-bold text-green-600">APENAS R$ 47,90</div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-600">(127 avaliações)</span>
          </div>
        </div>
      </div>
    </div>
  );
};