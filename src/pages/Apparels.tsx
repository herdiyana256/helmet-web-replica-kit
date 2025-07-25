import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const allProducts = [
  {
    name: "JAKET HIDEKI WASP YELLOW",
    regularPrice: 395000,
    salePrice: 296250,
    isSoldOut: false,
    isSale: true,
  },
  {
    name: "JERSEY HIDEKI COMANDER",
    regularPrice: 295000,
    salePrice: 221250,
    isSoldOut: false,
    isSale: true,
  },
  {
    name: "JERSEY HIDEKI PISTON",
    regularPrice: 295000,
    salePrice: 221250,
    isSoldOut: false,
    isSale: true,
  },
  {
    name: "JAKET HIDEKI FLASHING RED",
    regularPrice: 395000,
    salePrice: 296250,
    isSoldOut: false,
    isSale: true,
  },
  {
    name: "JERSEY HIDEKI HARMONIC",
    regularPrice: 295000,
    salePrice: 221250,
    isSoldOut: false,
    isSale: true,
  },
  {
    name: "JERSEY HIDEKI POWER",
    regularPrice: 295000,
    salePrice: 221250,
    isSoldOut: false,
    isSale: true,
  },
  {
    name: "JERSEY HIDEKI TYPO",
    regularPrice: 295000,
    salePrice: 221250,
    isSoldOut: false,
    isSale: true,
  },
  {
    name: "JERSEY HIDEKI RED STAR",
    regularPrice: 295000,
    salePrice: 221250,
    isSoldOut: false,
    isSale: true,
  },
  {
    name: "JERSEY HIDEKI BRAWLER",
    regularPrice: 295000,
    salePrice: 221250,
    isSoldOut: false,
    isSale: true,
  },
  {
    name: "JAKET HIDEKI TYPO BLUE",
    regularPrice: 395000,
    salePrice: 296250,
    isSoldOut: true,
    isSale: true,
  },
  {
    name: "JAKET HIDEKI ROCKER RED",
    regularPrice: 395000,
    salePrice: 296250,
    isSoldOut: false,
    isSale: true,
  },
  {
    name: "JAKET HIDEKI FLASHING BLUE",
    regularPrice: 395000,
    salePrice: 296250,
    isSoldOut: false,
    isSale: true,
  },
  {
    name: "JAKET FIREFIGHTER YELLOW",
    regularPrice: 395000,
    salePrice: 296250,
    isSoldOut: false,
    isSale: true,
  },
  {
    name: "JAKET HIDEKI FIREFIGHTER WHITE STRIPE",
    regularPrice: 395000,
    salePrice: 296250,
    isSoldOut: false,
    isSale: true,
  },
  {
    name: "JAKET HIDEKI ROCKET BLACK",
    regularPrice: 395000,
    salePrice: 296250,
    isSoldOut: true,
    isSale: true,
  },
  {
    name: "JAKET HIDEKI RED STAR",
    regularPrice: 395000,
    salePrice: 296250,
    isSoldOut: true,
    isSale: false,
  },
];

const PRODUCTS_PER_PAGE = 6;

const Apparels = () => {
  const [sortOption, setSortOption] = useState("unggulan");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  const paginatedProducts = allProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-8">
        <h1 className="text-4xl font-bold text-foreground font-gothic">Apparel</h1>

        {/* Filter & Sorting */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center border-b pb-4 border-border">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="font-medium">Filter:</span>
            <Button variant="outline" size="sm">Ketersediaan</Button>
            <Button variant="outline" size="sm">Harga</Button>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-medium">Urutkan:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-border rounded px-2 py-1 bg-background text-foreground"
            >
              <option value="unggulan">Unggulan</option>
              <option value="harga-terendah">Harga Terendah</option>
              <option value="harga-tertinggi">Harga Tertinggi</option>
              <option value="terbaru">Terbaru</option>
            </select>
          </div>
        </div>

        {/* Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product, index) => (
            <div
              key={index}
              className="bg-card p-4 rounded-xl border border-border shadow-sm relative flex flex-col justify-between"
            >
              {product.isSoldOut && (
                <Badge className="absolute top-4 right-4 bg-gray-400 text-white">Habis</Badge>
              )}
              {product.isSale && !product.isSoldOut && (
                <Badge className="absolute top-4 right-4 bg-red-600 text-white">Obral</Badge>
              )}
              <h3 className="text-lg font-semibold text-foreground mb-2">{product.name}</h3>
              <div className="mb-4">
                {product.salePrice !== product.regularPrice && (
                  <p className="line-through text-sm text-muted-foreground">
                    {formatPrice(product.regularPrice)}
                  </p>
                )}
                <p className="text-lg font-bold text-primary">{formatPrice(product.salePrice)}</p>
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <Button disabled={product.isSoldOut}>Tambah ke Keranjang</Button>
                <Button variant="outline" asChild>
                  <a
                    href={`https://wa.me/6281234567890?text=Halo%20admin%2C%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(
                      product.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat Admin
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 pt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;&lt;
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <Button
              key={pg}
              size="sm"
              variant={pg === currentPage ? "default" : "outline"}
              onClick={() => setCurrentPage(pg)}
            >
              {pg}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </Button>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          {allProducts.length} produk
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Apparels;
