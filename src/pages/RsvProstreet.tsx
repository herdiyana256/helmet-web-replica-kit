import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RsvProstreet = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8 font-gothic">RSV X PROSTREET</h1>
        <div className="prose max-w-none text-muted-foreground">
          <p className="text-lg mb-6">
            Kolaborasi eksklusif antara RSV dan Prostreet menghadirkan koleksi helm premium 
            yang menggabungkan teknologi terdepan dengan desain yang memukau.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Teknologi Terdepan</h2>
              <p>Menggunakan material carbon fiber berkualitas tinggi untuk perlindungan maksimal.</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Desain Eksklusif</h2>
              <p>Desain unik hasil kolaborasi dengan tim Prostreet yang berpengalaman.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RsvProstreet;