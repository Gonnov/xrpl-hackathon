export interface BillOfLadingData {
  header?: {
    disclaimer?: string;
    companyName?: string;
    companyLogo?: string;
    companyAddress?: string;
    companyContact?: string;
  };
  shipper?: {
    name?: string;
    address?: string;
    contact?: string;
  };
  consignee?: {
    name?: string;
    address?: string;
  };
  notifyParty?: {
    name?: string;
    address?: string;
    contact?: string;
  };
  billInfo?: {
    number?: string;
    type?: string;
    copyType?: string;
    subtitle?: string;
    riderPages?: string;
    agentEndorsements?: string;
    dischargeEndorsement?: string;
  };
  transport?: {
    vesselNumber?: string;
    voyageNumber?: string;
    portOfLoading?: string;
    portOfDischarge?: string;
    placeOfReceipt?: string;
    placeOfDelivery?: string;
    shippedOnBoardDate?: string;
  };
  cargo?: {
    containerNumbers: string[];
    sealNumbers: string[];
    description?: string;
    packageType?: string;
    quantity?: number;
    grossWeight?: string;
    measurement?: string;
    complianceIssues?: {
      field: string;
      message: string;
      suggestion?: string;
    }[];
  };
  charges?: {
    freightPayableAt?: string;
    prepaid?: string;
    collect?: string;
    currency?: string;
    freight?: string;
    basis?: string;
    rate?: string;
  };
  declarations?: {
    declaredValue?: string;
    customsDeclaration?: string;
  };
  carrierReceipt?: {
    receivedUnits?: string;
    clause?: string;
  };
  signature?: {
    place?: string;
    date?: string;
    signedBy?: string;
  };
}