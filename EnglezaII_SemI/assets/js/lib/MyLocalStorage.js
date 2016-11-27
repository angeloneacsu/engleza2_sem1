function MyLocalStorage() {
	
}

MyLocalStorage.prototype.getItem = function(key) {
	if((window.ActiveXObject !== undefined) || ((navigator.platform.indexOf("iPhone") != -1)
			|| (navigator.platform.indexOf("iPad") != -1)))
{
		return $.cookie(key);
	}else{
		return localStorage.getItem(key);
	}
};

MyLocalStorage.prototype.setItem = function(key, value) {
	if((window.ActiveXObject !== undefined) || ((navigator.platform.indexOf("iPhone") != -1)
			|| (navigator.platform.indexOf("iPad") != -1))){
		$.cookie(key, value, { expires: 365 });
	}else{
		localStorage.setItem(key, value);
	}
};

MyLocalStorage.prototype.key = function(index) {
	return localStorage.key(index);
};


