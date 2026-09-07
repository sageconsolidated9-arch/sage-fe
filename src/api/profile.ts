import {
  useProtectedGet,
  useProtectedPatch,
  useProtectedPost,
} from "../hooks/useProtectedApi";
import type {
  ProfileResponse,
  UpdateProfileDto,
  ActivityResponse,
  NotificationsResponse,
  UpdateNotificationsDto,
  PreferencesResponse,
  UpdatePreferencesDto,
  SessionResponse,
  RevokeSessionDto,
  RevokeSessionResponse,
} from "../types/endpoit-type";
import { endpoints, keys } from "./endpoints";

// ─── Profile ──────────────────────────────────────────────────────────────────

export const useUserProfile = () =>
  useProtectedGet<ProfileResponse>(keys.profile.me, endpoints.profile.me);

export const useUpdateProfile = () =>
  useProtectedPatch<ProfileResponse, UpdateProfileDto>(endpoints.profile.me);

// ─── Activity ─────────────────────────────────────────────────────────────────

export const useUserActivity = () =>
  useProtectedGet<ActivityResponse>(
    keys.profile.activity,
    endpoints.profile.activity,
  );

// ─── Notifications ────────────────────────────────────────────────────────────

export const useUserNotifications = () =>
  useProtectedGet<NotificationsResponse>(
    keys.profile.notifications,
    endpoints.profile.notifications,
  );

export const useUpdateNotifications = () =>
  useProtectedPatch<NotificationsResponse, UpdateNotificationsDto>(
    endpoints.profile.notifications,
  );

// ─── Preferences ──────────────────────────────────────────────────────────────

export const useUserPreferences = () =>
  useProtectedGet<PreferencesResponse>(
    keys.profile.preferences,
    endpoints.profile.preferences,
  );

export const useUpdatePreferences = () =>
  useProtectedPatch<PreferencesResponse, UpdatePreferencesDto>(
    endpoints.profile.preferences,
  );

// ─── Sessions ─────────────────────────────────────────────────────────────────

export const useUserSessions = () =>
  useProtectedGet<SessionResponse>(
    keys.profile.sessions,
    endpoints.profile.sessions,
  );

export const useRevokeSession = () =>
  useProtectedPost<RevokeSessionResponse, RevokeSessionDto>(
    endpoints.profile.revokeSession,
  );
