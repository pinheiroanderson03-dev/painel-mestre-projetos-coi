function normalizarDaianeRibeiro() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    node.nodeValue = node.nodeValue
      .replace(/\bDaiana\b/g, 'Daiane Ribeiro')
      .replace(/\bDaiane\b(?!\s+Ribeiro)/g, 'Daiane Ribeiro');
  }
}

window.addEventListener('load', () => {
  normalizarDaianeRibeiro();
  setTimeout(normalizarDaianeRibeiro, 800);
  setTimeout(normalizarDaianeRibeiro, 1800);

  const observer = new MutationObserver(() => normalizarDaianeRibeiro());
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
});
