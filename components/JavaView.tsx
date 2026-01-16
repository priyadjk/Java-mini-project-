
import React from 'react';

const JavaView: React.FC = () => {
  const codeString = `import java.util.Scanner;

/**
 * Pizza Bill Generator - Core Logic
 * Features: Veg/Non-Veg differentiation, Deluxe versions, 
 * Extra Cheese, Extra Toppings, and Takeaway charges.
 */
class Pizza {
    protected int price;
    private Boolean isVeg;
    
    // Fixed pricing as per requirements
    private final int extraCheesePrice = 100;
    private final int extraToppingsPrice = 150;
    private final int takeawayPrice = 20;
    
    protected int basePizzaPrice;
    private boolean isExtraCheeseAdded = false;
    private boolean isExtraToppingsAdded = false;
    private boolean isOptedForTakeaway = false;

    public Pizza(Boolean isVeg) {
        this.isVeg = isVeg;
        if (this.isVeg) {
            this.price = 300;
        } else {
            this.price = 400;
        }
        this.basePizzaPrice = this.price;
    }

    public void addExtraCheese() {
        if (!isExtraCheeseAdded) {
            isExtraCheeseAdded = true;
            this.price += extraCheesePrice;
        }
    }

    public void addExtraToppings() {
        if (!isExtraToppingsAdded) {
            isExtraToppingsAdded = true;
            this.price += extraToppingsPrice;
        }
    }

    public void takeAway() {
        if (!isOptedForTakeaway) {
            isOptedForTakeaway = true;
            this.price += takeawayPrice;
        }
    }

    public void getBill() {
        System.out.println("----- PIZZA MANIA RECEIPT -----");
        System.out.println("Base Pizza: " + basePizzaPrice);
        
        if (isExtraCheeseAdded) {
            System.out.println("Extra Cheese Added: " + extraCheesePrice);
        }
        if (isExtraToppingsAdded) {
            System.out.println("Extra Toppings Added: " + extraToppingsPrice);
        }
        if (isOptedForTakeaway) {
            System.out.println("Takeaway Charges: " + takeawayPrice);
        }
        
        System.out.println("-------------------------------");
        System.out.println("Total Bill: " + this.price);
        System.out.println("-------------------------------");
    }
}

/**
 * Deluxe Pizza variant pre-loaded with Cheese and Toppings
 */
class DeluxePizza extends Pizza {
    public DeluxePizza(Boolean isVeg) {
        super(isVeg);
        // Deluxe prices are higher because they include addons
        // Deluxe Veg: 300 + 100 + 150 = 550
        // Deluxe Non-Veg: 400 + 100 + 150 = 650
        super.addExtraCheese();
        super.addExtraToppings();
    }

    @Override
    public void addExtraCheese() {
        // Prevent additional charges for Deluxe
    }

    @Override
    public void addExtraToppings() {
        // Prevent additional charges for Deluxe
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("--- Scenario 1: Veg Pizza with Extras ---");
        Pizza vegPizza = new Pizza(true);
        vegPizza.addExtraCheese();
        vegPizza.addExtraToppings();
        vegPizza.takeAway();
        vegPizza.getBill();

        System.out.println("\\n--- Scenario 2: Deluxe Non-Veg Pizza ---");
        DeluxePizza dp = new DeluxePizza(false);
        dp.takeAway();
        dp.getBill();
    }
}`;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
        <div className="bg-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-orange-500 rounded text-xs font-bold text-white uppercase">Java</span>
            <span className="text-slate-300 font-mono text-sm">PizzaBillGenerator.java</span>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(codeString);
              alert("Code copied to clipboard!");
            }}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 bg-slate-700/50 px-3 py-1.5 rounded"
          >
            Copy Code
          </button>
        </div>
        <div className="p-6 overflow-auto max-h-[70vh]">
          <pre className="code-font text-sm leading-relaxed text-emerald-300">
            {codeString}
          </pre>
        </div>
      </div>
      <div className="mt-8 bg-orange-500/10 border border-orange-500/20 p-6 rounded-2xl">
        <h4 className="text-orange-400 font-bold mb-2 flex items-center gap-2">
          💡 Implementation Details
        </h4>
        <ul className="text-slate-400 space-y-2 text-sm list-disc pl-5">
          <li><strong>Base Pizza:</strong> 300 (Veg) / 400 (Non-Veg).</li>
          <li><strong>Deluxe Pizza:</strong> Pre-calculated at 550 (Veg) / 650 (Non-Veg) using inheritance.</li>
          <li><strong>Add-ons:</strong> Cheese (100), Toppings (150), and Takeaway (20) are added individually.</li>
          <li><strong>Method Overriding:</strong> Used in <code>DeluxePizza</code> to prevent double-charging for cheese and toppings.</li>
        </ul>
      </div>
    </div>
  );
};

export default JavaView;
