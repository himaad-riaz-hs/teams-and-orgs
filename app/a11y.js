/* Mark decorative Material Symbols icons aria-hidden so screen readers don't announce them.
   Safe for this build: every icon-only button carries an aria-label, and all other icons sit
   beside visible text (pills, badges, banners, nav) — so no icon is the sole accessible label.
   Covers dynamically-added icons (hub rows, detail menu, injected banners) via a MutationObserver. */
(function(){
  function hideIn(node){
    if (node.nodeType !== 1) return;
    if (node.classList && node.classList.contains('material-symbols-outlined') && !node.hasAttribute('aria-hidden')) {
      node.setAttribute('aria-hidden', 'true');
    }
    if (node.querySelectorAll) {
      [].forEach.call(node.querySelectorAll('.material-symbols-outlined:not([aria-hidden])'), function(el){
        el.setAttribute('aria-hidden', 'true');
      });
    }
  }
  hideIn(document.documentElement);
  if (window.MutationObserver && document.body) {
    new MutationObserver(function(muts){
      muts.forEach(function(m){ [].forEach.call(m.addedNodes, hideIn); });
    }).observe(document.body, { childList: true, subtree: true });
  }
})();
