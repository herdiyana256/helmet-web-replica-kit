
export interface Province {
  province_id: string;
  province: string;
}

export interface City {
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
}

export interface ShippingCost {
  service: string;
  description: string;
  cost: Array<{
    value: number;
    etd: string;
    note: string;
  }>;
}

export interface CourierResult {
  code: string;
  name: string;
  costs: ShippingCost[];
}

export interface ShippingOption {
  courier: string;
  courierName: string;
  service: string;
  description: string;
  cost: number;
  etd: string;
  note?: string;
}

// Configuration
const RAJAONGKIR_CONFIG = {
  baseUrl: '/api/rajaongkir', // Backend API endpoint
  adminFee: 1000, // Biaya admin dalam rupiah
  freeShippingThreshold: 2000000, // Gratis ongkir di atas 2 juta
};

export class RajaOngkirService {
  private baseUrl = RAJAONGKIR_CONFIG.baseUrl;

  // Get all provinces
  async getProvinces(): Promise<Province[]> {
    try {
      const response = await fetch(`${this.baseUrl}/provinces`);
      if (!response.ok) {
        throw new Error('Failed to fetch provinces');
      }
      const data = await response.json();
      return data.rajaongkir?.results || [];
    } catch (error) {
      console.error('Error fetching provinces:', error);
      // Return mock data untuk demo
      return this.getMockProvinces();
    }
  }

  // Get cities by province
  async getCities(provinceId: string): Promise<City[]> {
    try {
      const response = await fetch(`${this.baseUrl}/cities?province=${provinceId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cities');
      }
      const data = await response.json();
      return data.rajaongkir?.results || [];
    } catch (error) {
      console.error('Error fetching cities:', error);
      // Return mock data untuk demo
      return this.getMockCities(provinceId);
    }
  }

  // Get shipping cost
  async getShippingCost(
    origin: string,
    destination: string,
    weight: number,
    courier: string
  ): Promise<CourierResult[]> {
    try {
      const response = await fetch(`${this.baseUrl}/cost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin,
          destination,
          weight,
          courier,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch shipping cost');
      }

      const data = await response.json();
      return data.rajaongkir?.results || [];
    } catch (error) {
      console.error('Error fetching shipping cost:', error);
      // Return mock data untuk demo
      return this.getMockShippingCost(courier);
    }
  }

