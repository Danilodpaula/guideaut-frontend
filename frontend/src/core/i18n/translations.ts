// ============================================================
// 🌐 TRADUÇÕES INTERNACIONAIS (i18n)
// ============================================================
// Este arquivo define o **dicionário de traduções** multilíngue
// da aplicação GuideAut, atualmente suportando:
//
// 🇧🇷 Português (pt-BR)
// 🇺🇸 Inglês (en-US)
//
// Cada seção contém textos reutilizáveis, organizados por contexto
// (ex: auth, common, nav, users, accessibility, etc.).
// ============================================================

export const translations = {
  // ------------------------------------------------------------
  // 🇧🇷 Português (Brasil)
  // ------------------------------------------------------------
  "pt-BR": {
    // 🌍 Comum
    common: {
      loading: "Carregando...",
      save: "Salvar",
      cancel: "Cancelar",
      delete: "Excluir",
      edit: "Editar",
      search: "Buscar",
      filter: "Filtrar",
      export: "Exportar",
      import: "Importar",
      actions: "Ações",
      confirm: "Confirmar",
      back: "Voltar",
      next: "Próximo",
      previous: "Anterior",
      close: "Fechar",
      skipToContent: "Pular para o conteúdo",
    },

    // 🧭 Navegação
    nav: {
      home: "Início",
      help: "Ajuda",
      search: "Busca",
      settings: "Configurações",
      profile: "Perfil",
      logout: "Sair",
      administration: "Administração",
      users: "Usuários",
      roles: "Papéis",
      categories: "Categorias",
      audit: "Auditoria",
      importData: "Importar Dados",
      accessibility: "Acessibilidade",
      proaut: "Processo ProAut",
      recommendations: "Recomendações",
      patterns: "Padrões de Design",
      artifacts: "Artefatos",
    },

    // 🔐 Autenticação
    auth: {
      login: "Entrar",
      signup: "Cadastrar",
      forgotPassword: "Esqueci minha senha",
      email: "E-mail",
      password: "Senha",
      confirmPassword: "Confirmar senha",
      name: "Nome",
      logout: "Sair",
      loginSuccess: "Login realizado com sucesso!",
      invalidCredentials: "Credenciais inválidas",
      namePlaceholder: "Seu nome completo",
      createAccount: "Criar nova conta",
      alreadyHaveAccount: "Já tem uma conta?",
      passwordsDoNotMatch: "As senhas não coincidem",
      passwordTooShort: "A senha deve ter no mínimo 6 caracteres",
      signupSuccess: "Conta criada com sucesso!",
      signupError: "Erro ao criar conta",
      emailAlreadyExists: "Este e-mail já está cadastrado",
      continueAsGuest: "Acessar como visitante",
      continueAsGuestMessage: "Navegando como visitante!",
    },

    // ♿ Acessibilidade
    accessibility: {
      title: "Preferências de Acessibilidade",
      theme: "Tema",
      themeLight: "Claro",
      themeDark: "Escuro",
      fontSize: "Tamanho da fonte",
      fontSizeSmall: "Pequena",
      fontSizeMedium: "Média",
      fontSizeLarge: "Grande",
      reduceMotion: "Reduzir animações",
      settingsSaved: "Preferências salvas com sucesso",
    },

    // 👥 Administração - Usuários
    users: {
      title: "Gerenciar Usuários",
      createUser: "Criar Usuário",
      editUser: "Editar Usuário",
      filterByStatus: "Filtrar por status",
      filterByRole: "Filtrar por papel",
      status: "Status",
      roles: "Papéis",
      pending: "Pendente",
      active: "Ativo",
      blocked: "Bloqueado",
      archived: "Arquivado",
      activate: "Ativar",
      block: "Bloquear",
      archive: "Arquivar",
      resetPassword: "Resetar senha",
      userCreated: "Usuário criado com sucesso",
      userUpdated: "Usuário atualizado com sucesso",
      userActivated: "Usuário ativado",
      userBlocked: "Usuário bloqueado",
      userArchived: "Usuário arquivado",
      passwordReset: "Senha resetada",
    },

    // ⚙️ Administração - Papéis
    roles: {
      title: "Gerenciar Papéis",
      createRole: "Criar Papel",
      editRole: "Editar Papel",
      permissions: "Permissões",
      roleCreated: "Papel criado com sucesso",
      roleUpdated: "Papel atualizado com sucesso",
      roleDeleted: "Papel excluído",
    },

    // 🗂️ Administração - Categorias
    categories: {
      title: "Gerenciar Categorias",
      createCategory: "Criar Categoria",
      editCategory: "Editar Categoria",
      categoryName: "Nome da categoria",
      categoryCreated: "Categoria criada com sucesso",
      categoryUpdated: "Categoria atualizada com sucesso",
      categoryArchived: "Categoria arquivada",
    },

    // 🧾 Administração - Auditoria
    audit: {
      title: "Auditoria",
      event: "Evento",
      user: "Usuário",
      timestamp: "Data/Hora",
      details: "Detalhes",
      filterByPeriod: "Filtrar por período",
      filterByUser: "Filtrar por usuário",
      filterByEvent: "Filtrar por evento",
      exportCSV: "Exportar CSV",
      exportJSON: "Exportar JSON",
      startDate: "Data inicial",
      endDate: "Data final",
    },

    // 📦 Administração - Importação de dados
    importData: {
      title: "Importar Dados",
      uploadFile: "Fazer upload de arquivo",
      supportedFormats: "Formatos suportados: CSV, XLSX",
      preview: "Prévia",
      validation: "Validação",
      errors: "Erros",
      warnings: "Avisos",
      lineColumn: "Linha/Coluna",
      message: "Mensagem",
      confirmImport: "Confirmar importação",
      importSuccess: "Dados importados com sucesso",
      importError: "Erro na importação",
      validationErrors: "Corrija os erros antes de importar",
    },

    // 📄 Páginas do sistema
    pages: {
      notFound: "Página não encontrada",
      forbidden: "Acesso negado",
      forbiddenMessage: "Você não tem permissão para acessar esta página",
      terms: "Termos de Uso",
      acceptTerms: "Aceitar Termos",
      termsRequired: "Você deve aceitar os termos para continuar",
      termsAccepted: "Termos aceitos",
    },
    footer: {
      privacyPolicy: "Política de Privacidade",
      rightsReserved: "Todos os direitos reservados.",
      institutional:
        "Desenvolvido pela turma de Engenharia de Software da Universidade do Estado do Amazonas (UEA), no período 2025/2, sob orientação da Professora Áurea Hiléia da Silva Melo.",
    },
  },

  // ------------------------------------------------------------
  // 🇺🇸 English (United States)
  // ------------------------------------------------------------
  "en-US": {
    // 🌍 Common
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      search: "Search",
      filter: "Filter",
      export: "Export",
      import: "Import",
      actions: "Actions",
      confirm: "Confirm",
      back: "Back",
      next: "Next",
      previous: "Previous",
      close: "Close",
      skipToContent: "Skip to content",
    },

    // 🧭 Navigation
    nav: {
      home: "Home",
      help: "Help",
      search: "Search",
      settings: "Settings",
      profile: "Profile",
      logout: "Logout",
      administration: "Administration",
      users: "Users",
      roles: "Roles",
      categories: "Categories",
      audit: "Audit",
      importData: "Import Data",
      accessibility: "Accessibility",
      proaut: "ProAut Process",
      recommendations: "Recommendations",
      patterns: "Design Patterns",
      artifacts: "Artifacts",
    },

    // 🔐 Auth
    auth: {
      login: "Login",
      signup: "Sign Up",
      forgotPassword: "Forgot password",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      name: "Name",
      logout: "Logout",
      loginSuccess: "Login successful!",
      invalidCredentials: "Invalid credentials",
      namePlaceholder: "Your full name",
      createAccount: "Create new account",
      alreadyHaveAccount: "Already have an account?",
      passwordsDoNotMatch: "Passwords do not match",
      passwordTooShort: "Password must be at least 6 characters",
      signupSuccess: "Account created successfully!",
      signupError: "Error creating account",
      emailAlreadyExists: "This email is already registered",
      continueAsGuest: "Continue as guest",
      continueAsGuestMessage: "Browsing as a guest!",
    },

    // ♿ Accessibility
    accessibility: {
      title: "Accessibility Preferences",
      theme: "Theme",
      themeLight: "Light",
      themeDark: "Dark",
      fontSize: "Font size",
      fontSizeSmall: "Small",
      fontSizeMedium: "Medium",
      fontSizeLarge: "Large",
      reduceMotion: "Reduce motion",
      settingsSaved: "Preferences saved successfully",
    },

    // 👥 Admin - Users
    users: {
      title: "Manage Users",
      createUser: "Create User",
      editUser: "Edit User",
      filterByStatus: "Filter by status",
      filterByRole: "Filter by role",
      status: "Status",
      roles: "Roles",
      pending: "Pending",
      active: "Active",
      blocked: "Blocked",
      archived: "Archived",
      activate: "Activate",
      block: "Block",
      archive: "Archive",
      resetPassword: "Reset password",
      userCreated: "User created successfully",
      userUpdated: "User updated successfully",
      userActivated: "User activated",
      userBlocked: "User blocked",
      userArchived: "User archived",
      passwordReset: "Password reset",
    },

    // ⚙️ Admin - Roles
    roles: {
      title: "Manage Roles",
      createRole: "Create Role",
      editRole: "Edit Role",
      permissions: "Permissions",
      roleCreated: "Role created successfully",
      roleUpdated: "Role updated successfully",
      roleDeleted: "Role deleted",
    },

    // 🗂️ Admin - Categories
    categories: {
      title: "Manage Categories",
      createCategory: "Create Category",
      editCategory: "Edit Category",
      categoryName: "Category name",
      categoryCreated: "Category created successfully",
      categoryUpdated: "Category updated successfully",
      categoryArchived: "Category archived",
    },

    // 🧾 Admin - Audit
    audit: {
      title: "Audit",
      event: "Event",
      user: "User",
      timestamp: "Timestamp",
      details: "Details",
      filterByPeriod: "Filter by period",
      filterByUser: "Filter by user",
      filterByEvent: "Filter by event",
      exportCSV: "Export CSV",
      exportJSON: "Export JSON",
      startDate: "Start date",
      endDate: "End date",
    },

    // 📦 Admin - Import
    importData: {
      title: "Import Data",
      uploadFile: "Upload file",
      supportedFormats: "Supported formats: CSV, XLSX",
      preview: "Preview",
      validation: "Validation",
      errors: "Errors",
      warnings: "Warnings",
      lineColumn: "Line/Column",
      message: "Message",
      confirmImport: "Confirm import",
      importSuccess: "Data imported successfully",
      importError: "Import error",
      validationErrors: "Fix errors before importing",
    },

    // 📄 Pages
    pages: {
      notFound: "Page not found",
      forbidden: "Access denied",
      forbiddenMessage: "You don't have permission to access this page",
      terms: "Terms of Service",
      acceptTerms: "Accept Terms",
      termsRequired: "You must accept the terms to continue",
      termsAccepted: "Terms accepted",
    },
    footer: {
  privacyPolicy: "Privacy Policy",
  rightsReserved: "All rights reserved.",
  institutional:
    "Developed by the Software Engineering class at the State University of Amazonas (UEA), in the 2025/2 term, under the supervision of Professor Áurea Hiléia da Silva Melo.",
},

  },
} as const;

// ------------------------------------------------------------
// 🔠 Tipagens auxiliares
// ------------------------------------------------------------
// `Language` → retorna os idiomas disponíveis
// `TranslationKey` → retorna as chaves de tradução base (nível 1)
export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations["pt-BR"];