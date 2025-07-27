import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniversalProductDetailModal from "@/components/UniversalProductDetailModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Filter, Grid, List, Search, ShoppingCart, Eye, Star, ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cartStore";
import { useState, useMemo } from "react";
import { 
  accessoriesData, 
  AccessoryProduct, 
  getAllAccessoryBrands, 
  paginateAccessories 
} from "@/data/products-data";

const PRODUCTS_PER_PAGE = 12;

const Accessories = () => {
  const { toast } = useToast();
  const { addItem } = useCartStore();
  
  const [selectedProduct, setSelectedProduct] = useState<AccessoryProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('name');
  const [localSearch, setLocalSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [brandFilter, setBrandFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort products
  const filteredAndSortedAccessories = useMemo(() => {
    let filtered = [...accessoriesData];

    // Apply brand filter
    if (brandFilter) {
      filtered = filtered.filter(accessory => accessory.brand === brandFilter);
    }

    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(accessory => accessory.category === categoryFilter);
    }

    // Apply search filter
    if (localSearch) {
      const term = localSearch.toLowerCase();
      filtered = filtered.filter(accessory => 
        accessory.name.toLowerCase().includes(term) ||
        accessory.brand.toLowerCase().includes(term) ||
        accessory.series.toLowerCase().includes(term) ||
        accessory.description?.toLowerCase().includes(term) ||
        accessory.compatibleBrands?.some(brand => brand.toLowerCase().includes(term))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'brand':
          return a.brand.localeCompare(b.brand);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [brandFilter, categoryFilter, localSearch, sortBy]);

  // Paginate products
  const paginatedData = useMemo(() => {
    return paginateAccessories(filteredAndSortedAccessories, currentPage, PRODUCTS_PER_PAGE);
  }, [filteredAndSortedAccessories, currentPage]);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [brandFilter, categoryFilter, localSearch, sortBy]);

  const handleProductClick = (product: AccessoryProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product: Omit<AccessoryProduct, 'series' | 'category'> & { quantity?: number }) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      size: 'Universal',
      color: '',
      quantity: product.quantity || 1
    };
    
    addItem(cartItem);

    toast({
      title: "Berhasil Ditambahkan",
      description: `${product.name} telah ditambahkan ke keranjang.`,
    });
  };

  const handleLocalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search will be applied automatically through the useMemo dependency
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (paginatedData.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(paginatedData.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
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
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-gothic">
            Katalog Accessories
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
            {localSearch && (
              <Badge variant="secondary" className="bg-purple-600 text-white border-purple-500">
                Pencarian: {localSearch}
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
                placeholder="Cari accessory berdasarkan nama, brand, atau kompatibilitas..."
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
                  {getAllAccessoryBrands().map((brand) => (
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
                  <SelectItem value="visor" className="text-white hover:bg-gray-700">Visor</SelectItem>
                  <SelectItem value="padding" className="text-white hover:bg-gray-700">Padding</SelectItem>
                  <SelectItem value="parts" className="text-white hover:bg-gray-700">Parts</SelectItem>
                  <SelectItem value="bluetooth" className="text-white hover:bg-gray-700">Bluetooth</SelectItem>
                  <SelectItem value="tas" className="text-white hover:bg-gray-700">Tas</SelectItem>
                  <SelectItem value="spoiler" className="text-white hover:bg-gray-700">Spoiler</SelectItem>
                  <SelectItem value="chin-guard" className="text-white hover:bg-gray-700">Chin Guard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Urutkan berdasarkan" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="name" className="text-white hover:bg-gray-700">Nama A-Z</SelectItem>
                  <SelectItem value="brand" className="text-white hover:bg-gray-700">Brand A-Z</SelectItem>
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
            {paginatedData.products.map((accessory) => (
              <Card key={accessory.id} className={`group hover:shadow-xl transition-all duration-300 bg-gray-800 border-gray-700 hover:border-red-500 ${
                viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'
              }`}>
                <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full'}>
                  <img 
                    src={accessory.image} 
                    alt={accessory.name} 
                    className={`object-cover group-hover:scale-105 transition-transform cursor-pointer ${
                      viewMode === 'list' ? 'h-32 w-full rounded-l-lg' : 'h-64 w-full rounded-t-lg'
                    }`}
                    onClick={() => handleProductClick(accessory)}
                  />
                </div>
                
                <CardContent className={`p-4 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                  <div className={viewMode === 'list' ? 'flex-1' : ''}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs bg-red-600 text-white border-red-500">
                        {accessory.brand}
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                        {accessory.category.charAt(0).toUpperCase() + accessory.category.slice(1)}
                      </Badge>
                      {accessory.isOnSale && (
                        <Badge className="text-xs bg-orange-600 text-white">
                          Sale {accessory.salePercentage}%
                        </Badge>
                      )}
                    </div>
                    
                    <h3 
                      className="text-lg font-semibold text-white mb-2 cursor-pointer hover:text-red-400 transition-colors line-clamp-2"
                      onClick={() => handleProductClick(accessory)}
                    >
                      {accessory.name}
                    </h3>
                    
                    {accessory.description && (
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                        {accessory.description}
                      </p>
                    )}

                    {/* Compatibility */}
                    {accessory.compatibleBrands && accessory.compatibleBrands.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-1 mb-1">
                          <Shield className="h-3 w-3 text-green-400" />
                          <span className="text-xs text-gray-400">Kompatibel:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {accessory.compatibleBrands.slice(0, 3).map((brand) => (
                            <Badge key={brand} variant="outline" className="text-xs bg-green-600 text-white border-green-500">
                              {brand}
                            </Badge>
                          ))}
                          {accessory.compatibleBrands.length > 3 && (
                            <span className="text-xs text-gray-400">+{accessory.compatibleBrands.length - 3}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Rating and Reviews */}
                    {accessory.rating && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(accessory.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          ({accessory.rating}) • {accessory.reviews} ulasan
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        {accessory.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">
                            Rp {accessory.originalPrice.toLocaleString('id-ID')}
                          </p>
                        )}
                        <p className="text-xl font-bold text-red-400">
                          Rp {accessory.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>

                    {/* Stock indicator */}
                    {accessory.stock !== undefined && (
                      <p className="text-xs text-gray-400 mb-3">
                        Stok: {accessory.stock} tersedia
                      </p>
                    )}
                  </div>
                  
                  <div className={`flex gap-2 ${viewMode === 'list' ? 'mt-4' : ''}`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                      onClick={() => handleProductClick(accessory)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Detail
                    </Button>
                    <Button 
                      size="sm"
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      onClick={() => handleAddToCart({
                        id: accessory.id,
                        name: accessory.name,
                        price: accessory.price,
                        image: accessory.image,
                        brand: accessory.brand,
                        quantity: 1
                      })}
                      disabled={accessory.stock === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {accessory.stock === 0 ? 'Habis' : 'Keranjang'}
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
                setLocalSearch('');
                setBrandFilter('');
                setCategoryFilter('');
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}

        {/* Pagination */}
        {renderPagination()}

        {/* Category Showcase */}
        {!categoryFilter && !localSearch && (
          <div className="mt-16 pt-16 border-t border-gray-700">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Kategori Accessories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {[
                { name: 'Visor', category: 'visor', icon: '🔍' },
                { name: 'Padding', category: 'padding', icon: '🛡️' },
                { name: 'Parts', category: 'parts', icon: '⚙️' },
                { name: 'Bluetooth', category: 'bluetooth', icon: '📡' },
                { name: 'Tas', category: 'tas', icon: '🎒' },
                { name: 'Spoiler', category: 'spoiler', icon: '✈️' },
                { name: 'Chin Guard', category: 'chin-guard', icon: '🛡️' }
              ].map((cat) => (
                <div key={cat.category} className="text-center">
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-700 hover:border-red-500 transition-all cursor-pointer">
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <h3 className="font-bold text-lg text-white">{cat.name}</h3>
                  </div>
                  <Button 
                    variant="link" 
                    className="mt-2 text-red-400 hover:text-red-300"
                    onClick={() => setCategoryFilter(cat.category)}
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

      {/* Universal Product Detail Modal */}
      <UniversalProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Accessories;