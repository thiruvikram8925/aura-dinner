import { Sequelize, DataTypes, Model } from 'sequelize';

// --- Sequelize Instance ---
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'aura_dining',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || '',
  {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    dialect: 'mysql',
    logging: false,
  }
);

// --- FoodItem Model ---
const FoodItem = sequelize.define('FoodItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.TEXT, allowNull: false },
  isVeg: { type: DataTypes.BOOLEAN, defaultValue: true },
  rating: { type: DataTypes.FLOAT, defaultValue: 5 },
}, { tableName: 'food_items', timestamps: true });

// --- Reservation Model ---
const Reservation = sequelize.define('Reservation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.STRING, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  guests: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'), defaultValue: 'pending' },
}, { tableName: 'reservations', timestamps: true });

// --- Review Model ---
const Review = sequelize.define('Review', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userName: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  comment: { type: DataTypes.TEXT, allowNull: false },
  date: { type: DataTypes.STRING, defaultValue: () => new Date().toISOString() },
}, { tableName: 'reviews', timestamps: true });

// --- Order Model ---
const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  customerName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: false },
  totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'preparing', 'delivered', 'cancelled'), defaultValue: 'pending' },
}, { tableName: 'orders', timestamps: true });

// --- OrderItem Model (replaces embedded array) ---
const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  quantity: { type: DataTypes.INTEGER },
  price: { type: DataTypes.FLOAT },
}, { tableName: 'order_items', timestamps: false });

// --- User Model ---
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('customer', 'admin'), defaultValue: 'customer' },
}, { tableName: 'users', timestamps: true });

// --- Associations ---
Order.hasMany(OrderItem, { as: 'items', foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// --- Init function to sync tables ---
export async function initDatabase() {
  await sequelize.sync({ alter: true });
  console.log('MySQL tables synced successfully.');
}

export { sequelize, FoodItem, Reservation, Review, Order, OrderItem, User };
