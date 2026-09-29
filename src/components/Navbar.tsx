import React from 'react';
import {
  Truck,
  Building2,
  Scale,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react';

export type ActiveTab = 'supplier' | 'trucker' | 'broker' | 'amana' | 'tracking' | 'impact';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenInvestorBrief: () => void;
  pendingBrokerAuditsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenInvestorBrief,
  pendingBrokerAuditsCount,
}) => {
  const tabs = [
    { id: 'supplier' as ActiveTab, label: 'Fournisseur', icon: Building2, subtitle: 'Expédier & Économiser' },
    { id: 'trucker' as ActiveTab, label: 'Transporteur', icon: Truck, subtitle: 'Valoriser le Retour' },
    { id: 'broker' as ActiveTab, label: 'Courtier Agréé', icon: Scale, subtitle: 'Conformité & Audit', badge: pendingBrokerAuditsCount },
    { id: 'amana' as ActiveTab, label: 'Assistant AMANA', icon: MessageSquare, subtitle: 'WhatsApp Darija' },
    { id: 'tracking' as ActiveTab, label: 'Suivi & Séquestre', icon: ShieldCheck, subtitle: 'GPS & Paiement T+1' },
    { id: 'impact' as ActiveTab, label: 'Impact Umbrella500', icon: TrendingUp, subtitle: 'Thèse & Métriques' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      {/* Top micro-bar: Moroccan Institutional & Investor Context */}
      <div className="bg-slate-900 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Matchini Maroc · Réseau National de Fret Retour
          </span>
          <span className="text-slate-400 hidden sm:inline" aria-hidden="true">·</span>
          <span className="text-slate-300 hidden sm:inline text-xs">
            Séquestre Bancaire Garanti CMI / BCP
          </span>
          <span className="text-slate-400 hidden md:inline" aria-hidden="true">·</span>
          <span className="text-slate-300 hidden md:inline text-xs">
            Agrément Logistique Ministère du Transport
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded text-[11px] border border-amber-600/30">
            <Award className="w-3.5 h-3.5" />
            <span>Dossier Candidature Umbrella500</span>
          </div>
          <button
            onClick={onOpenInvestorBrief}
            className="flex items-center gap-1 text-slate-200 hover:text-white hover:underline text-[11px] font-medium transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Fiche Jury Investisseurs</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('supplier')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-sm font-bold text-lg tracking-wider relative overflow-hidden">
              <span className="relative z-10">M</span>
              <div className="absolute -bottom-1 -right-1 text-emerald-300/30 text-2xl font-black">🇲🇦</div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Match<span className="text-emerald-600">ini</span>
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  MAROC
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none">
                Plateforme de Fret Retour & Tiers de Confiance
              </p>
            </div>
          </div>

          {/* Navigation Items (Segmented buttons adhering to zero-pill discipline) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all relative cursor-pointer ${
                    isActive
                      ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <div className="text-left leading-tight">
                    <div>{tab.label}</div>
                  </div>
                  {tab.badge && tab.badge > 0 ? (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white font-bold">
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Escrow Status & Investor Brief */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-[11px] text-slate-400 font-medium">Séquestre actif</span>
              <span className="text-xs font-bold text-slate-800 font-mono">
                480 000 <span className="text-[10px] text-emerald-600 font-sans font-semibold">DH</span>
              </span>
            </div>

            <button
              onClick={onOpenInvestorBrief}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Brief Jury Umbrella500</span>
              <span className="sm:hidden">Brief</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && tab.badge > 0 ? (
                  <span className="px-1 rounded-full text-[9px] bg-amber-500 text-white font-bold">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
