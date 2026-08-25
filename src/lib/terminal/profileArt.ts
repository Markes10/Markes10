/**
 * Builds the profile card HTML that contains the colourful ASCII
 * conversion of the real profile photo.
 */
import { getProfileAscii } from './imageToAscii';
import { getThemeColors } from './themeRegistry';

const GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim() || 'Markes10';

interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  blog: string | null;
  email: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

/**
 * Async – returns a profile card with the colourful ASCII portrait.
 */
export async function createProfileCardHTML(themeName = 'amber'): Promise<string> {
  const themeColors = getThemeColors(themeName);
  let asciiPortrait = '';
  let profile: GitHubProfile | null = null;

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}`,
    );
    if (response.ok) profile = await response.json();
  } catch {
    /* GitHub is an optional live data source. */
  }

  try {
    asciiPortrait = await getProfileAscii(26);
  } catch {
    asciiPortrait = '[profile photo unavailable]';
  }

  const name = profile?.name || profile?.login || GITHUB_USERNAME;
  const profileUrl =
    profile?.html_url || `https://github.com/${GITHUB_USERNAME}`;
  const statusText = (profile?.bio || 'STILL A STUDENT').toUpperCase();
  const detailLine1 = `https://github.com/${profile?.login || GITHUB_USERNAME}`;
  const detailLine2 = profile
    ? `${profile.public_repos} repos / ${profile.followers} followers`
    : '0 repos / 0 followers';

  const cardBg = `${themeColors.bg}CC`;
  const borderColor = `${themeColors.text}66`;
  const glowColor = themeColors.textGhost;
  const nameColor = themeColors.text;
  const accentColor = themeColors.accent;
  const detailColor = themeColors.textDim;

  return `
<div style="margin:8px 0;display:inline-block;">
  <div style="display:flex;align-items:flex-start;gap:16px;padding:14px 16px;border:1px solid ${borderColor};border-radius:12px;background:${cardBg};box-shadow:inset 0 0 0 1px ${glowColor};max-width:500px;min-width:360px;">
    <div style="flex-shrink:0;display:inline-block;width:190px;overflow:hidden;text-align:left;line-height:0.84;font-size:8px;letter-spacing:0.14px;${asciiPortrait === '[profile photo unavailable]' ? '' : `filter:drop-shadow(0 0 8px ${glowColor});`}">
${asciiPortrait}
    </div>
    <div style="display:flex;flex-direction:column;justify-content:center;min-width:0;flex:1;gap:8px;">
      <div style="font-size:22px;font-weight:700;color:${nameColor};letter-spacing:0.7px;line-height:1.1">${escapeHTML(name)}</div>
      <div style="font-size:12px;font-weight:700;color:${accentColor};letter-spacing:1px;line-height:1.2">${escapeHTML(statusText)}</div>
      <div style="display:flex;flex-direction:column;gap:4px;font-size:11px;color:${detailColor};line-height:1.5;">
        <div><span style="color:${accentColor}">•</span> ${escapeHTML(detailLine1)}</div>
        <div><span style="color:${accentColor}">•</span> ${escapeHTML(detailLine2)}</div>
      </div>
    </div>
  </div>
</div>`;
}

function escapeHTML(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Synchronous fallback (used only if async path is not available).
 */
export function createProfileArtHTML(): string {
  // This will be replaced by the async version at runtime.
  // Keeping the export so the import in Terminal.tsx boot doesn't break.
  return '';
}
