import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Distributor = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8 font-gothic">Distributor</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Menjadi Mitra Distributor Hideki</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Bergabunglah dengan jaringan distributor Hideki dan raih kesuksesan bersama. 
            Kami menyediakan dukungan penuh untuk memastikan bisnis Anda berkembang pesat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Keuntungan Mitra</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Margin keuntungan yang kompetitif</li>
              <li>• Dukungan marketing dan promosi</li>
              <li>• Training produk dan penjualan</li>
              <li>• Sistem distribusi yang efisien</li>
              <li>• After sales support terpercaya</li>
              <li>• Territory protection</li>
            </ul>
          </div>
          
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Persyaratan Mitra</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Pengalaman di bidang otomotif min. 2 tahun</li>
              <li>• Memiliki toko/showroom yang strategis</li>
              <li>• Komitmen untuk mencapai target penjualan</li>
              <li>• Modal kerja yang memadai</li>
              <li>• Tim sales yang berpengalaman</li>
              <li>• Legalitas usaha yang lengkap</li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Jenis Kemitraan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 border border-border text-center">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Distributor Regional</h3>
              <p className="text-muted-foreground mb-4">Mengelola area provinsi atau regional dengan target penjualan tinggi</p>
              <Button variant="outline" className="w-full">Pelajari Lebih Lanjut</Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-border text-center">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Dealer Resmi</h3>
              <p className="text-muted-foreground mb-4">Toko resmi Hideki di area kota/kabupaten tertentu</p>
              <Button variant="outline" className="w-full">Pelajari Lebih Lanjut</Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-border text-center">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Reseller Online</h3>
              <p className="text-muted-foreground mb-4">Mitra penjualan online melalui marketplace dan media sosial</p>
              <Button variant="outline" className="w-full">Pelajari Lebih Lanjut</Button>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Lokasi Distributor Saat Ini</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Jakarta", "Surabaya", "Bandung", "Medan", "Semarang", "Palembang",
              "Makassar", "Banjarmasin", "Balikpapan", "Manado", "Denpasar", "Yogyakarta"
            ].map((city) => (
              <div key={city} className="bg-card rounded-lg p-4 border border-border text-center">
                <span className="font-medium text-foreground">{city}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center border border-border">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Siap Menjadi Mitra Hideki?</h2>
          <p className="text-muted-foreground mb-6">
            Hubungi tim Partnership kami untuk mendiskusikan peluang kemitraan yang tersedia di area Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Daftar Sekarang</Button>
            <Button variant="outline" size="lg">Download Proposal</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Distributor;