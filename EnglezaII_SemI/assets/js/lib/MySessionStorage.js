function MySessionStorage() {
}

MySessionStorage.prototype.getItem = function(key) {
	if((window.ActiveXObject !== undefined) || ((navigator.platform.indexOf("iPhone") != -1)
			|| (navigator.platform.indexOf("iPad") != -1)))
{
		return $.cookie(key);
	}else{
		return sessionStorage.getItem(key);
	}
};

MySessionStorage.prototype.setItem = function(key, value) {
	if((window.ActiveXObject !== undefined) || ((navigator.platform.indexOf("iPhone") != -1)
			|| (navigator.platform.indexOf("iPad") != -1)))
{
		$.cookie(key, value);
	}else{
		sessionStorage.setItem(key, value);
	}
};

