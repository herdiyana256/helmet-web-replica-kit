import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Accessories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8 font-gothic">Accessories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Visor & Kaca Helm</h2>
            <p className="text-muted-foreground">Kaca helm berkualitas dengan anti fog</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Padding & Interior</h2>
            <p className="text-muted-foreground">Interior helm yang nyaman dan higienis</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Spoiler & Wing</h2>
            <p className="text-muted-foreground">Aksesori untuk performa aerodinamis</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Chin Guard</h2>
            <p className="text-muted-foreground">Perlindungan tambahan untuk dagu</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Bluetooth Intercom</h2>
            <p className="text-muted-foreground">Komunikasi wireless untuk berkendara</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Tas & Carrier</h2>
            <p className="text-muted-foreground">Tas khusus untuk menyimpan helm</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Accessories;