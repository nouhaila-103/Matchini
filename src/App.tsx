/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { InvestorBriefModal } from './components/InvestorBriefModal';
import { SupplierDashboard } from './components/SupplierDashboard';
import { TruckerDashboard } from './components/TruckerDashboard';
import { BrokerValidationPanel } from './components/BrokerValidationPanel';
import { AmanaAssistant } from './components/AmanaAssistant';
import { TrackingAndEscrowView } from './components/TrackingAndEscrowView';
import { ImpactMetricsScreen } from './components/ImpactMetricsScreen';
import {
  INITIAL_SHIPMENTS,
  INITIAL_TRANSPORTERS,
  INITIAL_BROKER,
  INITIAL_AUDITS,
  INITIAL_AMANA_MESSAGES
} from './data/mockData';
import {
  Shipment,
  TransporterOffer,
  ComplianceAuditItem,
  ShipmentStatus,
  EscrowStatus,
  MoroccanCity,
  TruckType
} from './types';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  Building2,
  Scale,
  Award
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('supplier');
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);

  // Core Application Data State
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [transporters, setTransporters] = useState<TransporterOffer[]>(INITIAL_TRANSPORTERS);
  const [audits, setAudits] = useState<ComplianceAuditItem[]>(INITIAL_AUDITS);
  const [broker, setBroker] = useState(INITIAL_BROKER);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification((curr) => (curr === message ? null : curr));
    }, 4500);
  };

  // 1. Supplier Actions
  const handleAddNewShipment = (newShipmentData: Omit<Shipment, 'id' | 'reference' | 'createdAt'>) => {
    const id = `shp-${Date.now()}`;
    const reference = `MTC-2026-0${Math.floor(100 + Math.random() * 900)}`;
    const newShipment: Shipment = {
      ...newShipmentData,
      id,
      reference,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    setShipments((prev) => [newShipment, ...prev]);
    showToast(`Expédition #${reference} créée avec succès ! Scan des retours à vide en cours.`);
  };

  const handleConfirmMatch = (shipmentId: string, transporterId: string) => {
    const transporter = transporters.find((t) => t.id === transporterId);
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id === shipmentId) {
          return {
            ...s,
            status: 'Match validé par courtier',
            escrowStatus: 'Fonds Réservés',
            assignedTruckerId: transporterId,
            assignedBrokerId: broker.id,
            transitProgressPercent: 15,
            currentCheckpoint: `Match confirmé avec ${transporter?.companyName || 'Transporteur'}. Séquestre provisionné.`,
          };
        }
        return s;
      })
    );

    // Create an audit item in broker queue
    const targetShipment = shipments.find((s) => s.id === shipmentId);
    if (targetShipment && transporter) {
      const newAudit: ComplianceAuditItem = {
        id: `aud-${Date.now()}`,
        shipmentRef: targetShipment.reference,
        carrierName: `${transporter.companyName} (${transporter.driverName})`,
        truckPlate: transporter.truckPlate,
        shipperName: targetShipment.supplierCompany,
        corridor: `${targetShipment.originCity} ➔ ${targetShipment.destinationCity}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        complianceChecks: {
          carteGrise: true,
          assuranceMarchandiseAXA: true,
          permisConfianceFIMO: true,
          lettreDeVoitureCMR: true,
          onssaSanitaire: transporter.onssaCertified,
        },
        courtierApproval: 'Approuvé',
        brokerNotes: 'Match validé automatiquement par protocole certifié. Séquestre bancaire consigné.',
        digitalSignatureHash: `SHA256: ${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
        courtierFeeDH: Math.round(targetShipment.matchiniCostDH * 0.035),
      };
      setAudits((prev) => [newAudit, ...prev]);
    }

    showToast(`Match confirmé ! ${transporter?.proposedRateDH.toLocaleString()} DH consignés sous séquestre bancaire CMI/BCP.`);
  };

  // 2. Trucker Actions
  const handleAcceptShipmentByTrucker = (shipmentId: string) => {
    const activeTrucker = transporters[0];
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id === shipmentId) {
          return {
            ...s,
            status: 'En transit',
            escrowStatus: 'En attente de livraison',
            assignedTruckerId: activeTrucker.id,
            transitProgressPercent: 30,
            currentCheckpoint: 'Chauffeur en route vers le quai de chargement',
          };
        }
        return s;
      })
    );
    showToast(`Fret retour accepté ! Paiement sous séquestre garanti sous 24h dès livraison.`);
  };

  const handleDeclineShipmentByTrucker = (shipmentId: string) => {
    showToast(`Demande de fret déclinée.`);
  };

  const handleDeclareReturnTrip = (trip: {
    originCity: MoroccanCity;
    destinationCity: MoroccanCity;
    availableCapacityTons: number;
    availablePallets: number;
    truckType: TruckType;
    date: string;
  }) => {
    const newOffer: TransporterOffer = {
      id: `trk-${Date.now()}`,
      companyName: 'Transport Sahraoui & Frères',
      driverName: 'Brahim Oulhaj',
      phone: '+212 6 61 48 92 10',
      rating: 4.95,
      completedTrips: 185,
      truckPlate: '24-A-8921',
      truckModel: 'Volvo FH 500 Frigo Chéreau',
      truckType: trip.truckType,
      availableCapacityTons: trip.availableCapacityTons,
      availablePallets: trip.availablePallets,
      originCity: trip.originCity,
      destinationCity: trip.destinationCity,
      availableDate: trip.date,
      currentReturnStatus: 'À vide (Backhaul)',
      fitScorePercent: 99,
      proposedRateDH: 4200,
      brokerApproved: true,
      onssaCertified: true,
      axaInsured: true,
    };

    setTransporters((prev) => [newOffer, ...prev]);
    showToast(`Disponibilité déclarée sur l'axe ${trip.originCity} ➔ ${trip.destinationCity}. Notification AMANA envoyée.`);
  };

  // 3. Broker Actions
  const handleApproveAudit = (auditId: string) => {
    setAudits((prev) =>
      prev.map((a) => {
        if (a.id === auditId) {
          return {
            ...a,
            courtierApproval: 'Approuvé',
            digitalSignatureHash: `SHA256: ${Math.random().toString(36).substring(2, 15)}valid`,
            brokerNotes: `${a.brokerNotes} · Visa ministériel accordé par ${broker.name}.`,
          };
        }
        return a;
      })
    );
    showToast(`Visa de conformité ministériel accordé. Lettre de voiture validée.`);
  };

  const handleRejectAudit = (auditId: string, reason: string) => {
    setAudits((prev) =>
      prev.map((a) => {
        if (a.id === auditId) {
          return {
            ...a,
            courtierApproval: 'Rejeté',
            brokerNotes: `Refus de visa : ${reason}`,
          };
        }
        return a;
      })
    );
    showToast(`Dossier refusé. Notification transmise au transporteur.`);
  };

  // 4. Tracking and Escrow Progress Updates
  const handleUpdateShipmentProgress = (
    shipmentId: string,
    newStatus: ShipmentStatus,
    newEscrowStatus: EscrowStatus,
    progressPercent: number,
    checkpoint: string
  ) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id === shipmentId) {
          return {
            ...s,
            status: newStatus,
            escrowStatus: newEscrowStatus,
            transitProgressPercent: progressPercent,
            currentCheckpoint: checkpoint,
          };
        }
        return s;
      })
    );

    if (newEscrowStatus === 'Fonds Libérés') {
      showToast(`🎉 Livraison réceptionnée ! Séquestre libéré : virement automatique T+1 ordonné au transporteur.`);
    } else {
      showToast(`Statut mis à jour : ${checkpoint}`);
    }
  };

  const pendingBrokerCount = audits.filter((a) => a.courtierApproval === 'En attente').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-2.5 max-w-md">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenInvestorBrief={() => setIsInvestorModalOpen(true)}
        pendingBrokerAuditsCount={pendingBrokerCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'supplier' && (
          <SupplierDashboard
            shipments={shipments}
            transporters={transporters}
            onAddNewShipment={handleAddNewShipment}
            onConfirmMatch={handleConfirmMatch}
            onOpenAmanaChat={(ref) => setActiveTab('amana')}
          />
        )}

        {activeTab === 'trucker' && (
          <TruckerDashboard
            shipments={shipments}
            transporters={transporters}
            onAcceptShipment={handleAcceptShipmentByTrucker}
            onDeclineShipment={handleDeclineShipmentByTrucker}
            onOpenAmanaChat={(ref) => setActiveTab('amana')}
            onDeclareReturnTrip={handleDeclareReturnTrip}
          />
        )}

        {activeTab === 'broker' && (
          <BrokerValidationPanel
            broker={broker}
            audits={audits}
            onApproveAudit={handleApproveAudit}
            onRejectAudit={handleRejectAudit}
          />
        )}

        {activeTab === 'amana' && (
          <AmanaAssistant
            initialMessages={INITIAL_AMANA_MESSAGES}
            activeShipment={shipments[0]}
            onConfirmMatchInChat={(ref) => {
              if (shipments[0]) {
                handleConfirmMatch(shipments[0].id, transporters[0].id);
              }
            }}
            onTriggerEscrowRelease={(ref) => {
              if (shipments[0]) {
                handleUpdateShipmentProgress(
                  shipments[0].id,
                  'Livré & Clôturé',
                  'Fonds Libérés',
                  100,
                  'Bon de Livraison émargé via WhatsApp AMANA'
                );
              }
            }}
          />
        )}

        {activeTab === 'tracking' && (
          <TrackingAndEscrowView
            shipments={shipments}
            onUpdateShipmentProgress={handleUpdateShipmentProgress}
            onOpenAmanaChat={(ref) => setActiveTab('amana')}
          />
        )}

        {activeTab === 'impact' && <ImpactMetricsScreen />}
      </main>

      {/* Umbrella500 Investor Brief Modal */}
      <InvestorBriefModal
        isOpen={isInvestorModalOpen}
        onClose={() => setIsInvestorModalOpen(false)}
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
          setIsInvestorModalOpen(false);
        }}
      />

      {/* Institutional Moroccan Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Matchini Maroc</span>
            <span>·</span>
            <span>Plateforme B2B de Fret Retour & Séquestre Logistique</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>Banque Tiers Séquestre : CMI / Banque Centrale Populaire</span>
            <span>·</span>
            <span>Agrément Ministère du Transport N° TR/2019</span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold">Candidature Umbrella500</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
