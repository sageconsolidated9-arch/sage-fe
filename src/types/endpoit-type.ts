export interface RegisterDto {
  company_name: string;
  email: string;
  first_name: string;
  industry_id: string;
  last_name: string;
  password: string;
  time_zone: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface VerifyDto {
  email: string;
}
export interface EmailVerifyDto {
  token: string;
}

export interface LoginResponse {
  message?: string;
  user?: { id: number; email: string; name: string };
}

export interface VerifyResponse {
  message?: string;
  success?: string;
}

// ─── Types ──────────────────────────────────────────────────────────────────
// types/endpoit-type.ts
export interface UpdateProfileDto {
  avatar_url?: string;
  full_name?: string;
}

export interface UpdateProfileResponse {
  message?: string;
  success?: boolean;
}

export interface CustomRole {
  created_at: string;
  description: string;
  id: string;
  is_system_role: boolean;
  name: string;
  permission_groups: string[];
  permissions: string[];
  updated_at: string;
}

export interface GetCustomRolesResponse {
  data: CustomRole[];
  message?: string;
  success: boolean;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  organization_id: string;
  organization_name: string;
  last_login_at: string;
  created_at: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  resource: string;
  timestamp: string;
  ip_address?: string;
  user_agent?: string;
}

export interface NotificationSettings {
  email_enabled: boolean;
  push_enabled: boolean;
  sms_enabled: boolean;
  alert_types: string[];
  digest_frequency: "immediate" | "daily" | "weekly";
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  sidebar_collapsed: boolean;
  timezone: string;
  date_format: string;
}

export interface SessionInfo {
  id: string;
  device: string;
  browser: string;
  ip_address: string;
  location: string;
  created_at: string;
  last_active_at: string;
  is_current: boolean;
}

// ─── Response Types ────────────────────────────────────────────────────────

export interface ProfileResponse {
  data: Profile;
  message?: string;
  success: boolean;
}

export interface ActivityResponse {
  data: ActivityItem[];
  message?: string;
  success: boolean;
}

export interface NotificationsResponse {
  data: NotificationSettings;
  message?: string;
  success: boolean;
}

export interface PreferencesResponse {
  data: UserPreferences;
  message?: string;
  success: boolean;
}

export interface SessionResponse {
  data: SessionInfo[];
  message?: string;
  success: boolean;
}

export interface RevokeSessionResponse {
  message?: string;
  success: boolean;
}

// ─── DTOs ───────────────────────────────────────────────────────────────────

export interface UpdateProfileDto {
  full_name?: string;
  avatar_url?: string;
  time_zone?: string;
}

export interface UpdateNotificationsDto {
  email_enabled?: boolean;
  push_enabled?: boolean;
  sms_enabled?: boolean;
  alert_types?: string[];
  digest_frequency?: "immediate" | "daily" | "weekly";
}

export interface UpdatePreferencesDto {
  theme?: "light" | "dark" | "system";
  language?: string;
  sidebar_collapsed?: boolean;
  timezone?: string;
  date_format?: string;
}

export interface RevokeSessionDto {
  session_id: string;
}
