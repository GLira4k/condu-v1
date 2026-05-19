import { CheckCircle2, Clock, Megaphone, MessageSquare, MoreVertical, Pin, Plus, Trash2, X } from "lucide-react";

import { BentoCard } from "@/components/layout/BentoGrid";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Comment {
  id: number;
  user: string;
  text: string;
  date: string;
}

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
  pinned: boolean;
  comments: Comment[];
}

const CommentSection = ({ notice, onClose, onAddComment }: { notice: Notice, onClose: () => void, onAddComment: (text: string) => void }) => {
  const [newComment, setNewComment] = useState('');

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-end bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#0b0c0e] border-l border-slate-200 dark:border-white/[0.08] w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="p-4 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.01]">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[250px]">{notice.title}</h3>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Comentários e Feedbacks</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-200 dark:hover:bg-white/5 rounded-md text-slate-400 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {notice.comments.length > 0 ? notice.comments.map((comment) => (
            <div key={comment.id} className="group">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[11px] font-bold text-condu-emerald">{comment.user}</span>
                <span className="text-[9px] text-slate-500">{comment.date}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04] text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {comment.text}
              </div>
            </div>
          )) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <MessageSquare className="w-8 h-8 text-slate-300 mb-2" />
              <p className="text-xs font-medium text-slate-500">Nenhum comentário ainda.</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-white/[0.06] bg-white dark:bg-[#0b0c0e]">
          <form 
            onSubmit={(e) => { e.preventDefault(); if(newComment.trim()) { onAddComment(newComment); setNewComment(''); } }}
            className="flex flex-col gap-2"
          >
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva uma resposta oficial..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-white resize-none"
              rows={3}
            />
            <button 
              type="submit"
              disabled={!newComment.trim()}
              className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-[#07080a] rounded-md text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50"
            >
              Responder como Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const DirectChannelModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0b0c0e] border border-slate-200 dark:border-white/[0.08] w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {!sent ? (
          <>
            <div className="p-4 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-condu-emerald/10 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-condu-emerald" />
                </div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">Canal Direto - Suporte</h2>
              </div>
              <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form className="p-5 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-0.5">Assunto / Motivo</label>
                <select className="w-full px-2 py-2 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-white">
                  <option>Problema Técnico no Portal</option>
                  <option>Sugestão de Melhoria</option>
                  <option>Dúvida Administrativa</option>
                  <option>Denúncia Ética (Anônima)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-0.5">Sua Mensagem</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Descreva detalhadamente sua solicitação..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-white resize-none"
                />
              </div>
              <button type="submit" className="w-full py-2.5 bg-condu-emerald text-[#07080a] rounded-md text-[11px] font-bold uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-sm">
                Enviar para Administração
              </button>
            </form>
          </>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Mensagem Enviada!</h3>
              <p className="text-[11px] text-slate-500 mt-1">Sua solicitação foi encaminhada para o módulo de **Manutenção & Obras** e será analisada em breve.</p>
            </div>
            <button onClick={onClose} className="w-full py-2 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-md text-[11px] font-bold uppercase tracking-widest">
              Fechar Janela
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const NoticeModal = ({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Geral',
    pinned: false
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0b0c0e] border border-slate-200 dark:border-white/[0.08] w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-condu-emerald/10 flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-condu-emerald" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">Publicar Novo Aviso</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form className="p-5 space-y-4" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-0.5">Título do Aviso</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Manutenção dos Elevadores"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-white"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-0.5">Conteúdo do Informativo</label>
            <textarea 
              required
              rows={4}
              placeholder="Descreva aqui os detalhes do aviso para os moradores..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-white resize-none"
              onChange={(e) => setFormData({...formData, content: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-0.5">Categoria</label>
              <select 
                className="w-full px-2 py-2 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-white"
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Manutenção">Manutenção</option>
                <option value="Evento">Evento</option>
                <option value="Social">Social</option>
                <option value="Geral">Geral</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input 
                type="checkbox" 
                id="pinned"
                className="w-3 h-3 rounded border-slate-300 text-condu-emerald focus:ring-condu-emerald"
                onChange={(e) => setFormData({...formData, pinned: e.target.checked})}
              />
              <label htmlFor="pinned" className="text-[11px] font-medium text-slate-600 dark:text-slate-400 cursor-pointer">Fixar no Topo</label>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors uppercase tracking-widest border border-slate-200 dark:border-white/[0.06] rounded-md"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 py-2 text-xs font-bold bg-condu-emerald text-[#07080a] rounded-md hover:bg-emerald-500 transition-all uppercase tracking-widest shadow-sm flex items-center justify-center gap-2"
            >
              <Megaphone className="w-3.5 h-3.5" /> Publicar Agora
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const NoticesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [selectedNoticeForComments, setSelectedNoticeForComments] = useState<Notice | null>(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [notices, setNotices] = useState<Notice[]>([
    { 
      id: 1,
      title: 'Manutenção Preventiva dos Elevadores', 
      content: 'Informamos que amanhã, das 09:00 às 12:00, os elevadores do Bloco A passarão por manutenção preventiva periódica.',
      date: 'Postado há 2 horas',
      category: 'Manutenção',
      pinned: true,
      comments: [
        { id: 1, user: 'João (Apto 101)', text: 'Isso vai afetar os dois elevadores ao mesmo tempo?', date: 'Há 1 hora' },
        { id: 2, user: 'Síndico', text: 'Olá João, apenas um por vez para não isolar o andar.', date: 'Há 45 min' }
      ]
    },
    { 
      id: 2,
      title: 'Assembleia Geral Extraordinária', 
      content: 'Convocamos todos os moradores para a assembleia que ocorrerá no dia 30/05 às 19:30 no salão de festas para votação do novo sistema de segurança.',
      date: 'Postado ontem',
      category: 'Evento',
      pinned: false,
      comments: [
        { id: 3, user: 'Maria (Apto 402)', text: 'Poderemos participar via Zoom também?', date: 'Há 5 horas' }
      ]
    },
    { 
      id: 3,
      title: 'Campanha de Vacinação Pet', 
      content: 'No próximo sábado teremos uma equipe de vacinação no pátio central das 08:00 às 14:00. Não esqueça a carteirinha do seu pet.',
      date: 'Postado há 3 dias',
      category: 'Social',
      pinned: false,
      comments: []
    },
  ]);

  const handleSave = (data: any) => {
    const newNotice: Notice = {
      id: Date.now(),
      title: data.title,
      content: data.content,
      category: data.category,
      pinned: data.pinned,
      date: 'Postado agora mesmo',
      comments: []
    };
    setNotices([newNotice, ...notices]);
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja remover este aviso?')) {
      setNotices(notices.filter(n => n.id !== id));
    }
  };

  const handleTogglePin = (id: number) => {
    setNotices(notices.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  const handleAddComment = (noticeId: number, text: string) => {
    const updatedNotices = notices.map(n => {
      if (n.id === noticeId) {
        const newCommentObj = { id: Date.now(), user: 'Síndico', text, date: 'Agora mesmo' };
        return { ...n, comments: [...n.comments, newCommentObj] };
      }
      return n;
    });
    setNotices(updatedNotices);
    // Atualiza o notice selecionado para refletir no painel lateral aberto
    const updatedSelected = updatedNotices.find(n => n.id === noticeId);
    if (updatedSelected) setSelectedNoticeForComments(updatedSelected);
  };

  const filteredNotices = notices
    .filter(n => activeCategory === 'Todos' || n.category === activeCategory)
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">Mural de Avisos</h1>
          <p className="text-xs text-slate-500">Comunicações oficiais e informativos para os moradores.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-condu-emerald hover:bg-emerald-500 text-premium-bg-dark dark:text-premium-bg-dark text-[11px] font-semibold rounded-md transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Novo Aviso
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          {/* Categorias / Filtros Rápidos */}
          <div className="flex gap-2 mb-2 overflow-x-auto pb-2 custom-scrollbar">
            {['Todos', 'Manutenção', 'Evento', 'Social', 'Geral'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all whitespace-nowrap",
                  activeCategory === cat
                    ? "bg-condu-emerald border-condu-emerald text-[#07080a]"
                    : "bg-transparent border-slate-200 dark:border-white/10 text-slate-500 hover:border-slate-300 dark:hover:border-white/20"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredNotices.length > 0 ? filteredNotices.map((notice) => (
              <div key={notice.id} className={cn(
                "bg-premium-card-light dark:bg-premium-card-dark p-4 rounded-lg border relative group hover:shadow-sm transition-all",
                notice.pinned ? "border-emerald-500/30 dark:border-emerald-500/20" : "border-slate-200 dark:border-white/[0.06]"
              )}>
                {notice.pinned && (
                  <div className="absolute top-4 right-4 text-emerald-500">
                    <Pin className="w-3 h-3 fill-current" />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-600 dark:text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                    {notice.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{notice.date}</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">{notice.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{notice.content}</p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setSelectedNoticeForComments(notice)}
                      className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-medium">{notice.comments.length} Comentários</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleTogglePin(notice.id)}
                      className={cn(
                        "p-1.5 rounded-md transition-all",
                        notice.pinned ? "text-emerald-500 hover:bg-emerald-500/10" : "text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                      )}
                      title={notice.pinned ? "Desafixar" : "Fixar no Topo"}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(notice.id)}
                      className="p-1.5 rounded-md hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="py-20 text-center bg-premium-card-light dark:bg-premium-card-dark rounded-lg border border-dashed border-slate-200 dark:border-white/10">
                <Megaphone className="w-10 h-10 text-slate-200 dark:text-slate-800 mx-auto mb-3" />
                <p className="text-xs font-medium text-slate-500">Nenhum aviso encontrado nesta categoria.</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <BentoCard title="Destaques">
            <div className="space-y-3">
              <div className="p-3 rounded-md bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-1.5 text-emerald-500 mb-1.5 font-bold text-[10px] uppercase tracking-wider">
                  <Megaphone className="w-3 h-3" /> URGENTE
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 font-medium leading-relaxed">Vazamento na rede principal do Bloco C sendo reparado.</p>
              </div>
              
              <div className="p-3 rounded-md bg-amber-500/5 border border-amber-500/10">
                <div className="flex items-center gap-1.5 text-amber-500 mb-1.5 font-bold text-[10px] uppercase tracking-wider">
                  <Clock className="w-3 h-3" /> LEMBRETE
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 font-medium leading-relaxed">Vencimento do condomínio dia 10.</p>
              </div>
            </div>
          </BentoCard>

          <div className="bg-premium-card-light dark:bg-premium-card-dark border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 space-y-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Canal Direto</h3>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">Problemas técnicos ou sugestões? Fale com a administração.</p>
            <button 
              onClick={() => setIsTicketOpen(true)}
              className="w-full py-1.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.06] rounded-md font-semibold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-[11px]"
            >
              Abrir Chamado
            </button>
          </div>
        </div>
      </div>

      <NoticeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      <DirectChannelModal 
        isOpen={isTicketOpen}
        onClose={() => setIsTicketOpen(false)}
      />

      {selectedNoticeForComments && (
        <CommentSection 
          notice={selectedNoticeForComments}
          onClose={() => setSelectedNoticeForComments(null)}
          onAddComment={(text) => handleAddComment(selectedNoticeForComments.id, text)}
        />
      )}
    </div>
  );
};
