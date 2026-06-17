/* ID-5792 private-accounts demo switcher.
   Discreet floating control (bottom-right) to flip the prototype between the three
   solution options. Choice persists in localStorage and drives body[data-option].
   Any element tagged data-opt="A" / "B" / "C" (space-separated for multiple) is shown
   only under the matching option; untagged elements always show.
   Tokens only — no raw hex. */
(function(){
  var KEY = 'id5792_opt';
  var OPTS = [
    { k:'A', nm:'Inline in list',   ds:'Private accounts interleaved in the org list with a Private badge + ownership filter.' },
    { k:'B', nm:'Member space',     ds:'Private accounts live in your own "My social accounts". T&O links to it.' },
    { k:'C', nm:'Section in T&O',   ds:'A dedicated "Private accounts · only you" section inside Social accounts.' }
  ];
  function read(){ try { return localStorage.getItem(KEY) || 'C'; } catch(e){ return 'C'; } }
  function write(k){ try { localStorage.setItem(KEY, k); } catch(e){} }

  var cur = read();
  // set as early as possible to reduce flash
  if (document.body) document.body.setAttribute('data-option', cur);

  var css = ''
    + 'body[data-option="A"] [data-opt]:not([data-opt~="A"]),'
    + 'body[data-option="B"] [data-opt]:not([data-opt~="B"]),'
    + 'body[data-option="C"] [data-opt]:not([data-opt~="C"]){display:none !important;}'
    + '#optfab{position:fixed;right:20px;bottom:20px;z-index:9000;}'
    + '#optfab .fab{position:relative;width:44px;height:44px;border-radius:999px;border:1px solid var(--bento-theme-color-border-subtle);background:var(--bento-theme-color-bg-surface);color:var(--bento-theme-color-text-base);box-shadow:var(--bento-theme-elevation-shadow-overlay-bottom);display:grid;place-items:center;cursor:pointer;opacity:.5;transition:opacity .15s;}'
    + '#optfab .fab:hover,#optfab.open .fab{opacity:1;}'
    + '#optfab .fab .material-symbols-outlined{font-size:22px;}'
    + '#optfab .fab .badge{position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;border-radius:999px;background:var(--bento-system-sys-neutral-alt-300);color:var(--bento-theme-color-text-base);font:var(--hs-type-meta-b);line-height:18px;text-align:center;padding:0 4px;box-sizing:border-box;}'
    + '#optfab .panel{position:absolute;right:0;bottom:54px;width:284px;background:var(--bento-theme-color-bg-surface);border:1px solid var(--bento-theme-color-border-subtle);border-radius:12px;box-shadow:var(--bento-theme-elevation-shadow-overlay-bottom);padding:12px;display:none;}'
    + '#optfab.open .panel{display:block;}'
    + '#optfab .panel h4{font:var(--hs-type-body-md-b);margin:0;}'
    + '#optfab .panel .hint{font:var(--hs-type-meta);color:var(--bento-theme-color-text-subtle);margin:2px 0 10px;}'
    + '#optfab .opt{display:flex;gap:10px;width:100%;text-align:left;border:1px solid var(--bento-theme-color-border-subtle);background:var(--bento-theme-color-bg-surface);border-radius:8px;padding:9px 10px;margin-bottom:6px;cursor:pointer;align-items:flex-start;box-sizing:border-box;}'
    + '#optfab .opt:hover{background:var(--bento-theme-color-bg-surface-hovered);}'
    + '#optfab .opt.sel{background:var(--bento-component-list-item-fill-selected);border-color:var(--bento-theme-color-border-base);}'
    + '#optfab .opt .k{width:22px;height:22px;border-radius:999px;background:var(--bento-system-sys-neutral-alt-300);color:var(--bento-theme-color-text-base);font:var(--hs-type-meta-b);line-height:22px;text-align:center;flex-shrink:0;}'
    + '#optfab .opt.sel .k{background:var(--bento-theme-color-bg-surface);box-shadow:inset 0 0 0 2px var(--bento-theme-color-text-base);}'
    + '#optfab .opt .nm{font:var(--hs-type-body-sm-b);display:flex;align-items:center;gap:6px;}'
    + '#optfab .opt .nm .material-symbols-outlined{font-size:16px;color:var(--bento-system-sys-positive-600);visibility:hidden;}'
    + '#optfab .opt.sel .nm .material-symbols-outlined{visibility:visible;}'
    + '#optfab .opt .ds{font:var(--hs-type-meta);color:var(--bento-theme-color-text-subtle);margin-top:2px;}';

  var style = document.createElement('style');
  style.id = 'optfab-style';
  style.textContent = css;
  document.head.appendChild(style);

  var wrap = document.createElement('div');
  wrap.id = 'optfab';
  var optsHtml = OPTS.map(function(o){
    return '<button class="opt'+(o.k===cur?' sel':'')+'" data-k="'+o.k+'">'
      + '<span class="k">'+o.k+'</span>'
      + '<span style="flex:1"><span class="nm">'+o.nm+' <span class="material-symbols-outlined">check</span></span><span class="ds">'+o.ds+'</span></span>'
      + '</button>';
  }).join('');
  wrap.innerHTML =
    '<button class="fab ne-tooltipbtn" aria-label="Switch private-accounts demo version" aria-haspopup="true" aria-expanded="false">'
    + '<span class="material-symbols-outlined">tune</span><span class="badge">'+cur+'</span></button>'
    + '<div class="panel" role="menu" aria-label="Private-accounts demo version">'
    + '<h4>Private accounts · ID-5792</h4><div class="hint">Demo: switch the solution idea. Choice is remembered across pages.</div>'
    + optsHtml + '</div>';
  document.body.appendChild(wrap);

  var fab = wrap.querySelector('.fab');
  var badge = wrap.querySelector('.badge');

  function setOpt(k){
    cur = k; write(k);
    document.body.setAttribute('data-option', k);
    badge.textContent = k;
    wrap.querySelectorAll('.opt').forEach(function(b){ b.classList.toggle('sel', b.dataset.k===k); });
    document.dispatchEvent(new CustomEvent('optionchange', { detail:{ option:k } }));
  }
  function setPanel(open){ wrap.classList.toggle('open', open); fab.setAttribute('aria-expanded', String(open)); }

  fab.addEventListener('click', function(e){ e.stopPropagation(); setPanel(!wrap.classList.contains('open')); });
  wrap.querySelectorAll('.opt').forEach(function(b){
    b.addEventListener('click', function(){ setOpt(b.dataset.k); });
  });
  document.addEventListener('click', function(e){ if(!wrap.contains(e.target)) setPanel(false); });
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape') setPanel(false);
    if((e.key==='v'||e.key==='V') && e.shiftKey && !/input|textarea/i.test((e.target.tagName||''))){ setPanel(!wrap.classList.contains('open')); }
  });

  // ensure attribute set (in case body wasn't ready at top)
  document.body.setAttribute('data-option', cur);
  // re-run option-dependent filters now the option is known (a page's own filter may run before this script loads)
  document.dispatchEvent(new CustomEvent('optionchange', { detail:{ option:cur } }));
})();
