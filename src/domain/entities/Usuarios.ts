interface Usuarios {
  id?: string;
  username: string;
  employee_number: string;
  department: string;
  password: string;
  role: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

export default Usuarios;
