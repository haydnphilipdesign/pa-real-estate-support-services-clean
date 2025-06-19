import { v4 as uuidv4 } from 'uuid';
import {
  AgentRole,
  PropertyData,
  Client,
  CommissionData,
  PropertyDetailsData,
  TitleCompanyData,
  SignatureData
} from '../types/transaction';

const testSignatureData: SignatureData = {
  agentName: "Jane Agent",
  signature: "Test Signature",
  dateSubmitted: new Date().toISOString().split('T')[0],
  signatures: {
    agent: "Jane Agent"
  },
  termsAccepted: true,
  infoConfirmed: true,
};

const counties = ["Chester", "Montgomery", "Bucks", "Delaware", "Philadelphia"];
const streets = ["Main St", "Oak Ave", "Maple Dr", "Cedar Ln", "Elm St", "Pine Rd"];
const cities = ["West Chester", "Exton", "Malvern", "Wayne", "Media", "Newtown Square"];
const zipCodes = ["19380", "19341", "19355", "19087", "19063", "19073"];
const hoaNames = ["Sunrise HOA", "Oakridge Community", "Maple Valley Association", "Pine Creek Estates", ""];
const attorneyNames = ["Smith & Associates", "Jones Legal Group", "Jenkins Law Firm", ""];
const titleCompanies = ["First American Title", "Fidelity National Title", "Old Republic Title", "Stewart Title"];
const warrantyCompanies = ["American Home Shield", "First American Home Warranty", "HMS Home Warranty", ""];

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
const randomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomPrice = () => `${randomInt(200, 900)}${randomInt(0, 9)}00`;
const randomBoolean = () => Math.random() > 0.5;
const randomPercentage = () => `${randomInt(1, 6)}.${randomInt(0, 9)}`;
const randomPhone = () => `${randomInt(100, 999)}${randomInt(100, 999)}${randomInt(1000, 9999)}`.substring(0, 10);

const generateAddress = () => {
  return `${randomInt(100, 9999)} ${randomElement(streets)}, ${randomElement(cities)}, PA ${randomElement(zipCodes)}`;
};

const generateClients = (role: AgentRole): Client[] => {
  const clients: Client[] = [];
  
  if (role === "LISTING AGENT" || role === "DUAL AGENT") {
    const sellerCount = randomInt(1, 2);
    for (let i = 0; i < sellerCount; i++) {
      clients.push({
        id: uuidv4(),
        name: `Seller ${i + 1} ${randomElement(["Smith", "Jones", "Johnson", "Williams", "Brown"])}`,
        email: `seller${i + 1}${randomInt(1, 999)}@example.com`,
        phone: randomPhone(),
        address: generateAddress(),
        maritalStatus: randomElement(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]),
        type: "SELLER",
      });
    }
  }
  
  if (role === "BUYERS AGENT" || role === "DUAL AGENT") {
    const buyerCount = randomInt(1, 2);
    for (let i = 0; i < buyerCount; i++) {
      clients.push({
        id: uuidv4(),
        name: `Buyer ${i + 1} ${randomElement(["Davis", "Miller", "Wilson", "Moore", "Taylor"])}`,
        email: `buyer${i + 1}${randomInt(1, 999)}@example.com`,
        phone: randomPhone(),
        address: generateAddress(),
        maritalStatus: randomElement(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]),
        type: "BUYER",
      });
    }
  }
  
  return clients;
};

const randomMls = () => `${randomInt(100000, 999999)}`;

