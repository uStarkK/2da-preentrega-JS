let darkMode, str ="holaXD";
let alumnosIngresados = [];
const soloLetras = /^[a-zA-Z \u00f1\u00d1]+$/;
const formAlumnos = document.getElementById("añadirAlumnos");
const nombreAlumno = document.getElementById("cargarNombre")
const apellidoAlumno = document.getElementById("cargarApellido")
const edadAlumno = document.getElementById("cargarEdad")
const notaAlumno = document.getElementById("cargarNota")
if(localStorage.getItem("theme")){
    darkMode = localStorage.getItem("theme")
} else{
    localStorage.setItem("theme", "light")
}

if(darkMode === "dark"){
    document.body.classList.add("darkMode")
}
class Alumnos {
    constructor(nombre, apellido, edad, nota) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.nota = nota;
    }
}


function validarAlumno(event) { 
    if (nombreAlumno.value === "" || edadAlumno.value === "" || notaAlumno.value === "" || apellidoAlumno.value ==="") {
        console.log("Por favor amigo, no dejes espacios en blanco, te aviso")
        return false
    }
    if(!soloLetras.test(nombreAlumno.value)){
        console.log("FLACO PONÉ LETRAS, LETRAS.")
        return false
    }
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1)  
}



const containerAlumnos = document.createElement("div");
document.body.appendChild(containerAlumnos);
containerAlumnos.classList.add("containerAlumnosClass")

const renderizarAlumno = (alumno) => {
    const nuevoAlumno = document.createElement("div");
    containerAlumnos.appendChild(nuevoAlumno)
    nuevoAlumno.classList.add("alumno")

    const datos = document.createElement("div")
    nuevoAlumno.appendChild(datos)
    datos.classList.add("datos_uwu")

    const nombre = document.createElement("div")
    datos.appendChild(nombre)
    nombre.innerHTML = alumno.nombre

    const apellido = document.createElement("div")
    datos.appendChild(apellido)
    apellido.innerHTML = alumno.apellido

    const edad = document.createElement("div")
    datos.appendChild(edad)
    edad.innerHTML = `${alumno.edad} años`

    const nota = document.createElement("div")
    datos.appendChild(nota)
    nota.innerHTML = `Nota: ${alumno.nota} `
}
if(localStorage.getItem("alumnos")){
    alumnosIngresados = JSON.parse(localStorage.getItem("alumnos"))
    alumnosIngresados.forEach(alumno => renderizarAlumno(alumno))
} else{
    localStorage.setItem("alumnos", JSON.stringify(alumnosIngresados))
}

formAlumnos.addEventListener("submit", (event) => {
    event.preventDefault();
    if(validarAlumno() == false){
        return null
    } else{
        const nuevoAlumno = new Alumnos(capitalize(nombreAlumno.value), capitalize(apellidoAlumno.value), edadAlumno.value, notaAlumno.value);
        alumnosIngresados.push(nuevoAlumno)
        console.log(alumnosIngresados)
        renderizarAlumno(nuevoAlumno)
        formAlumnos.reset()
        localStorage.setItem("alumnos", JSON.stringify(alumnosIngresados))
    }
    
})

const renderizarAprobados = () =>{
    containerAlumnos.innerHTML = "";
    const alumnosAprobados = (alumnosIngresados.filter(alumnosIngresados => alumnosIngresados.nota > 5))
    alumnosAprobados.forEach(Alumnos => {renderizarAlumno(Alumnos)});
}


const renderizarNoAprobados = () =>{
    containerAlumnos.innerHTML = "";
    const alumnosNoAprobados = (alumnosIngresados.filter(alumnosIngresados => alumnosIngresados.nota < 6))
    alumnosNoAprobados.forEach(Alumnos => {renderizarAlumno(Alumnos)});
}

const mostrarAprobados = document.getElementById("mostrarAprobados");

mostrarAprobados.addEventListener("click", () =>{
    renderizarAprobados();
}) 

const mostrarNoAprobados = document.getElementById("mostrarNoAprobados");

mostrarNoAprobados.addEventListener("click", () =>{
    renderizarNoAprobados()
})
const mostrarTodos = document.getElementById("mostrarTodos")

mostrarTodos.addEventListener("click", () =>{
    containerAlumnos.innerHTML = "";
    alumnosIngresados.forEach(alumno => renderizarAlumno(alumno))
})
const botonLight = document.getElementById("lightMode")
const botonDark = document.getElementById("darkMode")


botonLight.addEventListener("click", () =>{
    document.body.classList.remove("darkMode")
    localStorage.setItem("theme", "light")
})

botonDark.addEventListener("click", () =>{
    document.body.classList.add("darkMode")
    localStorage.setItem("theme", "dark")
})

