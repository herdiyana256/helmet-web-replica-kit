import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Career = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8 font-gothic">Karir di Hideki</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Bergabunglah dengan Kami: Membangun Masa Depan Bersama</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Di Hideki, kami percaya bahwa setiap individu memiliki potensi luar biasa untuk berkontribusi pada inovasi dan pertumbuhan. Kami adalah tim yang dinamis, bersemangat, dan berdedikasi untuk menciptakan produk atau layanan terbaik di industri. Jika Anda mencari lingkungan kerja yang menantang, mendukung, dan penuh peluang untuk berkembang, Anda telah datang ke tempat yang tepat.
          </p>
          <p className="text-muted-foreground text-lg mb-8">
            Kami tidak hanya menawarkan pekerjaan, tetapi juga sebuah perjalanan karir yang bermakna. Kami mendorong kolaborasi, menghargai ide-ide segar, dan berkomitmen pada pengembangan profesional setiap anggota tim. Bergabunglah dengan kami dan jadilah bagian dari kekuatan pendorong di balik kesuksesan kami.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Mengenal Departemen Kami: Jantung Operasional Hideki</h2>
          
          {/* Departemen Penjualan */}
          <div className="bg-card rounded-lg p-6 border border-border mb-6">
            <h3 className="text-xl font-semibold mb-4 text-foreground">1. Departemen Penjualan (Sales Department)</h3>
            <p className="text-muted-foreground mb-2"><strong>Misi:</strong> Menjadi garda terdepan dalam membangun hubungan dengan pelanggan, memahami kebutuhan mereka, dan menghadirkan solusi produk/layanan yang tepat untuk mencapai target penjualan yang ambisius.</p>
            <p className="text-muted-foreground mb-2"><strong>Tanggung Jawab Utama:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground mb-4">
              <li>Mengidentifikasi dan mengembangkan peluang bisnis baru.</li>
              <li>Membangun dan memelihara hubungan baik dengan klien eksisting.</li>
              <li>Melakukan presentasi produk/layanan dan negosiasi kontrak.</li>
              <li>Menganalisis tren pasar dan kinerja penjualan untuk strategi yang lebih baik.</li>
              <li>Berkoordinasi erat dengan tim Pemasaran dan Produk untuk memastikan kepuasan pelanggan.</li>
            </ul>
            <p className="text-muted-foreground mb-2"><strong>Kualifikasi yang Kami Cari:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Pengalaman terbukti dalam penjualan, diutamakan di industri terkait.</li>
              <li>Kemampuan komunikasi dan negosiasi yang luar biasa.</li>
              <li>Berorientasi pada target dan memiliki motivasi tinggi.</li>
              <li>Kemampuan membangun hubungan interpersonal yang kuat.</li>
              <li>Pemahaman mendalam tentang siklus penjualan dan strategi closing.</li>
            </ul>
          </div>

          {/* Departemen Pemasaran */}
          <div className="bg-card rounded-lg p-6 border border-border mb-6">
            <h3 className="text-xl font-semibold mb-4 text-foreground">2. Departemen Pemasaran (Marketing Department)</h3>
            <p className="text-muted-foreground mb-2"><strong>Misi:</strong> Membangun kesadaran merek yang kuat, menarik perhatian target audiens, dan mendorong minat serta konversi melalui strategi pemasaran yang inovatif dan terukur.</p>
            <p className="text-muted-foreground mb-2"><strong>Tanggung Jawab Utama:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground mb-4">
              <li>Mengembangkan dan melaksanakan kampanye pemasaran digital dan tradisional.</li>
              <li>Mengelola kehadiran merek di berbagai platform (media sosial, website, dll.).</li>
              <li>Melakukan riset pasar untuk mengidentifikasi peluang dan tren.</li>
              <li>Menganalisis data kampanye untuk mengoptimalkan ROI.</li>
              <li>Berkoordinasi dengan tim Penjualan untuk menyelaraskan strategi.</li>
            </ul>
            <p className="text-muted-foreground mb-2"><strong>Kualifikasi yang Kami Cari:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Pengalaman dalam pengembangan strategi pemasaran dan eksekusi kampanye.</li>
              <li>Kreativitas tinggi dan kemampuan berpikir out-of-the-box.</li>
              <li>Pemahaman tentang SEO/SEM, konten pemasaran, dan analitik.</li>
              <li>Kemampuan multitasking dan bekerja di bawah tekanan.</li>
              <li>Portofolio kampanye yang sukses adalah nilai tambah.</li>
            </ul>
          </div>

          {/* Departemen Sumber Daya Manusia & Hukum */}
          <div className="bg-card rounded-lg p-6 border border-border mb-6">
            <h3 className="text-xl font-semibold mb-4 text-foreground">3. Departemen Sumber Daya Manusia & Hukum (Human Resources & Legal Department)</h3>
            <p className="text-muted-foreground mb-2"><strong>Misi:</strong> Menciptakan lingkungan kerja yang positif dan produktif melalui pengelolaan talenta yang efektif, serta memastikan kepatuhan hukum dan tata kelola perusahaan yang baik.</p>
            <p className="text-muted-foreground mb-2"><strong>Tanggung Jawab Utama:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground mb-4">
              <li>Rekrutmen, onboarding, dan pengembangan karyawan.</li>
              <li>Pengelolaan kompensasi, benefit, dan hubungan industrial.</li>
              <li>Pengembangan kebijakan dan prosedur HR.</li>
              <li>Penanganan semua aspek hukum perusahaan, termasuk kontrak dan litigasi.</li>
              <li>Memastikan kepatuhan terhadap peraturan ketenagakerjaan dan hukum yang berlaku.</li>
            </ul>
            <p className="text-muted-foreground mb-2"><strong>Kualifikasi yang Kami Cari:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Pengalaman relevan di bidang HR dan/atau hukum perusahaan.</li>
              <li>Pemahaman mendalam tentang undang-undang ketenagakerjaan.</li>
              <li>Kemampuan komunikasi interpersonal dan resolusi konflik yang kuat.</li>
              <li>Integritas tinggi dan kemampuan menjaga kerahasiaan.</li>
              <li>Gelar sarjana di bidang terkait (Hukum, Psikologi, Manajemen SDM).</li>
            </ul>
          </div>

          {/* Departemen Riset & Pengembangan */}
          <div className="bg-card rounded-lg p-6 border border-border mb-6">
            <h3 className="text-xl font-semibold mb-4 text-foreground">4. Departemen Riset & Pengembangan (R&D Department)</h3>
            <p className="text-muted-foreground mb-2"><strong>Misi:</strong> Menjadi motor inovasi perusahaan, menjelajahi teknologi baru, dan mengembangkan produk atau layanan revolusioner yang memenuhi kebutuhan pasar di masa depan.</p>
            <p className="text-muted-foreground mb-2"><strong>Tanggung Jawab Utama:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground mb-4">
              <li>Melakukan penelitian mendalam tentang tren teknologi dan pasar.</li>
              <li>Merancang, mengembangkan, dan menguji prototipe produk/layanan baru.</li>
              <li>Berkoordinasi dengan tim Produksi dan Pemasaran untuk transisi produk.</li>
              <li>Menganalisis kelayakan teknis dan komersial proyek R&D.</li>
              <li>Mendokumentasikan proses dan hasil penelitian secara komprehensif.</li>
            </ul>
            <p className="text-muted-foreground mb-2"><strong>Kualifikasi yang Kami Cari:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Latar belakang pendidikan di bidang teknik, sains, atau desain industri.</li>
              <li>Pengalaman dalam riset dan pengembangan produk/layanan.</li>
              <li>Kemampuan berpikir analitis dan pemecahan masalah yang kompleks.</li>
              <li>Kreativitas dan inovasi yang tinggi.</li>
              <li>Kemampuan bekerja secara mandiri maupun dalam tim multidisiplin.</li>
            </ul>
          </div>

          {/* Departemen Gudang */}
          <div className="bg-card rounded-lg p-6 border border-border mb-6">
            <h3 className="text-xl font-semibold mb-4 text-foreground">5. Departemen Gudang (Warehouse Department)</h3>
            <p className="text-muted-foreground mb-2"><strong>Misi:</strong> Memastikan pengelolaan inventaris yang efisien, penyimpanan yang aman, dan distribusi produk yang tepat waktu untuk mendukung kelancaran operasional dan kepuasan pelanggan.</p>
            <p className="text-muted-foreground mb-2"><strong>Tanggung Jawab Utama:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground mb-4">
              <li>Menerima, menyimpan, dan mengeluarkan barang sesuai prosedur.</li>
              <li>Melakukan pencatatan inventaris dan rekonsiliasi data.</li>
              <li>Mengelola tata letak gudang untuk efisiensi maksimal.</li>
              <li>Memastikan standar keamanan dan kebersihan gudang.</li>
              <li>Berkoordinasi dengan tim Logistik dan Produksi.</li>
            </ul>
            <p className="text-muted-foreground mb-2"><strong>Kualifikasi yang Kami Cari:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Pengalaman dalam operasional gudang atau logistik.</li>
              <li>Pemahaman tentang sistem manajemen gudang (WMS) adalah nilai tambah.</li>
              <li>Teliti, terorganisir, dan mampu bekerja dengan detail.</li>
              <li>Kondisi fisik yang prima untuk pekerjaan gudang.</li>
              <li>Kemampuan mengoperasikan peralatan gudang (forklift, dll.) jika diperlukan.</li>
            </ul>
          </div>

          {/* Departemen Toko */}
          <div className="bg-card rounded-lg p-6 border border-border mb-6">
            <h3 className="text-xl font-semibold mb-4 text-foreground">6. Departemen Toko (Store Department)</h3>
            <p className="text-muted-foreground mb-2"><strong>Misi:</strong> Memberikan pengalaman belanja yang luar biasa bagi pelanggan, mengelola operasional toko secara efektif, dan mencapai target penjualan ritel.</p>
            <p className="text-muted-foreground mb-2"><strong>Tanggung Jawab Utama:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground mb-4">
              <li>Melayani pelanggan dengan ramah dan profesional.</li>
              <li>Mengelola stok produk di toko dan melakukan replenishment.</li>
              <li>Menata display produk agar menarik dan informatif.</li>
              <li>Melakukan transaksi penjualan dan pelaporan harian.</li>
              <li>Memastikan kebersihan dan kerapian area toko.</li>
            </ul>
            <p className="text-muted-foreground mb-2"><strong>Kualifikasi yang Kami Cari:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Pengalaman di bidang ritel atau layanan pelanggan.</li>
              <li>Kemampuan komunikasi dan interpersonal yang baik.</li>
              <li>Berorientasi pada pelayanan dan kepuasan pelanggan.</li>
              <li>Teliti dalam pengelolaan kas dan inventaris.</li>
              <li>Fleksibel dengan jam kerja ritel, termasuk akhir pekan.</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Proses Rekrutmen Kami: Menemukan Talenta Terbaik</h2>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2">
            <li><strong>Aplikasi Online:</strong> Kirimkan CV dan surat lamaran Anda melalui portal karir kami. Pastikan untuk menyoroti pengalaman dan kualifikasi yang relevan dengan posisi yang Anda lamar.</li>
            <li><strong>Penyaringan Awal:</strong> Tim HR kami akan meninjau semua aplikasi untuk memastikan kesesuaian dengan persyaratan dasar posisi.</li>
            <li><strong>Wawancara Telepon/Online:</strong> Kandidat yang lolos penyaringan awal akan diundang untuk wawancara singkat untuk memahami lebih lanjut tentang pengalaman dan motivasi Anda.</li>
            <li><strong>Wawancara Tatap Muka/Studi Kasus:</strong> Tahap ini mungkin melibatkan beberapa putaran wawancara dengan manajer departemen dan/atau tim, serta studi kasus atau tes teknis untuk menguji kemampuan praktis Anda.</li>
            <li><strong>Penawaran Kerja:</strong> Jika Anda adalah kandidat yang paling sesuai, kami akan mengajukan penawaran kerja. Kami akan membahas detail kompensasi, benefit, dan tanggal mulai kerja.</li>
            <li><strong>Onboarding:</strong> Selamat datang di Hideki! Kami akan memastikan Anda mendapatkan dukungan penuh untuk beradaptasi dengan lingkungan kerja baru dan memulai perjalanan karir Anda dengan sukses.</li>
          </ol>
          <p className="text-muted-foreground text-lg mt-8">
            Kami menantikan aplikasi Anda dan kesempatan untuk membangun masa depan yang cerah bersama!
          </p>
        </section>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center border border-border">
  <h2 className="text-2xl font-bold mb-4 text-foreground">
    Tidak Menemukan Posisi yang Cocok?
  </h2>
  <p className="text-muted-foreground mb-6">
    Kirimkan CV dan portfolio Anda kepada kami. Kami akan menghubungi Anda ketika ada posisi yang sesuai.
  </p>
  <a
    href="https://forms.gle/abc123xyz456" // Ganti dengan link Google Form-mu
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button size="lg">Kirim CV Inisiatif</Button>
  </a>
</div>

      </main>
      <Footer />
    </div>
  );
};

export default Career;

