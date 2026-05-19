import { BentoCard, BentoGrid } from '../components/layout/BentoGrid';
import {
  Download,
  FileText,
  Files,
  Folder,
  History,
  MoreVertical,
  Plus,
  Search,
  Shield,
  Trash2,
  Upload,
  X
} from 'lucide-react';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import { FileUpload } from '../components/ui/FileUpload';

const UploadModal = ({ isOpen, onClose, onUpload }: { isOpen: boolean, onClose: () => void, onUpload: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Assembleia'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0b0c0e] border border-slate-200 dark:border-white/[0.08] w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-condu-emerald/10 flex items-center justify-center">
              <Upload className="w-4 h-4 text-condu-emerald" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">Upload de Documento</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form className="p-5 space-y-5" onSubmit={(e) => { e.preventDefault(); onUpload({...formData, file: selectedFile}); }}>
          <FileUpload 
            label="Arquivo do Documento"
            onFileSelect={(file) => {
              setSelectedFile(file);
              if (!formData.name) setFormData({...formData, name: file.name.split('.')[0]});
            }} 
          />

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-0.5">Nome de Exibição</label>
              <input 
                type="text" 
                required
                value={formData.name}
                placeholder="Ex: Ata Assembleia Geral Ordinária"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-white"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-0.5">Categoria</label>
              <select 
                className="w-full px-2 py-2 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-white"
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="Assembleia">Assembleias & Atas</option>
                <option value="Financeiro">Financeiro & Contas</option>
                <option value="Regimento">Regimento Interno</option>
                <option value="Projetos">Plantas & Projetos</option>
                <option value="Segurança">Seguros & Laudos</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors uppercase tracking-widest border border-slate-200 dark:border-white/[0.06] rounded-md"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              disabled={!selectedFile}
              className="flex-1 py-2.5 text-xs font-bold bg-condu-emerald text-[#07080a] rounded-md hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-widest shadow-sm flex items-center justify-center gap-2"
            >
              <Upload className="w-3.5 h-3.5" /> Salvar Arquivo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const DocumentsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Ata Assembleia Geral - Maio 2026.pdf', size: '1.2 MB', date: 'Há 2 dias', type: 'Assembleia' },
    { id: 2, name: 'Prestação de Contas - Abril 2026.zip', size: '15.4 MB', date: 'Há 5 dias', type: 'Financeiro' },
    { id: 3, name: 'Regulamento Piscina - Revisão 2.pdf', size: '450 KB', date: 'Há 12 dias', type: 'Regimento' },
    { id: 4, name: 'Laudo Técnico Para-raios.pdf', size: '2.8 MB', date: 'Há 20 dias', type: 'Segurança' },
    { id: 5, name: 'Circular 05/2026 - Mudança de Zeladoria.pdf', size: '120 KB', date: 'Há 1 mês', type: 'Circular' },
    { id: 6, name: 'Planta Baixa - Hidráulica Bloco A.dwg', size: '8.5 MB', date: 'Há 2 meses', type: 'Projetos' },
    { id: 7, name: 'Apólice Seguro Predial 2026.pdf', size: '3.1 MB', date: 'Há 3 meses', type: 'Segurança' },
  ]);

  const categories = [
    { name: 'Todos', type: 'Todos', icon: Files },
    { name: 'Assembleias & Atas', type: 'Assembleia', count: documents.filter(d => d.type === 'Assembleia').length, icon: FileText },
    { name: 'Financeiro & Contas', type: 'Financeiro', count: documents.filter(d => d.type === 'Financeiro').length, icon: History },
    { name: 'Regimento Interno', type: 'Regimento', count: documents.filter(d => d.type === 'Regimento').length, icon: Shield },
    { name: 'Plantas & Projetos', type: 'Projetos', count: documents.filter(d => d.type === 'Projetos').length, icon: Folder },
    { name: 'Seguros & Laudos', type: 'Segurança', count: documents.filter(d => d.type === 'Segurança').length, icon: Shield },
  ];

  const handleUpload = (data: any) => {
    const newDoc = {
      id: Date.now(),
      name: `${data.name}.pdf`,
      size: '1.0 MB',
      date: 'Agora mesmo',
      type: data.type
    };
    setDocuments([newDoc, ...documents]);
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este documento?')) {
      setDocuments(documents.filter(d => d.id !== id));
    }
  };

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || doc.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedDocs = showAll ? filteredDocs : filteredDocs.slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">Documentação & Transparência</h1>
          <p className="text-xs text-slate-500">Repositório oficial de atas, regimentos e prestação de contas.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="text-[11px] font-medium bg-condu-emerald hover:bg-emerald-500 text-[#07080a] py-1.5 px-3 rounded-md transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Novo Documento
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Pastas e Categorias */}
        <div className="space-y-2">
          <div className="px-1 mb-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Categorias</h3>
          </div>
          {categories.map((cat, i) => (
            <button 
              key={i} 
              onClick={() => setActiveCategory(cat.type)}
              className={cn(
                "w-full flex items-center justify-between p-2.5 rounded-md border transition-all group",
                activeCategory === cat.type
                  ? "bg-condu-emerald/10 border-condu-emerald/20"
                  : "border-transparent hover:border-slate-200 dark:hover:border-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-3">
                <cat.icon className={cn(
                  "w-4 h-4 transition-colors",
                  activeCategory === cat.type ? "text-condu-emerald" : "text-slate-400 group-hover:text-condu-emerald"
                )} />
                <span className={cn(
                  "text-xs font-medium transition-colors",
                  activeCategory === cat.type ? "text-condu-emerald font-bold" : "text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                )}>{cat.name}</span>
              </div>
              {cat.count !== undefined && (
                <span className={cn(
                  "text-[10px] font-bold",
                  activeCategory === cat.type ? "text-condu-emerald" : "text-slate-400"
                )}>{cat.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Listagem de Documentos */}
        <div className="lg:col-span-3 space-y-4">
          <BentoCard title={activeCategory === 'Todos' ? "Todos os Documentos" : `Categoria: ${activeCategory}`}>
            
            <div className="mb-4 relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Pesquisar arquivo pelo nome..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md pl-8 pr-3 py-2 text-xs outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-all text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              {displayedDocs.length > 0 ? displayedDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 rounded-md border-b border-slate-100 dark:border-white/[0.04] last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded border border-slate-200 dark:border-white/[0.06] flex items-center justify-center bg-white dark:bg-[#16171d] group-hover:border-condu-emerald/30 transition-colors">
                      <FileText className="w-5 h-5 text-slate-400 group-hover:text-condu-emerald transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-condu-emerald transition-colors">{doc.name}</p>
                      <p className="text-[10px] text-slate-500">{doc.type} • {doc.size} • {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => alert(`Download iniciado: ${doc.name}`)}
                      className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(doc.id)}
                      className="p-1.5 rounded-md hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all"
                      title="Excluir Arquivo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <Folder className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-3" />
                  <p className="text-xs font-medium text-slate-500">Nenhum documento encontrado.</p>
                  <p className="text-[10px] text-slate-400 mt-1">Ajuste os filtros ou tente outra busca.</p>
                </div>
              )}
            </div>
            
            {filteredDocs.length > 5 && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/[0.04] flex justify-center">
                <button 
                  onClick={() => setShowAll(!showAll)}
                  className="text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors uppercase tracking-widest"
                >
                  {showAll ? 'Mostrar Menos' : `Ver Todos os Arquivos (${filteredDocs.length})`}
                </button>
              </div>
            )}
          </BentoCard>
        </div>
      </div>
      
      <UploadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};
