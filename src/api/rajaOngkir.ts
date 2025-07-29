import axios from 'axios';

// Raja Ongkir API configuration
const RAJA_ONGKIR_API_KEY = 'hideki-api-key-placeholder'; // Replace with actual hideki.id API key
const RAJA_ONGKIR_BASE_URL = 'https://api.rajaongkir.com/starter';

const rajaOngkirApi = axios.create({
  baseURL: RAJA_ONGKIR_BASE_URL,
  headers: {
    'key': RAJA_ONGKIR_API_KEY,
    'content-type': 'application/x-www-form-urlencoded'
  }
});

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

// Get all provinces
export const getProvinces = async (): Promise<Province[]> => {
  try {
    const response = await rajaOngkirApi.get('/province');
    return response.data.rajaongkir.results;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    // Return mock data for development
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
      { province_id: '22', province: 'Nusa Tenggara Barat (NTB)' },
      { province_id: '23', province: 'Nusa Tenggara Timur (NTT)' },
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
      { province_id: '34', province: 'Sumatera Utara' }
    ];
  }
};

// Get cities by province
export const getCitiesByProvince = async (provinceId: string): Promise<City[]> => {
  try {
    const response = await rajaOngkirApi.get(`/city?province=${provinceId}`);
    return response.data.rajaongkir.results;
  } catch (error) {
    console.error('Error fetching cities:', error);
    // Return mock data for development
    if (provinceId === '6') { // DKI Jakarta
      return [
        { city_id: '151', province_id: '6', province: 'DKI Jakarta', type: 'Kota', city_name: 'Jakarta Barat', postal_code: '11220' },
        { city_id: '152', province_id: '6', province: 'DKI Jakarta', type: 'Kota', city_name: 'Jakarta Pusat', postal_code: '10540' },
        { city_id: '153', province_id: '6', province: 'DKI Jakarta', type: 'Kota', city_name: 'Jakarta Selatan', postal_code: '12230' },
        { city_id: '154', province_id: '6', province: 'DKI Jakarta', type: 'Kota', city_name: 'Jakarta Timur', postal_code: '13330' },
        { city_id: '155', province_id: '6', province: 'DKI Jakarta', type: 'Kota', city_name: 'Jakarta Utara', postal_code: '14140' }
      ];
    } else if (provinceId === '9') { // Jawa Barat
      return [
        { city_id: '23', province_id: '9', province: 'Jawa Barat', type: 'Kota', city_name: 'Bandung', postal_code: '40111' },
        { city_id: '24', province_id: '9', province: 'Jawa Barat', type: 'Kabupaten', city_name: 'Bandung', postal_code: '40311' },
        { city_id: '25', province_id: '9', province: 'Jawa Barat', type: 'Kota', city_name: 'Banjar', postal_code: '46311' },
        { city_id: '26', province_id: '9', province: 'Jawa Barat', type: 'Kota', city_name: 'Bekasi', postal_code: '17112' },
        { city_id: '27', province_id: '9', province: 'Jawa Barat', type: 'Kabupaten', city_name: 'Bekasi', postal_code: '17837' }
      ];
    }
    return [];
  }
};

// Calculate shipping cost
export const calculateShippingCost = async (
  origin: string,
  destination: string,
  weight: number,
  courier: string
): Promise<CourierResult[]> => {
  try {
    const formData = new URLSearchParams();
    formData.append('origin', origin);
    formData.append('destination', destination);
    formData.append('weight', weight.toString());
    formData.append('courier', courier);

    const response = await rajaOngkirApi.post('/cost', formData);
    return response.data.rajaongkir.results;
  } catch (error) {
    console.error('Error calculating shipping cost:', error);
    // Return mock data for development
    const mockResults: CourierResult[] = [
      {
        code: 'jne',
        name: 'Jalur Nugraha Ekakurir (JNE)',
        costs: [
          {
            service: 'OKE',
            description: 'Ongkos Kirim Ekonomis',
            cost: [
              {
                value: 15000,
                etd: '2-3',
                note: ''
              }
            ]
          },
          {
            service: 'REG',
            description: 'Layanan Reguler',
            cost: [
              {
                value: 18000,
                etd: '1-2',
                note: ''
              }
            ]
          },
          {
            service: 'YES',
            description: 'Yakin Esok Sampai',
            cost: [
              {
                value: 25000,
                etd: '1-1',
                note: ''
              }
            ]
          }
        ]
      },
      {
        code: 'pos',
        name: 'POS Indonesia (POS)',
        costs: [
          {
            service: 'Paket Kilat Khusus',
            description: 'Paket Kilat Khusus',
            cost: [
              {
                value: 12000,
                etd: '2-4',
                note: ''
              }
            ]
          }
        ]
      },
      {
        code: 'tiki',
        name: 'Citra Van Titipan Kilat (TIKI)',
        costs: [
          {
            service: 'ECO',
            description: 'Ekonomi Service',
            cost: [
              {
                value: 16000,
                etd: '4',
                note: ''
              }
            ]
          },
          {
            service: 'REG',
            description: 'Regular Service',
            cost: [
              {
                value: 20000,
                etd: '2',
                note: ''
              }
            ]
          }
        ]
      }
    ];
    return mockResults;
  }
};

// Get all cities (for autocomplete)
export const getAllCities = async (): Promise<City[]> => {
  try {
    const response = await rajaOngkirApi.get('/city');
    return response.data.rajaongkir.results;
  } catch (error) {
    console.error('Error fetching all cities:', error);
    return [];
  }
};

// Supported couriers
export const SUPPORTED_COURIERS = [
  { code: 'jne', name: 'JNE' },
  { code: 'pos', name: 'POS Indonesia' },
  { code: 'tiki', name: 'TIKI' }
];

// Default origin (store location) - Jakarta Pusat
export const DEFAULT_ORIGIN = '152';