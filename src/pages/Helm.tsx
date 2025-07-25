"use client"

import { useSearchParams } from "react-router-dom"
import { useMemo, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProductDetailModal from "@/components/ProductDetailModal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Filter, Grid, List, Search, ShoppingCart, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Definisi interface Product yang konsisten
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

// Data helmets - gunakan data yang sama seperti kode lama yang bekerja
const helmetsData: Product[] = [
  {
    id: "helm-sv300-01",
    name: "Hideki SV300 - Racing Red",
    price: 1500000,
    series: "SV300 Series",
    category: "helmet",
    brand: "Hideki",
    image: "https://via.placeholder.com/300x300.png?text=SV300+Helmet",
    description: "Helm full face dengan desain aerodinamis dan sistem ventilasi optimal.",
    sizes: [
      { size: "S", measurement: "54-55cm" },
      { size: "M", measurement: "56-57cm" },
      { size: "L", measurement: "58-59cm" },
      { size: "XL", measurement: "60-61cm" }
    ],
    specifications: {
      certification: ["SNI", "DOT"],
      weight: "1.4kg",
      material: "Fiberglass",
      visorMaterial: "Polycarbonate",
      innerVisor: "Ya",
      padding: "Dapat dilepas"
    },
    completeness: ["Helm", "Visor", "Inner visor", "Manual book", "Tas helm"]
  },
  {
    id: "helm-windtail-01",
    name: "Hideki New Windtail - Aero Blue",
    price: 1250000,
    series: "New Windtail Series",
    category: "helmet",
    brand: "Hideki",
    image: "https://via.placeholder.com/300x300.png?text=Windtail+Helmet",
    description: "Helm dengan desain sporty dan ventilasi yang baik untuk kenyamanan berkendara.",
    sizes: [
      { size: "M", measurement: "56-57cm" },
      { size: "L", measurement: "58-59cm" },
      { size: "XL", measurement: "60-61cm" }
    ],
    specifications: {
      certification: ["SNI"],
      weight: "1.3kg",
      material: "ABS",
      visorMaterial: "Polycarbonate",
      innerVisor: "Tidak",
      padding: "Dapat dilepas"
    },
    completeness: ["Helm", "Visor", "Manual book"]
  },
  {
    id: "helm-classic-01",
    name: "Hideki Classic - Matte Black",
    price: 950000,
    series: "Classic Series",
    category: "helmet",
    brand: "Hideki",
    image: "https://via.placeholder.com/300x300.png?text=Classic+Helmet",
    description: "Helm klasik dengan desain timeless dan kualitas terjamin.",
    specifications: {
      certification: ["SNI"],
      weight: "1.2kg",
      material: "ABS",
      visorMaterial: "Polycarbonate",
      innerVisor: "Tidak",
      padding: "Standar"
    },
    completeness: ["Helm", "Visor", "Manual book"]
  },
  {
    id: "parts-visor-01",
    name: "Hideki Replacement Visor - Clear",
    price: 150000,
    series: "Parts & Accessories",
    category: "parts",
    brand: "Hideki",
    image: "https://via.placeholder.com/300x300.png?text=Visor",
    description: "Visor pengganti berkualitas tinggi dengan material anti gores.",
    completeness: ["Visor", "Kain pembersih"]
  }
]

// Fungsi helper untuk mendapatkan semua brand
const getAllBrands = (): string[] => {
  const brands = [...new Set(helmetsData.map(helmet => helmet.brand))]
  return brands.filter(brand => brand !== 'Universal')
}

const Helm = () => {
  const { toast } = useToast()
  const [searchParams] = useSearchParams()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<string>('name')
  const [localSearch, setLocalSearch] = useState('')
  const [cartItems, setCartItems] = useState<any[]>([])

  // Get filter parameters from URL
  const brandFilter = searchParams.get('brand')
  const typeFilter = searchParams.get('type')
  const priceFilter = searchParams.get('price')
  const categoryFilter = searchParams.get('category')
  const searchQuery = searchParams.get('search')

  // Filter and sort products dengan error handling
  const filteredAndSortedHelmets = useMemo(() => {
    try {
      let filtered = [...helmetsData]

      // Apply brand filter
      if (brandFilter) {
        filtered = filtered.filter(helmet => helmet.brand === brandFilter)
      }

      // Apply category filter
      if (categoryFilter) {
        filtered = filtered.filter(helmet => helmet.category === categoryFilter)
      }

      // Apply price filter
      if (priceFilter) {
        switch (priceFilter) {
          case 'under-1m':
            filtered = filtered.filter(helmet => helmet.price < 1000000)
            break
          case '1m-1.5m':
            filtered = filtered.filter(helmet => helmet.price >= 1000000 && helmet.price < 1500000)
            break
          case '1.5m-2m':
            filtered = filtered.filter(helmet => helmet.price >= 1500000 && helmet.price < 2000000)
            break
          case 'above-2m':
            filtered = filtered.filter(helmet => helmet.price >= 2000000)
            break
        }
      }

      // Apply search filter
      const searchTerm = searchQuery || localSearch
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filtered = filtered.filter(helmet => 
          helmet.name.toLowerCase().includes(term) ||
          helmet.brand.toLowerCase().includes(term) ||
          helmet.series.toLowerCase().includes(term) ||
          (helmet.description && helmet.description.toLowerCase().includes(term))
        )
      }

      // Apply sorting
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price
          case 'price-high':
            return b.price - a.price
          case 'name':
            return a.name.localeCompare(b.name)
          case 'brand':
            return a.brand.localeCompare(b.brand)
          default:
            return 0
        }
      })

      return filtered
    } catch (error) {
      console.error('Error filtering helmets:', error)
      return []
    }
  }, [brandFilter, typeFilter, priceFilter, categoryFilter, searchQuery, localSearch, sortBy])

  // Get page title based on filters
  const getPageTitle = () => {
    if (brandFilter) return `Koleksi Helm ${brandFilter}`
    if (categoryFilter === 'parts') return 'Parts & Accessories'
    if (priceFilter) {
      switch (priceFilter) {
        case 'under-1m': return 'Helm di bawah 1 Juta'
        case '1m-1.5m': return 'Helm 1 - 1.5 Juta'
        case '1.5m-2m': return 'Helm 1.5 - 2 Juta'
        case 'above-2m': return 'Helm di atas 2 Juta'
      }
    }
    if (searchQuery) return `Hasil pencarian: "${searchQuery}"`
    return 'Katalog Helm'
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleAddToCart = (product: Omit<Product, 'series' | 'category'> & { selectedSize?: string; quantity?: number }) => {
    try {
      const cartItem = {
        ...product,
        selectedSize: product.selectedSize || 'M',
        quantity: product.quantity || 1
      }
      
      setCartItems(prev => {
        const existingIndex = prev.findIndex(item => 
          item.id === product.id && item.selectedSize === product.selectedSize
        )
        
        if (existingIndex >= 0) {
          const updated = [...prev]
          updated[existingIndex].quantity += cartItem.quantity
          return updated
        } else {
          return [...prev, cartItem]
        }
      })

      toast({
        title: "Berhasil Ditambahkan",
        description: `${product.name} telah ditambahkan ke keranjang.`,
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast({
        title: "Gagal Menambahkan",
        description: "Terjadi kesalahan saat menambahkan ke keranjang.",
        variant: "destructive"
      })
    }
  }

  const handleLocalSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The search will be applied automatically through the useMemo dependency
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 font-gothic">
            {getPageTitle()}
          </h1>
          
          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2 mb-4">
            {brandFilter && (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                Brand: {brandFilter}
              </Badge>
            )}
            {priceFilter && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Harga: {priceFilter.replace('-', ' - ').replace('m', ' Juta')}
              </Badge>
            )}
            {categoryFilter && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Kategori: {categoryFilter}
              </Badge>
            )}
            {(searchQuery || localSearch) && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Pencarian: {searchQuery || localSearch}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            Menampilkan {filteredAndSortedHelmets.length} dari {helmetsData.length} produk
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <form onSubmit={handleLocalSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Cari helm berdasarkan nama, brand, atau deskripsi..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* Filter and Sort Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Urutkan berdasarkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nama A-Z</SelectItem>
                  <SelectItem value="brand">Brand A-Z</SelectItem>
                  <SelectItem value="price-low">Harga Terendah</SelectItem>
                  <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredAndSortedHelmets.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredAndSortedHelmets.map((helmet) => (
              <Card key={helmet.id} className={`group hover:shadow-lg transition-shadow ${
                viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'
              }`}>
                <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full'}>
                  <img 
                    src={helmet.image} 
                    alt={helmet.name} 
                    className={`object-cover rounded-t-lg group-hover:scale-105 transition-transform cursor-pointer ${
                      viewMode === 'list' ? 'h-32 w-full rounded-l-lg rounded-t-none' : 'h-64 w-full'
                    }`}
                    onClick={() => handleProductClick(helmet)}
                  />
                </div>
                
                <CardContent className={`p-4 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                  <div className={viewMode === 'list' ? 'flex-1' : ''}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {helmet.brand}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {helmet.series}
                      </Badge>
                    </div>
                    
                    <h3 
                      className="text-lg font-semibold text-foreground mb-2 cursor-pointer hover:text-red-600 transition-colors line-clamp-2"
                      onClick={() => handleProductClick(helmet)}
                    >
                      {helmet.name}
                    </h3>
                    
                    {helmet.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {helmet.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xl font-bold text-red-600">
                        Rp {helmet.price.toLocaleString('id-ID')}
                      </p>
                      {helmet.specifications?.certification && (
                        <div className="flex gap-1">
                          {helmet.specifications.certification.slice(0, 2).map((cert) => (
                            <Badge key={cert} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className={`flex gap-2 ${viewMode === 'list' ? 'mt-4' : ''}`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => handleProductClick(helmet)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Detail
                    </Button>
                    <Button 
                      size="sm"
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      onClick={() => handleAddToCart({
                        id: helmet.id,
                        name: helmet.name,
                        price: helmet.price,
                        image: helmet.image,
                        brand: helmet.brand,
                        selectedSize: helmet.sizes?.[0]?.size || 'M',
                        quantity: 1
                      })}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Keranjang
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4">
              <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Tidak ada produk yang ditemukan
              </h3>
              <p className="text-muted-foreground">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => {
                setLocalSearch('')
                window.location.href = '/helm'
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}

        {/* Brand Showcase */}
        {/* {!brandFilter && !searchQuery && !localSearch && (
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-8">Brand Helm Terpercaya</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {getAllBrands().map((brand) => (
                <div key={brand} className="text-center">
                  <div className="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors cursor-pointer">
                    <h3 className="font-bold text-lg text-gray-800">{brand}</h3>
                  </div>
                  <Button 
                    variant="link" 
                    className="mt-2 text-red-600 hover:text-red-700"
                    onClick={() => window.location.href = `/helm?brand=${brand}`}
                  >
                    Lihat Produk
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </main>
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProduct(null)
        }}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}

export default Helm