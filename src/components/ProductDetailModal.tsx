"use client"

import React, { useState, useEffect } from "react";
import { X, ShoppingCart, Plus, Minus, Star, Shield, Truck, RotateCcw, Heart, Share2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string
  name: string
  price: number
  series: string
  category: string
  brand: string
  image: string
  description?: string
  sizes?: { size: string; measurement: string }[]
  specifications?: {
    certification: string[]
    weight: string
    material: string
    visorMaterial: string
    innerVisor: string
    padding: string
  }
  completeness?: string[]
}

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Omit<Product, 'series' | 'category'> & { selectedSize?: string; quantity?: number }) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  
  const { addItem } = useCartStore();
  const { toast } = useToast();

  // Sample additional images - in real app, this would come from product data
  const productImages = product ? [
    product.image,
    product.image, // In real app, these would be different angles
    product.image,
    product.image
  ] : [];

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 1 && !selectedSize) {
      toast({
        title: "Pilih Ukuran",
        description: "Silakan pilih ukuran terlebih dahulu",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const cartItem = {
        id: selectedSize ? `${product.id}-${selectedSize}` : product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize || (product.sizes?.[0]?.size || ""),
        quantity: quantity
      };
      
      // Menggunakan addItem dari useCartStore
      addItem(cartItem);
      
      toast({
        title: "Berhasil Ditambahkan",
        description: `${product.name} telah ditambahkan ke keranjang.`,
      });
      
      onClose();
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Gagal Menambahkan",
        description: "Terjadi kesalahan saat menambahkan ke keranjang.",
        variant: "destructive"
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Redirect to checkout
    window.location.href = '/checkout';
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Disalin",
        description: "Link produk telah disalin ke clipboard",
      });
    }
  };

  // Reset state when modal opens with new product
  useEffect(() => {
    if (isOpen && product) {
      setSelectedSize(product.sizes?.[0]?.size || "");
      setQuantity(1);
      setSelectedImageIndex(0);
    }
  }, [isOpen, product]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Detail Produk</h2>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              {product.brand}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`${isWishlisted ? 'text-red-600' : 'text-gray-500'} hover:text-red-600`}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="text-gray-500 hover:text-gray-700"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative">
                <img
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg border"
                />
                {product.specifications?.certification.includes("SHARP 5★") && (
                  <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    SHARP 5★
                  </Badge>
                )}
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                      selectedImageIndex === index ? 'border-red-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{product.series}</Badge>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                
                {/* Rating & Reviews (Mock data) */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.8) • 127 ulasan</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 mb-1">Harga reguler</p>
                  <p className="text-4xl font-bold text-red-600 mb-2">
                    Rp {product.price.toLocaleString('id-ID')}
                  </p>
                  <p className="text-sm text-gray-600">
                    Biaya pengiriman dihitung saat checkout.
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Garansi resmi</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Gratis ongkir >2jt</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RotateCcw className="w-4 h-4 text-purple-600" />
                    <span>7 hari retur</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Zap className="w-4 h-4 text-orange-600" />
                    <span>Pengiriman cepat</span>
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 1 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Pilih Ukuran
                  </h4>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {product.sizes.map((sizeOption) => (
                      <button
                        key={sizeOption.size}
                        onClick={() => setSelectedSize(sizeOption.size)}
                        className={`p-3 border rounded-lg font-medium transition-all ${
                          selectedSize === sizeOption.size
                            ? 'border-red-600 bg-red-50 text-red-600 ring-2 ring-red-200'
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-bold">{sizeOption.size}</div>
                          <div className="text-xs text-gray-500">{sizeOption.measurement}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    💡 Ukur lingkar kepala dengan meteran untuk hasil terbaik
                  </p>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Jumlah
                </h4>
                <div className="flex items-center gap-3 mb-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decreaseQuantity}
                    className="h-10 w-10"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={increaseQuantity}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-600 ml-4">
                    Stok: 15 tersedia
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Tambahkan ke Keranjang
                </Button>
                <Button
                  onClick={handleBuyNow}
                  variant="outline"
                  className="w-full py-3 text-lg font-semibold border-red-600 text-red-600 hover:bg-red-50"
                >
                  Beli Sekarang
                </Button>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Deskripsi</TabsTrigger>
                <TabsTrigger value="specifications">Spesifikasi</TabsTrigger>
                <TabsTrigger value="completeness">Kelengkapan</TabsTrigger>
                <TabsTrigger value="reviews">Ulasan</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      {product.name}
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      {product.description}
                    </p>
                    
                    {/* Key Features */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Keunggulan Produk:</h5>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>Desain aerodinamis untuk stabilitas tinggi</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>Sistem ventilasi optimal untuk kenyamanan</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>Material berkualitas tinggi dan tahan lama</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>Padding yang dapat dilepas dan dicuci</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Cocok untuk:</h5>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Penggunaan harian dalam kota</li>
                          <li>• Touring jarak jauh</li>
                          <li>• Riding sport dan racing</li>
                          <li>• Semua jenis motor</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                {product.specifications && (
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">
                        Sertifikasi & Spesifikasi
                      </h4>
                      
                      {/* Certifications */}
                      <div className="mb-6">
                        <h5 className="font-semibold text-gray-900 mb-3">Sertifikasi:</h5>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.specifications.certification.map((cert) => (
                            <Badge key={cert} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                        <div className="space-y-2 text-sm text-gray-700">
                          {product.specifications.certification.includes("SNI") && (
                            <p><strong>(SNI)</strong> Standar Nasional Indonesia - Memenuhi standar keselamatan Indonesia</p>
                          )}
                          {product.specifications.certification.includes("DOT") && (
                            <p><strong>(DOT)</strong> Department of Transportation - Standar keselamatan Amerika Serikat</p>
                          )}
                          {product.specifications.certification.includes("ECE R22.05") && (
                            <p><strong>(ECE)</strong> Economic Community of Europe 22.05 - Standar keselamatan Eropa</p>
                          )}
                        </div>
                      </div>

                      {/* Technical Specifications */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Spesifikasi Teknis:</h5>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Berat:</span>
                              <span className="font-medium">{product.specifications.weight}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Material Shell:</span>
                              <span className="font-medium">{product.specifications.material}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Material Visor:</span>
                              <span className="font-medium">{product.specifications.visorMaterial}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Inner Visor:</span>
                              <span className="font-medium">{product.specifications.innerVisor}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Padding:</span>
                              <span className="font-medium">{product.specifications.padding}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="completeness" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      Kelengkapan Produk
                    </h4>
                    {product.completeness && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {product.completeness.map((item, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                            <span className="font-medium text-gray-900">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      Ulasan Pelanggan
                    </h4>
                    <div className="text-center py-8 text-gray-500">
                      <p>Fitur ulasan akan segera hadir!</p>
                      <p className="text-sm mt-2">Sementara ini, Anda dapat menghubungi customer service untuk informasi lebih lanjut.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal

