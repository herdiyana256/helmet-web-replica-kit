import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { useAuthStore } from '@/store/authStore'
import { Eye, EyeOff, User, ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  })
  
  const { register, isLoading } = useAuthStore()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Harap isi semua field yang diperlukan",
        variant: "destructive"
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Password dan konfirmasi password tidak sama",
        variant: "destructive"
      })
      return
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password minimal 6 karakter",
        variant: "destructive"
      })
      return
    }

    const success = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      password: formData.password
    })
    
    if (success) {
      toast({
        title: "Registrasi Berhasil",
        description: "Akun Anda telah dibuat dan Anda sudah login",
      })
      navigate('/')
    } else {
      toast({
        title: "Registrasi Gagal",
        description: "Email sudah terdaftar atau terjadi kesalahan",
        variant: "destructive"
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 text-gray-400 hover:text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">
                Daftar ke Hideki Helmets
              </CardTitle>
              <CardDescription className="text-gray-400">
                Buat akun baru untuk mulai berbelanja
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="customer@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Nomor HP</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+62812345678"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-white">Alamat</Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Alamat lengkap"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Minimal 6 karakter"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Konfirmasi Password *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Ulangi password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
                </Button>
              </form>
              
              <Separator className="my-6 bg-gray-600" />
              
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Sudah punya akun?{' '}
                  <Link to="/login" className="text-red-400 hover:text-red-300 underline">
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default Register