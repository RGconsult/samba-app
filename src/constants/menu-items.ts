import type { ImageSourcePropType } from 'react-native';

import type { BrandId } from '@/constants/brands';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** Price in RWF. */
  price: number;
  /** Matches the real site's subcategory pills (e.g. pizza sizes, chicken combos). */
  category: string;
  /**
   * Dummy placeholder — reuses the brand's own photos since there's no real
   * per-product photography yet. Swap for a real product photo per item once
   * the backend/catalog exists; the shape (every item has an `image`) is
   * already what the UI expects, so that swap won't need any other changes.
   */
  image: ImageSourcePropType;
}

const supermarket1 = require('@/assets/images/supermarket1.jpg');
const supermarket2 = require('@/assets/images/supermarket2.jpg');
const pizza1 = require('@/assets/images/pizza1.jpg');
const pizza2 = require('@/assets/images/pizza2.jpg');
const chicken1 = require('@/assets/images/chicken1.jpg');
const chicken2 = require('@/assets/images/chicken2.jpg');
const burger1 = require('@/assets/images/burger1.jpg');
const burger2 = require('@/assets/images/burger2.jpg');
const snacks1 = require('@/assets/images/snacks1.jpg');
const snacks2 = require('@/assets/images/snacks2.jpg');
const salad1 = require('@/assets/images/salad1.jpg');
const salad2 = require('@/assets/images/salad2.jpg');
const coffee1 = require('@/assets/images/coffee1.jpg');
const coffee2 = require('@/assets/images/coffee2.jpg');
const drinks1 = require('@/assets/images/drinks1.jpg');
const drinks2 = require('@/assets/images/drinks2.jpg');

