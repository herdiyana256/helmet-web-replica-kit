import Header from "@/components/Header"
import Footer from "@/components/Footer"
import UniversalProductDetailModal from "@/components/UniversalProductDetailModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Filter, Grid, List, Search, ShoppingCart, Eye, Star, ChevronLeft, ChevronRight, Clock, Tag, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCartStore } from "@/store/cartStore"
import { useState, useMemo } from "react"
import { 
  promoData, 
  PromoProduct, 
  getPromoBrands, 
  paginatePromos 
} from "@/data/products-data"

const PRODUCTS_PER_PAGE = 12

const Promo = () => {
  const { toast } = useToast()
  const { addItem } = useCartStore()
  
  const [selectedProduct, setSelectedProduct] = useState<PromoProduct | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<string>('discount')
  const [localSearch, setLocalSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [promoTypeFilter, setPromoTypeFilter] = useState<string>('')
  const [brandFilter, setBrandFilter] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter and sort products
  const filteredAndSortedPromos = useMemo(() => {
    let filtered = [...promoData]

    // Apply brand filter
    if (brandFilter) {
      filtered = filtered.filter(promo => promo.brand === brandFilter)
    }

    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(promo => promo.category === categoryFilter)
    }

    // Apply promo type filter
    if (promoTypeFilter) {
      filtered = filtered.filter(promo => promo.promoType === promoTypeFilter)
    }

    // Apply search filter
    if (localSearch) {
      const term = localSearch.toLowerCase()
      filtered = filtered.filter(promo => 
        promo.name.toLowerCase().includes(term) ||
        promo.brand.toLowerCase().includes(term) ||
        promo.series.toLowerCase().includes(term) ||
        promo.description?.toLowerCase().includes(term)
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          return b.discountPercentage - a.discountPercentage
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'brand':
          return a.brand.localeCompare(b.brand)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        default:
          return b.discountPercentage - a.discountPercentage
      }
    })

    return filtered
  }, [brandFilter, categoryFilter, promoTypeFilter, localSearch, sortBy])

  // Paginate products
  const paginatedData = useMemo(() => {
    return paginatePromos(filteredAndSortedPromos, currentPage, PRODUCTS_PER_PAGE)
  }, [filteredAndSortedPromos, currentPage])

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [brandFilter, categoryFilter, promoTypeFilter, localSearch, sortBy])

  const handleProductClick = (product: PromoProduct) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleAddToCart = (product: Omit<PromoProduct, 'series' | 'category'> & { quantity?: number }) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      size: 'M',
      color: '',
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

  const formatTimeLeft = (validUntil: string) => {
    const now = new Date()
    const endDate = new Date(validUntil)
    const timeLeft = endDate.getTime() - now.getTime()
    
    if (timeLeft <= 0) return "Berakhir"
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days} hari lagi`
    return `${hours} jam lagi`
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-gothic">
            🔥 Promo Special 🔥
          </h1>
          
          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2 mb-4">
            {brandFilter && (
              <Badge variant="secondary" className="bg-red-600 text-white border-red-500">
                Brand: {brandFilter}
              </Badge>
            )}
            {categoryFilter && (
              <Badge variant="secondary" className="bg-blue-600 text-white border-blue-500">
                Kategori: {categoryFilter}
              </Badge>
            )}
            {promoTypeFilter && (
              <Badge variant="secondary" className="bg-green-600 text-white border-green-500">
                Jenis Promo: {promoTypeFilter}
              </Badge>
            )}
            {localSearch && (
              <Badge variant="secondary" className="bg-purple-600 text-white border-purple-500">
                Pencarian: {localSearch}
              </Badge>
            )}
          </div>

          <p className="text-gray-300">
            Menampilkan {paginatedData.products.length} dari {paginatedData.totalProducts} promo spesial 
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
                placeholder="Cari promo berdasarkan nama, brand, atau deskripsi..."
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
            <div className="flex gap-4 items-center flex-wrap">
              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Pilih Brand" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="" className="text-white hover:bg-gray-700">Semua Brand</SelectItem>
                  {getPromoBrands().map((brand) => (
                    <SelectItem key={brand} value={brand} className="text-white hover:bg-gray-700">
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="" className="text-white hover:bg-gray-700">Semua Kategori</SelectItem>
                  <SelectItem value="helmet" className="text-white hover:bg-gray-700">Helmet</SelectItem>
                  <SelectItem value="apparel" className="text-white hover:bg-gray-700">Apparel</SelectItem>
                  <SelectItem value="accessory" className="text-white hover:bg-gray-700">Accessory</SelectItem>
                </SelectContent>
              </Select>

              <Select value={promoTypeFilter} onValueChange={setPromoTypeFilter}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Jenis Promo" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="" className="text-white hover:bg-gray-700">Semua Jenis</SelectItem>
                  <SelectItem value="flash-sale" className="text-white hover:bg-gray-700">Flash Sale</SelectItem>
                  <SelectItem value="clearance" className="text-white hover:bg-gray-700">Clearance</SelectItem>
                  <SelectItem value="bundle" className="text-white hover:bg-gray-700">Bundle</SelectItem>
                  <SelectItem value="seasonal" className="text-white hover:bg-gray-700">Seasonal</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Urutkan berdasarkan" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="discount" className="text-white hover:bg-gray-700">Diskon Terbesar</SelectItem>
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
            {paginatedData.products.map((promo) => (
              <Card key={promo.id} className={`group hover:shadow-xl transition-all duration-300 bg-gray-800 border-gray-700 hover:border-red-500 relative overflow-hidden ${
                viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'
              }`}>
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <Badge className="bg-red-600 text-white">
                    -{promo.discountPercentage}%
                  </Badge>
                </div>
                
                {/* Promo Type Badge */}
                <div className="absolute top-2 right-2 z-10">
                  <Badge className={`text-white ${
                    promo.promoType === 'flash-sale' ? 'bg-orange-600' :
                    promo.promoType === 'clearance' ? 'bg-purple-600' :
                    promo.promoType === 'bundle' ? 'bg-blue-600' :
                    'bg-green-600'
                  }`}>
                    <Tag className="h-3 w-3 mr-1" />
                    {promo.promoType.toUpperCase()}
                  </Badge>
                </div>

                {/* Time Left Badge */}
                <div className="absolute bottom-2 left-2 z-10">
                  <Badge className="bg-black bg-opacity-70 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTimeLeft(promo.validUntil)}
                  </Badge>
                </div>

                <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full'}>
                  <img 
                    src={promo.image} 
                    alt={promo.name} 
                    className={`object-cover group-hover:scale-105 transition-transform cursor-pointer ${
                      viewMode === 'list' ? 'h-32 w-full rounded-l-lg' : 'h-64 w-full rounded-t-lg'
                    }`}
                    onClick={() => handleProductClick(promo)}
                  />
                </div>
                
                <CardContent className={`p-4 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                  <div className={viewMode === 'list' ? 'flex-1' : ''}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs bg-red-600 text-white border-red-500">
                        {promo.brand}
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                        {promo.category.charAt(0).toUpperCase() + promo.category.slice(1)}
                      </Badge>
                      {promo.limitedStock && (
                        <Badge className="text-xs bg-yellow-600 text-white">
                          Terbatas: {promo.stock}
                        </Badge>
                      )}
                    </div>
                    
                    <h3 
                      className="text-lg font-semibold text-white mb-2 cursor-pointer hover:text-red-400 transition-colors line-clamp-2"
                      onClick={() => handleProductClick(promo)}
                    >
                      {promo.name}
                    </h3>
                    
                    {promo.description && (
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                        {promo.description}
                      </p>
                    )}

                    {/* Rating and Reviews */}
                    {promo.rating && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(promo.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          ({promo.rating}) • {promo.reviews} ulasan
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm text-gray-500 line-through">
                          Rp {promo.originalPrice.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xl font-bold text-red-400">
                          Rp {promo.price.toLocaleString('id-ID')}
                        </p>
                        <p className="text-green-400 text-sm font-semibold">
                          Hemat Rp {(promo.originalPrice - promo.price).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>

                    {/* Valid until */}
                    <p className="text-xs text-orange-400 mb-3">
                      Berlaku hingga: {new Date(promo.validUntil).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  
                  <div className={`flex gap-2 ${viewMode === 'list' ? 'mt-4' : ''}`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                      onClick={() => handleProductClick(promo)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Detail
                    </Button>
                    <Button 
                      size="sm"
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      onClick={() => handleAddToCart({
                        id: promo.id,
                        name: promo.name,
                        price: promo.price,
                        image: promo.image,
                        brand: promo.brand,
                        quantity: 1
                      })}
                      disabled={promo.stock === 0}
                    >
                      <Zap className="h-4 w-4 mr-1" />
                      {promo.stock === 0 ? 'Habis' : 'Ambil Promo'}
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
                Tidak ada promo yang ditemukan
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
                setBrandFilter('')
                setCategoryFilter('')
                setPromoTypeFilter('')
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}

        {/* Pagination */}
        {renderPagination()}

        {/* Promo Types Showcase */}
        {!promoTypeFilter && !localSearch && (
          <div className="mt-16 pt-16 border-t border-gray-700">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Jenis Promo</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Flash Sale', type: 'flash-sale', icon: '⚡', color: 'bg-orange-600' },
                { name: 'Clearance', type: 'clearance', icon: '🏷️', color: 'bg-purple-600' },
                { name: 'Bundle Deal', type: 'bundle', icon: '📦', color: 'bg-blue-600' },
                { name: 'Seasonal Sale', type: 'seasonal', icon: '🌟', color: 'bg-green-600' }
              ].map((promoType) => (
                <div key={promoType.type} className="text-center">
                  <div className={`${promoType.color} border border-gray-700 rounded-lg p-6 hover:opacity-80 transition-all cursor-pointer`}>
                    <div className="text-3xl mb-2">{promoType.icon}</div>
                    <h3 className="font-bold text-lg text-white">{promoType.name}</h3>
                  </div>
                  <Button 
                    variant="link" 
                    className="mt-2 text-red-400 hover:text-red-300"
                    onClick={() => setPromoTypeFilter(promoType.type)}
                  >
                    Lihat Promo
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <section className="mt-16 pt-16 border-t border-gray-700 bg-gradient-to-r from-red-600/10 to-orange-600/10 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to Hideki Store</h2>
          <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
            The largest one-stop-shop for riders across the nation. Join us on this exhilarating journey and experience
            the thrill of being part of something truly extraordinary.
          </p>
          <p className="text-xl font-semibold text-white mb-6">Visit Hideki Helmets Store in your city now!</p>
          <Button size="lg" className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white">
            Temukan Toko Kami
          </Button>
        </section>
      </main>

      <Footer />

      {/* Universal Product Detail Modal */}
      <UniversalProductDetailModal
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

export default Promo
