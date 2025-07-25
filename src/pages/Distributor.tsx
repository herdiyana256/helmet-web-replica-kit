"use client"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import emailjs from "@emailjs/browser";

const Distributor = () => {
  const form = useRef(null)
  const [status, setStatus] = useState("")

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.current) return

    emailjs
      .sendForm("your_service_id", "your_template_id", form.current, "your_public_key")
      .then(() => {
        setStatus("success")
        ;(form.current as HTMLFormElement).reset()
      })
      .catch(() => {
        setStatus("error")
      })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8 font-gothic">Distributor</h1>

        {/* Form Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Form Pendaftaran Distributor</h2>
          <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card p-6 rounded-lg border border-border">
            {[
              { label: "Nama Perusahaan", name: "company", required: true },
              { label: "Alamat Perusahaan", name: "address", required: true },
              { label: "Negara", name: "country", required: true },
              { label: "Provinsi", name: "province", required: true },
              { label: "Kota", name: "city", required: true },
              { label: "Kode Pos", name: "postal_code", required: true },
              { label: "Telepon", name: "phone", required: true },
              { label: "Email", name: "email", type: "email", required: true },
              { label: "Website", name: "website", required: false },
              { label: "Contact Person", name: "contact_person", required: true }
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col">
                <label className="text-sm font-medium text-foreground mb-1">
                  {field.label}{field.required && "*"}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  required={field.required}
                  className="p-2 border rounded-md text-sm bg-background border-border text-foreground"
                />
              </div>
            ))}
            <div className="md:col-span-2 flex justify-end mt-4">
              <Button type="submit">Submit</Button>
            </div>
            {status === "success" && (
              <p className="text-green-600 md:col-span-2 text-sm mt-2">Form berhasil dikirim!</p>
            )}
            {status === "error" && (
              <p className="text-red-600 md:col-span-2 text-sm mt-2">Terjadi kesalahan saat mengirim.</p>
            )}
          </form>
        </div>

        {/* Section lainnya tetap sama */}
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
            {[
              {
                title: "Distributor Regional",
                desc: "Mengelola area provinsi atau regional dengan target penjualan tinggi"
              },
              {
                title: "Dealer Resmi",
                desc: "Toko resmi Hideki di area kota/kabupaten tertentu"
              },
              {
                title: "Reseller Online",
                desc: "Mitra penjualan online melalui marketplace dan media sosial"
              }
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-lg p-6 border border-border text-center">
                <h3 className="text-lg font-semibold mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.desc}</p>
                <Button variant="outline" className="w-full">Pelajari Lebih Lanjut</Button>
              </div>
            ))}
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
  )
}

export default Distributor
