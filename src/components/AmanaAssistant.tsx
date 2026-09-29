import React, { useState } from 'react';
import {
  AMANAMessage,
  Shipment
} from '../types';
import {
  MessageSquare,
  Send,
  Mic,
  Play,
  Pause,
  CheckCheck,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  ShieldCheck,
  Languages,
  User,
  Info,
  Camera,
  FileCheck
} from 'lucide-react';

interface AmanaAssistantProps {
  initialMessages: AMANAMessage[];
  activeShipment?: Shipment;
  onConfirmMatchInChat: (shipmentRef: string) => void;
  onTriggerEscrowRelease: (shipmentRef: string) => void;
}

export const AmanaAssistant: React.FC<AmanaAssistantProps> = ({
  initialMessages,
  activeShipment,
  onConfirmMatchInChat,
  onTriggerEscrowRelease,
}) => {
  const [messages, setMessages] = useState<AMANAMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [activePersona, setActivePersona] = useState<'trucker' | 'supplier'>('trucker');
  const [showArabicScript, setShowArabicScript] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSendMessage = (textToSend?: string) => {
    const content = textToSend || inputText;
    if (!content.trim()) return;

    const newMsg: AMANAMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      role: activePersona,
      textDarija: content,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Authentic Darija Auto-Reply Simulation
    setTimeout(() => {
      let replyDarija = '';
      let replyFrench = '';
      let quickReplies: string[] | undefined = undefined;

      const lower = content.toLowerCase();
      if (lower.includes('photo') || lower.includes('bl') || lower.includes('bon')) {
        replyDarija = 'Chokran Si Brahim! Wselna l\'Bon de Livraison émargé. L\'courtier Si El Hachemi valider l\'conformité daba. 4,200 DH f triqha l\'compte bancaire dialek sous 24h.';
        replyFrench = 'Merci Si Brahim ! Nous avons bien reçu le Bon de Livraison visé. Le courtier Si El Hachemi valide la conformité immédiatement. Le virement de 4,200 DH est déclenché vers votre compte sous 24h.';
        quickReplies = ['💵 Vérifier le solde séquestre', '📍 Voir prochaine charge retour'];
        if (activeShipment) {
          onTriggerEscrowRelease(activeShipment.reference);
        }
      } else if (lower.includes('adresse') || lower.includes('fin') || lower.includes('feen')) {
        replyDarija = 'L\'adresse de chargement: Station Anza n°4, Zone Industrielle Agadir. Contact responsable quai: Si Reda (+212 6 61 22 33 44). Quai n°2 réservé pour camion frigo.';
        replyFrench = 'Adresse de chargement : Station Anza n°4, ZI Agadir. Contact chef de quai : Si Reda (+212 6 61 22 33 44). Quai n°2 prêt pour camion frigorifique.';
        quickReplies = ['🚚 Wselt l\'quai d\'chargement', '📞 Appeler le responsable'];
      } else if (lower.includes('mwafeq') || lower.includes('accepter') || lower.includes('oui') || lower.includes('tamam')) {
        replyDarija = 'Tamam mzyan bzf! L\'match tconfirma. L\'séquestre bloqua 4,200 DH w l\'police d\'assurance AXA mrigla. Triq salama!';
        replyFrench = 'Parfait ! Le match est confirmé. Les 4,200 DH sont bloqués sous séquestre et la police AXA est liée. Bonne route !';
        quickReplies = ['📍 Sift l\'localisation dyali', '📸 Sift photo d\'BL'];
        if (activeShipment) {
          onConfirmMatchInChat(activeShipment.reference);
        }
      } else {
        replyDarija = 'Salam! M3ak AMANA l\'assistant logistique Matchini. Kolchi mriguel: dossier ' + (activeShipment?.reference || 'MTC-2026-0891') + ' ma7mi b séquestre bancaire w l\'courtier mtabe3 l\'dossier. Wach bghiti chi msa3ada?';
        replyFrench = 'Bonjour ! Ici AMANA, l\'assistant Matchini. Tout est en règle : le dossier ' + (activeShipment?.reference || 'MTC-2026-0891') + ' est protégé par séquestre et supervisé par le courtier agréé. Besoin d\'aide ?';
        quickReplies = ['✅ Ayyeh, mwafeq! (Confirmer)', '📍 Adresse de chargement', '📸 Envoyer le Bon de Livraison'];
      }

      const amanaReply: AMANAMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'amana',
        role: activePersona,
        textDarija: replyDarija,
        textFrenchTranslation: replyFrench,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        quickReplies,
      };

      setMessages((prev) => [...prev, amanaReply]);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner explaining the Adoption Thesis to the Umbrella500 Jury */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Levier d'Adoption Terrain · Assistant AMANA en Darija</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            WhatsApp & Darija : Zéro friction pour les chauffeurs et dépôts
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Au Maroc, 72% des transporteurs indépendants refusent les portails web complexes mais utilisent WhatsApp quotidiennement. AMANA orchestre la confirmation de fret, l'envoi de pièces et le déblocage du séquestre dans leur langue usuelle.
          </p>
        </div>

        {/* Persona & Script Toggle Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center gap-1 text-xs">
            <button
              onClick={() => setActivePersona('trucker')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                activePersona === 'trucker'
                  ? 'bg-white text-emerald-800 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Chauffeur (Si Brahim)
            </button>
            <button
              onClick={() => setActivePersona('supplier')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                activePersona === 'supplier'
                  ? 'bg-white text-emerald-800 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Expéditeur (Si Mohammed)
            </button>
          </div>

          <button
            onClick={() => setShowArabicScript(!showArabicScript)}
            className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-600" />
            <span>{showArabicScript ? 'Darija (Latin/SMS)' : 'Darija (عربي)'}</span>
          </button>
        </div>
      </div>

      {/* Main WhatsApp-Style Phone Frame Layout */}
      <div className="max-w-2xl mx-auto bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
        {/* WhatsApp App Header */}
        <div className="bg-[#075e54] text-white p-3.5 sm:p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white text-base shadow-xs border border-white/20">
                A
              </div>
              <span className="w-3 h-3 bg-emerald-400 rounded-full absolute bottom-0 right-0 border-2 border-[#075e54]"></span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight">AMANA · Matchini Maroc</span>
                <span className="text-[10px] bg-emerald-800 text-emerald-100 px-1.5 py-0.2 rounded font-semibold border border-emerald-600/40">
                  Vérifié 🇲🇦
                </span>
              </div>
              <div className="text-[11px] text-emerald-100/90 leading-tight">
                {activePersona === 'trucker' ? 'Canal Conducteur · Chauffeur Si Brahim (24-A-8921)' : 'Canal Expéditeur · Domaines Souss Primeurs'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-white/90">
            <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
            <Video className="w-4 h-4 cursor-pointer hover:text-white" />
            <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* WhatsApp Chat Canvas */}
        <div className="bg-[#efeae2] p-4 sm:p-5 h-[480px] overflow-y-auto space-y-3 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:16px_16px]">
          {/* Security & Escrow Trust Notice in Chat */}
          <div className="flex justify-center">
            <div className="bg-[#ffeecd] text-amber-900 text-[11px] px-3.5 py-1.5 rounded-lg border border-amber-200/80 shadow-2xs max-w-md text-center flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                Ce fil est audité par <strong>Atlas Courtage</strong> (Agrément TR/0412). Les fonds sont sécurisés sous séquestre bancaire garanti.
              </span>
            </div>
          </div>

          {/* Voice note simulation message */}
          <div className="flex justify-start">
            <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-2xs max-w-[85%] border border-slate-200 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-600">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 cursor-pointer shadow-2xs"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div className="flex-1">
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full bg-emerald-600 transition-all ${isPlayingAudio ? 'w-full duration-3000' : 'w-1/3'}`}></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Note vocale du Courtier Si El Hachemi</span>
                    <span>0:18</span>
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 italic bg-slate-50 p-1.5 rounded border border-slate-100">
                🎙️ "Salam Si Brahim, dossier dialek m3ana mriguel, goul lia ghir wach l'frigo wajej b +4 degrès bach ntlaqo l'départ..."
              </div>
            </div>
          </div>

          {/* Messages list */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div
                  className={`rounded-xl p-3 shadow-2xs max-w-[88%] text-xs relative ${
                    isUser
                      ? 'bg-[#d9fdd3] text-slate-900 rounded-tr-none'
                      : 'bg-white text-slate-900 rounded-tl-none border border-slate-200/70'
                  }`}
                >
                  {/* Darija Text */}
                  <div className="text-xs sm:text-sm font-medium leading-relaxed">
                    {showArabicScript ? (
                      msg.sender === 'amana' ? (
                        'عسلامة سي براهيم، كولشي واجد دابا فالحساب ديالك!'
                      ) : (
                        'واخا مرحبا أنا غادي نكون تما'
                      )
                    ) : (
                      msg.textDarija
                    )}
                  </div>

                  {/* French Translation for Investor Jury */}
                  {msg.textFrenchTranslation && (
                    <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-500 italic">
                      🇫🇷 {msg.textFrenchTranslation}
                    </div>
                  )}

                  {/* Timestamp & read receipts */}
                  <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 mt-1">
                    <span>{msg.timestamp}</span>
                    <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                </div>

                {/* Quick replies chips underneath AMANA's message */}
                {msg.quickReplies && (
                  <div className="flex flex-wrap gap-1.5 mt-1 max-w-[90%]">
                    {msg.quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(reply)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 text-emerald-800 text-[11px] font-semibold rounded-full border border-emerald-300 shadow-2xs transition-colors cursor-pointer"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Chat Input Bar */}
        <div className="bg-[#f0f2f5] p-2.5 sm:p-3 flex items-center gap-2 border-t border-slate-200">
          <button className="text-slate-500 hover:text-slate-700 p-1.5">
            <Smile className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleSendMessage('📸 Photo d\'Bon de Livraison émargé')}
            className="text-slate-500 hover:text-emerald-700 p-1.5"
            title="Envoyer photo du BL"
          >
            <Camera className="w-5 h-5" />
          </button>
          <button className="text-slate-500 hover:text-slate-700 p-1.5">
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Kteb hna f Darija (ex: Fin wssal, mwafeq, BL...)"
            className="flex-1 bg-white rounded-lg px-3.5 py-2 text-xs text-slate-900 border border-slate-300 focus:outline-emerald-600"
          />

          {inputText.trim() ? (
            <button
              onClick={() => handleSendMessage()}
              className="w-9 h-9 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs transition-colors"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          ) : (
            <button
              onClick={() => handleSendMessage('🎤 [Message Vocal Envoyé par Chauffeur Si Brahim]')}
              className="w-9 h-9 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs transition-colors"
              title="Enregistrer note vocale"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Adoption Insights for Investment Jury */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <strong className="text-slate-900 block mb-0.5">1. Zéro barrière logicielle :</strong>
          Pas besoin d'installer d'application tierce ou d'apprendre une interface en français/anglais pour les chauffeurs indépendants.
        </div>
        <div>
          <strong className="text-slate-900 block mb-0.5">2. Notes vocales Darija :</strong>
          Prend en charge les chauffeurs analphabètes fonctionnels pour l'accord de prix, la déclaration d'arrivée et l'inspection de chargement.
        </div>
        <div>
          <strong className="text-slate-900 block mb-0.5">3. OCR du Bon de Livraison :</strong>
          Une simple photo du Bon de Livraison (BL) visé par le client suffit pour déclencher la libération immédiate du séquestre bancaire.
        </div>
      </div>
    </div>
  );
};
