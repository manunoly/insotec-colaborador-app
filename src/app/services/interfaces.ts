

export interface UserIterface {
  id: number;
  name: string;
  email: string;
  email_verified_at?: Date;
  current_team_id: number;
  profile_photo_path: string;
  created_at: Date;
  updated_at: Date;
  evaluador_id: number;
  agencia_id: number;
  cargo_id: number;
  roles: string[];
  profile_photo_url: string;
}

  export interface RoleIterface {
      id: number;
      name: string;
  }

 export interface CargoIterface {
      id: number;
      nombre: string;
      activo: number;
      matriz_id: number;
      created_at?: any;
      updated_at?: any;
  }

  export interface EvaluadoIterface {
    id: number;
    name: string;
    email: string;
    email_verified_at?: Date;
    current_team_id?: number;
    profile_photo_path: string;
    created_at: Date;
    updated_at: Date;
    evaluador_id: number;
    agencia_id?: number;
    cargo_id?: number;
    profile_photo_url: string;
}

export interface SucursalIterface {
  id: number;
  nombre: string;
  activo: number;
  created_at: Date;
  updated_at: Date;
}

export interface AgenciaIterface {
  id: number;
  nombre: string;
  activo: number;
  sucursal_id: number;
  created_at: Date;
  updated_at: Date;
  sucursal: SucursalIterface;
}

