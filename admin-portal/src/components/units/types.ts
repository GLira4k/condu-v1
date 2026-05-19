export interface Resident {
  id: string;
  name: string;
  type: 'proprietário' | 'inquilino';
  startDate: string;
  endDate?: string;
  active: boolean;
  reason?: string;
  document?: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  color: string;
  brand: string;
}

export interface Pet {
  id: string;
  type: 'dog' | 'cat' | 'other';
  name: string;
  breed: string;
  size: 'small' | 'medium' | 'large';
}

export interface UnitDocument {
  id: string;
  name: string;
  type: 'contract' | 'deed' | 'inspection' | 'other' | 'art_rrt';
  date: string;
  url: string;
}

export interface Reform {
  id: string;
  description: string;
  responsibleName: string;
  responsibleId: string; // ART or RRT
  startDate: string;
  endDate?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}

export interface Unit {
  id: string;
  block: string;
  number: string;
  floor: string;
  status: 'ocupado' | 'vazio' | 'manutenção' | 'reforma';
  owner: string;
  tenant?: string;
  history: Resident[];
  
  // New Enhanced Fields
  hasFinancialIssue?: boolean;
  isPCD?: boolean;
  vehicles: Vehicle[];
  pets: Pet[];
  documents: UnitDocument[];
  reforms: Reform[];
}
