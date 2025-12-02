export const usuarioType = `
  type Usuario {
  id: String
  username: String
  employee_number: String
  department: String
  password: String
  role: String
  status: String
  created_at: String
  updated_at: String

    }

  type AuthResponse {
    token: String, 
    user: String
  }

`;
