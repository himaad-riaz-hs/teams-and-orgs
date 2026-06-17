/* Shared drawer-collapse behaviour for the Admin settings sub-nav.
   Injects the collapse CSS and wires the .sd-collapse toggle. Tokens-only (no colours here). */
(function(){
  var css = ''
    + '.suite-drawer{transition:width .15s ease;}'
    + '.suite-drawer.collapsed{width:56px;}'
    + '.suite-drawer.collapsed .sd-body{display:none;}'
    + '.suite-drawer.collapsed .sd-head{justify-content:center;padding:0;font-size:0;}';
  var s = document.createElement('style'); s.id = 'nav-collapse-style'; s.textContent = css;
  document.head.appendChild(s);

  var btn = document.querySelector('.sd-collapse'); if (!btn) return;
  btn.addEventListener('click', function(){
    var d = document.querySelector('.suite-drawer'); if (!d) return;
    var collapsed = d.classList.toggle('collapsed');
    var ic = btn.querySelector('.material-symbols-outlined');
    if (ic) ic.textContent = collapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left';
    btn.setAttribute('aria-label', collapsed ? 'Expand navigation' : 'Collapse navigation');
  });
})();
