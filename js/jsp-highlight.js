document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('figure.highlight.jsp code.hljs.jsp').forEach((block) => {
    let html = block.innerHTML;

    html = html.replace(/(&lt;\/?)c:<span[^>]*>([a-zA-Z0-9_-]+)<\/span>/g, '$1c:$2');

    var elReg = new RegExp('(\\$\\{[a-zA-Z0-9\\.\\_\\-\\s!=\\s\\S]+?\\})', 'g');
    html = html.replace(elReg, '<span class="hljs-template-variable">$1</span>');

    html = html.replace(/(&lt;c:)(choose|when|otherwise|if|forEach|set|out|remove)(\b[\s\S]*?&gt;)/g, function(match, p1, p2, p3) {
      return '<span class="jstl-shell">' + p1 + '</span><span class="hljs-keyword">' + p2 + '</span><span class="jstl-shell">' + p3 + '</span>';
    });
    html = html.replace(/(&lt;\/c:)(choose|when|otherwise|if|forEach|set|out|remove)(&gt;)/g, function(match, p1, p2, p3) {
      return '<span class="jstl-shell">' + p1 + '</span><span class="hljs-keyword">' + p2 + '</span><span class="jstl-shell">' + p3 + '</span>';
    });

    html = html.replace(/(&lt;\/?(?!c:)[a-zA-Z0-9]+[\s\S]*?&gt;)/g, '<span class="hljs-tag">$1</span>');
    
    var jspReg = new RegExp('(&lt;%' + '@?[\\s\\S]*?%' + '&gt;)', 'g');
    html = html.replace(jspReg, '<span class="hljs-meta">$1</span>');

    block.innerHTML = html;
  });
});