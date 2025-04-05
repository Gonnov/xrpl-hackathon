import { BillOfLadingData } from "@/components/BillOfLading/types";

export const billData: BillOfLadingData = {
  header: {
    disclaimer:
      "See website for large version of the reverse | Ver pagina Web para terminos y condiciones | CMOTpMTe Be6-CanT AIa O3HaKOMTeHMA C YCnOBMAM M TOnOKEHMAIMM | 提单的条款和条件详请见网站|www.msc.com",
    companyName: "CMA CGM",
    companyLogo: "/image-1.png",
    companyAddress: "4 BOULEVARD SAADE - QUAI ARENC 13002 MARSEILLE",
    companyContact: "06 30 77 32 78 info@cmacgm.fr",
  },
  shipper: {
    name: "PEUGEOT CITROEN AUTOMOBILE SA",
    address: "1 Quai Colbert 76096 Le Havre, France",
    contact: "06 30 77 32 78 info@cmacgm.fr",
  },
  consignee: {
    name: "Innoson Vehicle Manufacturing",
    address: "Abidjan, Côte d'Ivoire",
  },
  notifyParty: {
    name: "Société Générale ( Banque )",
  },
  forwarder: {
    name: "Bolloré Logistics",
  },
  billInfo: {
    number: "-",
    type: "Sea EB/L N°",
    copyType: "Negotiable - Copy",
    subtitle: "\"Port to Port\" or \"Combined Transport\" ( see Clause 1 )",
    riderPages: "-",
    agentEndorsements: "-",
    dischargeEndorsement: "-",
  },
  transport: {
    vesselNumber: "CMA CGM",
    voyageNumber: "-",
    portOfLoading: "Marseille, France, 24/09/2024",
    portOfDischarge: "Port autonome d'Abidjan, Côte d'Ivoire, 08/10/2024 (ETÁ)",
    placeOfReceipt: "Usine de PSA Peugeot Citroën, Poissy, France",
    placeOfDelivery: "Abidjan, Côte d'Ivoire (Innoson Manufacturing Plant)",
    shippedOnBoardDate: "-",
  },
  cargo: {
    containerNumbers: ["INNO123456789", "CMAU1234567"],
    sealNumbers: ["987654321"],
    description: "Electronic components",
    packageType: "Cartons",
    quantity: 500,
    grossWeight: "10,000 kg",
    measurement: "12m3",
    complianceIssues: [
      {
        field: "description",
        message: "Description too vague. Use specific terminology as per ISBP 745 – Article 22.",
        suggestion: "500 units of 7-pin microcontroller ICs (Model: MCX-78) for automotive applications"
      },
      {
        field: "quantity",
        message: "Missing unit of measure. Specify the counting unit.",
        suggestion: "500 cartons"
      },
      {
        field: "description",
        message: "Product description mismatch with Commercial Invoice (Ref: INV-2024-001)",
        suggestion: "Update to match: Mixed ICs and PCB modules for automotive applications"
      }
    ]
  },
  charges: {
    freightPayableAt: "DESTINATION",
    prepaid: "-",
    collect: "-",
    currency: "€",
    freightOfCharges: "25,000€",
    basis: "-",
    rate: "-",
  },
  declarations: {
    declaredValue: "2,500,000€",
    customsDeclaration:
      "( Only applicable if Ad Valorem charges pid - see Clause 7.3 )",
  },
  carrierReceipt: {
    receivedUnits: "-",
    clause: "( No. of Cntrs or Pkgs rcvd by Carrier - see Clause 14.1 )",
  },
  signature: {
    place: "-",
    date: "-",
    signedBy: "On behalf of the Carrier CMA CGM",
  },
};