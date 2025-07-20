import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Career = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8 font-gothic">Karir</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Bergabunglah dengan Tim Hideki</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Kami selalu mencari talenta terbaik untuk bergabung dengan keluarga besar Hideki. 
            Mari bersama-sama menciptakan inovasi terdepan dalam industri helm di Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Kenapa Hideki?</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Lingkungan kerja yang inovatif dan dinamis</li>
              <li>• Kesempatan pengembangan karir yang jelas</li>
              <li>• Benefit dan fasilitas yang kompetitif</li>
              <li>• Tim yang solid dan supportif</li>
              <li>• Proyek-proyek menantang dan bermakna</li>
            </ul>
          </div>
          
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Yang Kami Cari</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Passion terhadap industri otomotif</li>
              <li>• Semangat untuk terus belajar dan berkembang</li>
              <li>• Kemampuan bekerja dalam tim</li>
              <li>• Dedikasi terhadap kualitas produk</li>
              <li>• Inovasi dan kreativitas tinggi</li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Lowongan Tersedia</h2>
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-6 border border-border flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Product Designer</h3>
                <p className="text-muted-foreground">Full-time • Jakarta • Design</p>
              </div>
              <Button>Lamar</Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-border flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Marketing Specialist</h3>
                <p className="text-muted-foreground">Full-time • Jakarta • Marketing</p>
              </div>
              <Button>Lamar</Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-border flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Quality Control</h3>
                <p className="text-muted-foreground">Full-time • Tangerang • Production</p>
              </div>
              <Button>Lamar</Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-border flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Sales Representative</h3>
                <p className="text-muted-foreground">Full-time • Multi-location • Sales</p>
              </div>
              <Button>Lamar</Button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center border border-border">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Tidak Menemukan Posisi yang Cocok?</h2>
          <p className="text-muted-foreground mb-6">
            Kirimkan CV dan portfolio Anda kepada kami. Kami akan menghubungi Anda ketika ada posisi yang sesuai.
          </p>
          <Button size="lg">Kirim CV Inisiatif</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Career;