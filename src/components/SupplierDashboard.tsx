import React, { useState } from 'react';
import {
  Shipment,
  TransporterOffer,
  MoroccanCity,
  TruckType,
  GoodsCategory
} from '../types';
import {
  PlusCircle,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  Sparkles,
  Info,
  DollarSign,
  Leaf,
  Building2
} from 'lucide-react';

interface SupplierDashboardProps {
  shipments: Shipment[];
  transporters: TransporterOffer[];
  onAddNewShipment: (newShipment: Omit<Shipment, 'id' | 'reference' | 'createdAt'>) => void;
  onConfirmMatch: (shipmentId: string, transporterId: string) => void;
  onOpenAmanaChat: (shipmentRef: string) => void;
}

export const SupplierDashboard: React.FC<SupplierDashboardProps> = ({
  shipments,
  transporters,
  onAddNewShipment,
  onConfirmMatch,
  onOpenAmanaChat,
}) => {
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>(shipments[0]?.id || '');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Shipment Form State
  const [supplierName, setSupplierName] = useState('Kenza Tazi');
  const [supplierCompany, setSupplierCompany] = useState('Domaines Souss Primeurs SARL');
  const [goodsCategory, setGoodsCategory] = useState<GoodsCategory>('Agrumes & Maraîchage (Primeurs)');
  const [description, setDescription] = useState('16 Tonnes Tomates Cerises & Poivrons sous serre');
  const [weightTons, setWeightTons] = useState(16);
  const [palletsCount, setPalletsCount] = useState(24);
  const [estimatedValueDH, setEstimatedValueDH] = useState(180000);
  const [originCity, setOriginCity] = useState<MoroccanCity>('Agadir');
  const [originAddress, setOriginAddress] = useState('Zone Industrielle Ait Melloul, Unité Export 2');
  const [destinationCity, setDestinationCity] = useState<MoroccanCity>('Casablanca');
  const [destinationAddress, setDestinationAddress] = useState('Plateforme Logistique Centrale Tit Mellil');
  const [truckTypeRequired, setTruckTypeRequired] = useState<TruckType>('Frigorifique (Température Dirigée)');
  const [temperatureRequired, setTemperatureRequired] = useState('+8°C contrôlé');
  const [pickupDate, setPickupDate] = useState('Demain 07:00');
  const [deliveryDeadline, setDeliveryDeadline] = useState('Demain 18:00');

  const selectedShipment = shipments.find((s) => s.id === selectedShipmentId) || shipments[0];

  // Matched transporters for the selected shipment
  const relevantTransporters = transporters
    .filter((t) => {
      if (!selectedShipment) return true;
      // Match origin/dest or similar corridor
      return (
        (t.originCity === selectedShipment.originCity && t.destinationCity === selectedShipment.destinationCity) ||
        t.truckType === selectedShipment.truckTypeRequired
      );
    })
    .sort((a, b) => b.fitScorePercent - a.fitScorePercent);

  const handleApplyPreset = (preset: 'citrus' | 'ceramic' | 'textile') => {
    if (preset === 'citrus') {
      setSupplierName('Kenza Tazi');
      setSupplierCompany('Domaines Souss Primeurs SARL');
      setGoodsCategory('Agrumes & Maraîchage (Primeurs)');
      setDescription('14 Tonnes Oranges Maroc Late pour chaîne de distribution');
      setWeightTons(14);
      setPalletsCount(22);
      setEstimatedValueDH(135000);
      setOriginCity('Agadir');
      setOriginAddress('Zone Industrielle Anza, Station 3');
      setDestinationCity('Casablanca');
      setDestinationAddress('Marché de Gros d\'Aïn Chock');
      setTruckTypeRequired('Frigorifique (Température Dirigée)');
      setTemperatureRequired('+4°C à +6°C');
    } else if (preset === 'ceramic') {
      setSupplierName('Yassine Berrada');
      setSupplierCompany('Comptoir Matériaux & Céramique du Nord');
      setGoodsCategory('Matériaux BTP & Céramique');
      setDescription('22 Tonnes Palettes de Faïence et carrelage');
      setWeightTons(22);
      setPalletsCount(28);
      setEstimatedValueDH(240000);
      setOriginCity('Casablanca');
      setOriginAddress('Parc Industriel Sapino, Nouaceur');
      setDestinationCity('Tanger Med');
      setDestinationAddress('Tanger Free Zone, Chantier Bâtiment 4');
      setTruckTypeRequired('Plateau Nu (Matériaux / BTP)');
      setTemperatureRequired('');
    } else {
      setSupplierName('Fatima-Zahra Alami');
      setSupplierCompany('Coopérative Féminine Argan Bio Souss');
      setGoodsCategory('Agroalimentaire & Huiles');
      setDescription('8 Tonnes Fûts Inox Huile d\'Argan Cosmétique');
      setWeightTons(8);
      setPalletsCount(12);
      setEstimatedValueDH(420000);
      setOriginCity('Agadir');
      setOriginAddress('Coopérative Taroudant Dépôt Souss');
      setDestinationCity('Casablanca');
      setDestinationAddress('Parc Industriel Aïn Sebaâ');
      setTruckTypeRequired('Fourgon Tôlé Fermé');
      setTemperatureRequired('');
    }
  };

  const handleSubmitNewShipment = (e: React.FormEvent) => {
    e.preventDefault();
    // Benchmark calculations:
    const standardCost = Math.round(weightTons * 320 + 2200);
    const matchiniCost = Math.round(standardCost * 0.62);
    const savings = standardCost - matchiniCost;
    const co2 = Math.round(weightTons * 18);

    onAddNewShipment({
      supplierName,
      supplierCompany,
      goodsCategory,
      description,
      weightTons,
      palletsCount,
      estimatedValueDH,
      originCity,
      originAddress,
      destinationCity,
      destinationAddress,
      pickupDate,
      deliveryDeadline,
      truckTypeRequired,
      temperatureRequired: temperatureRequired || undefined,
      status: 'En recherche de transporteur',
      escrowStatus: 'Fonds Réservés',
      standardMarketCostDH: standardCost,
      matchiniCostDH: matchiniCost,
      savingsDH: savings,
      co2SavedKg: co2,
      transitProgressPercent: 0,
    });

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Shippers Value Proposition */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Espace Expéditeur & PME Chargeur · Maroc</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Optimisez vos expéditions sur les retours à vide
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Accédez directement à la capacité de retour des transporteurs routiers vérifiés par nos courtiers agréés. Économisez jusqu'à 40% sur le tarif spot avec séquestre bancaire garanti.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Déposer une expédition</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Shipments List & Selected Shipment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Shipments List (4 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Vos Expéditions Récentes ({shipments.length})
            </h2>
            <span className="text-[11px] text-slate-500">Sélectionnez pour voir les transporteurs</span>
          </div>

          <div className="space-y-2.5">
            {shipments.map((shp) => {
              const isSelected = shp.id === selectedShipment?.id;
              return (
                <div
                  key={shp.id}
                  onClick={() => setSelectedShipmentId(shp.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/50 border-emerald-500 shadow-xs ring-1 ring-emerald-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-800">{shp.reference}</span>
                        <span className="text-slate-400 text-xs">·</span>
                        <span className="text-xs font-semibold text-slate-600 truncate max-w-[150px]">{shp.supplierCompany}</span>
                      </div>
                      <div className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                        <span>{shp.originCity}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        <span>{shp.destinationCity}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                        -{Math.round((shp.savingsDH / shp.standardMarketCostDH) * 100)}%
                      </span>
                      <div className="text-[11px] text-slate-500 mt-1 font-mono">
                        {shp.weightTons} T · {shp.palletsCount} pal.
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {shp.pickupDate}
                    </span>
                    <span className={`text-[11px] font-semibold ${
                      shp.status === 'En transit' ? 'text-blue-600' :
                      shp.status === 'Match validé par courtier' ? 'text-amber-600' :
                      shp.status === 'Livré & Clôturé' ? 'text-emerald-700' : 'text-slate-600'
                    }`}>
                      {shp.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Shipment Deep Dive & Matched Transporters (7 cols) */}
        {selectedShipment && (
          <div className="lg:col-span-7 space-y-6">
            {/* Shipment Overview & Financial Savings Breakdown */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs text-slate-500 font-mono">Dossier #{selectedShipment.reference}</div>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {selectedShipment.goodsCategory}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">{selectedShipment.description}</p>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-500">Statut du Séquestre</div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{selectedShipment.escrowStatus}</span>
                  </div>
                </div>
              </div>

              {/* Corridor & Route Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                <div>
                  <div className="text-slate-400 font-medium">Départ / Enlèvement :</div>
                  <div className="font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{selectedShipment.originCity}</span>
                  </div>
                  <div className="text-slate-600 text-[11px] mt-0.5">{selectedShipment.originAddress}</div>
                  <div className="text-slate-500 text-[11px] mt-1">{selectedShipment.pickupDate}</div>
                </div>

                <div>
                  <div className="text-slate-400 font-medium">Arrivée / Livraison :</div>
                  <div className="font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span>{selectedShipment.destinationCity}</span>
                  </div>
                  <div className="text-slate-600 text-[11px] mt-0.5">{selectedShipment.destinationAddress}</div>
                  <div className="text-slate-500 text-[11px] mt-1">Délai max: {selectedShipment.deliveryDeadline}</div>
                </div>
              </div>

              {/* Core Feature: Comparative Cost Savings vs Traditional Intermediary Chain */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                    <span>Comparatif Financier · Chaîne Traditionnelle vs Matchini</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/50">
                    Transparence Vérifiée
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white/10 backdrop-blur-xs p-3 rounded-lg border border-white/10">
                    <div className="text-[11px] text-slate-300">Chaîne Traditionnelle</div>
                    <div className="text-lg font-bold text-slate-200 line-through font-mono mt-0.5">
                      {selectedShipment.standardMarketCostDH.toLocaleString()} DH
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                      Intermédiaire informel de café (18-25% marge), prix spot gonflé, risque d'impayé.
                    </p>
                  </div>

                  <div className="bg-emerald-500/20 backdrop-blur-xs p-3 rounded-lg border border-emerald-400/40">
                    <div className="text-[11px] text-emerald-300 font-semibold">Tarif Matchini (Backhaul)</div>
                    <div className="text-xl font-black text-white font-mono mt-0.5">
                      {selectedShipment.matchiniCostDH.toLocaleString()} DH
                    </div>
                    <p className="text-[10px] text-emerald-200 mt-1 leading-snug">
                      Retour optimisé à vide + 3.5% courtier agréé + séquestre bancaire inclus.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xs p-3 rounded-lg border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-emerald-400 font-semibold">Économie Nette Client</div>
                      <div className="text-lg font-black text-emerald-300 font-mono mt-0.5">
                        +{selectedShipment.savingsDH.toLocaleString()} DH
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        -{Math.round((selectedShipment.savingsDH / selectedShipment.standardMarketCostDH) * 100)}% d'économie
                      </div>
                    </div>
                    <div className="text-[10px] text-emerald-200 flex items-center gap-1 mt-2">
                      <Leaf className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>-{selectedShipment.co2SavedKg} kg CO2 évités</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Matched Transporters Ranked by Fit Score */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Transporteurs Détectés sur l'Axe Retour ({relevantTransporters.length})</span>
                  </h4>
                  <span className="text-[11px] text-slate-500">Classés par indice de compatibilité</span>
                </div>

                <div className="space-y-3">
                  {relevantTransporters.map((t) => {
                    const isAssigned = selectedShipment.assignedTruckerId === t.id;
                    return (
                      <div
                        key={t.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isAssigned
                            ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500/30'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">{t.companyName}</span>
                              <span className="text-[11px] font-mono text-slate-500">({t.truckPlate})</span>
                              {t.brokerApproved && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                  Audit Courtier Validé
                                </span>
                              )}
                            </div>

                            <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                              <span>Chauffeur: <strong className="text-slate-800">{t.driverName}</strong></span>
                              <span className="text-slate-300">·</span>
                              <span>Note: <strong className="text-slate-800">★ {t.rating}</strong> ({t.completedTrips} courses)</span>
                              <span className="text-slate-300">·</span>
                              <span>Véhicule: {t.truckModel}</span>
                            </div>

                            <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                                {t.currentReturnStatus}
                              </span>
                              <span>Capacité dispo: {t.availableCapacityTons} T / {t.availablePallets} pal.</span>
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                            <div className="text-right">
                              <div className="text-xs font-extrabold text-emerald-600">
                                {t.fitScorePercent}% Match
                              </div>
                              <div className="text-base font-black text-slate-900 font-mono">
                                {t.proposedRateDH.toLocaleString()} DH
                              </div>
                            </div>

                            {isAssigned ? (
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Match Retenu
                                </span>
                                <button
                                  onClick={() => onOpenAmanaChat(selectedShipment.reference)}
                                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-semibold cursor-pointer"
                                >
                                  Ouvrir AMANA
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => onConfirmMatch(selectedShipment.id, t.id)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                              >
                                Bloquer le Séquestre & Assigner
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: New Shipment Creation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-6">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Déposer une nouvelle expédition de fret</h3>
                <p className="text-xs text-slate-300">Remplissez les détails pour matcher automatiquement avec un retour à vide</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitNewShipment} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              {/* Presets */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-700 text-xs block mb-2">Exemples types marocains (cliquer pour pré-remplir) :</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleApplyPreset('citrus')}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-800 font-semibold cursor-pointer"
                  >
                    🍊 Agrumes Souss ➔ Casa (Frigo 14T)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyPreset('ceramic')}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-800 font-semibold cursor-pointer"
                  >
                    🧱 Céramique Berrechid ➔ Tanger Med (22T)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyPreset('textile')}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-800 font-semibold cursor-pointer"
                  >
                    🧴 Argan Bio Taroudant ➔ Casa (8T)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Raison Sociale Expéditeur</label>
                  <input
                    type="text"
                    value={supplierCompany}
                    onChange={(e) => setSupplierCompany(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Contact Responsable Expédition</label>
                  <input
                    type="text"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Ville de Départ (Chargement)</label>
                  <select
                    value={originCity}
                    onChange={(e) => setOriginCity(e.target.value as MoroccanCity)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  >
                    <option value="Agadir">Agadir (Souss-Massa)</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Tanger Med">Tanger Med</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Fès">Fès</option>
                    <option value="Meknès">Meknès</option>
                    <option value="Kenitra">Kenitra</option>
                    <option value="Oujda">Oujda</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Ville d'Arrivée (Déchargement)</label>
                  <select
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value as MoroccanCity)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  >
                    <option value="Casablanca">Casablanca</option>
                    <option value="Tanger Med">Tanger Med</option>
                    <option value="Agadir">Agadir</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Fès">Fès</option>
                    <option value="Kenitra">Kenitra</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Adresse de Ramassage</label>
                  <input
                    type="text"
                    value={originAddress}
                    onChange={(e) => setOriginAddress(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Adresse de Déchargement</label>
                  <input
                    type="text"
                    value={destinationAddress}
                    onChange={(e) => setDestinationAddress(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Catégorie Marchandise</label>
                  <select
                    value={goodsCategory}
                    onChange={(e) => setGoodsCategory(e.target.value as GoodsCategory)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  >
                    <option value="Agrumes & Maraîchage (Primeurs)">Agrumes & Primeurs</option>
                    <option value="Agroalimentaire & Huiles">Agroalimentaire & Huiles</option>
                    <option value="Matériaux BTP & Céramique">Matériaux BTP & Céramique</option>
                    <option value="Textile & Confection">Textile & Confection</option>
                    <option value="Câblage & Pièces Automobiles">Câblage & Pièces Auto</option>
                    <option value="FMCG / Grande Consommation">Grande Consommation (FMCG)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Poids (Tonnes)</label>
                  <input
                    type="number"
                    min="1"
                    max="32"
                    value={weightTons}
                    onChange={(e) => setWeightTons(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nombre de Palettes</label>
                  <input
                    type="number"
                    min="1"
                    max="33"
                    value={palletsCount}
                    onChange={(e) => setPalletsCount(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Type de Camion Requis</label>
                  <select
                    value={truckTypeRequired}
                    onChange={(e) => setTruckTypeRequired(e.target.value as TruckType)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  >
                    <option value="Frigorifique (Température Dirigée)">Frigorifique (Température Dirigée)</option>
                    <option value="Plateau Nu (Matériaux / BTP)">Plateau Nu (Matériaux / BTP)</option>
                    <option value="Tautliner / Rideaux Coulissants">Tautliner / Rideaux Coulissants</option>
                    <option value="Fourgon Tôlé Fermé">Fourgon Tôlé Fermé</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Consigne de Température (si Frigo)</label>
                  <input
                    type="text"
                    value={temperatureRequired}
                    onChange={(e) => setTemperatureRequired(e.target.value)}
                    placeholder="Ex: +4°C à +6°C"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Valeur Marchande Déclarée (en DH pour assurance AXA)</label>
                <input
                  type="number"
                  min="10000"
                  step="5000"
                  value={estimatedValueDH}
                  onChange={(e) => setEstimatedValueDH(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white font-mono"
                />
              </div>

              <div className="bg-emerald-50 p-3.5 rounded-lg border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Garantie Séquestre Matchini :</strong> Votre règlement ne sera débité et consigné qu'après validation du camion par le courtier agréé. Les fonds ne sont libérés au transporteur qu'une fois la marchandise déchargée et le Bon de Livraison visé sans réserve.
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Publier l'expédition & Scanner les retours
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
