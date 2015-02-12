// Template Sidebar
(function(document) {
	var toggle = document.querySelector('.sidebar-toggle');
	var sidebar = document.querySelector('#sidebar');
	var checkbox = document.querySelector('#sidebar-checkbox');

	document.addEventListener('click', function(e) {
	  var target = e.target;

	  if(!checkbox.checked ||
	     sidebar.contains(target) ||
	     (target === checkbox || target === toggle)) return;

	  checkbox.checked = false;
	}, false);
})(document);

// External Links
var links = document.links;

for (var i = 0, linksLength = links.length; i < linksLength; i++) {
   if (links[i].hostname != window.location.hostname) {
       links[i].target = '_blank';
   } 
}