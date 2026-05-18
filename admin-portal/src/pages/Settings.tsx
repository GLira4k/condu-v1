import React, { useState } from 'react';
import { 
  Building2, 
  Palette, 
  Upload, 
  Save, 
  Globe, 
  MapPin, 
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { sanitizeInput } from '../utils/sanitizeInput';

export const SettingsPage: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState('#10B981');
  const [secondaryColor, setSecondaryColor] = useState('#3B82F6');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving settings...");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-white">Configurações & White Label</h1>
          <p className="text-xs text-slate-500">Personalização cirúrgica da identidade e regras do portal.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-condu-emerald hover:bg-emerald-500 text-[#07080a] text-[11px] font-semibold rounded-md transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          Salvar Alterações
        </button>
      </header>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: General Identity (w-2/3) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#101114] border border-white/[0.06] rounded-lg p-5 space-y-5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-condu-emerald" />
              Identidade do Condomínio
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nome do Condomínio</label>
                <input 
                  type="text" 
                  placeholder="Ex: Edifício Solar das Palmeiras"
                  className="w-full bg-[#16171d] border border-white/[0.06] rounded-md px-3 py-1.5 text-xs font-medium focus:border-slate-600 outline-none transition-all text-white placeholder:text-slate-600"
                  onChange={(e) => e.target.value = sanitizeInput(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CNPJ</label>
                <input 
                  type="text" 
                  placeholder="00.000.000/0000-00"
                  className="w-full bg-[#16171d] border border-white/[0.06] rounded-md px-3 py-1.5 text-xs font-medium focus:border-slate-600 outline-none transition-all text-white placeholder:text-slate-600"
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Endereço Completo</label>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                  <input 
                    type="text" 
                    placeholder="Rua, Número, Bairro, Cidade - UF"
                    className="w-full bg-[#16171d] border border-white/[0.06] rounded-md pl-8 pr-3 py-1.5 text-xs font-medium focus:border-slate-600 outline-none transition-all text-white placeholder:text-slate-600"
                    onChange={(e) => e.target.value = sanitizeInput(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#101114] border border-white/[0.06] rounded-lg p-5 space-y-5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-condu-emerald" />
              Funcionalidades do App
            </h3>
            
            <div className="space-y-2">
              {[
                { label: 'Habilitar Reservas Online', desc: 'Permite que moradores reservem áreas via aplicativo.', active: true },
                { label: 'Mural de Avisos Digital', desc: 'Publicações do síndico aparecem no feed do morador.', active: true },
                { label: 'Notificações Push', desc: 'Alertas automáticos para vencimentos e encomendas.', active: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-md bg-white/[0.01] border border-white/[0.04]">
                  <div>
                    <p className="text-xs font-semibold text-slate-200">{item.label}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{item.desc}</p>
                  </div>
                  <button type="button" className={`w-7 h-4 rounded-full transition-colors relative flex items-center px-0.5 ${item.active ? 'bg-condu-emerald' : 'bg-slate-700'}`}>
                    <div className={`w-3 h-3 bg-white rounded-full transition-transform ${item.active ? 'translate-x-3' : 'translate-x-0'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: White Label & Visuals (w-1/3) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#101114] border border-white/[0.06] rounded-lg p-5 space-y-5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-condu-emerald" />
              Visual & White Label
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Logo do Condomínio</label>
                <div className="border border-dashed border-white/10 rounded-md p-4 flex flex-col items-center justify-center gap-2 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/20 transition-all cursor-pointer group">
                  <Upload className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">PNG ou SVG (Max 2MB)</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cores do Sistema</label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-[#16171d] border border-white/[0.06] rounded-md px-3 py-1.5">
                    <span className="text-[11px] font-medium text-slate-400">Cor Primária</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{primaryColor}</span>
                      <input 
                        type="color" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-4 h-4 rounded-sm bg-transparent border-none cursor-pointer overflow-hidden"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-[#16171d] border border-white/[0.06] rounded-md px-3 py-1.5">
                    <span className="text-[11px] font-medium text-slate-400">Cor Secundária</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{secondaryColor}</span>
                      <input 
                        type="color" 
                        value={secondaryColor} 
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-4 h-4 rounded-sm bg-transparent border-none cursor-pointer overflow-hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/[0.02] border border-emerald-500/10 rounded-lg p-5">
            <h4 className="text-[11px] font-bold text-emerald-500 flex items-center gap-2 mb-2 uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              Domínio Customizado
            </h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Configure um subdomínio próprio (ex: portal.condopalmeiras.com.br).
            </p>
            <button type="button" className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
              Configurar Agora <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
