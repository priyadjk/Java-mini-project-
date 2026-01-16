
import React, { useState, useMemo } from 'react';
import { PizzaType, PIZZA_PRICES, ADDON_PRICES } from './types';
import BillTerminal from './components/BillTerminal';
import PizzaCard from './components/PizzaCard';
import JavaView from './components/JavaView';

const App: React.FC = () => {
  const [selectedType, setSelectedType] = useState<PizzaType>(PizzaType.VEG);
  const [extraCheese, setExtraCheese] = useState(true);
  const [extraToppings, setExtraToppings] = useState(true);
  const [isTakeaway, setIsTakeaway] = useState(true);
  const [viewMode, setViewMode] = useState<'app' | 'code'>('app');

  const isDeluxe = selectedType === PizzaType.DELUXE_VEG || selectedType === PizzaType.DELUXE_NON_VEG;

  // Auto-select extras for Deluxe pizzas
  const currentCheese = isDeluxe || extraCheese;
  const currentToppings = isDeluxe || extraToppings;

  const totalBill = useMemo(() => {
    let total = PIZZA_PRICES[selectedType];
    if (!isDeluxe) {
      if (extraCheese) total += ADDON_PRICES.CHEESE;
      if (extraToppings) total += ADDON_PRICES.TOPPINGS;
    }
    if (isTakeaway) total += ADDON_PRICES.TAKEAWAY;
    return total;
  }, [selectedType, extraCheese, extraToppings, isTakeaway, isDeluxe]);

  const pizzaOptions = [
    { type: PizzaType.VEG, label: 'Veg Pizza', price: PIZZA_PRICES[PizzaType.VEG] },
    { type: PizzaType.NON_VEG, label: 'Non-Veg Pizza', price: PIZZA_PRICES[PizzaType.NON_VEG] },
    { type: PizzaType.DELUXE_VEG, label: 'Deluxe Veg', price: PIZZA_PRICES[PizzaType.DELUXE_VEG] },
    { type: PizzaType.DELUXE_NON_VEG, label: 'Deluxe Non-Veg', price: PIZZA_PRICES[PizzaType.DELUXE_NON_VEG] },
  ];

  return (
    <div className="min-h-screen text-slate-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Pizza Mania</h1>
            <p className="text-slate-400">Premium Pizza Bill Generator Project</p>
          </div>
          <div className="flex bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('app')}
              className={`px-6 py-2 rounded-md transition-all ${
                viewMode === 'app' ? 'bg-orange-500 text-white shadow-lg' : 'hover:text-white'
              }`}
            >
              Order App
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`px-6 py-2 rounded-md transition-all ${
                viewMode === 'code' ? 'bg-orange-500 text-white shadow-lg' : 'hover:text-white'
              }`}
            >
              Java Code
            </button>
          </div>
        </header>

        {viewMode === 'app' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Selection UI */}
            <div className="lg:col-span-7 space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm">1</span>
                  Select Pizza Type
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pizzaOptions.map((opt) => (
                    <PizzaCard
                      key={opt.type}
                      label={opt.label}
                      price={opt.price}
                      active={selectedType === opt.type}
                      onClick={() => setSelectedType(opt.type)}
                    />
                  ))}
                </div>
              </section>

              <section className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm">2</span>
                  Customize Add-ons
                </h2>
                
                <div className="space-y-6">
                  {/* Cheese Addon */}
                  <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    currentCheese ? 'border-orange-500 bg-orange-500/10' : 'border-slate-700 bg-slate-800'
                  } ${isDeluxe ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => !isDeluxe && setExtraCheese(!extraCheese)}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center text-2xl">🧀</div>
                      <div>
                        <h3 className="font-semibold">Extra Cheese</h3>
                        <p className="text-sm text-slate-400">+{ADDON_PRICES.CHEESE} Points</p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      currentCheese ? 'border-orange-500 bg-orange-500' : 'border-slate-600'
                    }`}>
                      {currentCheese && <span className="text-white text-xs">✓</span>}
                    </div>
                  </div>

                  {/* Toppings Addon */}
                  <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    currentToppings ? 'border-orange-500 bg-orange-500/10' : 'border-slate-700 bg-slate-800'
                  } ${isDeluxe ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => !isDeluxe && setExtraToppings(!extraToppings)}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-2xl">🌶️</div>
                      <div>
                        <h3 className="font-semibold">Extra Toppings</h3>
                        <p className="text-sm text-slate-400">+{ADDON_PRICES.TOPPINGS} Points</p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      currentToppings ? 'border-orange-500 bg-orange-500' : 'border-slate-600'
                    }`}>
                      {currentToppings && <span className="text-white text-xs">✓</span>}
                    </div>
                  </div>

                  {/* Takeaway */}
                  <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    isTakeaway ? 'border-orange-500 bg-orange-500/10' : 'border-slate-700 bg-slate-800'
                  } cursor-pointer`}
                  onClick={() => setIsTakeaway(!isTakeaway)}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl">🛍️</div>
                      <div>
                        <h3 className="font-semibold">Takeaway</h3>
                        <p className="text-sm text-slate-400">+{ADDON_PRICES.TAKEAWAY} Points</p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isTakeaway ? 'border-orange-500 bg-orange-500' : 'border-slate-600'
                    }`}>
                      {isTakeaway && <span className="text-white text-xs">✓</span>}
                    </div>
                  </div>
                </div>
                {isDeluxe && (
                  <p className="mt-4 text-sm text-orange-400 italic">
                    * Deluxe pizzas automatically include extra cheese and toppings.
                  </p>
                )}
              </section>
            </div>

            {/* Right Column: Terminal Bill */}
            <div className="lg:col-span-5">
              <div className="sticky top-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm">3</span>
                  Final Bill Output
                </h2>
                <BillTerminal 
                  type={selectedType}
                  cheese={currentCheese}
                  toppings={currentToppings}
                  takeaway={isTakeaway}
                  total={totalBill}
                />
              </div>
            </div>
          </div>
        ) : (
          <JavaView />
        )}
      </div>
      
      <footer className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>Built with React & Java Core Logic • Pizza Mania &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;
