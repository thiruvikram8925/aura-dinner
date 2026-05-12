import * as THREE from 'three';

export interface FoodItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
  rating: number;
}

export interface ReviewType {
  id?: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ReservationType {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface OrderType {
  id?: string;
  customerName: string;
  email: string;
  address: string;
  items: { foodId: string; name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: string;
}
