import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Data dummy untuk produk helm promo
const promoHelmets = Array.from({ length: 8 }, (_, i) => ({
  id: `promo-helm-${i + 1}`,
  name: `Helm Promo Spesial ${i + 1}`,
  originalPrice: `Rp ${((i + 1) * 150000 + 800000).toLocaleString("id-ID")}`,
  promoPrice: `Rp ${((i + 1) * 100000 + 500000).toLocaleString("id-ID")}`,
  discount: `${Math.floor(Math.random() * (30 - 10) + 10)}%`, // Diskon acak 10-30%
  imageUrl: `/placeholder.svg?height=300&width=300&query=promo motorcycle helmet ${i + 1}`, // Placeholder image
  rating: (Math.random() * (5 - 3) + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 200) + 5,
}))

const Promo = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Section 1: Katalog Helm Promo */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-8 text-center">Promo Helm Spesial</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {promoHelmets.map((helmet) => (
              <Card key={helmet.id} className="flex flex-col justify-between overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                    {/* Menggunakan tag <img> standar */}
                    <img
                      src={helmet.imageUrl || "/placeholder.svg"}
                      alt={helmet.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {helmet.discount} OFF
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-lg font-semibold mb-1 line-clamp-2 text-gray-900">{helmet.name}</CardTitle>
                  <p className="text-sm text-gray-500 line-through mb-1">{helmet.originalPrice}</p>
                  <p className="text-xl font-bold text-red-600 mb-2">{helmet.promoPrice}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-500 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                      </svg>
                      {helmet.rating} ({helmet.reviews})
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Lihat Detail
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="px-8 py-3 text-lg bg-transparent">
              Lihat Semua Promo
            </Button>
          </div>
        </section>

        {/* Section 2: Pemberitahuan Hideki.id */}
        <section className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center border border-border">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Hideki Store</h2>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
            The largest one-stop-shop for riders across the nation. Join us on this exhilarating journey and experience
            the thrill of being part of something truly extraordinary.
          </p>
          <p className="text-xl font-semibold text-gray-800 mb-6">Visit Hideki Helmets Store in your city now!</p>
          <Button size="lg" className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground">
            Temukan Toko Kami
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Promo
