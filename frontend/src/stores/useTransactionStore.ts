import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type UserRole = 'Importer' | 'Exporter' | null;
export type FundingMethod = 'self' | 'financed';
export type RepaymentTerm = '30d' | '60d' | '90d';

interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
}

interface TransactionDetails {
  productName: string;
  productCategory: string;
  productDescription: string;
  quantity: string;
  unitPrice: string;
  hsCode: string;
  countryOfOrigin: string;
  contractValue: string;
  currency: string;
  paymentCurrency: string;
  incoterm: string;
  contractReference: string;
  tradeType: string;
  invoicingMode: string;
  customClauses: string;
  transportMode: string;
  departureLocation: string;
  arrivalLocation: string;
  plannedDepartureDate: Date | null;
  expectedArrivalDate: Date | null;
  isMultileg: boolean;
  isInsured: boolean;
  insuranceProvider: string;
  policyNumber: string;
  fundingMethod: FundingMethod;
  repaymentTerm: RepaymentTerm | null;
  calculatedFee: number;
}

interface TransactionState {
  userRole: UserRole;
  partner: Partner | null;
  details: TransactionDetails;
  isConfirmed: boolean;
  escrowFunded: boolean;
  documentsUploaded: boolean;
  documentsVerified: boolean;
  financingConfirmed: boolean;
}

interface TransactionActions {
  setUserRole: (role: UserRole) => void;
  setPartner: (partner: Partner | null) => void;
  updateDetails: (details: Partial<TransactionDetails>) => void;
  setConfirmed: (confirmed: boolean) => void;
  setEscrowFunded: (funded: boolean) => void;
  setDocumentsUploaded: (uploaded: boolean) => void;
  setDocumentsVerified: (verified: boolean) => void;
  setFinancingConfirmed: (confirmed: boolean) => void;
  resetTransaction: () => void;
}

const initialDetails: TransactionDetails = {
  productName: '',
  productCategory: '',
  productDescription: '',
  quantity: '',
  unitPrice: '',
  hsCode: '',
  countryOfOrigin: '',
  contractValue: '',
  currency: 'EUR',
  paymentCurrency: '',
  incoterm: '',
  contractReference: '',
  tradeType: '',
  invoicingMode: '',
  customClauses: '',
  transportMode: '',
  departureLocation: '',
  arrivalLocation: '',
  plannedDepartureDate: null,
  expectedArrivalDate: null,
  isMultileg: false,
  isInsured: false,
  insuranceProvider: '',
  policyNumber: '',
  fundingMethod: 'self',
  repaymentTerm: null,
  calculatedFee: 2,
};

export const useTransactionStore = create<TransactionState & TransactionActions>()(
  immer((set) => ({
    userRole: null,
    partner: null,
    details: initialDetails,
    isConfirmed: false,
    escrowFunded: false,
    documentsUploaded: false,
    documentsVerified: false,
    financingConfirmed: false,

    setUserRole: (role) =>
      set((state) => {
        state.userRole = role;
      }),

    setPartner: (partner) =>
      set((state) => {
        state.partner = partner;
      }),

    updateDetails: (details) =>
      set((state) => {
        Object.assign(state.details, details);
      }),

    setConfirmed: (confirmed) =>
      set((state) => {
        state.isConfirmed = confirmed;
      }),

    setEscrowFunded: (funded) =>
      set((state) => {
        state.escrowFunded = funded;
      }),

    setDocumentsUploaded: (uploaded) =>
      set((state) => {
        state.documentsUploaded = uploaded;
      }),

    setDocumentsVerified: (verified) =>
      set((state) => {
        state.documentsVerified = verified;
      }),

    setFinancingConfirmed: (confirmed) =>
      set((state) => {
        state.financingConfirmed = confirmed;
      }),

    resetTransaction: () =>
      set((state) => {
        state.userRole = null;
        state.partner = null;
        state.details = initialDetails;
        state.isConfirmed = false;
        state.escrowFunded = false;
        state.documentsUploaded = false;
        state.documentsVerified = false;
        state.financingConfirmed = false;
      }),
  }))
);