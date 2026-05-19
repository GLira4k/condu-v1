import { BentoCard, BentoGrid } from "../components/layout/BentoGrid";
import {
  Filter,
  Key,
  Mail,
  MoreVertical,
  Plus,
  Search,
  Shield,
  ShieldCheck,
  User,
  UserX,
  Users,
  X,
} from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

const InviteMemberModal = ({
  isOpen,
  onClose,
  onInvite,
}: {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    accessLevel: "Portaria",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0b0c0e] border border-slate-200 dark:border-white/[0.08] w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-condu-emerald/10 flex items-center justify-center">
              <Plus className="w-4 h-4 text-condu-emerald" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              Convidar Colaborador
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          className="p-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onInvite(formData);
          }}
        >
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-0.5">
              Nome do Colaborador
            </label>
            <div className="relative">
              <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Ex: Roberto Lima"
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-white"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-0.5">
              E-mail Corporativo
            </label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="email"
                required
                placeholder="exemplo@condu.com.br"
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-white"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-0.5">
                Cargo
              </label>
              <input
                type="text"
                placeholder="Ex: Porteiro Diurno"
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-white"
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-0.5">
                Nível de Acesso
              </label>
              <select
                className="w-full px-2 py-1.5 bg-slate-50 dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md text-xs font-medium focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-white"
                onChange={(e) =>
                  setFormData({ ...formData, accessLevel: e.target.value })
                }
              >
                <option value="Portaria">Portaria</option>
                <option value="Operacional">Operacional</option>
                <option value="Administrativo">Administrativo</option>
              </select>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-500/[0.03] border border-emerald-500/10 mt-4">
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic text-center">
              Um convite será enviado para o e-mail informado para que o
              colaborador defina sua senha de acesso.
            </p>
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
              <Mail className="w-3.5 h-3.5" /> Enviar Convite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const TeamPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("Todos");
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Carlos Santos",
      role: "Zelador",
      email: "carlos@condu.com",
      status: "Ativo",
      accessLevel: "Operacional",
    },
    {
      id: 2,
      name: "Roberto Lima",
      role: "Porteiro (Dia)",
      email: "roberto.l@condu.com",
      status: "Ativo",
      accessLevel: "Portaria",
    },
    {
      id: 3,
      name: "João Silva",
      role: "Porteiro (Noite)",
      email: "joao.s@condu.com",
      status: "Ativo",
      accessLevel: "Portaria",
    },
    {
      id: 4,
      name: "Marina Costa",
      role: "Assistente Administrativa",
      email: "marina@condu.com",
      status: "Pendente",
      accessLevel: "Administrativo",
    },
  ]);

  const handleInvite = (data: any) => {
    const newMember = {
      id: Date.now(),
      name: data.name,
      role: data.role || "Colaborador",
      email: data.email,
      status: "Pendente",
      accessLevel: data.accessLevel,
    };
    setTeamMembers([...teamMembers, newMember]);
    setIsModalOpen(false);
  };

  const handleSuspend = (id: number) => {
    setTeamMembers(
      teamMembers.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "Suspenso" ? "Ativo" : "Suspenso" }
          : m,
      ),
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja remover este colaborador?")) {
      setTeamMembers(teamMembers.filter((m) => m.id !== id));
    }
  };

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterLevel === "Todos" || member.accessLevel === filterLevel;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
            Gestão da Equipe
          </h1>
          <p className="text-xs text-slate-500">
            Controle de acessos para porteiros, zeladores e assistentes.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-condu-emerald hover:bg-emerald-500 text-[#07080a] text-[11px] font-semibold rounded-md transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Convidar Membro
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Níveis de Acesso Widget */}
        <div className="space-y-4">
          <BentoCard title="Filtro por Acesso">
            <div className="space-y-1">
              {["Todos", "Administrativo", "Portaria", "Operacional"].map(
                (level) => (
                  <button
                    key={level}
                    onClick={() => setFilterLevel(level)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md text-[11px] font-bold transition-all border",
                      filterLevel === level
                        ? "bg-condu-emerald/10 border-condu-emerald/20 text-condu-emerald"
                        : "bg-transparent border-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5",
                    )}
                  >
                    {level}
                  </button>
                ),
              )}
            </div>
          </BentoCard>

          <BentoCard title="Níveis de Acesso (Info)">
            <div className="space-y-2">
              {[
                {
                  level: "Administrativo",
                  desc: "Acesso total, exceto configurações.",
                  users: teamMembers.filter(
                    (m) => m.accessLevel === "Administrativo",
                  ).length,
                },
                {
                  level: "Portaria",
                  desc: "Módulo de Portaria & Logística.",
                  users: teamMembers.filter((m) => m.accessLevel === "Portaria")
                    .length,
                },
                {
                  level: "Operacional",
                  desc: "Manutenção e Áreas Comuns.",
                  users: teamMembers.filter(
                    (m) => m.accessLevel === "Operacional",
                  ).length,
                },
              ].map((role, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-md bg-slate-50/50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/[0.04]"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-slate-900 dark:text-white uppercase">
                      {role.level}
                    </span>
                    <span className="text-[9px] font-bold text-slate-500">
                      {role.users}
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 leading-tight">
                    {role.desc}
                  </p>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>

        {/* Lista de Equipe */}
        <div className="lg:col-span-3">
          <div className="bg-premium-card-light dark:bg-premium-card-dark border border-slate-200 dark:border-white/[0.06] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-white/[0.06] flex justify-between items-center bg-slate-50/50 dark:bg-white/[0.01]">
              <div className="relative group flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-condu-emerald transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nome ou e-mail..."
                  className="w-full bg-white dark:bg-[#16171d] border border-slate-200 dark:border-white/[0.06] rounded-md pl-8 pr-3 py-1.5 text-xs outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-all text-slate-900 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {filteredMembers.length} Resultados
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-white/[0.01] border-b border-slate-200 dark:border-white/[0.06]">
                    <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Colaborador
                    </th>
                    <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Função
                    </th>
                    <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Acesso
                    </th>
                    <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Status
                    </th>
                    <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <tr
                        key={member.id}
                        className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0">
                              <span className="text-[11px] font-bold text-slate-400">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-900 dark:text-white">
                                {member.name}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                {member.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                            {member.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/[0.06]">
                            {member.accessLevel}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border",
                              member.status === "Ativo"
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                : member.status === "Suspenso"
                                  ? "bg-red-500/10 text-red-500 border-red-500/20"
                                  : "bg-amber-500/10 text-amber-500 border-amber-500/20",
                            )}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            {member.status === "Pendente" ? (
                              <button
                                onClick={() =>
                                  alert(
                                    `Convite reenviado para ${member.email}`,
                                  )
                                }
                                className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                title="Reenviar Convite"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  alert("Link de redefinição de senha gerado.")
                                }
                                className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                title="Redefinir Senha"
                              >
                                <Key className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => handleSuspend(member.id)}
                              className={cn(
                                "p-1.5 rounded transition-colors",
                                member.status === "Suspenso"
                                  ? "text-emerald-500 hover:bg-emerald-500/10"
                                  : "text-slate-400 hover:bg-red-500/10 hover:text-red-500",
                              )}
                              title={
                                member.status === "Suspenso"
                                  ? "Reativar Acesso"
                                  : "Suspender Acesso"
                              }
                            >
                              {member.status === "Suspenso" ? (
                                <ShieldCheck className="w-3.5 h-3.5" />
                              ) : (
                                <UserX className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(member.id)}
                              className="p-1.5 hover:bg-red-500/10 rounded text-slate-400 hover:text-red-500 transition-colors"
                              title="Remover Colaborador"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center">
                        <Users className="w-8 h-8 text-slate-200 dark:text-slate-800 mx-auto mb-2" />
                        <p className="text-xs font-medium text-slate-500">
                          Nenhum colaborador encontrado.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <InviteMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInvite={handleInvite}
      />
    </div>
  );
};
