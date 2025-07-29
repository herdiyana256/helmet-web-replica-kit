import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-hideki-black-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-hideki-red-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                HIDEKI
              </div>
              <div className="text-sm">
                <div className="font-semibold">Premium Helmets</div>
                <div className="text-xs text-gray-400">& Accessories</div>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Hideki adalah toko helm dan aksesoris motor terpercaya dengan koleksi lengkap 
              dari berbagai brand ternama. Kami berkomitmen memberikan produk berkualitas 
              dengan harga terjangkau untuk keselamatan berkendara Anda.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-hideki-red-400">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-hideki-red-400">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297L3.323 17.49c.875.807 2.026 1.297 3.323 1.297h7.106c1.297 0 2.448-.49 3.323-1.297l-1.803-1.799c-.875.807-2.026 1.297-3.323 1.297H8.449z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-hideki-red-400">
                <span className="sr-only">WhatsApp</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/helm" className="text-gray-300 hover:text-hideki-red-400">Semua Helm</Link></li>
              <li><Link href="/accessories" className="text-gray-300 hover:text-hideki-red-400">Aksesoris</Link></li>
              <li><Link href="/apparel" className="text-gray-300 hover:text-hideki-red-400">Apparel</Link></li>
              <li><Link href="/promo" className="text-gray-300 hover:text-hideki-red-400">Promo</Link></li>
              <li><Link href="/brands" className="text-gray-300 hover:text-hideki-red-400">Brand Helm</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-300 hover:text-hideki-red-400">Bantuan</Link></li>
              <li><Link href="/track-order" className="text-gray-300 hover:text-hideki-red-400">Lacak Pesanan</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-hideki-red-400">Pengembalian</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-hideki-red-400">Pengiriman</Link></li>
              <li><Link href="/payment" className="text-gray-300 hover:text-hideki-red-400">Pembayaran</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-2">📍 Alamat</h4>
              <p className="text-gray-300 text-sm">
                Jl. Raya Motor No. 123<br />
                Jakarta Selatan 12345<br />
                Indonesia
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📞 Kontak</h4>
              <p className="text-gray-300 text-sm">
                Phone: +62 812-3456-7890<br />
                WhatsApp: +62 812-3456-7890<br />
                Email: info@hideki.id
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🕒 Jam Operasional</h4>
              <p className="text-gray-300 text-sm">
                Senin - Sabtu: 09:00 - 21:00<br />
                Minggu: 10:00 - 18:00<br />
                Online 24/7
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Hideki Helmets. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-hideki-red-400 text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-hideki-red-400 text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-hideki-red-400 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}