var obj = {
	getDisponibles : function(unidades,lider){
		//el lider contiene lider.posicion para saber la posicion del lider
		var resultado = [];
		for(var i = 0; i<=3;i++){
			var unidad = unidades[i];
			if(unidad != undefined)
				resultado.push(unidad);
		}
		return resultado;
	}
};

module.exports = obj;
