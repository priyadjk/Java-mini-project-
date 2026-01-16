
import React from 'react';

interface PizzaCardProps {
  label: string;
  price: number;
  active: boolean;
  onClick: () => void;
}

const PizzaCard: React.FC<PizzaCardProps> = ({ label, price, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-6 rounded-2xl border-2 transition-all text-left overflow-hidden group ${
        active 
          ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.15)]' 
          : 'border-slate-700 bg-slate-800 hover:border-slate-500 hover:bg-slate-700/50'
      }`}
    >
      <div className="relative z-10">
        <h3 className={`text-lg font-bold mb-1 ${active ? 'text-white' : 'text-slate-300'}`}>{label}</h3>
        <p className="text-2xl font-bold text-orange-500">₹{price}</p>
      </div>
      
      {/* Decorative pizza slice in background */}
      <div className={`absolute -bottom-4 -right-4 text-6xl opacity-10 transition-transform duration-500 ${
        active ? 'rotate-12 scale-110 opacity-20' : 'group-hover:rotate-6'
      }`}>
        🍕
      </div>
      
      {active && (
        <div className="absolute top-3 right-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </span>
        </div>
      )}
    </button>
  );
};

export default PizzaCard;
