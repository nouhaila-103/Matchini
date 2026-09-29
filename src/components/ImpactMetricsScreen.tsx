import React, { useState } from 'react';
import {
  TrendingUp,
  Leaf,
  DollarSign,
  Truck,
  Building2,
  Users,
  ShieldCheck,
  Award,
  Globe2,
  BarChart3,
  Sliders,
  CheckCircle2,
  ArrowUpRight,
  Download
} from 'lucide-react';

export const ImpactMetricsScreen: React.FC = () => {
  // Interactive Simulator State for Umbrella500 Jury
  const [activeFleetTrucks, setActiveFleetTrucks] = useState<number>(1200); // 1,200 trucks active in Morocco
  const [backhaulsPerTruckPerMonth, setBackhaulsPerTruckPerMonth] = useState<number>(4); // 4 backhauls/month

  // Calculated Projections
  const annualTripsAvoided = activeFleetTrucks * backhaulsPerTruckPerMonth * 12;
  const avgGrossFreightValueDH = 3900;
  const annualGMVDH = annualTripsAvoided * avgGrossFreightValueDH;
  const truckerNetIncomeDH = annualGMVDH * 0.935; // 93.5% goes directly to truckers
  const shipperSavingsDH = annualTripsAvoided * 1850; // Average savings vs spot market
  const co2ReductionTons = Math.round(annualTripsAvoided * 0.22); // 220kg CO2 per 450km backhaul
  const matchiniRevenueDH = annualGMVDH * 0.03; // 3% Matchini net platform commission
  const brokersRevenueDH = annualGMVDH * 0.035; // 3.5% Courtiers commission

  return (
    <div className="space-y-6">
      {/* Top Banner: Umbrella500 Investment Thesis */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" />
              <span>Dossier d'Impact Investissement · Compétition Umbrella500</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Impact Économique, Social & Décarbonation du Fret Marocain
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Matchini transforme l'inefficience structurelle du transport routier au Maroc en valeur partagée. En digitalisant les retours à vide avec les courtiers agréés et le séquestre bancaire, nous créons un modèle à haute rentabilité et à impact mesurable dès le premier kilomètre.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-2 border border-white/20 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Exporter Note de Synthèse</span>
            </button>
          </div>
        </div>
      </div>

      {/* Aggregate Stats Tracked by Platform Over Time (User Core Feature Request) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Trajets à Vide Évités
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-1">
            2 480 <span className="text-xs font-sans font-semibold text-emerald-700">+34% M/M</span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Trajets retour convertis en fret actif sur les corridors A1, A3 et A7.
          </p>
          <div className="pt-2 text-[11px] font-mono text-slate-400">
            Équivalent: 1 160 000 km sans rouler à vide
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Revenu Additionnel Transporteurs
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-1">
            9,85 M <span className="text-xs font-sans font-semibold text-slate-500">DH</span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Reversés directement aux artisans transporteurs sous 24h via séquestre.
          </p>
          <div className="pt-2 text-[11px] font-mono text-emerald-700 font-bold">
            +40 200 DH/an de revenu net par camion
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Économie Logistique PME
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-1">
            -32,4 % <span className="text-xs font-sans font-semibold text-teal-700">d'économie</span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Réduction moyenne du coût de fret pour les expéditeurs et coopératives agricoles.
          </p>
          <div className="pt-2 text-[11px] font-mono text-slate-400">
            5,4 M DH de trésorerie épargnée par les PME
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Décarbonation Évitée
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-1">
            1 140 t <span className="text-xs font-sans font-semibold text-emerald-700">CO2</span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Émissions évitées calculées selon le référentiel ADEME / GHG Protocol Fret Routier.
          </p>
          <div className="pt-2 text-[11px] font-mono text-slate-400">
            Équivalent: 495 000 litres de gazole non brûlés
          </div>
        </div>
      </div>

      {/* Interactive 3-Year Scalability & Impact Simulator for Umbrella500 Jury */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>Simulateur d'Échelle & Projection Financière (Horizon 2026 - 2028)</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Modélisez l'impact selon le taux d'adoption de la flotte marocaine
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Le parc marocain compte environ 120 000 poids lourds immatriculés (Ministère du Transport).
            </p>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 shrink-0">
            Take-rate Plateforme : 6.5% (3.5% courtiers + 3% Matchini)
          </span>
        </div>

        {/* Sliders Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-bold text-slate-800">
                Camions Actifs sur Matchini au Maroc :
              </label>
              <span className="font-mono text-sm font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {activeFleetTrucks.toLocaleString()} véhicules ({((activeFleetTrucks / 120000) * 100).toFixed(1)}% du parc)
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="10000"
              step="200"
              value={activeFleetTrucks}
              onChange={(e) => setActiveFleetTrucks(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Phase Pilote (200)</span>
              <span>Expansion Nationale (5 000)</span>
              <span>Maturation (10 000)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-bold text-slate-800">
                Retours Optimisés par Camion par Mois :
              </label>
              <span className="font-mono text-sm font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {backhaulsPerTruckPerMonth} voyages / mois
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={backhaulsPerTruckPerMonth}
              onChange={(e) => setBackhaulsPerTruckPerMonth(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1 retour / mois</span>
              <span>4 retours / mois (Standard)</span>
              <span>8 retours / mois (Intensif)</span>
            </div>
          </div>
        </div>

        {/* Live Simulation Output Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Volume d'Affaires Brut (GMV)
            </span>
            <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
              {(annualGMVDH / 1000000).toFixed(1)} M <span className="text-xs font-sans text-white">DH / an</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              {annualTripsAvoided.toLocaleString()} trajets retour commercialisés
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
            <span className="text-[11px] text-emerald-800 uppercase tracking-wider font-semibold">
              Revenu Injecté Transporteurs
            </span>
            <div className="text-xl sm:text-2xl font-black font-mono text-emerald-900">
              {(truckerNetIncomeDH / 1000000).toFixed(1)} M <span className="text-xs font-sans text-slate-600">DH / an</span>
            </div>
            <p className="text-[11px] text-emerald-700 mt-1">
              {Math.round(truckerNetIncomeDH / activeFleetTrucks).toLocaleString()} DH net / an par chauffeur
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] text-slate-600 uppercase tracking-wider font-semibold">
              Chiffre d'Affaires Matchini Net
            </span>
            <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">
              {(matchiniRevenueDH / 1000000).toFixed(2)} M <span className="text-xs font-sans text-slate-500">DH / an</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              + {(brokersRevenueDH / 1000000).toFixed(2)} M DH reversés aux courtiers agréés
            </p>
          </div>

          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-1">
            <span className="text-[11px] text-teal-800 uppercase tracking-wider font-semibold">
              CO2 Évité Annuellement
            </span>
            <div className="text-xl sm:text-2xl font-black font-mono text-teal-900">
              {co2ReductionTons.toLocaleString()} <span className="text-xs font-sans text-slate-600">Tonnes</span>
            </div>
            <p className="text-[11px] text-teal-700 mt-1">
              Contribution directe aux objectifs NDC du Maroc
            </p>
          </div>
        </div>
      </div>

      {/* Sustainable Development Goals (SDG) Alignment */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-emerald-600" />
          <span>Alignement Objectifs de Développement Durable (ODD / SDG)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-red-200 bg-red-50/40 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-red-800">
              <span>ODD 8</span>
              <span className="text-[10px] bg-red-100 px-1.5 py-0.2 rounded font-mono">Decent Work</span>
            </div>
            <div className="font-bold text-slate-900 text-xs">Travail Décent & Revenus Stables</div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Paiement sous 24h sans escompte abusif. Sortie de la précarité financière pour les artisans transporteurs confrontés aux impayés.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-amber-800">
              <span>ODD 9</span>
              <span className="text-[10px] bg-amber-100 px-1.5 py-0.2 rounded font-mono">Infrastructure</span>
            </div>
            <div className="font-bold text-slate-900 text-xs">Industrie, Innovation & Fret</div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Digitalisation de l'infrastructure logistique nationale et intégration des courtiers dans une chaîne de valeur transparente et auditable.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-emerald-800">
              <span>ODD 12</span>
              <span className="text-[10px] bg-emerald-100 px-1.5 py-0.2 rounded font-mono">Efficiency</span>
            </div>
            <div className="font-bold text-slate-900 text-xs">Consommation & Flux Responsables</div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Optimisation de l'utilisation des actifs existants : zéro achat de camion supplémentaire, rentabilisation de la capacité roulante déjà présente.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/40 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-teal-800">
              <span>ODD 13</span>
              <span className="text-[10px] bg-teal-100 px-1.5 py-0.2 rounded font-mono">Climate Action</span>
            </div>
            <div className="font-bold text-slate-900 text-xs">Mesures Relatives au Climat</div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Réduction mesurable du gazole brûlé sur les autoroutes marocaines (A1 Tanger-Casa, A3 Casa-Agadir). Décarbonation immédiate du premier et dernier km.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
