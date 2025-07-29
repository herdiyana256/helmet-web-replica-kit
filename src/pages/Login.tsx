import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { useAuthStore } from '@/store/authStore'
import { Eye, EyeOff, User, Shield, ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('user')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const { login, isLoading } = useAuthStore()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Harap isi semua field yang diperlukan",
        variant: "destructive"
      })
      return
    }

    const success = await login(formData.email, formData.password, activeTab as 'user' | 'admin')
    
    if (success) {
      toast({
        title: "Login Berhasil",
        description: `Selamat datang di Hideki Helmets!`,
      })
      
      // Redirect based on role
      if (activeTab === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/')
      }
    } else {
      toast({
        title: "Login Gagal",
        description: "Email, password, atau role tidak valid",
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

  const prefillCredentials = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      setFormData({
        email: 'admin@hideki.id',
        password: 'admin123'
      })
    } else {
      setFormData({
        email: 'user@example.com',
        password: 'user123'
      })
    }
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
                Masuk ke Hideki Helmets
              </CardTitle>
              <CardDescription className="text-gray-400">
                Silakan pilih jenis akun dan masukkan kredensial Anda
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                  <TabsTrigger 
                    value="user" 
                    className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Customer
                  </TabsTrigger>
                  <TabsTrigger 
                    value="admin"
                    className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="user" className="space-y-4 mt-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Login Customer</h3>
                    <p className="text-sm text-gray-400">
                      Masuk sebagai customer untuk berbelanja
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-xs bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                      onClick={() => prefillCredentials('user')}
                    >
                      Isi otomatis demo
                    </Button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
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
                      <Label htmlFor="password" className="text-white">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Masukkan password"
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
                    
                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Memproses...' : 'Masuk sebagai Customer'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="admin" className="space-y-4 mt-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Login Admin</h3>
                    <p className="text-sm text-gray-400">
                      Masuk sebagai admin untuk mengelola toko
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-xs bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                      onClick={() => prefillCredentials('admin')}
                    >
                      Isi otomatis demo
                    </Button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email" className="text-white">Email Admin</Label>
                      <Input
                        id="admin-email"
                        name="email"
                        type="email"
                        placeholder="admin@hideki.id"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="admin-password" className="text-white">Password Admin</Label>
                      <div className="relative">
                        <Input
                          id="admin-password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Masukkan password admin"
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
                    
                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Memproses...' : 'Masuk sebagai Admin'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <Separator className="my-6 bg-gray-600" />
              
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-400">
                  Belum punya akun?{' '}
                  <Link to="/register" className="text-red-400 hover:text-red-300 underline">
                    Daftar sekarang
                  </Link>
                </p>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <p><strong>Demo Credentials:</strong></p>
                  <p>Customer: user@example.com / user123</p>
                  <p>Admin: admin@hideki.id / admin123</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default Login