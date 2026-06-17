/* Shared profile menu on the global-rail avatar. Gives Option B (ID-5792) a realistic entry
   point: a member reaches their personal "My social accounts" from their own profile, not the
   org admin drawer. APG menu-button: aria-haspopup/expanded, Escape + focus return, arrow roving.
   Tokens only. */
(function(){
  var av = document.querySelector('.suite-rail .avatar');
  if (!av) return;
  av.setAttribute('role', 'button');
  av.setAttribute('tabindex', '0');
  av.setAttribute('aria-haspopup', 'menu');
  av.setAttribute('aria-expanded', 'false');
  av.setAttribute('aria-label', 'Your account: Robin Avery');
  av.removeAttribute('aria-hidden');
  av.style.cursor = 'pointer';

  var css = ''
    + '#profmenu{position:fixed;left:84px;bottom:14px;z-index:9000;min-width:236px;background:var(--bento-theme-color-bg-surface);border:1px solid var(--bento-theme-color-border-subtle);border-radius:12px;box-shadow:var(--bento-theme-elevation-shadow-overlay-bottom);padding:6px;display:none;}'
    + '#profmenu.open{display:block;}'
    + '#profmenu .pm-head{padding:10px 12px 12px;border-bottom:1px solid var(--bento-theme-color-border-subtle);margin-bottom:4px;}'
    + '#profmenu .pm-name{font:var(--hs-type-body-md-b);}'
    + '#profmenu .pm-mail{font:var(--hs-type-body-sm);color:var(--bento-theme-color-text-subtle);}'
    + '#profmenu a,#profmenu button{display:flex;align-items:center;gap:10px;width:100%;border:0;background:transparent;cursor:pointer;padding:10px 12px;border-radius:8px;font:var(--hs-type-body-md);color:var(--bento-theme-color-text-base);text-decoration:none;text-align:left;box-sizing:border-box;}'
    + '#profmenu a:hover,#profmenu button:hover{background:var(--bento-component-list-item-fill-hovered);}'
    + '#profmenu .material-symbols-outlined{font-size:18px;color:var(--bento-theme-color-icon-base);}'
    + '#profmenu .pm-sep{height:1px;background:var(--bento-theme-color-border-subtle);margin:4px 0;}';
  var st = document.createElement('style'); st.id = 'profmenu-style'; st.textContent = css;
  document.head.appendChild(st);

  var menu = document.createElement('div');
  menu.id = 'profmenu'; menu.setAttribute('role', 'menu'); menu.setAttribute('aria-label', 'Your account');
  menu.innerHTML =
      '<div class="pm-head"><div class="pm-name">Robin Avery</div><div class="pm-mail">robin.avery@example.com</div></div>'
    + '<a role="menuitem" href="my-social-accounts.html"><span class="material-symbols-outlined">lock</span>My social accounts</a>'
    + '<a role="menuitem" href="#"><span class="material-symbols-outlined">person</span>View profile</a>'
    + '<a role="menuitem" href="#"><span class="material-symbols-outlined">settings</span>Account settings</a>'
    + '<div class="pm-sep"></div>'
    + '<button role="menuitem"><span class="material-symbols-outlined">logout</span>Sign out</button>';
  document.body.appendChild(menu);

  function open(){ menu.classList.add('open'); av.setAttribute('aria-expanded','true'); var f = menu.querySelector('[role=menuitem]'); if (f) f.focus(); }
  function close(focusAv){ menu.classList.remove('open'); av.setAttribute('aria-expanded','false'); if (focusAv) av.focus(); }
  av.addEventListener('click', function(e){ e.stopPropagation(); menu.classList.contains('open') ? close(true) : open(); });
  av.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(); } });
  document.addEventListener('click', function(e){ if (!menu.contains(e.target) && e.target !== av) close(false); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && menu.classList.contains('open')) close(true); });
  menu.addEventListener('keydown', function(e){
    var items = [].slice.call(menu.querySelectorAll('[role=menuitem]'));
    var i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown'){ e.preventDefault(); items[(i+1)%items.length].focus(); }
    else if (e.key === 'ArrowUp'){ e.preventDefault(); items[(i-1+items.length)%items.length].focus(); }
    else if (e.key === 'Tab'){ close(false); }
  });
})();
