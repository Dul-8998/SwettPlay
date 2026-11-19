const formulario = document.getElementById("formulario");
const vistaFormulario = document.getElementById("vistaFormulario");
const vistaExito = document.getElementById("vistaExito");

// Las expresiones regulares comprueban el formato de cada dato.
const reglas = [
  {
    id: "nombre",
    errorId: "errorNombre",
    nombre: "El nombre",
    patron: /^[\p{L}]*[aeiouáéíóúü][\p{L}]*(?: [\p{L}]*[aeiouáéíóúü][\p{L}]*)*$/iu,
    mensaje: "Solo se permiten letras y espacios; no escribas números ni símbolos."
  },
  {
    id: "apellidoPaterno",
    errorId: "errorPaterno",
    nombre: "El apellido paterno",
    patron: /^[\p{L}]*[aeiouáéíóúü][\p{L}]*(?: [\p{L}]*[aeiouáéíóúü][\p{L}]*)*$/iu,
    mensaje: "Solo se permiten letras y espacios; no escribas números ni símbolos."
  },
  {
    id: "apellidoMaterno",
    errorId: "errorMaterno",
    nombre: "El apellido materno",
    patron: /^[\p{L}]*[aeiouáéíóúü][\p{L}]*(?: [\p{L}]*[aeiouáéíóúü][\p{L}]*)*$/iu,
    mensaje: "Solo se permiten letras y espacios; no escribas números ni símbolos."
  },
  {
    id: "edad",
    errorId: "errorEdad",
    nombre: "La edad",
    patron: /^\d{1,3}$/,
    mensaje: "Debe contener 1 hasta 3 números, sin espacios ni letras."
  },
  {
    id: "numeroCuenta",
    errorId: "errorNumeroCuenta",
    nombre: "El número de cuenta", 
    patron: /^\d{16}$/,
    mensaje: "Debe contener exactamente 16 números, sin espacios ni guiones."
  },
  {
    id: "fechaNacimiento",
    errorId: "errorFechaNacimiento",
    nombre: "La fecha de nacimiento",
    patron: /^\d{4}-\d{2}-\d{2}$/,
    mensaje: "Selecciona una fecha de nacimiento válida."
},
  {
    id: "email",
    errorId: "errorEmail",
    nombre: "El correo electrónico",
    patron: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    mensaje: "Escribe un correo válido, por ejemplo: usuario@correo.com."
  }
];

function validarCampo(regla) {
  const input = document.getElementById(regla.id);
  const mensaje = document.getElementById(regla.errorId);
  const valor = input.value;

  let textoError = "";

  if (valor.trim() === "") {
    textoError = "Este campo es obligatorio.";
  } else if (valor !== valor.trim()) {
    textoError = "No debe comenzar ni terminar con espacios.";
  } else if (!regla.patron.test(valor)) {
    textoError = regla.mensaje;
  }

  const esValido = textoError === "";
  input.classList.toggle("incorrecto", !esValido);
  input.classList.toggle("correcto", esValido);
  input.setAttribute("aria-invalid", String(!esValido));
  mensaje.textContent = textoError;

  return esValido;
}

// Revisa cada campo mientras la persona escribe.
reglas.forEach((regla) => {
  const input = document.getElementById(regla.id);
  input.addEventListener("input", () => validarCampo(regla));
  input.addEventListener("blur", () => validarCampo(regla));
});

// El formulario solo muestra el éxito cuando todos los campos son válidos.
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const resultados = reglas.map(validarCampo);
  const formularioValido = resultados.every(Boolean);

  if (formularioValido) {
    vistaFormulario.hidden = true;
    vistaExito.hidden = false;
    vistaExito.querySelector("h1").focus?.();
  } else {
    const primerCampoIncorrecto = formulario.querySelector(".incorrecto");
    if (primerCampoIncorrecto) {
      primerCampoIncorrecto.focus();
    }
  }
});
const camposNombre = [
    document.getElementById("nombre"),
    document.getElementById("apellidoPaterno"),
    document.getElementById("apellidoMaterno")
];

camposNombre.forEach(campo => {

    // Limitar a 100 caracteres
    campo.maxLength = 100;

    campo.addEventListener("input", function () {

        // Convertir a mayúsculas
        this.value = this.value.toLocaleUpperCase("es-MX");

        // Permitir únicamente letras y espacios
        this.value = this.value.replace(/[^\p{L}\p{M} ]/gu, "");

    });

});

// EDAD: solamente números, máximo 3 dígitos
document.addEventListener("DOMContentLoaded", function() {

    const edad = document.getElementById("edad");

    edad.addEventListener("input", function() {
        this.value = this.value.replace(/[^0-9]/g, "").slice(0, 3);
    });

});