  // Get multiple courier options
  async getShippingOptions(
    origin: string,
    destination: string,
    weight: number,
    subtotal: number
  ): Promise<ShippingOption[]> {
    const couriers = ['jne', 'pos', 'tiki'];
    const allOptions: ShippingOption[] = [];

    // Check if eligible for free shipping
    const isFreeShipping = subtotal >= RAJAONGKIR_CONFIG.freeShippingThreshold;

    for (const courier of couriers) {
      try {
        const results = await this.getShippingCost(origin, destination, weight, courier);
        
        for (const result of results) {
          for (const cost of result.costs) {
            for (const costDetail of cost.cost) {
              allOptions.push({
                courier: result.code,
                courierName: result.name,
                service: cost.service,
                description: cost.description,
                cost: isFreeShipping ? 0 : costDetail.value + RAJAONGKIR_CONFIG.adminFee,
                etd: costDetail.etd,
                note: isFreeShipping ? 'Gratis Ongkir!' : costDetail.note,
              });
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching ${courier} shipping cost:`, error);
      }
    }

    // Sort by cost (ascending)
    return allOptions.sort((a, b) => a.cost - b.cost);
  }

  // Calculate total weight from cart items
  calculateWeight(items: any[]): number {
    // Asumsi setiap helm memiliki berat 1.5 kg
    const helmWeight = 1.5; // kg
    return items.reduce((total, item) => total + (helmWeight * item.quantity), 0);
  }

  // Mock data untuk demo
  private getMockProvinces(): Province[] {
    return [
      { province_id: '1', province: 'Bali' },
      { province_id: '2', province: 'Bangka Belitung' },
      { province_id: '3', province: 'Banten' },
      { province_id: '4', province: 'Bengkulu' },
      { province_id: '5', province: 'DI Yogyakarta' },
      { province_id: '6', province: 'DKI Jakarta' },
      { province_id: '7', province: 'Gorontalo' },
      { province_id: '8', province: 'Jambi' },
      { province_id: '9', province: 'Jawa Barat' },
      { province_id: '10', province: 'Jawa Tengah' },
      { province_id: '11', province: 'Jawa Timur' },
      { province_id: '12', province: 'Kalimantan Barat' },
      { province_id: '13', province: 'Kalimantan Selatan' },
      { province_id: '14', province: 'Kalimantan Tengah' },
      { province_id: '15', province: 'Kalimantan Timur' },
      { province_id: '16', province: 'Kalimantan Utara' },
      { province_id: '17', province: 'Kepulauan Riau' },
      { province_id: '18', province: 'Lampung' },
      { province_id: '19', province: 'Maluku' },
      { province_id: '20', province: 'Maluku Utara' },
      { province_id: '21', province: 'Nanggroe Aceh Darussalam (NAD)' },
      { province_id: '22', province: 'Nusa Tenggara Barat' },
      { province_id: '23', province: 'Nusa Tenggara Timur' },
      { province_id: '24', province: 'Papua' },
      { province_id: '25', province: 'Papua Barat' },
      { province_id: '26', province: 'Riau' },
      { province_id: '27', province: 'Sulawesi Barat' },
      { province_id: '28', province: 'Sulawesi Selatan' },
      { province_id: '29', province: 'Sulawesi Tengah' },
      { province_id: '30', province: 'Sulawesi Tenggara' },
      { province_id: '31', province: 'Sulawesi Utara' },
      { province_id: '32', province: 'Sumatera Barat' },
      { province_id: '33', province: 'Sumatera Selatan' },
      { province_id: '34', province: 'Sumatera Utara' },
    ];
  }

  private getMockCities(provinceId: string): City[] {
    // Mock cities berdasarkan province yang populer
    const mockCities: { [key: string]: City[] } = {
      '6': [ // DKI Jakarta
        { city_id: '151', province_id: '6', province: 'DKI Jakarta', type: 'Kota', city_name: 'Jakarta Barat', postal_code: '11220' },
        { city_id: '152', province_id: '6', province: 'DKI Jakarta', type: 'Kota', city_name: 'Jakarta Pusat', postal_code: '10540' },
        { city_id: '153', province_id: '6', province: 'DKI Jakarta', type: 'Kota', city_name: 'Jakarta Selatan', postal_code: '12230' },
        { city_id: '154', province_id: '6', province: 'DKI Jakarta', type: 'Kota', city_name: 'Jakarta Timur', postal_code: '13330' },
        { city_id: '155', province_id: '6', province: 'DKI Jakarta', type: 'Kota', city_name: 'Jakarta Utara', postal_code: '14140' },
      ],
      '9': [ // Jawa Barat
        { city_id: '22', province_id: '9', province: 'Jawa Barat', type: 'Kota', city_name: 'Bandung', postal_code: '40115' },
        { city_id: '23', province_id: '9', province: 'Jawa Barat', type: 'Kabupaten', city_name: 'Bandung', postal_code: '40311' },
        { city_id: '24', province_id: '9', province: 'Jawa Barat', type: 'Kabupaten', city_name: 'Bandung Barat', postal_code: '40721' },
        { city_id: '25', province_id: '9', province: 'Jawa Barat', type: 'Kabupaten', city_name: 'Bekasi', postal_code: '17837' },
        { city_id: '26', province_id: '9', province: 'Jawa Barat', type: 'Kota', city_name: 'Bekasi', postal_code: '17121' },
        { city_id: '27', province_id: '9', province: 'Jawa Barat', type: 'Kota', city_name: 'Bogor', postal_code: '16119' },
        { city_id: '28', province_id: '9', province: 'Jawa Barat', type: 'Kabupaten', city_name: 'Bogor', postal_code: '16911' },
      ],
      '10': [ // Jawa Tengah
        { city_id: '399', province_id: '10', province: 'Jawa Tengah', type: 'Kota', city_name: 'Semarang', postal_code: '50135' },
        { city_id: '400', province_id: '10', province: 'Jawa Tengah', type: 'Kabupaten', city_name: 'Semarang', postal_code: '50511' },
        { city_id: '398', province_id: '10', province: 'Jawa Tengah', type: 'Kota', city_name: 'Salatiga', postal_code: '50711' },
        { city_id: '501', province_id: '10', province: 'Jawa Tengah', type: 'Kota', city_name: 'Surakarta (Solo)', postal_code: '57113' },
      ],
      '11': [ // Jawa Timur
        { city_id: '444', province_id: '11', province: 'Jawa Timur', type: 'Kota', city_name: 'Surabaya', postal_code: '60119' },
        { city_id: '419', province_id: '11', province: 'Jawa Timur', type: 'Kota', city_name: 'Malang', postal_code: '65112' },
        { city_id: '420', province_id: '11', province: 'Jawa Timur', type: 'Kabupaten', city_name: 'Malang', postal_code: '65163' },
      ],
    };

    return mockCities[provinceId] || [
      { city_id: '1', province_id: provinceId, province: 'Unknown', type: 'Kota', city_name: 'Kota Utama', postal_code: '12345' },
    ];
  }

  private getMockShippingCost(courier: string): CourierResult[] {
    const mockData: { [key: string]: CourierResult } = {
      jne: {
        code: 'jne',
        name: 'Jalur Nugraha Ekakurir (JNE)',
        costs: [
          {
            service: 'OKE',
            description: 'Ongkos Kirim Ekonomis',
            cost: [{ value: 15000, etd: '2-3', note: '' }],
          },
          {
            service: 'REG',
            description: 'Layanan Reguler',
            cost: [{ value: 18000, etd: '1-2', note: '' }],
          },
          {
            service: 'YES',
            description: 'Yakin Esok Sampai',
            cost: [{ value: 25000, etd: '1-1', note: '' }],
          },
        ],
      },
      pos: {
        code: 'pos',
        name: 'POS Indonesia (POS)',
        costs: [
          {
            service: 'Paket Kilat Khusus',
            description: 'Paket Kilat Khusus',
            cost: [{ value: 12000, etd: '2-4', note: '' }],
          },
          {
            service: 'Express Next Day Barang',
            description: 'Express Next Day Barang',
            cost: [{ value: 22000, etd: '1-1', note: '' }],
          },
        ],
      },
      tiki: {
        code: 'tiki',
        name: 'Citra Van Titipan Kilat (TIKI)',
        costs: [
          {
            service: 'ECO',
            description: 'Economy Service',
            cost: [{ value: 14000, etd: '3-4', note: '' }],
          },
          {
            service: 'REG',
            description: 'Regular Service',
            cost: [{ value: 17000, etd: '2-3', note: '' }],
          },
          {
            service: 'ONS',
            description: 'Over Night Service',
            cost: [{ value: 24000, etd: '1-1', note: '' }],
          },
        ],
      },
    };

    return [mockData[courier] || mockData.jne];
  }
}

// Export singleton instance
export const rajaOngkirService = new RajaOngkirService();

// Utility functions
export const formatShippingCost = (cost: number): string => {
  return cost === 0 ? 'GRATIS' : `Rp ${cost.toLocaleString('id-ID')}`;
};

export const formatETD = (etd: string): string => {
  return `${etd} hari`;
};

export const getShippingDisplayName = (courier: string, service: string): string => {
  const courierNames: { [key: string]: string } = {
    jne: 'JNE',
    pos: 'POS Indonesia',
    tiki: 'TIKI',
  };
  
  return `${courierNames[courier] || courier.toUpperCase()} - ${service}`;
};