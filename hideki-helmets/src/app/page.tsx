'use client';

import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { featuredProducts, promoProducts, helmetProducts } from '@/data/products';
import { helmetBrands } from '@/data/menuData';
import { useCart } from '@/contexts/CartContext';

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-200">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-hideki-red-600 text-white px-2 py-1 rounded text-sm font-semibold">
            -{product.discount}%
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">
            NEW
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-hideki-black-800 mb-1">
          <Link href={`/product/${product.id}`} className="hover:text-hideki-red-600">
            {product.name}
          </Link>
        </h3>
        <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-hideki-red-600">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            className="bg-hideki-red-600 text-white px-3 py-1 rounded text-sm hover:bg-hideki-red-700 transition-colors"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-hideki-black-900 to-hideki-black-800 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-hideki-red-500">HIDEKI</span> HELMETS
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Koleksi Helm Premium & Aksesoris Berkualitas Tinggi
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-400">
              Dapatkan helm dari brand ternama dunia dengan jaminan kualitas dan keamanan terbaik. 
              Melayani seluruh Indonesia dengan pengiriman cepat dan aman.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/helm"
                className="bg-hideki-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-hideki-red-700 transition-colors"
              >
                Lihat Koleksi Helm
              </Link>
              <Link
                href="/promo"
                className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-hideki-black-800 transition-colors"
              >
                Promo Spesial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-hideki-black-800 mb-12">
            Kategori Produk
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/helm" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-hideki-red-100 flex items-center justify-center">
                  <div className="text-4xl">🏍️</div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-hideki-black-800 group-hover:text-hideki-red-600">
                    Helm
                  </h3>
                  <p className="text-sm text-gray-600">Semua Brand</p>
                </div>
              </div>
            </Link>
            <Link href="/accessories" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-hideki-red-100 flex items-center justify-center">
                  <div className="text-4xl">🧤</div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-hideki-black-800 group-hover:text-hideki-red-600">
                    Aksesoris
                  </h3>
                  <p className="text-sm text-gray-600">Lengkap</p>
                </div>
              </div>
            </Link>
            <Link href="/apparel" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-hideki-red-100 flex items-center justify-center">
                  <div className="text-4xl">👕</div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-hideki-black-800 group-hover:text-hideki-red-600">
                    Apparel
                  </h3>
                  <p className="text-sm text-gray-600">Fashion</p>
                </div>
              </div>
            </Link>
            <Link href="/promo" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-hideki-red-100 flex items-center justify-center">
                  <div className="text-4xl">🎯</div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-hideki-black-800 group-hover:text-hideki-red-600">
                    Promo
                  </h3>
                  <p className="text-sm text-gray-600">Diskon</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-hideki-black-800">
              Produk Unggulan
            </h2>
            <Link
              href="/featured"
              className="text-hideki-red-600 hover:text-hideki-red-700 font-semibold"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Helmet Brands */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-hideki-black-800 mb-12">
            Brand Helm Terpercaya
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
            {helmetBrands.map((brand) => (
              <Link
                key={brand}
                href={`/helm?brand=${brand}`}
                className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow group"
              >
                <div className="font-semibold text-hideki-black-800 group-hover:text-hideki-red-600">
                  {brand}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-hideki-black-800">
              Promo Spesial
            </h2>
            <Link
              href="/promo"
              className="text-hideki-red-600 hover:text-hideki-red-700 font-semibold"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {promoProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-hideki-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Butuh Bantuan Memilih Helm?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Tim ahli kami siap membantu Anda menemukan helm yang tepat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6281234567890"
              className="bg-white text-hideki-red-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Chat WhatsApp
            </a>
            <Link
              href="/help"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-hideki-red-600 transition-colors"
            >
              Panduan Memilih
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
