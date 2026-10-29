/* ===========================
   Theme bootstrap — loaded render-blocking in <head> so the saved or
   system theme is applied before first paint (no dark→light flash).
   Kept as a file because the CSP disallows inline scripts.
   =========================== */
(function () {
    let theme = null;
    try { theme = localStorage.getItem('preferred-theme'); } catch (e) { /* storage blocked */ }
    if (theme !== 'light' && theme !== 'dark') {
        theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);
})();
