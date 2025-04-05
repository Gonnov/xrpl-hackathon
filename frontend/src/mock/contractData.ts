export const productCategories = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'textile', label: 'Textile' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'chemicals', label: 'Chemicals' },
  { value: 'machinery', label: 'Machinery' }
];

export const incoterms = [
  { value: 'DAP', label: 'DAP - Delivered at Place', description: 'Buyer is responsible for import duties and taxes. Seller delivers goods at the named destination, ready for unloading.' },
  { value: 'FOB', label: 'FOB - Free on Board', description: 'Seller delivers goods on board the vessel. Risk transfers when goods cross ship\'s rail.' },
  { value: 'CIF', label: 'CIF - Cost, Insurance & Freight', description: 'Seller pays costs, freight and insurance to bring the goods to the port of destination.' },
  { value: 'EXW', label: 'EXW - Ex Works', description: 'Buyer bears all costs and risks from seller\'s premises to destination.' },
  { value: 'DDP', label: 'DDP - Delivered Duty Paid', description: 'Seller bears all costs and risks to the named destination, including import duties and taxes.' }
];

export const transportModes = [
  { value: 'sea', label: '🚢 Sea Freight' },
  { value: 'air', label: '✈️ Air Freight' },
  { value: 'road', label: '🚚 Road Transport' }
];

export const currencies = [
  { value: 'EUR', label: 'EUR' },
  { value: 'USD', label: 'USD' },
  { value: 'GBP', label: 'GBP' }
];

export const countries = [
  { value: 'VN', label: 'Vietnam' },
  { value: 'US', label: 'United States' },
  { value: 'FR', label: 'France' },
  { value: 'CN', label: 'China' },
  { value: 'SG', label: 'Singapore' }
];

export const invoicingModes = [
  { value: 'per_unit', label: 'Per Unit' },
  { value: 'per_batch', label: 'Per Batch' },
  { value: 'flat_fee', label: 'Flat Fee' }
];

export const mockExtractedData = {
  productName: 'Mixed ICs and PCB modules',
  productCategory: 'electronics',
  productDescription: 'Electronic Components – Mixed ICs and PCB modules for automotive applications',
  quantity: 1000,
  unitPrice: 350,
  hsCode: '8542.31.00',
  countryOfOrigin: 'VN',
  contractValue: '350000',
  currency: 'EUR',
  paymentCurrency: 'USD',
  incoterm: 'DAP',
  contractReference: 'CONT-2024-001',
  tradeType: 'recurring',
  invoicingMode: 'per_unit',
  customClauses: 'Quality inspection required before shipment. \nPackaging must comply with IPC standards.',
  transportMode: 'sea',
  departureLocation: 'Ho Chi Minh City, Vietnam',
  arrivalLocation: 'Los Angeles, California, USA',
  plannedDepartureDate: '2024-04-15',
  expectedArrivalDate: '2024-05-01',
  isMultileg: false,
  isInsured: true,
  insuranceProvider: 'Zurich TradeCover',
  policyNumber: 'ZTC-99887766'
};