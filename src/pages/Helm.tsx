import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Helm = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8 font-gothic">Koleksi Helm</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Helm categories content */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">SV300 Series</h2>
            <p className="text-muted-foreground">Helm premium dengan teknologi terdepan</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">New Windtail Series</h2>
            <p className="text-muted-foreground">Desain aerodinamis untuk performa maksimal</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Classic Series</h2>
            <p className="text-muted-foreground">Gaya klasik yang tak lekang waktu</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Helm;