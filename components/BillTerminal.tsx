
import React from 'react';
import { PizzaType, PIZZA_PRICES, ADDON_PRICES } from '../types';

interface BillTerminalProps {
  type: PizzaType;
  cheese: boolean;
  toppings: boolean;
  takeaway: boolean;
  total: number;
}

const BillTerminal: React.FC<BillTerminalProps> = ({ type, cheese, toppings, takeaway, total }) => {
  const isDeluxe = type === PizzaType.DELUXE_VEG || type === PizzaType.DELUXE_NON_VEG;
  
  const getDisplayName = (t: PizzaType) => {
    switch(t) {
      case PizzaType.VEG: return "Veg Pizza";
      case PizzaType.NON_VEG: return "Non-Veg Pizza";
      case PizzaType.DELUXE_VEG: return "Deluxe Veg Pizza";
      case PizzaType.DELUXE_NON_VEG: return "Deluxe Non-Veg Pizza";
      default: return "Custom Pizza";
    }
  };

  return (
    <div className="bg-[#1e1e2e] rounded-xl overflow-hidden shadow-2xl border border-slate-700">
      {/* Terminal Header */}
      <div className="bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-slate-400 font-mono flex-grow text-center">pizza_mania_v1.0.exe</div>
      </div>

      {/* Terminal Content */}
      <div className="p-8 code-font text-sm md:text-base leading-relaxed text-emerald-400 min-h-[400px]">
        <div className="mb-2 text-slate-400"># Starting Pizza Bill Generator...</div>
        <div className="mb-4 text-emerald-500 font-bold">✓ Application initialized.</div>
        
        <div className="text-slate-400">User selected: <span className="text-white">{getDisplayName(type)}</span></div>
        <div className="mb-4 text-slate-400">Base Price: <span className="text-emerald-300">₹{PIZZA_PRICES[type]}</span></div>

        {!isDeluxe && (
          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-2">
              <span className={cheese ? 'text-emerald-400' : 'text-slate-600'}>[ {cheese ? 'x' : ' '} ]</span>
              <span className={cheese ? 'text-slate-200' : 'text-slate-500'}>Extra Cheese (₹{ADDON_PRICES.CHEESE})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={toppings ? 'text-emerald-400' : 'text-slate-600'}>[ {toppings ? 'x' : ' '} ]</span>
              <span className={toppings ? 'text-slate-200' : 'text-slate-500'}>Extra Toppings (₹{ADDON_PRICES.TOPPINGS})</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mb-6">
          <span className={takeaway ? 'text-emerald-400' : 'text-slate-600'}>[ {takeaway ? 'x' : ' '} ]</span>
          <span className={takeaway ? 'text-slate-200' : 'text-slate-500'}>Takeaway Package (₹{ADDON_PRICES.TAKEAWAY})</span>
        </div>

        <div className="border-t border-slate-700 my-4 pt-4">
          <div className="text-white font-bold mb-4 tracking-widest uppercase">--- CONSOLE RECEIPT ---</div>
          
          <div className="flex justify-between mb-2">
            <span className="text-slate-400">Pizza ({type.includes('DELUXE') ? 'Deluxe' : 'Standard'})</span>
            <span className="text-emerald-300">₹{PIZZA_PRICES[type]}</span>
          </div>

          {!isDeluxe && cheese && (
            <div className="flex justify-between mb-2">
              <span className="text-slate-400">Add-on: Extra Cheese</span>
              <span className="text-emerald-300">₹{ADDON_PRICES.CHEESE}</span>
            </div>
          )}
          
          {!isDeluxe && toppings && (
            <div className="flex justify-between mb-2">
              <span className="text-slate-400">Add-on: Extra Toppings</span>
              <span className="text-emerald-300">₹{ADDON_PRICES.TOPPINGS}</span>
            </div>
          )}

          {takeaway && (
            <div className="flex justify-between mb-2">
              <span className="text-slate-400">Fee: Takeaway</span>
              <span className="text-emerald-300">₹{ADDON_PRICES.TAKEAWAY}</span>
            </div>
          )}

          <div className="text-2xl font-bold text-orange-500 mt-6 border-t-2 border-slate-700 pt-4 flex justify-between">
            <span>TOTAL DUE:</span>
            <span className="animate-pulse">₹{total}</span>
          </div>
          
          <div className="text-slate-600 mt-6 text-xs italic">
            * Generated on {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillTerminal;
