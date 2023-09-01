function mainNavActiveChecker(){	
	try {
		if(/peoples/gi.test(window.location.href)){
			document.querySelector(".header-nav-item > a[href*='peoples-united']").classList.add("-parent-page");
		}	
	} catch(err){}	
}

var homepages = {
	"personal":["personal","personal-customer","personal-mortgage","customer","homebuying","home-page"],
	"business":["business","BusinessCustomer","businesscustomer"],
	"commercial":["commercial"]
}

var moveAlertBanner = function(){
	try {
		if(document.querySelectorAll(".alert-banner")[0]){
			document.querySelectorAll(".header")[0].append(document.querySelectorAll(".alert-banner")[0]);
		}			
	} catch(err){
		
	}
}
	
function DownSlider(p,k){ //p = parentSelector, k = kid selector
	try {
		var sliderParents = document.querySelectorAll(p);		
		[].forEach.call(sliderParents,function(sliderParent,i){			
			var sliderKids =  k != undefined ? document.querySelectorAll(k) : sliderParent.children;
			var allKidsHeight = 0;			
			
			var setMarginIni = function(){			
				[].forEach.call(sliderKids,function(a,b){
					allKidsHeight += Number(a.offsetHeight);
					if((b == sliderKids.length-1)  ){
						sliderParent.setAttribute("data-height",allKidsHeight+"px");
						sliderParent.style.marginTop = "-"+sliderParent.attributes["data-height"].value;
					}
				});		
			}
			
			var setOpenMargin = function(){		
				setTimeout(function(){ 
					sliderParent.style.marginTop = "0%";
					sliderParent.style.position = "relative";
					sliderParent.style.opacity = "1";						
				}, 1000);
			};
			
			setMarginIni(),setOpenMargin();	
		});
	} catch(err){}	
}

function getPageAlertHtml(){
	return "<div class='alert-banner-item _scripted' data-shadow='[[SHOWSHADOW]]' data-expire='[[TIMEEXPIRE]]'> <div class='alert-banner-item-text' tabindex='0'><p>[[ALERTTEXT]]</p></div> <button class='alert-banner-item-close' aria-label='Alert Banner Close Button'> <svg class='alert-banner-icon -mobile'> <use xlink:href='#icon-close-thin'></use> </svg> <svg class='alert-banner-icon -desktop'> <use xlink:href='#icon-close'></use> </svg> </button> </div>";
}

function getLoginAlertHtml(){
	return "<div class='login-alerts-item _scripted' data-shadow='[[SHOWSHADOW]]' data-alert-index='0' data-expire='[[TIMEEXPIRE]]'>  <div class='login-alert-text'><p>[[LOGINALERTCOPY]]</p></div>  <button class='icon-close' aria-label='Close Alert'> <svg class='icon-close'> <use xlink:href='#icon-close'></use> </svg> </button></div> ";
}

function alertActiveCheck(){
	try {		
		var today = new Date();	//new Date(new Date().toJSON().substr(0,10)+" 00:00 AM");	
		var dStart;
		var dEnd;
		var isActive;	
		var thisPage = window.location.pathname.replace(".html","").replace("/content/mtb-web/en","");
		var isForThispage = false;
		
		var setisForThispage = function(x){		
			if((homepages.personal.indexOf(thisPage) != -1 && (/true/gi.test(x.showonpersonalhp))) || (thisPage == "/" && (/true/gi.test(x.showonpersonalhp)) ) ){
				isForThispage = true;
				showAlert(x);
			}
			
			if(homepages.business.indexOf(thisPage) != -1 && (/true/gi.test(x.showonbusinesshp)) ){
				isForThispage = true;
				showAlert(x);
			}
			
			if(homepages.commercial.indexOf(thisPage) != -1 && (/true/gi.test(x.showoncommercialhp)) ){
				isForThispage = true;
				showAlert(x);
			}
			
			if(x.directurls.indexOf(thisPage) != -1 && (x.directurls.length > 0) ){
				isForThispage = true;
				showAlert(x);
			}
			if((/true/gi.test(x.showloginealert) || x.showloginealert) && !isForThispage ){
				isForThispage = true;
				showAlert(x);
			}
		}
		
		var timeActive = function(x){
			dStart = /[0-9]+/.test(x.startdate) ? new Date(x.startdate) : new Date( (Number(today.getFullYear())-1)+"-01-01 00:00 AM" );
			dEnd = /[0-9]+/.test(x.enddate) ? new Date(x.enddate) : new Date( (Number(today.getFullYear())-1)+"-01-02 00:00 AM" );
			isActive = false;
			isForThispage = false;
		
			if( (today >= dStart &&  today <= dEnd) || (x.forceshowonpreview && /author/gi.test(window.location.href))){
				isActive = true;
				setisForThispage(x);
			}
		}		
		
		for(var i in allAlerts){
			timeActive(allAlerts[i]);
		}
	} catch(err){
		
	}
}

