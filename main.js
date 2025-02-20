
function Alumno(nombre, nota1, nota2, nota3) {
    this.nombre = nombre;
    this.nota1 = parseFloat(nota1); 
    this.nota2 = parseFloat(nota2); 
    this.nota3 = parseFloat(nota3); 
    this.promedio = function() {
        return (this.nota1 + this.nota2 + this.nota3) / 3;
    };
}


let cursado = [
    new Alumno("Alejandro Pascal", 8, 9, 9),
    new Alumno("Pedro Alondra", 4, 3, 2),
    new Alumno("Nicolas Bulacio", 5, 9, 10),
    new Alumno("Juan Maidana", 2, 5, 6),
    new Alumno("Gonzalo Bulacio", 5, 7, 5)
];


if (localStorage.getItem("alumnos")) {
    const alumnosGuardados = JSON.parse(localStorage.getItem("alumnos"));
    
    if (Array.isArray(alumnosGuardados) && alumnosGuardados.every(alumno => alumno.nombre && !isNaN(alumno.nota1) && !isNaN(alumno.nota2) && !isNaN(alumno.nota3))) {
        cursado = alumnosGuardados.map(alumnoData => {
            return new Alumno(alumnoData.nombre, alumnoData.nota1, alumnoData.nota2, alumnoData.nota3);
        });
    } else {
        
        localStorage.removeItem("alumnos");
        cursado = cursado; 
    }
}


function agregarAlumnos(event) {
    event.preventDefault(); 

    let nombre = document.getElementById("nombre").value;
    let nota1 = document.getElementById("nota1").value;
    let nota2 = document.getElementById("nota2").value;
    let nota3 = document.getElementById("nota3").value;

    
    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        Swal.fire({
            title: 'Error',
            text: 'Las notas deben ser números válidos.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    let alumno = new Alumno(nombre, nota1, nota2, nota3);
    cursado.push(alumno);
    localStorage.setItem("alumnos", JSON.stringify(cursado));

    Swal.fire({
        title: 'Alumno agregado!',
        text: `El alumno ${nombre} fue agregado con éxito.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });


    document.getElementById("formularioAlumno").reset();
}


function filtrarAprobados() {
    let aprobado = cursado.filter(alumno => alumno.promedio() >= 6);
    if (aprobado.length > 0) {
        let mensaje = aprobado.map(alumno => {
            
            let promedio = alumno.promedio().toFixed(2);
            return `${alumno.nombre} (Promedio: ${promedio})`;
        }).join("\n");

        Swal.fire({
            title: 'Alumnos Aprobados',
            text: mensaje,
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    } else {
        Swal.fire({
            title: 'No hay alumnos aprobados',
            text: 'No hay alumnos con promedio mayor o igual a 6.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
    }
}

function mostrarTodosLosAlumnos() {
    if (cursado.length > 0) {
        let mensaje = cursado.map(alumno => {
            let promedio = alumno.promedio().toFixed(2);
            return `${alumno.nombre} (Promedio: ${promedio})`;
        }).join("\n");

        Swal.fire({
            title: 'Todos los Alumnos',
            text: mensaje,
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    } else {
        Swal.fire({
            title: 'No hay alumnos registrados',
            text: 'Aún no se han agregado alumnos.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
    }
}

function filtrarDesaprobados() {
    let aprobado = cursado.filter(alumno => alumno.promedio() < 6);
    if (aprobado.length > 0) {
        let mensaje = aprobado.map(alumno => {
            
            let promedio = alumno.promedio().toFixed(2);
            return `${alumno.nombre} (Promedio: ${promedio})`;
        }).join("\n");

        Swal.fire({
            title: 'Alumnos Desaprobados',
            text: mensaje,
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    } else {
        Swal.fire({
            title: 'No hay alumnos Desaprobados',
            text: 'No hay alumnos con promedio mayor o igual a 6.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
    }
}

let mostrarDesaprobados= document.getElementById("desaprobados")
mostrarDesaprobados.addEventListener("click", function(event){
    event.preventDefault();
    filtrarDesaprobados();
})

let mostrarTodos = document.getElementById("mostrarTodos");
mostrarTodos.addEventListener("click", function(event) {
    event.preventDefault();
    mostrarTodosLosAlumnos();
});

let agregarFormulario = document.getElementById("formularioAlumno");
agregarFormulario.addEventListener("submit", agregarAlumnos);

let filtrar = document.getElementById("mostrar");
filtrar.addEventListener("click", function(event) {
    event.preventDefault(); 
    filtrarAprobados();
});