import React, { useState } from 'react';
import {
  Shipment,
  TransporterOffer,
  MoroccanCity,
  TruckType
} from '../types';
import {
  Truck,
  TrendingUp,
  MapPin,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Fuel,
  PlusCircle,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

interface TruckerDashboardProps {
  shipments: Shipment[];
  transporters: TransporterOffer[];
  onAcceptShipment: (shipmentId: string) => void;
  onDeclineShipment: (shipmentId: string) => void;
  onOpenAmanaChat: (shipmentRef: string) => void;
  onDeclareReturnTrip: (trip: {
    originCity: MoroccanCity;
    destinationCity: MoroccanCity;
    availableCapacityTons: number;
    availablePallets: number;
    truckType: TruckType;
    date: string;
  }) => void;
}

export const TruckerDashboard: React.FC<TruckerDashboardProps> = ({
  shipments,
  transporters,
  onAcceptShipment,
  onDeclineShipment,
  onOpenAmanaChat,
  onDeclareReturnTrip,
}) => {
  // Mock current active trucker profile
  const activeTrucker = transporters[0]; // Brahim Oulhaj - Transport Sahraoui

  const [isDeclareModalOpen, setIsDeclareModalOpen] = useState(false);
  const [originCity, setOriginCity] = useState<MoroccanCity>('Agadir');
  const [destinationCity, setDestinationCity] = useState<MoroccanCity>('Casablanca');
  const [capacityTons, setCapacityTons] = useState(18);
  const [pallets, setPallets] = useState(24);
  const [truckType, setTruckType] = useState<TruckType>('Frigorifique (Température Dirigée)');
  const [availableDate, setAvailableDate] = useState('Aujourd\'hui 16:00 / Demain matin');

  // Recovered revenue stats
  const [totalRecoveredRevenueDH, setTotalRecoveredRevenueDH] = useState(48600);
  const [emptyTripsAvoided, setEmptyTripsAvoided] = useState(14);
  const [fuelSavedLitres, setFuelSavedLitres] = useState(3840);

  // Available open shipments on trucker's corridor
  const availableShipments = shipments.filter(
    (s) => s.status === 'En recherche de transporteur' || s.status === 'Match validé par courtier'
  );

  const handleDeclareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDeclareReturnTrip({
      originCity,
      destinationCity,
      availableCapacityTons: capacityTons,
      availablePallets: pallets,
      truckType,
      date: availableDate,
    });
    setIsDeclareModalOpen(false);
  };

  const handleAccept = (shipmentId: string) => {
    const target = shipments.find((s) => s.id === shipmentId);
    if (target) {
      setTotalRecoveredRevenueDH((prev) => prev + target.matchiniCostDH);
      setEmptyTripsAvoided((prev) => prev + 1);
      setFuelSavedLitres((prev) => prev + Math.round(target.weightTons * 15));
    }
    onAcceptShipment(shipmentId);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Trucker Value Proposition */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Truck className="w-4 h-4" />
            <span>Espace Transporteur & Chauffeur Routier · Maroc</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Ne rentrez plus jamais à vide sur vos corridors
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Rentabilisez votre trajet retour avec un paiement garanti à 100% sous 24h par séquestre bancaire. Fini les chèques sans provision et les délais de 90 jours.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsDeclareModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Déclarer un trajet retour à vide</span>
          </button>
        </div>
      </div>

      {/* Running Total of Recovered Revenue (Key metric requested by user) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-5 rounded-xl shadow-xs border border-emerald-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
              Revenu Additionnel Récupéré
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono mt-2 text-white">
            {totalRecoveredRevenueDH.toLocaleString()} <span className="text-sm font-sans font-medium text-emerald-300">DH</span>
          </div>
          <p className="text-xs text-emerald-200 mt-1">
            Gains nets sur retours qui auraient été 100% à vide
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Trajets à Vide Évités
            </span>
            <Truck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono mt-2 text-slate-900">
            {emptyTripsAvoided} <span className="text-sm font-sans font-medium text-slate-500">voyages</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            +6 800 km optimisés sur l'A3 et l'A1
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Gazole Rentabilisé
            </span>
            <Fuel className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono mt-2 text-slate-900">
            {fuelSavedLitres.toLocaleString()} <span className="text-sm font-sans font-medium text-slate-500">Litres</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Coût carburant entièrement amorti par le backhaul
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Délai Paiement Séquestre
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono mt-2 text-emerald-700">
            24 Heures <span className="text-sm font-sans font-medium text-slate-500">(T+1)</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            vs 90 à 120 jours de délai de paiement usuel au Maroc
          </p>
        </div>
      </div>

      {/* Profile & Current Availability Indicator */}
      <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white text-lg">
            🚛
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">{activeTrucker.companyName}</span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700">
                {activeTrucker.truckPlate}
              </span>
              <span className="text-xs text-slate-300">· {activeTrucker.truckModel}</span>
            </div>
            <div className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Chauffeur: <strong className="text-white">{activeTrucker.driverName}</strong></span>
              <span>Agrément Sanitaire ONSSA: <strong className="text-emerald-400">Actif</strong></span>
              <span>Assurance AXA Fret: <strong className="text-emerald-400">À jour (250k DH)</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenAmanaChat('MTC-2026-0891')}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Assistant AMANA WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Matched Shipment Requests Along the Corridor */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span>Fret Retour Détecté sur votre Axe ({availableShipments.length} Demandes)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ces chargeurs recherchent un camion disponible sur votre trajet avec fonds déjà bloqués sous séquestre
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {availableShipments.map((shp) => {
            const isAssignedToThisTrucker = shp.assignedTruckerId === activeTrucker.id;

            return (
              <div
                key={shp.id}
                className={`p-5 rounded-xl border transition-all ${
                  isAssignedToThisTrucker
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column: Route & Goods Info */}
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        #{shp.reference}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{shp.supplierCompany}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-600">{shp.goodsCategory}</span>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Séquestre Bancaire Garanti
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{shp.originCity} ({shp.originAddress})</span>
                      <span className="text-slate-400">➔</span>
                      <span>{shp.destinationCity} ({shp.destinationAddress})</span>
                    </div>

                    <p className="text-xs text-slate-600">{shp.description}</p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                      <span>Poids: <strong className="text-slate-800">{shp.weightTons} T</strong> ({shp.palletsCount} palettes)</span>
                      <span>Type requis: <strong className="text-slate-800">{shp.truckTypeRequired}</strong></span>
                      {shp.temperatureRequired && (
                        <span>Température: <strong className="text-blue-700">{shp.temperatureRequired}</strong></span>
                      )}
                      <span className="flex items-center gap-1 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Chargement: {shp.pickupDate}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Guaranteed Payout & Actions */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <div className="text-left lg:text-right">
                      <div className="text-[11px] text-slate-500">Revenu Net Garanti T+1</div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
                        {shp.matchiniCostDH.toLocaleString()} <span className="text-xs font-sans">DH</span>
                      </div>
                      <div className="text-[10px] text-slate-400">0% risque d'impayé · Virement direct</div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isAssignedToThisTrucker ? (
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Mission Acceptée
                          </span>
                          <button
                            onClick={() => onOpenAmanaChat(shp.reference)}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Suivre sur AMANA
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => onDeclineShipment(shp.id)}
                            className="px-3 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Décliner
                          </button>
                          <button
                            onClick={() => handleAccept(shp.id)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Accepter le Fret</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Backhaul Trips History */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Historique des Retours Rentabilisés & Règlements Séquestre
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Réf. Mission</th>
                <th className="py-2.5 px-3">Corridor & Marchandise</th>
                <th className="py-2.5 px-3">Poids</th>
                <th className="py-2.5 px-3">Revenu Récupéré</th>
                <th className="py-2.5 px-3">Statut Séquestre</th>
                <th className="py-2.5 px-3">Audit Courtier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-3 font-mono font-bold text-slate-800">MTC-2026-0870</td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-slate-900">Kenitra ➔ Tanger Med</div>
                  <div className="text-slate-500 text-[11px]">Câblage automobile pour usine Renault</div>
                </td>
                <td className="py-3 px-3 font-mono">12 T</td>
                <td className="py-3 px-3 font-mono font-bold text-emerald-700">+2 450 DH</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Virement RIB exécuté (T+1)
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-600 text-[11px]">Atlas Courtage (Conforme)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono font-bold text-slate-800">MTC-2026-0855</td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-slate-900">Agadir ➔ Casablanca</div>
                  <div className="text-slate-500 text-[11px]">Tomates et Courgettes frigo</div>
                </td>
                <td className="py-3 px-3 font-mono">16 T</td>
                <td className="py-3 px-3 font-mono font-bold text-emerald-700">+4 500 DH</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Virement RIB exécuté (T+1)
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-600 text-[11px]">Atlas Courtage (Conforme)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Declare Available Route and Capacity */}
      {isDeclareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-6">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Déclarer un trajet retour à vide</h3>
                <p className="text-xs text-slate-300">Renseignez votre camion pour recevoir des alertes de chargement instantanées</p>
              </div>
              <button
                onClick={() => setIsDeclareModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDeclareSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Ville de Départ (Où vous videz)</label>
                  <select
                    value={originCity}
                    onChange={(e) => setOriginCity(e.target.value as MoroccanCity)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  >
                    <option value="Agadir">Agadir (Souss)</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Tanger Med">Tanger Med</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Fès">Fès</option>
                    <option value="Kenitra">Kenitra</option>
                    <option value="Oujda">Oujda</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Destination de Retour</label>
                  <select
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value as MoroccanCity)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  >
                    <option value="Casablanca">Casablanca (Grand Casa)</option>
                    <option value="Tanger Med">Tanger Med</option>
                    <option value="Agadir">Agadir</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Fès">Fès</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Capacité Disponible (Tonnes)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={capacityTons}
                    onChange={(e) => setCapacityTons(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nombre de Palettes Disponibles</label>
                  <input
                    type="number"
                    min="1"
                    max="33"
                    value={pallets}
                    onChange={(e) => setPallets(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Type de Camion</label>
                <select
                  value={truckType}
                  onChange={(e) => setTruckType(e.target.value as TruckType)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                >
                  <option value="Frigorifique (Température Dirigée)">Frigorifique (Température Dirigée)</option>
                  <option value="Plateau Nu (Matériaux / BTP)">Plateau Nu (Matériaux / BTP)</option>
                  <option value="Tautliner / Rideaux Coulissants">Tautliner / Rideaux Coulissants</option>
                  <option value="Fourgon Tôlé Fermé">Fourgon Tôlé Fermé</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Date & Créneau de Disponibilité</label>
                <input
                  type="text"
                  value={availableDate}
                  onChange={(e) => setAvailableDate(e.target.value)}
                  placeholder="Ex: Aujourd'hui 17:00 à Demain midi"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600 text-[11px]">
                ℹ️ Dès que vous soumettez cette disponibilité, l'assistant <strong>AMANA</strong> vous enverra un message WhatsApp avec les chargements correspondants le long de votre itinéraire.
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDeclareModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Déclarer et recevoir les matches
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