function showAlert(x){
	if( /true/gi.test(x.showpagealert) ){
		ShowPageAlert(x);
	}
	
	if( /true/gi.test(x.showloginealert)){
		ShowLoginAlert(x);
	}
}

function ShowPageAlert(a){		
	try {
		var makeAlert = function(){
			if( document.querySelectorAll(".component.alert-banner").length == 0 ){
				var alertDiv = document.createElement("div");
				alertDiv.setAttribute("class","component -no-standard-margin alert-banner");
				var hdr = document.querySelectorAll(".header")[0];
				hdr.insertBefore(alertDiv,hdr.children[0]);
			}	
			var alerParent = document.querySelector(".component.alert-banner");	
			alerParent.innerHTML += String(getPageAlertHtml()).replace("[[ALERTTEXT]]",a.alertcopy).replace("[[SHOWSHADOW]]", (/true/gi.test(a.shadow) ? "true" : "false") );
		}
		makeAlert(),DownSlider(".alert-banner");
	} catch(err){
		
	}
}

function ShowLoginAlert(a){
	try {
		if( document.querySelectorAll(".alert-login-messages").length == 0 ){
				var alertDiv = document.createElement("div");
				alertDiv.setAttribute("class","alert-login-messages");
			} else {
				var alertDiv = document.querySelector(".alert-login-messages");
			}
			
			if( document.querySelectorAll(".login-alerts").length == 0 ){
				var alertDivInner = document.createElement("div");
				alertDivInner.setAttribute("class","login-alerts");
				alertDiv.insertBefore(alertDivInner,alertDiv.children[0]);		
						
				var hdr = document.querySelectorAll(".login-scroll")[0];
				hdr.insertBefore(alertDiv,hdr.children[0]);		
			}
			
			var alerParent = document.querySelector(".login-alerts");	
			alerParent.innerHTML += String(getLoginAlertHtml()).replace("[[LOGINALERTCOPY]]",a.alertcopy);
	} catch(err){
		
	}
}

function removeBadAlerts(){
	[].forEach.call(document.querySelectorAll(".login-alerts-item"),function(a,b){
		if( /christmas/gi.test(a.innerText) ||  /clearing your browser cache/gi.test(a.innerText) ){
			a.remove();
		}	
	});
}

function fixColWhiteBg(){
	document.styleSheets[0].addRule(".columns-wrapper.-white > .column-content > .column-parsys","background-color:#ffffff;");
}


function fixMoboleNavLinks(){
	var addClickEvent = function(e){
		try {
			e.addEventListener("click",function(x){ 
				window.location = x.currentTarget.attributes['href'].value;
			});	
		}catch(err){}		
	}
	
	try {
		document.querySelector(".navigation-options-icons .navigation-option.search").setAttribute('href',"/search");	
		addClickEvent(document.querySelector(".navigation-options-icons .navigation-option.search"));
	} catch(err){}
	try {
		document.querySelector(".navigation-option.location").setAttribute('href',"https://locations.mtb.com");
		addClickEvent(document.querySelector(".navigation-option.location"));
	} catch(err){}
	try {
		document.querySelector(".navigation-option.help-center").setAttribute('href',"/homepage/explore-the-m-and-t-bank-help-center");
		addClickEvent(document.querySelector(".navigation-option.help-center"));
	} catch(err){}	
}

