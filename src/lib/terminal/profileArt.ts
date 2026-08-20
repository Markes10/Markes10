/**
 * Builds the profile card HTML that contains the colourful ASCII
 * conversion of the real profile photo.
 */
import { getProfileAscii } from './imageToAscii';

/**
 * Async – returns a profile card with the colourful ASCII portrait.
 */
export async function createProfileCardHTML(): Promise<string> {
  let asciiPortrait: string;
  try {
    asciiPortrait = await getProfileAscii(70);
  } catch {
    asciiPortrait = '[profile photo unavailable]';
  }

  return `
<div style="margin:4px 0">
  <div style="display:inline-block;text-align:left;line-height:1.1;font-size:11px;letter-spacing:0.3px;${asciiPortrait === '[profile photo unavailable]' ? '' : 'filter:drop-shadow(0 0 6px rgba(255,176,0,0.15));'}">
${asciiPortrait}
  </div>
  <div style="margin-top:12px;padding:10px 16px;border:1px solid #ffb00033;border-radius:8px;background:#ffb0000a">
    <div style="font-size:17px;font-weight:bold;color:#ffb000;letter-spacing:1px">DWEEPAN GAIN</div>
    <div style="font-size:12px;color:#ff6600;margin:4px 0 8px">AI / ML Engineer</div>
    <div style="font-size:11px;color:#b37d00;line-height:1.7">
      <span style="color:#ffb000">&#9679;</span> Vasco Da Gama, Goa, India<br/>
      <span style="color:#ffb000">&#9679;</span> dweepangain11dec99@gmail.com<br/>
      <span style="color:#ffb000">&#9679;</span> github.com/Markes10<br/>
      <span style="color:#ffb000">&#9679;</span> +91 8485841623
    </div>
  </div>
</div>`;
}

/**
 * Synchronous fallback (used only if async path is not available).
 */
export function createProfileArtHTML(): string {
  // This will be replaced by the async version at runtime.
  // Keeping the export so the import in Terminal.tsx boot doesn't break.
  return '';
}
