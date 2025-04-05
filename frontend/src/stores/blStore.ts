import { create } from 'zustand';

export interface BlData {
  header: {
    disclaimer: string;
    companyName: string;
    companyAddress: string;
    companyContact: string;
    logoSrc: string;
  };
  shipper: {
    title: string;
    name: string;
    address: string;
    contact: string;
  };
  consignee: {
    title: string;
    name: string;
    address: string;
  };
  billInfo: {
    title: string;
    subtitle: string;
    note: string;
  };
  emptyFields: Array<{
    label: string;
    value: string;
    note?: string;
    hasError?: boolean;
    errorMessage?: string;
  }>;
  cargoTable: {
    headers: string[];
    rows: string[][];
  };
  freightTable: {
    headers: string[];
    rows: string[][];
  };
  additionalInfo: Array<{
    title: string;
    note?: string;
    value: string;
    hasError?: boolean;
    errorMessage?: string;
  }>;
}

interface BlStore {
  data: BlData;
  updateField: (path: string[], value: string) => void;
}

export const useBlStore = create<BlStore>((set) => ({
  data: {
    header: {
      disclaimer: "See website for large version of the reverse I Ver pagina Web para terminos y condiciones | CMOTpMTe Be6-CanT AIa O3HaKOMTeHMA C YCnOBMAM M TOnOKEHMAIMM | 提单的条款和条件详请见网站|www.msc.com",
      companyName: "CMA CGM",
      companyAddress: "4 BOULEVARD SAADE - QUAI ARENC 13002 MARSEILLE",
      companyContact: "06 30 77 32 78 info@cmacgm.fr",
      logoSrc: "/image-1.png",
    },
    shipper: {
      title: "SHIPPER",
      name: "PEUGEOT CITROEN AUTOMOBILE SA",
      address: "1 Quai Colbert 76096 Le Havre, France",
      contact: "06 30 77 32 78 info@cmacgm.fr",
    },
    consignee: {
      title: "CONSIGNEE",
      name: "-",
      address: "-",
    },
    billInfo: {
      title: "EB/L N°",
      subtitle: "Negotiable - Copy",
      note: '"Port to Port" or "Conbined Transport" ( see Clause 1 )',
    },
    emptyFields: [
      { 
        label: "NUMÉRO & SEQUENCE OF EB/L",
        value: "-",
        hasError: true,
        errorMessage: "Number sequence does not match carrier's format"
      },
      { label: "NO OF RIDER PAGES", value: "-" },
      {
        label: "CARRIER'S AGENTS ENDORSEMENTS :",
        note: "( Inlcude Agen(s)s at POD )",
        value: "-"
      },
      { label: "PORT OF DISCHARGE AGENT ENDORSEMENT", value: "-" },
      { 
        label: "VESSEL AND VOYAGE NO",
        note: "see Clause 8 & 9",
        value: "-",
        hasError: true,
        errorMessage: "Vessel number mismatch with booking reference"
      },
      { label: "PORT OF LOADING", value: "-" },
      {
        label: "PLACE OF RECEIPT",
        note: "( Conbined Transport ONLT - see Clauses 1 & 5.2 )",
        value: "-"
      },
    ],
    cargoTable: {
      headers: [
        "CONTAINER NUMBERS, SEAL NUMBERS AND MARKS",
        "DESCRIPTION OF PACKAGES AND GOODS",
        "GROSS CARGO WEIGHT",
        "MEASUREMENT",
      ],
      rows: [["-", "-", "-", "-"]],
    },
    freightTable: {
      headers: ["FREIGHT OF CHARGES", "BASIS", "RATE", "PREPAID", "COLLECT"],
      rows: [["-", "-", "-", "-", "-"]],
    },
    additionalInfo: [
      {
        title: "DECLARED VALUES",
        note: "( Only applicable if Ad Valorem charges pid - see Clause 7.3 )",
        value: "-"
      },
      {
        title: "CARRIER'S RECEIPT",
        note: "( No. of Cntrs or Pkgs rcvd by Carrier - see Clause 14.1 )",
        value: "-",
        hasError: true,
        errorMessage: "Container count mismatch with booking details"
      },
      {
        title: "PLACE AND DATE OF ISSUE",
        value: "-"
      },
      {
        title: "SHIPPED ON BOARD DATE",
        value: "-"
      },
      {
        title: "SIGNED",
        note: "On behalf of the Carrier CMA CGM",
        value: "-"
      },
    ],
  },
  updateField: (path, value) =>
    set((state) => {
      const newData = { ...state.data };
      let current = newData;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return { data: newData };
    }),
}));