function addClickEvent(){
	
}


window.addEventListener("DOMContentLoaded",function(){	

	var style = 
		'div.alert-banner > div.alert-banner-item:not(:first-of-type) { border-top: 1px solid #ffb300; }' +
		'div.alert-banner-item b { font-weight: bold; } ' +
		'div.alert-banner p { margin: 16px; } ' +
	'';
	
	var s = document.createElement('style');
	s.innerText = style;
	$('head').eq(0).append(s);
	
	alertActiveCheck(),
	moveAlertBanner();
	removeBadAlerts();
	fixColWhiteBg();
	mainNavActiveChecker();
	showCustomAlert();	
	
});

window.addEventListener("load",function(){
	fixMoboleNavLinks();
	window.setTimeout(mdbFixNavLinks, 1500);
});

function mdbFixNavLinks() {

	$('a[href*="#"]').each(function() { 
		var $this = $(this); 
		var href = $this.attr('href').substr(1); 
		if (href != '' && $('.' + href).length == 1) { 
			$this.click(function(e) { 
				if (e) e.preventDefault(); 
				modalLibrary.toggleModal($(this).attr('href').substr(1)); 
			}); 
		} 
	});
	
}

function showTargetAlert(cd) {
	
	var msg = '';
	var pname = window.location.pathname.split('/').pop().replace('.html','');
	
	if (cd == 'disabled-VT-2023-06-30') { 
		msg = '<p>This is a test message for Vermont.</p>';
		if (pname.indexOf('log-in') == 0 || pname.indexOf('login') == 0) {
			showCustomLoginAlert({ 'cname': 'personal-business', 'msg': msg });
		}
		else {
			ShowPageAlert({ "alertcopy": msg, "shadow": "FALSE" });	
		}
	}
	
	if (cd == 'VT-2023-07-11') { 
		msg = '<p>Due to the severe flooding in Vermont, our Ludlow and Montpelier branches are temporarily closed, all other branches in VT are open. </p>';
		if (pname.indexOf('log-in') == 0 || pname.indexOf('login') == 0) {
			showCustomLoginAlert({ 'cname': 'personal-business', 'msg': msg });
		}
		else {
			ShowPageAlert({ "alertcopy": msg, "shadow": "FALSE" });	
		}
	}
	
		if (cd == 'outage-2023-08-17-23') { 
		msg = '<p>M&T Mobile & Online Banking is temporarily unavailable and we’re working to resolve the issue. We apologize for the inconvenience.</p>';
		if (pname.indexOf('log-in') == 0 || pname.indexOf('login') == 0) {
			showCustomLoginAlert({ 'cname': 'personal-business', 'msg': msg });
		}
		else {
			ShowPageAlert({ "alertcopy": msg, "shadow": "FALSE" });	
		}
	}
}


