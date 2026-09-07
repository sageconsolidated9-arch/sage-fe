export const keys = {
  auth: {
    profile: ["profile"] as const,
  },
  profile: {
    me: ["profile", "me"] as const,
    activity: ["profile", "activity"] as const,
    notifications: ["profile", "notifications"] as const,
    preferences: ["profile", "preferences"] as const,
    sessions: ["profile", "sessions"] as const,
  },
  users: {
    all: ["users"] as const,
    detail: (id: string | number) => ["users", id] as const,
  },
  industries: {
    all: ["industries"] as const,
  },
  organization: {
    customRoles: {
      all: ["organization", "custom-roles"] as const,
      detail: (id: string) => ["organization", "custom-roles", id] as const,
    },
    permissionGroups: ["organization", "permission-groups"] as const,
    permissions: ["organization", "permissions"] as const,
  },
};

// ─── Endpoint URLs ────────────────────────────────────────────────────────────

export const endpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    register: "/auth/register",
    verifyEmail: "/auth/send-verification-email",
    emailVerify: "/auth/verify-email",
  },
  company: {
    invite: "/company/invite",
    industries: "/company/industries",
  },
  profile: {
    me: "/profile",
    activity: "/profile/activity",
    notifications: "/profile/notifications",
    preferences: "/profile/preferences",
    sessions: "/profile/session",
    revokeSession: "/profile/session/revoke",
  },
  organization: {
    customRoles: "/organization/custom-roles",
    customRole: (id: string) => `/organization/custom-roles/${id}`,
    permissionGroups: "/organization/permission-groups",
    permissions: "/organization/permissions",
  },
  users: {
    list: "/users",
    detail: (id: string | number) => `/users/${id}`,
    create: "/users",
    update: (id: string | number) => `/users/${id}`,
    remove: (id: string | number) => `/users/${id}`,
  },
};
