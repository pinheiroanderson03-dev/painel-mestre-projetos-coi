function ajustarNomenclaturaCOI(){
  const antigo='MDS - Gestão de Portfólio de Produtos - Etapa de embarque de produtos';
  const novo='COI - Gestão de Portfólio de Produtos - Etapa de Embarque de Produtos';
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;
  while(node=walker.nextNode()){
    node.nodeValue=node.nodeValue.replaceAll(antigo,novo).replaceAll('portfólio do MDS','portfólio COI');
  }
}
setTimeout(ajustarNomenclaturaCOI,1500);
setTimeout(ajustarNomenclaturaCOI,3000);
