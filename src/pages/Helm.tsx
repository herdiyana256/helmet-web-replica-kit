"use client"

import { useSearchParams, useNavigate } from "react-router-dom"
import { useMemo, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProductDetailModal from "@/components/ProductDetailModal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Filter, Grid, List, Search, ShoppingCart, Eye, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCartStore } from "@/store/cartStore"
import { helmetsData, Product, getAllBrands, paginateProducts } from "@/data/helmets-data"

const Helm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { addItem } = useCartStore()
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<string>('brand')
  const [localSearch, setLocalSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Get filter parameters from URL
  const brandFilter = searchParams.get('brand')
  const typeFilter = searchParams.get('type')
  const priceFilter = searchParams.get('price')
  const categoryFilter = searchParams.get('category')
  const searchQuery = searchParams.get('search')

  // Filter and sort products
  const filteredAndSortedHelmets = useMemo(() => {
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
        helmet.description?.toLowerCase().includes(term)
      )
    }

    // Apply sorting - prioritize brand sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'brand':
          return a.brand.localeCompare(b.brand)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        default:
          return a.brand.localeCompare(b.brand)
      }
    })

    return filtered
  }, [brandFilter, typeFilter, priceFilter, categoryFilter, searchQuery, localSearch, sortBy])

  // Paginate products
  const paginatedData = useMemo(() => {
    return paginateProducts(filteredAndSortedHelmets, currentPage, itemsPerPage)
  }, [filteredAndSortedHelmets, currentPage, itemsPerPage])

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1)
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
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      size: product.selectedSize || 'M',
      quantity: product.quantity || 1
    }
    
    addItem(cartItem)

    toast({
      title: "Berhasil Ditambahkan",
      description: `${product.name} telah ditambahkan ke keranjang.`,
    })
  }

  const handleLocalSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The search will be applied automatically through the useMemo dependency
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPagination = () => {
    if (paginatedData.totalPages <= 1) return null

    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(paginatedData.totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!paginatedData.hasPrevPage}
          className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {startPage > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(1)}
              className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
            >
              1
            </Button>
            {startPage > 2 && <span className="text-gray-400">...</span>}
          </>
        )}

        {pages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
            className={currentPage === page 
              ? "bg-red-600 hover:bg-red-700 text-white" 
              : "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
            }
          >
            {page}
          </Button>
        ))}

        {endPage < paginatedData.totalPages && (
          <>
            {endPage < paginatedData.totalPages - 1 && <span className="text-gray-400">...</span>}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(paginatedData.totalPages)}
              className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
            >
              {paginatedData.totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!paginatedData.hasNextPage}
          className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-gothic">
            {getPageTitle()}
          </h1>
          
          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2 mb-4">
            {brandFilter && (
              <Badge variant="secondary" className="bg-red-600 text-white border-red-500">
                Brand: {brandFilter}
              </Badge>
            )}
            {priceFilter && (
              <Badge variant="secondary" className="bg-blue-600 text-white border-blue-500">
                Harga: {priceFilter.replace('-', ' - ').replace('m', ' Juta')}
              </Badge>
            )}
            {categoryFilter && (
              <Badge variant="secondary" className="bg-green-600 text-white border-green-500">
                Kategori: {categoryFilter}
              </Badge>
            )}
            {(searchQuery || localSearch) && (
              <Badge variant="secondary" className="bg-purple-600 text-white border-purple-500">
                Pencarian: {searchQuery || localSearch}
              </Badge>
            )}
          </div>

          <p className="text-gray-300">
            Menampilkan {paginatedData.products.length} dari {paginatedData.totalProducts} produk 
            (Halaman {paginatedData.currentPage} dari {paginatedData.totalPages})
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
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
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
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Urutkan berdasarkan" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="brand" className="text-white hover:bg-gray-700">Brand A-Z</SelectItem>
                  <SelectItem value="name" className="text-white hover:bg-gray-700">Nama A-Z</SelectItem>
                  <SelectItem value="price-low" className="text-white hover:bg-gray-700">Harga Terendah</SelectItem>
                  <SelectItem value="price-high" className="text-white hover:bg-gray-700">Harga Tertinggi</SelectItem>
                  <SelectItem value="rating" className="text-white hover:bg-gray-700">Rating Tertinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                }
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {paginatedData.products.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {paginatedData.products.map((helmet) => (
              <Card key={helmet.id} className={`group hover:shadow-xl transition-all duration-300 bg-gray-800 border-gray-700 hover:border-red-500 ${
                viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'
              }`}>
                <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full'}>
                  <img 
                    src={helmet.image} 
                    alt={helmet.name} 
                    className={`object-cover group-hover:scale-105 transition-transform cursor-pointer ${
                      viewMode === 'list' ? 'h-32 w-full rounded-l-lg' : 'h-64 w-full rounded-t-lg'
                    }`}
                    onClick={() => handleProductClick(helmet)}
                  />
                </div>
                
                <CardContent className={`p-4 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                  <div className={viewMode === 'list' ? 'flex-1' : ''}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs bg-red-600 text-white border-red-500">
                        {helmet.brand}
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                        {helmet.series}
                      </Badge>
                    </div>
                    
                    <h3 
                      className="text-lg font-semibold text-white mb-2 cursor-pointer hover:text-red-400 transition-colors line-clamp-2"
                      onClick={() => handleProductClick(helmet)}
                    >
                      {helmet.name}
                    </h3>
                    
                    {helmet.description && (
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                        {helmet.description}
                      </p>
                    )}

                    {/* Rating and Reviews */}
                    {helmet.rating && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(helmet.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          ({helmet.rating}) • {helmet.reviews} ulasan
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xl font-bold text-red-400">
                        Rp {helmet.price.toLocaleString('id-ID')}
                      </p>
                      {helmet.specifications?.certification && (
                        <div className="flex gap-1">
                          {helmet.specifications.certification.slice(0, 2).map((cert) => (
                            <Badge key={cert} variant="outline" className="text-xs bg-green-600 text-white border-green-500">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Stock indicator */}
                    {helmet.stock !== undefined && (
                      <p className="text-xs text-gray-400 mb-3">
                        Stok: {helmet.stock} tersedia
                      </p>
                    )}
                  </div>
                  
                  <div className={`flex gap-2 ${viewMode === 'list' ? 'mt-4' : ''}`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
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
              <Filter className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">
                Tidak ada produk yang ditemukan
              </h3>
              <p className="text-gray-500">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
            </div>
            <Button 
              variant="outline"
              className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              onClick={() => {
                setLocalSearch('')
                navigate('/helm')
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}

        {/* Pagination */}
        {renderPagination()}

        {/* Brand Showcase */}
        {!brandFilter && !searchQuery && !localSearch && (
          <div className="mt-16 pt-16 border-t border-gray-700">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Brand Helm Terpercaya</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {getAllBrands().filter(brand => brand !== 'Universal').map((brand) => (
                <div key={brand} className="text-center">
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-700 hover:border-red-500 transition-all cursor-pointer">
                    <h3 className="font-bold text-lg text-white">{brand}</h3>
                  </div>
                  <Button 
                    variant="link" 
                    className="mt-2 text-red-400 hover:text-red-300"
                    onClick={() => navigate(`/helm?brand=${brand}`)}
                  >
                    Lihat Produk
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
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