export const MENU_ITEMS: Record<BrandId, MenuItem[]> = {
  supermarket: [
    { id: 'sm-bread', name: 'Fresh Bread Loaf', description: 'Baked daily, still warm', price: 1200, category: 'Bakery', image: supermarket1 },
    { id: 'sm-bananas', name: 'Bananas (1kg)', description: 'Locally grown, ripe and sweet', price: 800, category: 'Produce', image: supermarket2 },
    { id: 'sm-milk', name: 'Fresh Milk (1L)', description: 'Full cream dairy milk', price: 1500, category: 'Dairy', image: supermarket1 },
    { id: 'sm-eggs', name: 'Eggs (Tray of 30)', description: 'Farm-fresh eggs', price: 4500, category: 'Dairy', image: supermarket2 },
    { id: 'sm-rice', name: 'Rice (5kg)', description: 'Premium long-grain rice', price: 6000, category: 'Pantry', image: supermarket1 },
  ],
  pizza: [
    { id: 'pz-margherita', name: 'Margherita', description: 'Tomato, mozzarella, fresh basil', price: 6000, category: 'Regular', image: pizza1 },
    { id: 'pz-hawaiian', name: 'Hawaiian', description: 'Ham, pineapple, mozzarella', price: 6200, category: 'Regular', image: pizza2 },
    { id: 'pz-pepperoni', name: 'Pepperoni Feast', description: 'Loaded with spicy pepperoni', price: 7500, category: 'Medium', image: pizza2 },
    { id: 'pz-bbq-chicken', name: 'BBQ Chicken Pizza', description: 'Smoky BBQ sauce, grilled chicken', price: 8000, category: 'Medium', image: pizza1 },
    { id: 'pz-four-seasons', name: 'Four Seasons', description: 'Ham, mushroom, artichoke, olives', price: 8500, category: 'Large', image: pizza1 },
    { id: 'pz-meat-lovers', name: 'Meat Lovers', description: 'Pepperoni, sausage, bacon, beef', price: 9000, category: 'Large', image: pizza2 },
    { id: 'pz-veggie', name: 'Veggie Supreme', description: 'Peppers, olives, onion, mushroom', price: 9500, category: 'Mega', image: pizza2 },
    { id: 'pz-supreme', name: 'Supreme Feast', description: 'Everything — meats, veggies, extra cheese', price: 10500, category: 'Mega', image: pizza1 },
  ],
  chicken: [
    { id: 'ck-quarter', name: 'Flame-Grilled Quarter', description: 'Juicy quarter chicken, char-grilled', price: 4000, category: 'Chicken', image: chicken1 },
    { id: 'ck-wings', name: 'Spicy Wings (6pc)', description: 'Tossed in house hot sauce', price: 5000, category: 'Chicken', image: chicken2 },
    { id: 'ck-combo', name: 'Drumstick Combo', description: '2 drumsticks with fries', price: 4500, category: 'Chicken & Chips', image: chicken1 },
    { id: 'ck-half', name: 'Half Chicken & Chips', description: 'Half chicken with a side of fries', price: 6500, category: 'Chicken & Chips', image: chicken2 },
    { id: 'ck-bucket', name: 'Family Bucket', description: '8 pieces, feeds the whole table', price: 12000, category: 'Family Meals', image: chicken1 },
  ],
  burger: [
    { id: 'bg-classic', name: 'Classic Beef Burger', description: 'Beef patty, lettuce, tomato, house sauce', price: 4500, category: 'Burgers', image: burger1 },
    { id: 'bg-cheese', name: 'Cheese Burger', description: 'Beef patty loaded with melted cheddar', price: 5000, category: 'Burgers', image: burger2 },
    { id: 'bg-chicken', name: 'Chicken Burger', description: 'Crispy chicken fillet, mayo, pickles', price: 4800, category: 'Burgers', image: burger1 },
    { id: 'bg-combo', name: 'Burger Combo', description: 'Any burger with fries and a drink', price: 6500, category: 'Burger Combos', image: burger2 },
    { id: 'bg-double-combo', name: 'Double Combo', description: 'Two burgers, fries, and two drinks', price: 10000, category: 'Burger Combos', image: burger1 },
  ],
  snacks: [
    { id: 'sn-fries', name: 'French Fries', description: 'Golden and crispy, lightly salted', price: 2000, category: 'Snacks', image: snacks1 },
    { id: 'sn-onion-rings', name: 'Onion Rings', description: 'Crunchy battered onion rings', price: 2200, category: 'Snacks', image: snacks2 },
    { id: 'sn-spring-rolls', name: 'Spring Rolls', description: 'Vegetable-filled, served with dip', price: 2500, category: 'Snacks', image: snacks1 },
    { id: 'sn-pops', name: 'Chicken Pops', description: 'Bite-sized crispy chicken poppers', price: 3000, category: 'Chicken Pops', image: snacks2 },
  ],
  salad: [
    { id: 'sl-garden', name: 'Garden Salad', description: 'Fresh mixed greens, tomato, cucumber', price: 3000, category: 'Green Salads', image: salad1 },
    { id: 'sl-coleslaw', name: 'Coleslaw', description: 'Creamy shredded cabbage & carrot', price: 2000, category: 'Green Salads', image: salad2 },
    { id: 'sl-caesar', name: 'Caesar Salad', description: 'Romaine, parmesan, croutons, Caesar dressing', price: 3800, category: 'Protein Salads', image: salad2 },
    { id: 'sl-chicken', name: 'Chicken Salad', description: 'Grilled chicken over mixed greens', price: 4500, category: 'Protein Salads', image: salad1 },
  ],
  coffee: [
    { id: 'cf-cappuccino', name: 'Cappuccino', description: 'Espresso, steamed milk, foam', price: 2000, category: 'Hot Beverages', image: coffee1 },
    { id: 'cf-latte', name: 'Latte', description: 'Smooth espresso with steamed milk', price: 2200, category: 'Hot Beverages', image: coffee2 },
    { id: 'cf-espresso', name: 'Espresso', description: 'Double shot, rich and bold', price: 1500, category: 'Hot Beverages', image: coffee1 },
    { id: 'cf-iced', name: 'Iced Coffee', description: 'Chilled and refreshing', price: 2500, category: 'Cold/Iced Drinks', image: coffee2 },
    { id: 'cf-iced-latte', name: 'Iced Latte', description: 'Espresso and cold milk over ice', price: 2600, category: 'Cold/Iced Drinks', image: coffee1 },
  ],
  drinks: [
    { id: 'dr-mango-juice', name: 'Mango Juice', description: 'Fresh-pressed, no added sugar', price: 2000, category: 'Fresh Juice', image: drinks1 },
    { id: 'dr-passion-juice', name: 'Passion Fruit Juice', description: 'Tangy and fresh-pressed', price: 2000, category: 'Fresh Juice', image: drinks2 },
    { id: 'dr-smoothie', name: 'Fruit Smoothie', description: 'Blended fresh fruit, thick and cold', price: 2800, category: 'Smoothies & Shakes', image: drinks1 },
    { id: 'dr-shake', name: 'Milkshake', description: 'Vanilla, chocolate, or strawberry', price: 2500, category: 'Smoothies & Shakes', image: drinks2 },
    { id: 'dr-soda', name: 'Soft Drink', description: 'Coke, Fanta, or Sprite', price: 1000, category: 'Soft Drinks', image: drinks1 },
  ],
};
