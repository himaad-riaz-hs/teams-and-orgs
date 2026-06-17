/* Shared client-side filter for the table pages (teams / members / all-social-accounts).
   Wires the first .searchbar input to filter the .list-panel table's tbody rows by text,
   and shows an inline "No matches" row when nothing matches. Tokens only. */
(function(){
  var input = document.querySelector('.searchbar input');
  var table = document.querySelector('.list-panel table');
  if (!input || !table) return;
  var tbody = table.querySelector('tbody');
  if (!tbody) return;

  var cols = table.querySelectorAll('thead th').length || 5;
  var noRow = document.createElement('tr');
  noRow.id = 'noMatchRow';
  noRow.style.display = 'none';
  noRow.innerHTML = '<td colspan="' + cols + '" style="text-align:center; padding:32px; color:var(--bento-theme-color-text-subtle)">No matches</td>';
  tbody.appendChild(noRow);

  input.addEventListener('input', function(e){
    var q = e.target.value.toLowerCase().trim();
    var any = 0;
    [].forEach.call(tbody.querySelectorAll('tr'), function(tr){
      if (tr === noRow) return;
      var ok = q === '' || tr.textContent.toLowerCase().indexOf(q) !== -1;
      tr.style.display = ok ? '' : 'none';
      if (ok) any++;
    });
    noRow.style.display = any ? 'none' : '';
  });
})();
