"use client"

import React, { useState, useEffect } from 'react'
import { X, ShoppingCart, Plus, Minus, Star, Shield, Truck, RotateCcw, Heart, Share2, Zap, Eye, Clock, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/hooks/use-toast'
import { Product } from '@/data/helmets-data'
import { ApparelProduct, AccessoryProduct, PromoProduct } from '@/data/products-data'

// Union type for all product types
type UniversalProduct = Product | ApparelProduct | AccessoryProduct | PromoProduct;

interface UniversalProductDetailModalProps {
  product: UniversalProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: any) => void;
}

const UniversalProductDetailModal: React.FC<UniversalProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  
  const { addItem } = useCartStore()
  const { toast } = useToast()

  // Reset states when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize('')
      setSelectedColor('')
      setQuantity(1)
      setSelectedImageIndex(0)
      setActiveTab('description')
    }
  }, [product])

  // Get product images - use multiple images if available, otherwise repeat main image
  const productImages = product ? (
    product.images && product.images.length > 0 
      ? product.images 
      : [product.image, product.image, product.image, product.image]
  ) : []

  if (!isOpen || !product) return null

  // Type guards
  const isHelmet = (p: UniversalProduct): p is Product => {
    return 'category' in p && p.category === 'helmet';
  }

  const isApparel = (p: UniversalProduct): p is ApparelProduct => {
    return 'category' in p && ['jaket', 'jersey', 'celana', 'sepatu', 'sarung-tangan'].includes(p.category as string);
  }

  const isAccessory = (p: UniversalProduct): p is AccessoryProduct => {
    return 'category' in p && ['visor', 'padding', 'parts', 'bluetooth', 'tas', 'spoiler', 'chin-guard'].includes(p.category as string);
  }

  const isPromo = (p: UniversalProduct): p is PromoProduct => {
    return 'promoType' in p;
  }

  const handleAddToCart = () => {
    // Check size requirement for apparels and helmets
    const requiresSize = isHelmet(product) || isApparel(product);
    const hasSizes = isHelmet(product) ? product.sizes && product.sizes.length > 1 : 
                    isApparel(product) ? product.sizes && product.sizes.length > 1 : false;

    if (requiresSize && hasSizes && !selectedSize) {
      toast({
        title: "Pilih Ukuran",
        description: "Silakan pilih ukuran terlebih dahulu",
        variant: "destructive"
      })
      return
    }

    // Check color requirement for apparels
    if (isApparel(product) && product.colors && product.colors.length > 1 && !selectedColor) {
      toast({
        title: "Pilih Warna",
        description: "Silakan pilih warna terlebih dahulu",
        variant: "destructive"
      })
      return
    }
    
    try {
      const cartItem = {
        id: selectedSize ? `${product.id}-${selectedSize}` : product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        size: selectedSize || (isHelmet(product) && product.sizes?.[0]?.size) || 
               (isApparel(product) && product.sizes?.[0]?.size) || "M",
        color: selectedColor || (isApparel(product) && product.colors?.[0]) || '',
        quantity: quantity
      }
      
      // Menggunakan addItem dari useCartStore
      addItem(cartItem)
      
      // Call onAddToCart callback if provided
      if (onAddToCart) {
        onAddToCart({
          ...product,
          selectedSize: cartItem.size,
          selectedColor: cartItem.color,
          quantity: quantity
        })
      }
      
      toast({
        title: "Berhasil Ditambahkan",
        description: `${product.name} telah ditambahkan ke keranjang.`,
      })
      
      onClose()
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast({
        title: "Gagal Menambahkan",
        description: "Terjadi kesalahan saat menambahkan ke keranjang.",
        variant: "destructive"
      })
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    // Redirect to checkout
    window.location.href = '/checkout'
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`
  }

  const calculateDiscount = () => {
    if (isPromo(product)) {
      return product.discountPercentage;
    }
    if (isApparel(product) && product.originalPrice) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  }

  const getOriginalPrice = () => {
    if (isPromo(product)) return product.originalPrice;
    if (isApparel(product)) return product.originalPrice;
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={productImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white hover:bg-gray-100"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
              {/* Discount badge for promo items */}
              {calculateDiscount() > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                  -{calculateDiscount()}%
                </Badge>
              )}
              {/* Promo type badge */}
              {isPromo(product) && (
                <Badge className="absolute bottom-4 left-4 bg-orange-600 text-white">
                  <Tag className="h-3 w-3 mr-1" />
                  {product.promoType.toUpperCase()}
                </Badge>
              )}
              {/* Stock status */}
              {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
                <Badge className="absolute bottom-4 right-4 bg-yellow-600 text-white">
                  Stok Terbatas: {product.stock}
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge className="absolute bottom-4 right-4 bg-gray-600 text-white">
                  Habis
                </Badge>
              )}
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                    selectedImageIndex === index ? 'border-red-500' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-red-600 text-white border-red-500">
                  {product.brand}
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                  {product.series}
                </Badge>
                {isPromo(product) && product.limitedStock && (
                  <Badge className="bg-orange-600 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    Limited
                  </Badge>
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    ({product.rating}) • {product.reviews} ulasan
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                {getOriginalPrice() && (
                  <p className="text-lg text-gray-500 line-through">
                    {formatPrice(getOriginalPrice()!)}
                  </p>
                )}
                <p className="text-3xl font-bold text-red-600">
                  {formatPrice(product.price)}
                </p>
                {calculateDiscount() > 0 && (
                  <p className="text-green-600 font-semibold">
                    Hemat {formatPrice((getOriginalPrice() || 0) - product.price)}
                  </p>
                )}
              </div>

              {/* Promo validity */}
              {isPromo(product) && (
                <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-orange-800 font-semibold">
                      Berlaku hingga: {new Date(product.validUntil).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Size Selection for Helmets and Apparels */}
            {(isHelmet(product) || isApparel(product)) && product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Pilih Ukuran</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size.size}
                      variant={selectedSize === size.size ? "default" : "outline"}
                      className={`p-3 ${selectedSize === size.size ? 'bg-red-600 hover:bg-red-700' : ''}`}
                      onClick={() => setSelectedSize(size.size)}
                    >
                      {size.size}
                    </Button>
                  ))}
                </div>
                {selectedSize && (
                  <p className="text-sm text-gray-600 mt-2">
                    Ukuran {selectedSize}: {product.sizes.find(s => s.size === selectedSize)?.measurement}
                  </p>
                )}
              </div>
            )}

            {/* Color Selection for Apparels */}
            {isApparel(product) && product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Pilih Warna</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      className={`${selectedColor === color ? 'bg-red-600 hover:bg-red-700' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Compatibility for Accessories */}
            {isAccessory(product) && product.compatibleBrands && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Kompatibel dengan</h3>
                <div className="flex flex-wrap gap-2">
                  {product.compatibleBrands.map((brand) => (
                    <Badge key={brand} variant="outline">
                      {brand}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Jumlah</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={product.stock !== undefined && quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-red-600 hover:bg-red-700 py-3 text-lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
              </Button>
              <Button 
                variant="outline" 
                className="w-full py-3 text-lg border-red-600 text-red-600 hover:bg-red-50"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                <Zap className="h-5 w-5 mr-2" />
                Beli Sekarang
              </Button>
            </div>

            {/* Product Information Tabs */}
            <div className="border-t pt-6">
              <div className="flex space-x-4 mb-4">
                <button
                  className={`pb-2 border-b-2 ${activeTab === 'description' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-600'}`}
                  onClick={() => setActiveTab('description')}
                >
                  Deskripsi
                </button>
                <button
                  className={`pb-2 border-b-2 ${activeTab === 'specifications' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-600'}`}
                  onClick={() => setActiveTab('specifications')}
                >
                  Spesifikasi
                </button>
              </div>

              {activeTab === 'description' && (
                <div className="text-gray-700">
                  <p>{product.description || "Deskripsi produk akan segera tersedia."}</p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="space-y-3">
                  {isHelmet(product) && product.specifications && (
                    <div className="grid grid-cols-1 gap-3">
                      <div><strong>Sertifikasi:</strong> {product.specifications.certification?.join(', ')}</div>
                      <div><strong>Berat:</strong> {product.specifications.weight}</div>
                      <div><strong>Material:</strong> {product.specifications.material}</div>
                      <div><strong>Visor:</strong> {product.specifications.visorMaterial}</div>
                      <div><strong>Inner Visor:</strong> {product.specifications.innerVisor}</div>
                      <div><strong>Padding:</strong> {product.specifications.padding}</div>
                    </div>
                  )}
                  {isApparel(product) && product.specifications && (
                    <div className="grid grid-cols-1 gap-3">
                      <div><strong>Material:</strong> {product.specifications.material}</div>
                      {product.specifications.weight && <div><strong>Berat:</strong> {product.specifications.weight}</div>}
                      <div><strong>Tahan Air:</strong> {product.specifications.waterproof ? 'Ya' : 'Tidak'}</div>
                      <div><strong>Breathable:</strong> {product.specifications.breathable ? 'Ya' : 'Tidak'}</div>
                      {product.specifications.protection && product.specifications.protection.length > 0 && (
                        <div><strong>Proteksi:</strong> {product.specifications.protection.join(', ')}</div>
                      )}
                    </div>
                  )}
                  {isAccessory(product) && product.specifications && (
                    <div className="grid grid-cols-1 gap-3">
                      {product.specifications.material && <div><strong>Material:</strong> {product.specifications.material}</div>}
                      {product.specifications.color && <div><strong>Warna:</strong> {product.specifications.color}</div>}
                      {product.specifications.dimensions && <div><strong>Dimensi:</strong> {product.specifications.dimensions}</div>}
                      {product.specifications.compatibility && (
                        <div><strong>Kompatibilitas:</strong> {product.specifications.compatibility.join(', ')}</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Additional Features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Garansi Resmi</p>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Gratis Ongkir</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Easy Return</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UniversalProductDetailModal