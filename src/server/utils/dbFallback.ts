import { sequelize } from '../models';

// Simple in-memory storage fallback
const mockStorage: Record<string, any[]> = {
  FoodItem: [
    { _id: '1', name: 'Truffle Risotto', description: 'Arborio rice with black truffle shavings, 24-month aged parmesan, and micro-herbs.', price: 42, category: 'Main Course', image: 'https://images.unsplash.com/photo-1633964913295-ceb4c82487b9?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.8 },
    { _id: '2', name: 'Gold Leaf Wagyu', description: 'Grade A5 Miyazakigyu beef topped with 24k edible gold leaf and sea salt.', price: 185, category: 'Main Course', image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800', isVeg: false, rating: 5.0 },
    { _id: '3', name: 'Caviar Scallops', description: 'Hokkaido scallops seared in cultured butter, topped with Beluga caviar.', price: 65, category: 'Starters', image: 'https://images.unsplash.com/photo-1599458252204-763ff81b19b9?auto=format&fit=crop&q=80&w=800', isVeg: false, rating: 4.9 },
    { _id: '4', name: 'Saffron Lobster', description: 'Butter-poached Brittany lobster in a velvety saffron-infused bisque.', price: 95, category: 'Main Course', image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&q=80&w=800', isVeg: false, rating: 4.7 },
    { id: '5', name: 'Midnight Lava Cake', description: '70% Valrhona dark chocolate lava cake with gold dust and Tahitian vanilla.', price: 28, category: 'Desserts', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.9 },
    { id: '6', name: 'Crystal Champagne', description: 'Vintage Cuvée served in hand-blown crystal, subtle notes of toasted brioche.', price: 45, category: 'Drinks', image: 'https://images.unsplash.com/photo-1594460541524-460bc39e829a?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 5.0 },
    { id: '7', name: 'Oysters Rockefeller', description: 'Six Pacific oysters with spinach, Pernod, and a toasted panko crust.', price: 38, category: 'Starters', image: 'https://images.unsplash.com/photo-1599249300675-c39f1dd2d6be?auto=format&fit=crop&q=80&w=800', isVeg: false, rating: 4.8 },
    { id: '8', name: 'Chilean Sea Bass', description: 'Pan-seared sea bass with a miso glaze and bok choy.', price: 78, category: 'Main Course', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800', isVeg: false, rating: 4.7 },
    { id: '9', name: 'Tiramisu de Luxe', description: 'Traditional Italian dessert with a modern luxury twist and gold leaf.', price: 24, category: 'Desserts', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.8 },
    { id: '10', name: 'Smoked Old Fashioned', description: 'Premium bourbon smoked with cherry wood, served with a clear ice sphere.', price: 32, category: 'Drinks', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.9 },
    { id: '11', name: 'Wild Mushroom Pasta', description: 'Fresh pappardelle with a medley of wild foraged mushrooms and truffle butter.', price: 55, category: 'Main Course', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.6 },
    { id: '12', name: 'Wagyu Beef Carpaccio', description: 'Thinly sliced Wagyu beef with capers, shallots, and a truffle vinaigrette.', price: 52, category: 'Starters', image: 'https://images.unsplash.com/photo-1633504581290-7164923f796d?auto=format&fit=crop&q=80&w=800', isVeg: false, rating: 4.9 },
    { id: '13', name: 'Burrata & Tomato', description: 'Creamy burrata with heirloom tomatoes, aged balsamic, and basil oil.', price: 34, category: 'Starters', image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9ebc4a5?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.7 },
    { id: '14', name: 'Escargot Bourgogne', description: 'French snails baked in garlic-parsley butter and white wine.', price: 42, category: 'Starters', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800', isVeg: false, rating: 4.8 },
    { id: '15', name: 'Dry-Aged Ribeye', description: '45-day dry-aged prime ribeye with roasted bone marrow and red wine jus.', price: 110, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800', isVeg: false, rating: 4.9 },
    { id: '16', name: 'Vegetable Wellington', description: 'Roasted root vegetables and mushrooms in a flaky golden puff pastry.', price: 48, category: 'Main Course', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.6 },
    { id: '17', name: 'Crème Brûlée', description: 'Classic Madagascan vanilla bean custard with a burnt sugar crust.', price: 22, category: 'Desserts', image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.7 },
    { id: '18', name: 'Macaron Selection', description: 'A palette of six artisanal macarons with seasonal luxury fillings.', price: 26, category: 'Desserts', image: 'https://images.unsplash.com/photo-1569864358642-9d16197025c1?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.8 },
    { id: '19', name: 'Espresso Martini', description: 'Freshly pulled espresso with premium vodka and coffee liqueur.', price: 28, category: 'Drinks', image: 'https://images.unsplash.com/photo-1545438102-799c3991ffb2?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.9 },
    { id: '20', name: 'Hibiscus Mocktail', description: 'Sparkling hibiscus infusion with lime, mint, and elderflower syrup.', price: 18, category: 'Drinks', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.7 },
    { id: '21', name: 'Tuna Tartare', description: 'Ahi tuna with avocado, ginger-soy dressing, and wonton crisps.', price: 46, category: 'Starters', image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?auto=format&fit=crop&q=80&w=800', isVeg: false, rating: 4.9 },
    { id: '22', name: 'Foie Gras Torchon', description: 'Pressed foie gras with fig jam, brioche toast, and sea salt.', price: 58, category: 'Starters', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800', isVeg: false, rating: 4.8 },
    { id: '23', name: 'Heirloom Carrot Salad', description: 'Roasted carrots with spiced yogurt, honey, and toasted seeds.', price: 28, category: 'Starters', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.7 },
    { id: '24', name: 'Rack of Lamb', description: 'Herb-crusted lamb with pomme purée and mint-infused jus.', price: 92, category: 'Main Course', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=800', isVeg: false, rating: 4.9 },
    { id: '25', name: 'Roasted Duck Breast', description: 'Honey-glazed duck with parsnip cream and cherry reduction.', price: 85, category: 'Main Course', image: 'https://images.unsplash.com/photo-1516685018646-548388daf2cc?auto=format&fit=crop&q=80&w=800', isVeg: false, rating: 4.8 },
    { id: '26', name: 'King Crab Legs', description: 'Alaskan king crab with drawn butter and grilled lemon.', price: 120, category: 'Main Course', image: 'https://images.unsplash.com/photo-1590759021021-c74149202555?auto=format&fit=crop&q=80&w=800', isVeg: false, rating: 5.0 },
    { id: '27', name: 'Berry Pavlova', description: 'Light meringue with chantilly cream and fresh summer berries.', price: 22, category: 'Desserts', image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.9 },
    { id: '28', name: 'Artisanal Cheese Board', description: 'Selection of three premium cheeses with honey and nuts.', price: 35, category: 'Desserts', image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.8 },
    { id: '29', name: 'Negroni Sbagliato', description: 'Classic Negroni with sparkling wine instead of gin.', price: 26, category: 'Drinks', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.8 },
    { id: '30', name: 'Virgin Mary', description: 'Spiced tomato juice with celery and house-made pickle.', price: 16, category: 'Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.7 },
    { id: '31', name: "Chef Vikram's Signature", description: 'A secret blend of premium ingredients, prepared exclusively by the executive chef.', price: 250, category: 'Main Course', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=1200', isVeg: false, rating: 5.0 },
    { id: '32', name: 'Golden Leaf Soufflé', description: 'Grand Marnier soufflé with edible 24k gold leaf and orange zest.', price: 34, category: 'Desserts', image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.9 },
    { id: '33', name: 'Exotic Fruit Carpaccio', description: 'Thinly sliced seasonal tropical fruits with a mint-lime reduction.', price: 28, category: 'Desserts', image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.7 },
    { id: '34', name: 'Velvet Pistachio Mousse', description: 'Sicilian pistachio mousse with a dark chocolate soil and raspberry gel.', price: 32, category: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.8 },
    { id: '35', name: 'Aged Balsamic Strawberries', description: 'Organic strawberries macerated in 25-year-old balsamic with mascarpone.', price: 26, category: 'Desserts', image: 'https://images.unsplash.com/photo-1464305795204-6f5bdf7f8241?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.6 },
    { id: '36', name: 'Artisan Sorbet Trio', description: 'Hand-churned seasonal sorbets: Blood Orange, Yuzu, and Champagne.', price: 24, category: 'Desserts', image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.7 },
    { id: '37', name: 'Royal Gold Martini', description: 'Ultra-premium vodka with a hint of dry vermouth and a gold-dipped olive.', price: 38, category: 'Drinks', image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 5.0 },
    { id: '38', name: 'Smoked Rosemary Gin', description: 'Botanical gin infused with house-smoked rosemary and organic tonic.', price: 32, category: 'Drinks', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.9 },
    { id: '39', name: 'Vintage Port Selection', description: 'A glass of 30-year-old aged tawny port with notes of walnut and dried fruit.', price: 45, category: 'Drinks', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.8 },
    { id: '40', name: 'Blue Mountain Espresso', description: 'Rare Jamaican Blue Mountain coffee served with a side of dark chocolate.', price: 18, category: 'Drinks', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.9 },
    { id: '41', name: 'Rare White Tea Infusion', description: 'Delicate silver needle white tea served in a traditional porcelain set.', price: 22, category: 'Drinks', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=800', isVeg: true, rating: 4.7 },
  ],
  Order: [],
  Reservation: [],
  Review: [
    { _id: '1', userName: 'Alexander Knight', rating: 5, comment: 'An absolute masterpiece of culinary engineering.', date: new Date().toISOString() },
    { _id: '2', userName: 'Sophia Loren', rating: 5, comment: 'The ambiance is as exquisite as the Truffle Medallion.', date: new Date().toISOString() },
  ],
  User: []
};

let dbConnected = false;

export const setDbConnected = (status: boolean) => {
  dbConnected = status;
};

export const getMockData = (modelName: string) => {
  return mockStorage[modelName] || [];
};

export const saveMockData = (modelName: string, data: any) => {
  if (!mockStorage[modelName]) mockStorage[modelName] = [];
  const newItem = { ...data, _id: Math.random().toString(36).substr(2, 9), createdAt: new Date() };
  mockStorage[modelName].push(newItem);
  return newItem;
};

export const isDbConnected = () => dbConnected;
