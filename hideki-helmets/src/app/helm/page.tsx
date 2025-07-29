'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon, FunnelIcon } from '@heroicons/react/24/solid';
import { helmetProducts } from '@/data/products';
import { helmetBrands } from '@/data/menuData';

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

function ProductCard({ product }: { product: any }) {
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
          <button className="bg-hideki-red-600 text-white px-3 py-1 rounded text-sm hover:bg-hideki-red-700 transition-colors">
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HelmetPage() {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...helmetProducts];

    // Filter by brand
    if (selectedBrand) {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Filter by type
    if (selectedType) {
      filtered = filtered.filter(product => product.subcategory === selectedType);
    }

    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedBrand, selectedType, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedBrand('');
    setSelectedType('');
    setPriceRange('');
    setSortBy('name');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-hideki-black-800">Koleksi Helm</h1>
              <p className="text-gray-600 mt-2">
                Temukan helm terbaik dari brand ternama dunia
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 bg-hideki-red-600 text-white px-4 py-2 rounded-lg"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-hideki-black-800">Filter</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-hideki-red-600 hover:text-hideki-red-700"
                >
                  Reset
                </button>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-hideki-black-700 mb-3">Brand</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {helmetBrands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={selectedBrand === brand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="text-hideki-red-600 focus:ring-hideki-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-hideki-black-700 mb-3">Tipe Helm</h4>
                <div className="space-y-2">
                  {['full-face', 'half-face', 'modular', 'cross'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={selectedType === type}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="text-hideki-red-600 focus:ring-hideki-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {type.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-hideki-black-700 mb-3">Harga</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Di bawah 500rb', value: '0-500000' },
                    { label: '500rb - 1jt', value: '500000-1000000' },
                    { label: '1jt - 3jt', value: '1000000-3000000' },
                    { label: '3jt - 5jt', value: '3000000-5000000' },
                    { label: 'Di atas 5jt', value: '5000000' },
                  ].map((range) => (
                    <label key={range.value} className="flex items-center">
                      <input
                        type="radio"
                        name="price"
                        value={range.value}
                        checked={priceRange === range.value}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="text-hideki-red-600 focus:ring-hideki-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Menampilkan {filteredProducts.length} dari {helmetProducts.length} produk
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-hideki-red-500 focus:border-transparent"
              >
                <option value="name">Urutkan: Nama A-Z</option>
                <option value="price-low">Harga: Rendah ke Tinggi</option>
                <option value="price-high">Harga: Tinggi ke Rendah</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Tidak ada produk yang sesuai dengan filter Anda
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-hideki-red-600 text-white px-6 py-2 rounded-lg hover:bg-hideki-red-700 transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}