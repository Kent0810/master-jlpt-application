export type ThemePref = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export function resolveTheme(
  pref: ThemePref,
  systemPrefersDark: boolean,
): ResolvedTheme {
  if (pref === "light") return "light";
  if (pref === "dark") return "dark";
  return systemPrefersDark ? "dark" : "light";
}
