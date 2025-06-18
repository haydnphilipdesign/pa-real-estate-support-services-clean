export interface PropertyData {
  mlsNumber: string;
  address: string;
  salePrice: string;
  status: 'OCCUPIED' | 'VACANT';
  isWinterized: 'YES' | 'NO';
  updateMls: 'YES' | 'NO';
  propertyAccessType: 'ELECTRONIC LOCKBOX' | 'COMBO LOCKBOX' | 'KEYPAD' | 'APPOINTMENT ONLY';
  lockboxAccessCode: string;
  county: string;
  propertyType: 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND';
  isBuiltBefore1978: 'YES' | 'NO' | '';
  closingDate: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  maritalStatus: 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'DIVORCE IN PROGRESS' | 'WIDOWED';
  type: 'BUYER' | 'SELLER';
}

export interface CommissionData {
  totalCommissionPercentage: string;
  listingAgentPercentage: string;
  buyersAgentPercentage: string;
  hasBrokerFee: boolean;
  brokerFeeAmount: string;
  sellerPaidAmount: string;
  buyerPaidAmount: string;
  hasSellersAssist: boolean;
  sellersAssist: string;
  isReferral: boolean;
  referralParty: string;
  brokerEin: string;
  referralFee: string;
  coordinatorFeePaidBy: 'client' | 'agent';
}

export interface PropertyDetailsData {
  resaleCertRequired: boolean;
  hoaName: string;
  coRequired: boolean;
  municipality: string;
  firstRightOfRefusal: boolean;
  firstRightName: string;
  attorneyRepresentation: boolean;
  attorneyName: string;
  homeWarranty: boolean;
  warrantyCompany: string;
  warrantyCost: string;
  warrantyPaidBy: 'SELLER' | 'BUYER' | 'AGENT' | 'SPLIT';
}

export interface TitleCompanyData {
  titleCompany: string;
  name: string;
  contactName: string;
  contactPhone: string;
}

export interface DocumentData {
  documentsConfirmed: boolean;
}

// Document checklist data structure
export interface DocumentItem {
  name: string;
  required: boolean;
  selected: boolean;
}

export interface DocumentsData {
  documents: DocumentItem[];
  confirmDocuments: boolean;
}

export interface AdditionalInfoData {
  specialInstructions: string;
  urgentIssues: string;
  notes: string;
}

export type AgentRole = 'BUYERS AGENT' | 'LISTING AGENT' | 'DUAL AGENT';

export interface AgentData {
  role: AgentRole | ''; // Allow empty string for initial state
  name: string;
  email: string;
  phone: string;
}

export interface SignatureData {
  agentName: string;
  signature: string;
  dateSubmitted: string;
  signatures: {
    agent?: string;
    [key: string]: string | undefined; // For client signatures like client_0, client_1, etc.
  };
  termsAccepted: boolean;
  infoConfirmed: boolean;
}

// Enhanced signature data interface for legal compliance
export interface LegalSignatureData extends SignatureData {
  // ESIGN Act Compliance
  esignActConsent: boolean;
  electronicRecordsConsent: boolean;
  withdrawalRightsAcknowledged: boolean;
  
  // Pennsylvania UETA Compliance
  uetaConsent: boolean;
  
  // Real Estate Specific
  agentLicenseNumber: string;
  brokerageName: string;
  realEstateDisclosuresAcknowledged: boolean;
  leadPaintDisclosure: boolean;
  radonDisclosure: boolean;
  
  // Security and Audit
  ipAddress?: string;
  timestamp: string;
  documentHash: string;
  userAgent: string;
  sessionId: string;
  signatureMethod: 'typed' | 'drawn';
  
  // Identity Verification
  emailVerified: boolean;
  verificationMethod: string;
  
  // Audit Trail
  auditTrail: Array<{
    timestamp: string;
    event: string;
    details: any;
  }>;
}

export interface TransactionFormData {
  agentData: AgentData;
  propertyData: PropertyData;
  clients: Client[];
  commissionData: CommissionData;
  propertyDetailsData: PropertyDetailsData;
  titleData: TitleCompanyData;
  additionalInfo: AdditionalInfoData;
  signatureData: SignatureData;
  documentsData: DocumentsData;
}

export interface FormattedDocument {
  name: string;
  url: string;
  type: string;
  size: number;
  uploadDate: string;
}

export interface TransactionData {
  agentRole: AgentRole;
  mlsNumber: string;
  address: string;
  salePrice: string;
  status: string;
  isWinterized: string;
  updateMls: string;
  county: string;
  isBuiltBefore1978: string;
  propertyType: string;
  price: string;
  closingDate: string;
}
