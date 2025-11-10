class IMC {
	constructor(peso, altura) {
		this.peso = parseFloat(peso);
		this.altura = parseFloat(altura);
	}

	validarDatos() {
		if (isNaN(this.peso) || isNaN(this.altura)) {
			throw new Error("Por favor ingresa números válidos");
		}
		if (this.peso <= 0) {
			throw new Error("El peso no puede ser 0 o menor");
		}
		if (this.altura <= 0) {
			throw new Error("La altura no puede ser 0 o menor");
		}
	}

	calcularIMC() {
		this.validarDatos();
		let imc = this.peso / (this.altura * this.altura);
		return Math.round(imc * 100) / 100; // redondear a 2 decimales
	}

	categoria(imc) {
		let data = {};

		if (imc < 18.5) {
			data.key = "bajo-peso";
			data.name = "Bajo peso";
			data.message = "Tu IMC es " + imc + " — estás por debajo del peso recomendado. Consulta a un médico.";
			data.image = "bajo.svg";
			data.colorClass = "text-primary";
		} else if (imc < 25) {
			data.key = "normal";
			data.name = "Peso normal";
			data.message = "Tu IMC es " + imc + " — ¡bien! Estás dentro del rango normal.";
			data.image = "normal.svg";
			data.colorClass = "text-success";
		} else if (imc < 30) {
			data.key = "sobrepeso";
			data.name = "Sobrepeso";
			data.message = "Tu IMC es " + imc + " — tienes sobrepeso. Cuida tu alimentación y haz ejercicio.";
			data.image = "sobrepeso.svg";
			data.colorClass = "text-warning";
		} else {
			data.key = "obesidad";
			data.name = "Obesidad";
			data.message = "Tu IMC es " + imc + " — estás en rango de obesidad. Busca orientación médica.";
			data.image = "obesidad.svg";
			data.colorClass = "text-danger";
		}

		return data;
	}
}

// elementos del DOM
const boton = document.getElementById("calc");
const resultado = document.getElementById("result");

function mostrar(html) {
	resultado.innerHTML = html;
}

function mostrarError(mensaje) {
	mostrar('<div class="alert alert-danger">' + mensaje + '</div>');
}

boton.addEventListener("click", function() {
	const pesoInput = document.getElementById("weight");
	const alturaInput = document.getElementById("height");

	let peso = pesoInput.value;
	let altura = alturaInput.value;

	try {
		let imcObj = new IMC(peso, altura);
		let valorIMC = imcObj.calcularIMC();
		let cat = imcObj.categoria(valorIMC);

		let html = `
			<div class="card shadow-sm">
				<div class="card-body text-center">
					<h5 class="card-title ${cat.colorClass}">${cat.name}</h5>
					<img src="img/${cat.image}" alt="${cat.name}" class="img-fluid mx-auto d-block my-3" style="max-width:150px">
					<p class="card-text">${cat.message}</p>
				</div>
			</div>
		`;

		mostrar(html);
	} catch (e) {
		mostrarError(e.message);
	}
});

// permitir calcular con Enter
let inputs = ["weight", "height"];
for (let i = 0; i < inputs.length; i++) {
	let campo = document.getElementById(inputs[i]);
	campo.addEventListener("keypress", function(e) {
		if (e.key === "Enter") {
			e.preventDefault();
			boton.click();
		}
	});
}
