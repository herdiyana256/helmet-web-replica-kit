'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/contexts/CartContext';

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CartPage() {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-8">🛒</div>
            <h1 className="text-3xl font-bold text-hideki-black-800 mb-4">
              Keranjang Belanja Kosong
            </h1>
            <p className="text-gray-600 mb-8">
              Belum ada produk di keranjang Anda. Mari mulai berbelanja!
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-hideki-black-800">
            Keranjang Belanja
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-gray-600 hover:text-hideki-red-600 transition-colors"
          >
            Kosongkan Keranjang
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-hideki-black-800">
                  Produk ({items.length} item)
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.product.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-20 h-20">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-hideki-black-800">
                              <Link 
                                href={`/product/${item.product.id}`}
                                className="hover:text-hideki-red-600"
                              >
                                {item.product.name}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-600">{item.product.brand}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-hideki-red-600 transition-colors"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600">Jumlah:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <MinusIcon className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-2 font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <PlusIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-hideki-red-600">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                            {item.product.originalPrice && (
                              <p className="text-sm text-gray-500 line-through">
                                {formatPrice(item.product.originalPrice * item.quantity)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-hideki-black-800 mb-4">
                Ringkasan Pesanan
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ongkos Kirim</span>
                  <span className="font-medium text-green-600">GRATIS</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-hideki-red-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-hideki-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-hideki-red-700 transition-colors text-center block"
              >
                Lanjut ke Pembayaran
              </Link>

              <div className="mt-4 text-center">
                <Link
                  href="/helm"
                  className="text-hideki-red-600 hover:text-hideki-red-700 text-sm font-medium"
                >
                  ← Lanjut Belanja
                </Link>
              </div>

              {/* Security Icons */}
              <div className="mt-6 pt-6 border-t">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">Pembayaran Aman</p>
                  <div className="flex justify-center space-x-2">
                    <div className="bg-gray-100 px-2 py-1 rounded text-xs">💳 VISA</div>
                    <div className="bg-gray-100 px-2 py-1 rounded text-xs">💳 MC</div>
                    <div className="bg-gray-100 px-2 py-1 rounded text-xs">🏦 Transfer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-hideki-black-800 mb-6">
            Rekomendasi Untuk Anda
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center text-gray-500">
              <p>Produk rekomendasi akan ditampilkan di sini</p>
              <Link
                href="/helm"
                className="inline-block mt-4 text-hideki-red-600 hover:text-hideki-red-700 font-medium"
              >
                Lihat Semua Produk →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}