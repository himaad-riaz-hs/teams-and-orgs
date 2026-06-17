/* Shared APG tablist behaviour for .hs-tabs. Upgrades each tab strip to:
   role=tablist/tab, aria-selected reflecting .is-active, roving tabindex,
   Arrow/Home/End navigation, Enter/Space activation (delegates to the page's
   existing click handler). No-op on pages without .hs-tabs. Tokens only. */
(function(){
  [].forEach.call(document.querySelectorAll('.hs-tabs'), function(list){
    list.setAttribute('role','tablist');
    var tabs = [].slice.call(list.querySelectorAll('.hs-tab'));
    if (!tabs.length) return;
    function sync(){
      tabs.forEach(function(t){
        var a = t.classList.contains('is-active');
        t.setAttribute('role','tab');
        t.setAttribute('aria-selected', a ? 'true' : 'false');
        t.setAttribute('tabindex', a ? '0' : '-1');
      });
    }
    sync();
    // re-sync aria-selected after any activation (page click handlers flip .is-active)
    list.addEventListener('click', function(){ setTimeout(sync, 0); });
    list.addEventListener('keydown', function(e){
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown'){ e.preventDefault(); tabs[(i+1)%tabs.length].focus(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp'){ e.preventDefault(); tabs[(i-1+tabs.length)%tabs.length].focus(); }
      else if (e.key === 'Home'){ e.preventDefault(); tabs[0].focus(); }
      else if (e.key === 'End'){ e.preventDefault(); tabs[tabs.length-1].focus(); }
      else if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); document.activeElement.click(); setTimeout(sync, 0); }
    });
  });
})();