export const generateTestData = (role: AgentRole) => {
  const testPropertyData: PropertyData = {
    mlsNumber: randomMls(),
    address: generateAddress(),
    salePrice: randomPrice(),
    status: randomBoolean() ? "VACANT" : "OCCUPIED",
    isWinterized: randomBoolean() ? "YES" : "NO",
    updateMls: randomBoolean() ? "YES" : "NO",
    propertyAccessType: randomElement(['ELECTRONIC LOCKBOX', 'COMBO LOCKBOX', 'KEYPAD', 'APPOINTMENT ONLY']),
    lockboxAccessCode: randomInt(1000, 9999).toString(),
    county: randomElement(counties),
    isBuiltBefore1978: randomBoolean() ? "YES" : "NO",
    propertyType: randomElement(["RESIDENTIAL", "COMMERCIAL", "LAND"]),
    closingDate: ''
  };

  const testPropertyDetails: PropertyDetailsData = {
    resaleCertRequired: randomBoolean(),
    hoaName: randomBoolean() ? randomElement(hoaNames) : "",
    coRequired: randomBoolean(),
    municipality: randomElement(cities),
    firstRightOfRefusal: randomBoolean(),
    firstRightName: randomBoolean() ? "Previous Owner" : "",
    attorneyRepresentation: randomBoolean(),
    attorneyName: randomBoolean() ? randomElement(attorneyNames) : "",
    homeWarranty: randomBoolean(),
    warrantyCompany: randomBoolean() ? "American Home Shield" : "",
    warrantyCost: randomBoolean() ? "450" : "",
    warrantyPaidBy: randomElement(['SELLER', 'BUYER', 'AGENT', 'SPLIT'] as const)
  };

  const testTitleData: TitleCompanyData = {
    titleCompany: randomElement(titleCompanies),
    name: randomElement(titleCompanies),
    contactName: `${randomElement(["John", "Jane", "Robert", "Mary"])} ${randomElement(["Smith", "Jones", "Davis", "Wilson"])}`,
    contactPhone: randomPhone(),
    contactEmail: `title${randomInt(1, 999)}@example.com`
  };

  const testCommissionData: CommissionData = {
    totalCommissionPercentage: randomPercentage(),
    listingAgentPercentage: randomPercentage(),
    buyersAgentPercentage: randomPercentage(),
    hasBrokerFee: randomBoolean(),
    brokerFeeAmount: randomBoolean() ? randomPercentage() : "0",
    sellerPaidAmount: randomBoolean() ? `${randomInt(1, 6)}000` : "0",
    buyerPaidAmount: randomBoolean() ? `${randomInt(1, 6)}000` : "0",
    hasSellersAssist: randomBoolean(),
    sellersAssist: randomBoolean() ? `${randomInt(1, 6)}000` : "0",
    isReferral: randomBoolean(),
    referralParty: randomBoolean() ? `${randomElement(["Smith", "Jones", "Wilson"])} Realty` : "",
    brokerEin: randomBoolean() ? `${randomInt(10, 99)}-${randomInt(1000000, 9999999)}` : "",
    referralFee: randomBoolean() ? randomPercentage() : "",
    coordinatorFeePaidBy: randomElement(["client", "agent"])
  };

  const documents = generateDocs(role, testPropertyData, testPropertyDetails);

  return {
    propertyData: {
      ...testPropertyData,
      price: testPropertyData.salePrice,
      closingDate: new Date().toISOString().split('T')[0],
    },
    clients: generateClients(role),
    commissionData: {
      ...testCommissionData,
    },
    propertyDetails: testPropertyDetails,
    warrantyData: testPropertyDetails,
    titleData: testTitleData,
    additionalInfo: {
      specialInstructions: testPropertyDetails.attorneyRepresentation ? "Handle with care" : "",
      urgentIssues: testPropertyDetails.attorneyRepresentation ? "Need to close before end of month" : "",
      notes: testPropertyDetails.attorneyRepresentation ? "Seller is relocating for work" : "",
    },
    signatureData: {
      ...testSignatureData,
      agentSignature: "",
    },
    documents
  };
};

const generateDocs = (role: AgentRole, propertyData: PropertyData, propertyDetails: PropertyDetailsData) => {
  const documents = [];
  
  // Common documents for all roles
  documents.push(
    { id: uuidv4(), name: "Consumer Notice", status: "pending", required: true },
    { id: uuidv4(), name: "KW Wire Fraud Advisory", status: "pending", required: true },
    { id: uuidv4(), name: "KW Affiliate Services Disclosure", status: "pending", required: true },
    { id: uuidv4(), name: "KW Affiliate Services Addendum", status: "pending", required: true },
    { id: uuidv4(), name: "KW Home Warranty Waiver", status: "pending", required: true }
  );
  
  // Listing Agent Documents
  if (role === "LISTING AGENT" || role === "DUAL AGENT") {
    documents.push(
      { id: uuidv4(), name: "Agreement of Sale and Addenda", status: "pending", required: true },
      { id: uuidv4(), name: "Seller's Property Disclosure", status: "pending", required: true },
      { id: uuidv4(), name: "Lead Based Paint Disclosure", status: "pending", required: propertyData.isBuiltBefore1978 },
      { id: uuidv4(), name: "Seller's Estimated Costs", status: "pending", required: true },
      { id: uuidv4(), name: "Cooperating Broker's Compensation", status: "pending", required: true }
    );
    
    if (propertyDetails.attorneyRepresentation) {
      documents.push(
        { id: uuidv4(), name: "Attorney Review Clause", status: "pending", required: true }
      );
    }
  }
  
  // Buyer's Agent Documents
  if (role === "BUYERS AGENT" || role === "DUAL AGENT") {
    documents.push(
      { id: uuidv4(), name: "Buyer Agency Contract", status: "pending", required: true },
      { id: uuidv4(), name: "Agreement of Sale & Addenda", status: "pending", required: true },
      { id: uuidv4(), name: "Prequalification/Proof of Funds", status: "pending", required: true },
      { id: uuidv4(), name: "Deposit Money Notice", status: "pending", required: true },
      { id: uuidv4(), name: "Buyer's Estimated Costs", status: "pending", required: true },
      { id: uuidv4(), name: "Cooperating Broker's Compensation", status: "pending", required: true }
    );
    
    if (propertyData.propertyType === "RESIDENTIAL") {
      documents.push(
        { id: uuidv4(), name: "For Your Protection Notice", status: "pending", required: true }
      );
    }
    
    if (propertyData.isBuiltBefore1978) {
      documents.push(
        { id: uuidv4(), name: "Lead Based Paint Disclosure", status: "pending", required: true }
      );
    }
    
    if (propertyDetails.attorneyRepresentation) {
      documents.push(
        { id: uuidv4(), name: "Attorney Review Clause", status: "pending", required: true }
      );
    }
  }
  
  // Dual Agent specific documents
  if (role === "DUAL AGENT") {
    documents.push(
      { id: uuidv4(), name: "Dual Agency Disclosure", status: "pending", required: true }
    );
  }
  
  // Remove duplicates
  return Array.from(new Map(documents.map(doc => [doc.name, doc])).values());
};