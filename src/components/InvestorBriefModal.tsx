import React from 'react';
import {
  X,
  Target,
  CheckCircle2,
  DollarSign,
  Leaf,
  Users,
  Building,
  ShieldCheck,
  TrendingUp,
  FileText
} from 'lucide-react';
import { ActiveTab } from './Navbar';

interface InvestorBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: ActiveTab) => void;
}

export const InvestorBriefModal: React.FC<InvestorBriefModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Dossier d'Investissement à Impact · Jury Umbrella500
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Matchini : Décarboner et Rentabiliser le Fret Routier au Maroc
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
            Première plateforme marocaine d'optimisation du fret retour (backhaul), combinant tiers de confiance agréé, séquestre bancaire T+1 et assistant Darija sur WhatsApp.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* Executive Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-red-600 font-semibold text-xs mb-1">
                <Target className="w-4 h-4" />
                <span>Le Défi Marocain</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 font-mono">43%</div>
              <p className="text-xs text-slate-600 mt-1">
                Des camions lourds rentrent totalement vides après livraison (ex. Agadir ➔ Casa). 3,2 Mrd DH de gazole et d'usure gaspillés chaque année.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs mb-1">
                <DollarSign className="w-4 h-4" />
                <span>Impact Économique PME</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 font-mono">-32%</div>
              <p className="text-xs text-slate-600 mt-1">
                De réduction de coût de transport pour les producteurs agricoles et PME industrielles, tout en augmentant le revenu net des chauffeurs de +40 000 DH/an.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-teal-700 font-semibold text-xs mb-1">
                <Leaf className="w-4 h-4" />
                <span>Impact Environnemental</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 font-mono">1 140 t</div>
              <p className="text-xs text-slate-600 mt-1">
                De CO2 évitées sur le réseau autoroutier national (Agadir, Casablanca, Tanger Med) sur les premiers flux pilotes.
              </p>
            </div>
          </div>

          {/* 4 Pillars of Matchini Differentiation */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Pourquoi Matchini réussit là où les bourses de fret classiques échouent
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900">1. Inclusion des Courtiers Agréés</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">Tiers de Confiance</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Au lieu d'ubériser violemment les intermédiaires locaux, Matchini institutionnalise les courtiers de transport agréés (agrément Ministère du Transport). Ils auditent la conformité (carte grise, AXA, ONSSA frigo, CMR) et perçoivent 3,5% de commission transparente, sans risque d'impayé.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900">2. Séquestre Bancaire Garanti (T+1)</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">Fintech CMI/BCP</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Le fret marocain souffre de délais de paiement de 90 à 120 jours et de chèques impayés. Matchini bloque les fonds de l'expéditeur sous séquestre bancaire dès le match, et les libère sous 24h au transporteur dès signature électronique du Bon de Livraison.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900">3. Assistant AMANA en Darija</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">WhatsApp Bot</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Plus de 70% des chauffeurs routiers indépendants au Maroc n'utilisent pas d'applications mobiles lourdes ou en langue étrangère. AMANA dialogue en Darija marocaine sur WhatsApp avec notes vocales pour confirmer les trajets, envoyer la localisation et émarger les BL.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900">4. Modèle Économique & Scalabilité</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">Take-Rate 6.5%</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Matchini prélève une commission globale de 6,5% (dont 3,5% reversés au courtier certificateur et 3% plateforme/séquestre), soit 3 fois moins que la chaîne informelle traditionnelle (18% à 25% de marges opaques).
                </p>
              </div>
            </div>
          </div>

          {/* Quick Navigation Shortcuts */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Explorer le prototype interactif :
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { onClose(); onNavigateToTab('supplier'); }}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Building className="w-3.5 h-3.5 text-emerald-600" />
                <span>Fournisseur & Économies</span>
              </button>
              <button
                onClick={() => { onClose(); onNavigateToTab('trucker'); }}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>Transporteur & Revenu Récupéré</span>
              </button>
              <button
                onClick={() => { onClose(); onNavigateToTab('broker'); }}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Audit Courtier Agréé</span>
              </button>
              <button
                onClick={() => { onClose(); onNavigateToTab('amana'); }}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>AMANA WhatsApp Darija</span>
              </button>
              <button
                onClick={() => { onClose(); onNavigateToTab('tracking'); }}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Suivi GPS & Séquestre</span>
              </button>
              <button
                onClick={() => { onClose(); onNavigateToTab('impact'); }}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Thèse d'Investissement Umbrella500</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Candidature Concours Umbrella500 · Prototype opérationnel vérifiable
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Fermer et Tester la Plateforme
          </button>
        </div>
      </div>
    </div>
  );
};
