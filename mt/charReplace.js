function replaceCharInTitle(){
	var charReplace = [{
		"print": "Á",
		"hexa": "Ä",
		"html": "&Aacute;"
	}, {
		"print": "á",
		"hexa": "á",
		"html": "&aacute;"
	}, {
		"print": "É",
		"hexa": "É",
		"html": "&Eacute;"
	}, {
		"print": "é",
		"hexa": "é",
		"html": "&eacute;"
	}, {
		"print": "Í",
		"hexa": "Í",
		"html": "&Iacute;"
	}, {
		"print": "í",
		"hexa": "í",
		"html": "&iacute;"
	}, {
		"print": "Ñ",
		"hexa": "Ñ",
		"html": "&Ntilde;"
	}, {
		"print": "ñ",
		"hexa": "ñ",
		"html": "&ntilde;"
	}, {
		"print": "Ó",
		"hexa": "Ó",
		"html": "&Oacute;"
	}, {
		"print": "ó",
		"hexa": "ó",
		"html": "&oacute;"
	}, {
		"print": "Ú",
		"hexa": "Ú",
		"html": "&Uacute;"
	}, {
		"print": "ú",
		"hexa": "ú",
		"html": "&uacute;"
	}, {
		"print": "Ü",
		"hexa": "Ü",
		"html": "&Uuml;"
	}, {
		"print": "ü",
		"hexa": "ü",
		"html": "&uuml;"
	}, {
		"print": "«",
		"hexa": "«",
		"html": "&laquo;"
	}, {
		"print": "»",
		"hexa": "»",
		"html": "&raquo;"
	}, {
		"print": "¿",
		"hexa": "¿",
		"html": "&iquest;"
	}, {
		"print": "¡",
		"hexa": "¡",
		"html": "&iexcl;"
	}, {
		"print": "€",
		"hexa": "€",
		"html": "&euro;"
	}]

	try {
		var xtitle = document.querySelector("title").innerText.trim();
		[].forEach.call(charReplace,function(a,b){
			xtitle = xtitle.replace(a.html,a.print);
		})
		document.querySelector("title").innerHTML = xtitle;
	} catch(err){
		
	}
}

document.addEventListener("DOMContentLoaded",function(){
	if(/\/es\//gi.test(window.location.href)){
		replaceCharInTitle();	
	}	
})