import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  ShieldCheck, 
  Lock,
  Camera,
  Save
} from 'lucide-react';
import { sanitizeInput } from '../utils/sanitizeInput';

export const AdminProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState({
    name: 'Gabriel Lira',
    email: 'admin@condu.com.br',
    phone: '(11) 98888-7777',
    role: 'Síndico Profissional',
    creci: '123456-F',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving profile data...", profileData);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">Meu Perfil</h1>
          <p className="text-xs text-slate-500">Gerencie suas informações pessoais e credenciais de acesso.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-condu-emerald hover:bg-emerald-500 text-premium-bg-dark dark:text-premium-bg-dark text-[11px] font-semibold rounded-md transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          Salvar Alterações
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Photo & Security (w-1/3) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-premium-card-light dark:bg-premium-card-dark border border-slate-200 dark:border-white/[0.06] rounded-lg p-5 flex flex-col items-center">
            <div className="relative mb-4 group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden">
                <span className="text-2xl font-black text-slate-400 dark:text-slate-600">{profileData.name.charAt(0)}</span>
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">{profileData.name}</h2>
            <p className="text-[11px] text-slate-500 font-medium">{profileData.role}</p>
            <div className="mt-4 px-3 py-1 bg-condu-emerald/10 border border-condu-emerald/20 text-condu-emerald rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3" /> Administrador Master
            </div>
          </div>

          <div className="bg-premium-card-light dark:bg-premium-card-dark border border-slate-200 dark:border-white/[0.06] rounded-lg p-5 space-y-4">
            <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4 text-slate-400" /> Segurança
            </h3>
            <button className="w-full py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/[0.06] rounded-md text-[11px] font-medium text-slate-900 dark:text-white transition-all text-left px-3">
              Alterar Senha
            </button>
            <button className="w-full py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/[0.06] rounded-md text-[11px] font-medium text-slate-900 dark:text-white transition-all text-left px-3">
              Autenticação de Dois Fatores (2FA)
            </button>
            <button className="w-full py-2 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 rounded-md text-[11px] font-medium text-red-600 dark:text-red-400 transition-all text-left px-3 mt-4">
              Encerrar Sessões Ativas
            </button>
          </div>
        </div>

        {/* Right Column: Personal Info (w-2/3) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-premium-card-light dark:bg-premium-card-dark border border-slate-200 dark:border-white/[0.06] rounded-lg p-5">
            <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2 mb-5">
              <User className="w-4 h-4 text-condu-emerald" /> Dados Pessoais
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                  <input 
                    type="text" 
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: sanitizeInput(e.target.value)})}
                    className="w-full pl-8 pr-3 py-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">E-mail Corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                  <input 
                    type="email" 
                    value={profileData.email}
                    disabled
                    className="w-full pl-8 pr-3 py-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium opacity-70 cursor-not-allowed outline-none text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Telefone Celular</label>
                <div className="relative">
                  <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                  <input 
                    type="text" 
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: sanitizeInput(e.target.value)})}
                    className="w-full pl-8 pr-3 py-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CRECI / Registro (Opcional)</label>
                <div className="relative">
                  <Building2 className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                  <input 
                    type="text" 
                    value={profileData.creci}
                    onChange={(e) => setProfileData({...profileData, creci: sanitizeInput(e.target.value)})}
                    className="w-full pl-8 pr-3 py-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
