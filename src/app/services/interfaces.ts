export interface UserIterface {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  current_team_id: number;
  profile_photo_path: string;
  created_at: Date;
  updated_at: Date;
  evaluador_id: number;
  agencia_id: number;
  cargo_id: number;
  permisos?:[string];
  profile_photo_url: string;
  roles: RoleIterface[];
  evaluador: UserIterface;
  evaluados: UserIterface[];
  cargo: CargoIterface;
  agencia: AgenciaIterface;
}

  export interface RoleIterface {
      id: number;
      name: string;
      descripcion: string;
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

export interface MatrizIterface {
  id: number;
  nombre: string;
  evaluaciones_minimo: number;
  activo: number;
  created_at: Date;
  updated_at: Date;
  comportamientos: ComportamientoInterface[];
}
export interface EvaluacionInterface {
  id: number;
  user_id: number;
  matriz_id: number;
  sucursal_id: number;
  agencia_id: number;
  usuario_evaluador: string;
  observaciones: string;
  nota_promedio: string;
  created_at: Date;
  updated_at: Date;
  matriz: MatrizIterface;
}

export interface ComportamientoInterface {
  id: number;
  matriz_id: number;
  comportamiento: string;
  eval0: string;
  eval1: string;
  eval2: string;
  eval3: string;
  activo: number;
  created_at: Date;
  updated_at: Date;
}
