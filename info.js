/**
 * info.js
 * Arquivo de configuração de acesso ao sistema CDC Stock.
 * 
 * IMPORTANTE:
 * 1. Mantenha este arquivo fora do controle de versão (ex: adicione ao .gitignore)
 * 2. Em produção, substitua por autenticação real (Firebase Auth, JWT, etc.)
 * 3. Nunca exponha senhas em repositórios públicos.
 */

const ACCESS_CONFIG = {
  users: [
    {
      username: 'Ericlm',
      password: 'Evo@1989', // Senha forte, manter em produção com criptografia
      role: 'admin'
    },
    {
      username: 'Edmar',
      password: 'Admin@2023', // Senha mais forte
      role: 'admin'
    },
    {
      username: 'T1',
      password: 'Op1@2026', // Senha única
      role: 'operador'
    },
    {
      username: 'T2',
      password: 'Op2@2026', // Senha única
      role: 'operador'
    },
    {
      username: 'T3',
      password: 'Op3@2026', // Senha única
      role: 'operador'
    }
  ],

  loginErrorMessage: 'Usuário ou senha incorretos!',

  sessionTimeout: 60 * 60 * 1000 // 1 hora
};


export default ACCESS_CONFIG;

