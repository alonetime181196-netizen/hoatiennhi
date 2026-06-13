/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  productCombo: string;
  stylePreference: 'round' | 'blossom';
  note: string;
  price: number;
  orderDate: string;
  status: 'Pending' | 'Shipping' | 'Completed' | 'Cancelled';
  isTrash: boolean;
  paymentMethod: 'COD' | 'MOMO' | 'BANK_TRANSFER';
}

export interface Review {
  id: string;
  author: string;
  role: 'Mẹ bỉm sữa' | 'Quý cô công sở' | 'Người mẫu ảnh' | 'Học sinh/Sinh viên';
  rating: number;
  content: string;
  avatar: string;
  productStyle: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface StyleOption {
  id: 'round' | 'blossom';
  name: string;
  vietnameseName: string;
  tagline: string;
  description: string;
  pros: string[];
}
