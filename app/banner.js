/* Shared global banners (reconnection + beta) for Admin settings pages.
   Injects banner CSS, links fig-tokens if missing, and restructures the shell to
   rail | rightcol[banners + lowerrow[drawer + main]] so banners sit full-width above
   the drawer (matching staging). Skips pages already restructured (overview/hub).
   Tokens only — no raw hex. */
(function(){
  if (!document.querySelector('link[href*="fig-tokens"]')) {
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = '../components/fig-tokens.css';
    document.head.appendChild(l);
  }
  var css = ''
    + '.banner{display:flex;gap:16px;align-items:center;padding:var(--bento-component-alert-banner-padding-y) var(--bento-component-alert-banner-padding-x);}'
    + '.banner.warning{background:var(--bento-component-alert-warning-fill);}'
    + '.banner.info{background:var(--bento-component-alert-info-fill);}'
    + '.banner .ic{font-size:24px;flex-shrink:0;}'
    + '.banner.warning .ic{color:var(--bento-system-sys-warning-700);}'
    + '.banner.info .ic{color:var(--bento-theme-color-icon-info);font-variation-settings:"FILL" 1;}'
    + '.banner .body{flex:1;min-width:0;}'
    + '.banner .title{font:var(--hs-type-body-md-b);font-weight:700;line-height:var(--bento-theme-line-heights-1);color:var(--hs-ref-grey-dark-241f21);}'
    + '.banner .desc{font:var(--hs-type-body-md);}'
    + '.banner .actions{display:flex;align-items:center;gap:4px;}'
    + '.ban-link{color:var(--hs-ref-secondary-2f6b9a);font-weight:400;text-decoration:none;}'
    + '.ban-link:hover{text-decoration:underline;}'
    + 'body{display:flex;flex-direction:column;height:100vh;overflow:hidden;margin:0;}'
    + '.suite-app{height:auto;flex:1 1 auto;min-height:0;}'
    + '.banner.warning.topbanner{flex:0 0 auto;}';
  var s = document.createElement('style'); s.id = 'banner-style'; s.textContent = css;
  document.head.appendChild(s);

  var app = document.querySelector('.suite-app'); if (!app) return;
  if (document.querySelector('.banner.warning.topbanner')) return; // already has the full-width top banner
  var main = app.querySelector(':scope > .suite-main') || app.querySelector('.suite-main');
  if (!main) return;

  var warnHTML =
      '<div class="banner warning topbanner" role="status"><span class="material-symbols-outlined ic">warning</span>'
    + '<div class="body"><div class="title">Reconnection Required</div><div class="desc">Some of your accounts are no longer publishing or collecting data, or may stop in the near future. <a class="ban-link" href="#">Click to reconnect your social accounts</a></div></div>'
    + '<div class="actions"><button class="hs-btn hs-btn--ghost hs-btn--icon ne-tooltipbtn" aria-label="Dismiss" style="width:32px;height:32px" onclick="this.closest(\'.banner\').remove()"><span class="material-symbols-outlined" style="font-size:18px">close</span></button></div></div>';
  var infoHTML =
      '<div class="banner info" role="status"><span class="material-symbols-outlined ic">info</span>'
    + '<div class="body"><div class="desc">This is the beta social accounts and teams. <a href="#" style="color:var(--bento-theme-color-text-base);font:var(--hs-type-body-md-b);text-decoration:underline">Click here for the previous version</a></div></div></div>';

  app.insertAdjacentHTML('beforebegin', warnHTML); // reconnection: full viewport width, above the shell
  main.insertAdjacentHTML('afterbegin', infoHTML); // beta: top of the main content
})();
