import React, { useState } from 'react';
import {
  Shipment,
  EscrowStatus,
  ShipmentStatus
} from '../types';
import {
  ShieldCheck,
  Truck,
  MapPin,
  CheckCircle2,
  Clock,
  Thermometer,
  FileCheck,
  DollarSign,
  AlertCircle,
  Building,
  ArrowRight,
  RefreshCw,
  Stamp
} from 'lucide-react';

interface TrackingAndEscrowViewProps {
  shipments: Shipment[];
  onUpdateShipmentProgress: (
    shipmentId: string,
    newStatus: ShipmentStatus,
    newEscrowStatus: EscrowStatus,
    progressPercent: number,
    checkpoint: string
  ) => void;
  onOpenAmanaChat: (shipmentRef: string) => void;
}

export const TrackingAndEscrowView: React.FC<TrackingAndEscrowViewProps> = ({
  shipments,
  onUpdateShipmentProgress,
  onOpenAmanaChat,
}) => {
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>(
    shipments.find((s) => s.status === 'En transit')?.id || shipments[0]?.id || ''
  );

  const selectedShipment = shipments.find((s) => s.id === selectedShipmentId) || shipments[0];

  // Moroccan Corridor Route Milestones (Agadir -> Casablanca corridor)
  const milestones = [
    {
      name: 'Quai Anza (Agadir)',
      desc: 'Chargement 14T agrumes & pesée sur pont bascule',
      km: 'Km 0',
      time: '06:45',
      done: (selectedShipment?.transitProgressPercent || 0) >= 15,
    },
    {
      name: 'Péage Chichaoua (A3)',
      desc: 'Contrôle autoroutier & maintien chaîne du froid (+4.8°C)',
      km: 'Km 182',
      time: '09:20',
      done: (selectedShipment?.transitProgressPercent || 0) >= 45,
    },
    {
      name: 'Jonction Marrakech Ouest',
      desc: 'Halte réglementaire FIMO & repos conducteur',
      km: 'Km 235',
      time: '11:00',
      done: (selectedShipment?.transitProgressPercent || 0) >= 65,
    },
    {
      name: 'Barrière Berrechid / A1',
      desc: 'Entrée région Casablanca-Settat',
      km: 'Km 420',
      time: '14:15',
      done: (selectedShipment?.transitProgressPercent || 0) >= 85,
    },
    {
      name: 'Plateforme Aïn Chock (Casablanca)',
      desc: 'Déchargement, émarge du Bon de Livraison (e-BL)',
      km: 'Km 468',
      time: '16:00',
      done: (selectedShipment?.transitProgressPercent || 0) >= 100,
    },
  ];

  // Simulation handlers
  const handleSimulateDeparture = () => {
    if (!selectedShipment) return;
    onUpdateShipmentProgress(
      selectedShipment.id,
      'En transit',
      'En attente de livraison',
      45,
      'Péage Autoroutier Chichaoua (A3) - Km 182'
    );
  };

  const handleSimulateNearDelivery = () => {
    if (!selectedShipment) return;
    onUpdateShipmentProgress(
      selectedShipment.id,
      'En transit',
      'En attente de livraison',
      85,
      'Approche Bouskoura / Casablanca Sud - Km 440'
    );
  };

  const handleSimulateDeliveryAndRelease = () => {
    if (!selectedShipment) return;
    onUpdateShipmentProgress(
      selectedShipment.id,
      'Livré & Clôturé',
      'Fonds Libérés',
      100,
      'Livraison réceptionnée sans réserve - BL visé par le destinataire'
    );
  };

  const handleResetToTransit = () => {
    if (!selectedShipment) return;
    onUpdateShipmentProgress(
      selectedShipment.id,
      'En transit',
      'En attente de livraison',
      62,
      'Péage Autoroutier Chichaoua (A3) - Km 182'
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Real-time Telemetry & Escrow Trust */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Séquestre Bancaire Garanti & Télématique Routière · Maroc</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Suivi GPS en Temps Réel & Dénouement Financier T+1
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Visibilité de bout en bout sur l'acheminement de la marchandise et sécurisation bilatérale des fonds. L'expéditeur est garanti de la livraison conforme, le transporteur est certain d'être payé sans délai.
          </p>
        </div>

        {/* Corridor Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <label className="text-xs text-slate-500 font-medium">Mission :</label>
          <select
            value={selectedShipmentId}
            onChange={(e) => setSelectedShipmentId(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900"
          >
            {shipments.map((s) => (
              <option key={s.id} value={s.id}>
                #{s.reference} ({s.originCity} ➔ {s.destinationCity})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedShipment && (
        <div className="space-y-6">
          {/* Core Escrow Payment Pipeline (3 Steps) */}
          <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs text-emerald-400 font-mono">Dossier de Séquestre #{selectedShipment.reference}</span>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  Garantie Bancaire Tiers de Confiance · {selectedShipment.matchiniCostDH.toLocaleString()} DH Séquestrés
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300">Banque Dépositaire :</span>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-900/60 px-2.5 py-1 rounded border border-emerald-600/50">
                  CMI / Banque Centrale Populaire (BCP)
                </span>
              </div>
            </div>

            {/* 3 Escrow Status Steps Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Step 1: Fonds Réservés */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  selectedShipment.escrowStatus === 'Fonds Réservés' ||
                  selectedShipment.escrowStatus === 'En attente de livraison' ||
                  selectedShipment.escrowStatus === 'Fonds Libérés'
                    ? 'bg-emerald-950/40 border-emerald-500/70 text-white'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Étape 1 · Réservation</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-base font-bold text-white mt-1">Fonds Réservés</div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  L'expéditeur a provisionné les {selectedShipment.matchiniCostDH.toLocaleString()} DH sur compte séquestre bloqué lors de la confirmation du match.
                </p>
                <div className="mt-3 pt-2 border-t border-white/10 text-[11px] text-emerald-300 font-mono">
                  Garantie n° SEQ-2026-{selectedShipment.reference.slice(-4)}
                </div>
              </div>

              {/* Step 2: En attente de livraison */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  selectedShipment.escrowStatus === 'En attente de livraison' ||
                  selectedShipment.escrowStatus === 'Fonds Libérés'
                    ? 'bg-emerald-950/40 border-emerald-500/70 text-white'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Étape 2 · Transit</span>
                  {selectedShipment.escrowStatus === 'Fonds Libérés' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                  )}
                </div>
                <div className="text-base font-bold text-white mt-1">En attente de livraison</div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Marchandise en cours de transport sur l'axe {selectedShipment.originCity} ➔ {selectedShipment.destinationCity}. Les fonds restent intouchables.
                </p>
                <div className="mt-3 pt-2 border-t border-white/10 text-[11px] text-amber-200 font-mono">
                  {selectedShipment.currentCheckpoint || 'Surveillance GPS active'}
                </div>
              </div>

              {/* Step 3: Fonds Libérés */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  selectedShipment.escrowStatus === 'Fonds Libérés'
                    ? 'bg-emerald-950/50 border-emerald-400 text-white ring-1 ring-emerald-400/50'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Étape 3 · Dénouement</span>
                  {selectedShipment.escrowStatus === 'Fonds Libérés' ? (
                    <Stamp className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-500"></span>
                  )}
                </div>
                <div className="text-base font-bold text-white mt-1">Fonds Libérés (T+1)</div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Le Bon de Livraison visé est reçu. Le virement automatique vers le RIB du transporteur est ordonné sans commission usuraire.
                </p>
                <div className="mt-3 pt-2 border-t border-white/10 text-[11px] text-emerald-300 font-mono">
                  {selectedShipment.escrowStatus === 'Fonds Libérés'
                    ? 'Virement exécuté · 0 impayé'
                    : 'En attente émargement BL'}
                </div>
              </div>
            </div>

            {/* Interactive Simulation Controls for Jury Demo */}
            <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-300 font-medium">
                Simulation Jury Umbrella500 (tester les transitions du cycle de vie) :
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleSimulateDeparture}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md font-semibold cursor-pointer border border-white/10"
                >
                  1. Départ Chichaoua (45%)
                </button>
                <button
                  onClick={handleSimulateNearDelivery}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md font-semibold cursor-pointer border border-white/10"
                >
                  2. Approche Casa (85%)
                </button>
                <button
                  onClick={handleSimulateDeliveryAndRelease}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-bold cursor-pointer shadow-xs"
                >
                  3. Décharger & Libérer 4,200 DH Séquestre
                </button>
                <button
                  onClick={handleResetToTransit}
                  className="px-2.5 py-1.5 text-slate-400 hover:text-white cursor-pointer"
                  title="Réinitialiser"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* GPS Route Progress & Telemetry Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Interactive Moroccan Corridor Milestones (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Progression GPS · Axe Autoroutier {selectedShipment.originCity} ➔ {selectedShipment.destinationCity}
                    </h3>
                    <p className="text-[11px] text-slate-500">Distance totale : 468 km · Temps de parcours moyen : 6h15</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-emerald-700 font-mono">
                    {selectedShipment.transitProgressPercent}%
                  </div>
                  <span className="text-[10px] text-slate-400">Accompli</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500 rounded-full"
                  style={{ width: `${selectedShipment.transitProgressPercent}%` }}
                ></div>
              </div>

              {/* Milestones list */}
              <div className="space-y-3 pt-2">
                {milestones.map((m, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                      m.done
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-slate-50/50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="mt-0.5">
                      {m.done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">
                          {index + 1}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${m.done ? 'text-slate-900' : 'text-slate-500'}`}>
                          {m.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {m.km} {m.done && `· Passé à ${m.time}`}
                        </span>
                      </div>
                      <p className={`text-[11px] mt-0.5 ${m.done ? 'text-slate-600' : 'text-slate-400'}`}>
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Live Telematics & Regulatory Compliance Gauges (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Cold Chain Sensor (critical for Moroccan agricultural exports) */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-blue-600" />
                    <span>Télémesure Chaîne du Froid</span>
                  </span>
                  <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold border border-blue-200">
                    Sonde ONSSA Active
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div>
                    <div className="text-[11px] text-slate-500">Température de consigne</div>
                    <div className="text-xs font-bold text-slate-800">
                      {selectedShipment.temperatureRequired || '+4°C à +6°C'}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[11px] text-slate-500">Mesure Temps Réel</div>
                    <div className="text-2xl font-black text-blue-600 font-mono">
                      +4.8 °C
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Aucune rupture thermique détectée depuis le départ d'Agadir</span>
                </div>
              </div>

              {/* Driver & Truck Specs Box */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3 text-xs">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Équipage & Documents de Bord
                </h4>

                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Conducteur :</span>
                    <strong className="text-slate-900">Brahim Oulhaj</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Téléphone Chauffeur :</span>
                    <span className="font-mono text-slate-900">+212 6 61 48 92 10</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Matricule Camion :</span>
                    <span className="font-mono font-bold text-slate-900">24-A-8921 (Souss)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Assurance Marchandise :</span>
                    <span className="text-emerald-700 font-semibold">AXA Assurances Maroc (Valide)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Courtier Responsable :</span>
                    <span className="text-slate-900">El Hachemi Benjelloun</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenAmanaChat(selectedShipment.reference)}
                  className="w-full mt-2 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Contacter le chauffeur sur AMANA (Darija)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
