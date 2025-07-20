import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Apparels = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8 font-gothic">Apparels</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Jaket Riding</h2>
            <p className="text-muted-foreground">Jaket berkualitas tinggi untuk perjalanan nyaman</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Sarung Tangan</h2>
            <p className="text-muted-foreground">Perlindungan optimal untuk tangan Anda</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Sepatu Riding</h2>
            <p className="text-muted-foreground">Sepatu khusus untuk berkendara yang aman</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Kaos & T-Shirt</h2>
            <p className="text-muted-foreground">Koleksi kaos dengan desain eksklusif</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Hoodie & Sweater</h2>
            <p className="text-muted-foreground">Pakaian hangat untuk cuaca dingin</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Celana Riding</h2>
            <p className="text-muted-foreground">Celana khusus dengan proteksi tambahan</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Apparels;