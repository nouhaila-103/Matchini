export type MoroccanCity =
  | 'Casablanca'
  | 'Agadir'
  | 'Tanger Med'
  | 'Marrakech'
  | 'Fès'
  | 'Meknès'
  | 'Oujda'
  | 'Kenitra'
  | 'El Jadida'
  | 'Nador'
  | 'Beni Mellal'
  | 'Laâyoune';

export type TruckType =
  | 'Frigorifique (Température Dirigée)'
  | 'Plateau Nu (Matériaux / BTP)'
  | 'Tautliner / Rideaux Coulissants'
  | 'Fourgon Tôlé Fermé'
  | 'Porte-Engin / Spécialisé';

export type GoodsCategory =
  | 'Agrumes & Maraîchage (Primeurs)'
  | 'Agroalimentaire & Huiles'
  | 'Matériaux BTP & Céramique'
  | 'Textile & Confection'
  | 'Câblage & Pièces Automobiles'
  | 'FMCG / Grande Consommation'
  | 'Emballages & Cartons';

export type EscrowStatus = 'Fonds Réservés' | 'En attente de livraison' | 'Fonds Libérés';

export type ShipmentStatus = 'En recherche de transporteur' | 'Match validé par courtier' | 'En transit' | 'Livré & Clôturé';

export interface Shipment {
  id: string;
  reference: string;
  supplierName: string;
  supplierCompany: string;
  goodsCategory: GoodsCategory;
  description: string;
  weightTons: number;
  palletsCount: number;
  estimatedValueDH: number;
  originCity: MoroccanCity;
  originAddress: string;
  destinationCity: MoroccanCity;
  destinationAddress: string;
  pickupDate: string;
  deliveryDeadline: string;
  truckTypeRequired: TruckType;
  temperatureRequired?: string;
  status: ShipmentStatus;
  escrowStatus: EscrowStatus;
  standardMarketCostDH: number;
  matchiniCostDH: number;
  savingsDH: number;
  co2SavedKg: number;
  assignedTruckerId?: string;
  assignedBrokerId?: string;
  currentCheckpoint?: string;
  transitProgressPercent: number;
  createdAt: string;
}

export interface TransporterOffer {
  id: string;
  companyName: string;
  driverName: string;
  phone: string;
  rating: number;
  completedTrips: number;
  truckPlate: string;
  truckModel: string;
  truckType: TruckType;
  availableCapacityTons: number;
  availablePallets: number;
  originCity: MoroccanCity;
  destinationCity: MoroccanCity;
  availableDate: string;
  currentReturnStatus: 'À vide (Backhaul)' | 'Partiellement chargé';
  fitScorePercent: number;
  proposedRateDH: number;
  brokerApproved: boolean;
  onssaCertified: boolean;
  axaInsured: boolean;
}

export interface BrokerProfile {
  id: string;
  name: string;
  agencyName: string;
  licenseNumber: string; // Agrément Ministère du Transport
  region: string;
  rating: number;
  auditsCount: number;
  activeGuaranteesDH: number;
}

export interface ComplianceAuditItem {
  id: string;
  shipmentRef: string;
  carrierName: string;
  truckPlate: string;
  shipperName: string;
  corridor: string;
  timestamp: string;
  complianceChecks: {
    carteGrise: boolean;
    assuranceMarchandiseAXA: boolean;
    permisConfianceFIMO: boolean;
    lettreDeVoitureCMR: boolean;
    onssaSanitaire: boolean;
  };
  courtierApproval: 'Approuvé' | 'En attente' | 'Rejeté';
  brokerNotes: string;
  digitalSignatureHash: string;
  courtierFeeDH: number;
}

export interface AMANAMessage {
  id: string;
  sender: 'amana' | 'user' | 'system';
  role: 'trucker' | 'supplier' | 'broker';
  textDarija: string;
  textFrenchTranslation?: string;
  timestamp: string;
  isAudio?: boolean;
  audioDurationSeconds?: number;
  quickReplies?: string[];
  actionPayload?: {
    type: 'confirm_match' | 'send_location' | 'upload_bl' | 'release_escrow';
    shipmentRef?: string;
  };
}

export interface CorridorMilestone {
  name: string;
  kmMark: number;
  status: 'passed' | 'current' | 'upcoming';
  timeReached?: string;
  note?: string;
}
