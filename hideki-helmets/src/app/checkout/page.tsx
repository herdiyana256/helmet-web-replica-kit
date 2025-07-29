'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'bank-transfer',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      alert('Pesanan berhasil! Anda akan diarahkan ke halaman konfirmasi.');
      clearCart();
      setIsProcessing(false);
      // In real app, redirect to success page
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-hideki-black-800 mb-4">
              Keranjang Kosong
            </h1>
            <p className="text-gray-600 mb-8">
              Tidak ada produk untuk checkout.
            </p>
            <Link
              href="/helm"
              className="bg-hideki-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-hideki-red-700 transition-colors"
            >
              Mulai Belanja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-hideki-black-800 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-hideki-black-800 mb-4">
                  Informasi Kontak
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hideki-red-500 focus:border-transparent"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      No. Telepon *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hideki-red-500 focus:border-transparent"
                      placeholder="+62 812-3456-7890"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-hideki-black-800 mb-4">
                  Alamat Pengiriman
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Depan *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hideki-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Belakang *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hideki-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat Lengkap *
                    </label>
                    <textarea
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hideki-red-500 focus:border-transparent"
                      placeholder="Jl. Nama Jalan No. 123, RT/RW, Kelurahan"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kota *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hideki-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kode Pos *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hideki-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-hideki-black-800 mb-4">
                  Metode Pembayaran
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={formData.paymentMethod === 'bank-transfer'}
                      onChange={handleInputChange}
                      className="text-hideki-red-600 focus:ring-hideki-red-500"
                    />
                    <span className="ml-3">
                      <span className="font-medium">Transfer Bank</span>
                      <span className="text-sm text-gray-500 block">
                        BCA, Mandiri, BNI, BRI
                      </span>
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="e-wallet"
                      checked={formData.paymentMethod === 'e-wallet'}
                      onChange={handleInputChange}
                      className="text-hideki-red-600 focus:ring-hideki-red-500"
                    />
                    <span className="ml-3">
                      <span className="font-medium">E-Wallet</span>
                      <span className="text-sm text-gray-500 block">
                        GoPay, OVO, DANA, ShopeePay
                      </span>
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="text-hideki-red-600 focus:ring-hideki-red-500"
                    />
                    <span className="ml-3">
                      <span className="font-medium">Bayar di Tempat (COD)</span>
                      <span className="text-sm text-gray-500 block">
                        Bayar saat barang diterima
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-hideki-black-800 mb-4">
                  Ringkasan Pesanan
                </h2>
                
                {/* Order Items */}
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-12 h-12">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-hideki-black-800">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {item.quantity}x {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ongkos Kirim</span>
                    <span className="text-green-600">GRATIS</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-hideki-red-600">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-hideki-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-hideki-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Memproses...' : 'Buat Pesanan'}
                </button>

                <div className="mt-4 text-center">
                  <Link
                    href="/cart"
                    className="text-hideki-red-600 hover:text-hideki-red-700 text-sm font-medium"
                  >
                    ← Kembali ke Keranjang
                  </Link>
                </div>

                {/* Security Notice */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-2">🔒</span>
                    <span>Transaksi Anda aman dan terenkripsi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}