function showCustomAlert() {
	
	var config = {
		"diff": false,
		"busy": false,
		"pub": false,
		"olb": false,
		"ftl": false,
		"tc": false,
		"nao": false,
		"cname": 'personal-business',
		"msg": '',
		"append": false,
		"weather": false
	};

	var now = new Date();
	
	if (arguments.length == 1 && typeof arguments[0] === 'object') config = Object.assign(config, arguments[0]);		
	
	var pname = window.location.pathname.split('/').pop().replace('.html','');
	
	if (pname.indexOf('log-in') == 0 || pname.indexOf('login') == 0) { 
		//config.msg = '<p>M&T Mobile Banking is temporarily unavailable. Please consider using M&T Online Banking while we work to resolve the issue. We apologize for the inconvenience.</p>';
		showCustomLoginAlert(config); 
		//showCustomLoginAlert({'cname':'commercial', 'msg':'<p>This is a test message.</p>', 'append': true });
		return;
	}
	
	var homepage = false;
	var msg = '';
	
	var homepages = [ 
		'home-page',
		'personal',
		'personal-customer',
		'personal-mortgage',
		'customer',
		'homebuying',
		'business',
		'businesscustomer',
		'peoples'
	];	
	
	if (pname == '') homepage = true;
	if (homepages.indexOf(pname) > -1) homepage = true;
	
	if (config.olb && homepage == true && config.msg != '') {
		msg += config.msg;
	}
	
	if (config.weather && homepage == true) {
		//msg += 'Due to inclement weather, branches in your area may be closed or delayed in opening. Visit our <a href="https://locations.mtb.com/">Branch/ATM directory</a> for specific branch hours or download our app for Apple or Android to access your accounts or deposit checks.';
		//msg += '<p>Due to the impact of the recent storm, we are waiving ATM fees in Western New York.  Through January 10, 2023, M&amp;T is waiving fees for anyone that uses M&amp;T Bank ATMs in Niagara, Erie, Chautauqua, Cattaraugus, Wyoming, Genesee, Orleans, Monroe counties; and M&amp;T won’t charge our customers in WNY for using a non-M&amp;T Bank ATM.  Please note that other banks may charge you a fee.<p>';
	}
	
	
	if (config.olb && homepage == true) {
		msg +=
			"<p>M&T Mobile Banking is temporarily unavailable. Please consider using M&T Online Banking while we work to resolve the issue. We apologize for the inconvenience.</p>";
	}
	
	
	if (config.tc) {		
		// If TC is being worked on		
		if (pc == 'business') msg += "<p><b>Current M&T Treasury Center users:</b> Beginning Monday, September 5 at 7 am ET, M&T Treasury Center will be unavailable for up to 11 hours.</p>";	
		
	}
	
	if (window.location.pathname.indexOf('/checking-accounts-mandt-bank') != -1) pc = 'nao';
	if (window.location.pathname.indexOf('/compare-business-checking-options') != -1) pc = 'nao';
	if (window.location.pathname.indexOf('/m-and-t-simple-checking-for-business') != -1) pc = 'nao';
	if (window.location.pathname.indexOf('/m-and-t-tailored-business-checking') != -1) pc = 'nao';	
	if (window.location.pathname.indexOf('/savings-account-and-cd-options') != -1) pc = 'nao';	
	
	if (config.nao && pc == 'nao' ) {
		// && now < new Date('September 5, 2022 12:00')) {
		msg = 
			'<p>Online account opening is temporarily unavailable and we\'re working to resolve the issue. We apologize for the inconvenience. For assistance, please <a href="https://customer.jrni.com/?client=mtbank">Make an Appointment</a>.</p>' +
			msg;
		$('a[href*="https://nao.mtb.com"]').hide();
	}
	
	// if (config.msg != '') msg += msg;
	
	if (msg == '') return;
	
	$('.component.alert-banner').detach();
	ShowPageAlert({ "alertcopy": msg, "shadow": "FALSE" });	
}

function showCustomLoginAlert(config) {
	
	var msg = '';
	
	/*
	if (config.olb) {
		msg += "<p>Some features in M&T Mobile Banking may be temporarily unavailable.  We recommend using M&T Online Banking while we work to resolve the issue.  We apologize for the inconvenience.</p>";
	}
	*/
	
	if (config.msg != '') msg += config.msg;
	
	
	if (msg == '') return;	
	
	// if (config.msg == '' && $('#pub-post-conversion').length > 0 && window.matchMedia('(min-width: 768px)').matches) return;
	
	var $item = $('.alerts-container').append('<div class="alert-item ' + config.cname + '"><div></div><button class="close" aria-label="Close Alert"> <svg class="icon-close"> <use xlink:href="#icon-close"></use> </svg> </button></div>');
	$('.alert-item div').eq(-1).html(msg);
	$('.alerts-container').removeClass('empty');
	
}