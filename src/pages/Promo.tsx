import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Promo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8 font-gothic">Promo Spesial</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PAYDAY DEAL */}
          <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg p-8 border border-border">
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full inline-block mb-4">
              <span className="font-bold">PAYDAY DEAL</span>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Diskon hingga 50%</h2>
            <p className="text-muted-foreground mb-6">
              Dapatkan diskon besar-besaran untuk semua koleksi helm pilihan pada hari gajian!
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• Berlaku untuk semua series helm</li>
              <li>• Cashback tambahan untuk pembelian di atas 2jt</li>
              <li>• Gratis ongkir ke seluruh Indonesia</li>
              <li>• Cicilan 0% tersedia</li>
            </ul>
            <Button className="w-full">Lihat Produk Promo</Button>
          </div>

          {/* RSV STORE PROMO */}
          <div className="bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg p-8 border border-border">
            <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full inline-block mb-4">
              <span className="font-bold">RSV STORE PROMO</span>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Exclusive Store Benefits</h2>
            <p className="text-muted-foreground mb-6">
              Nikmati benefit eksklusif sebagai member RSV Store dengan berbagai keuntungan menarik.
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• Member discount 15% setiap pembelian</li>
              <li>• Priority access untuk produk terbaru</li>
              <li>• Warranty extension hingga 2 tahun</li>
              <li>• Free maintenance service</li>
            </ul>
            <Button variant="secondary" className="w-full">Daftar Member</Button>
          </div>
        </div>

        {/* Flash Sale Section */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center border border-border">
          <h2 className="text-3xl font-bold mb-4 text-foreground">⚡ Flash Sale Hari Ini</h2>
          <p className="text-muted-foreground mb-6">Jangan lewatkan kesempatan emas ini!</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Jam</div>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="text-2xl font-bold text-primary">34</div>
              <div className="text-sm text-muted-foreground">Menit</div>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="text-2xl font-bold text-primary">56</div>
              <div className="text-sm text-muted-foreground">Detik</div>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="text-2xl font-bold text-primary">78</div>
              <div className="text-sm text-muted-foreground">MS</div>
            </div>
          </div>
          <Button size="lg" className="px-8">Belanja Sekarang</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Promo;