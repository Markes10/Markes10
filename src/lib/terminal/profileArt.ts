/**
 * Generates the profile card HTML with the actual photo,
 * styled to fit the retro terminal aesthetic.
 */
export function createProfileArtHTML(): string {
  return `
<div style="display:flex;align-items:flex-start;gap:20px;margin:4px 0">
  <img src="/profile.jpg" alt="Dweepan Gain" style="
    width:140px;height:140px;
    border-radius:6px;
    border:2px solid #ffb000;
    box-shadow:0 0 12px rgba(255,176,0,0.25), inset 0 0 8px rgba(0,0,0,0.3);
    object-fit:cover;
    image-rendering:auto;
  " />
  <div style="padding-top:4px">
    <div style="font-size:18px;font-weight:bold;color:#ffb000;margin-bottom:6px;letter-spacing:1px">DWEEPAN GAIN</div>
    <div style="font-size:12px;color:#ff6600;margin-bottom:10px">AI / ML Engineer</div>
    <div style="font-size:11px;color:#b37d00;line-height:1.6">
      <span style="color:#ffb000">&#9679;</span> Vasco Da Gama, Goa, India<br/>
      <span style="color:#ffb000">&#9679;</span> dweepangain11dec99@gmail.com<br/>
      <span style="color:#ffb000">&#9679;</span> github.com/Markes10<br/>
      <span style="color:#ffb000">&#9679;</span> +91 8485841623
    </div>
  </div>
</div>`;
}
