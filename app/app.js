const formulario = document.querySelector(".formulario");
const input = document.querySelector(".input-text");
const boton = document.querySelector(".input-boton");
let BaseArray = [];

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "") {
    swal({
      title:'No puedes dejarlo en blanco',
      icon: "info",
    }
     );
  } else {
    Html();
    //Con esto borro el input
    input.value=""
  }
});

/**
 * * Jala los datos que tengo el en localStorage y los ejecuta el en DOM
 *  */
window.onload = function () {
  if (localStorage.length === 0 || localStorage === null) {
    console.log("Esta vacio");
  } else {
    BaseArray = JSON.parse(localStorage.getItem("data"));
    createTask();
  }
};
/*
document.addEventListener('DOMContentLoaded',()=>{


})
*/
/**
 * * Crea un objeto de como debe estar la estructura de la tarea
 *
 */
class Creartarea {
  constructor() {
    this.id = Math.round(Math.random() * 100);
    this.titulo = input.value;
  }
}

/*
 * La función Html() crea una nueva tarea usando el objeto Creartarea
 * a partir del valor del input, y la agrega al array BaseArray.
 * Luego, guarda el contenido actualizado de BaseArray en el localStorage
 * mediante la función dataLocal(), y finalmente actualiza el DOM para
 * reflejar la nueva tarea agregada utilizando la función createTask().
 *
 * Pasos:
 * - Crea un objeto de tarea y lo agrega a BaseArray.
 * - Actualiza el localStorage con los datos actuales.
 * - Llama a createTask() para refrescar la visualización en el DOM.
 */

function Html() {
  let algo = new Creartarea(input.value);
  BaseArray.push(algo);
  dataLocal();
  createTask();
}

function dataLocal() {
  localStorage.setItem("data", JSON.stringify(BaseArray));
}

function createTask() {
  const Html = BaseArray.map((BaseArray) => {
    return `<div class="caja" data-id=${BaseArray.id}>
    <div class="texto">    <p>${BaseArray.titulo}</p></div>    
<div class="contenedor-botones">
    <button class="boton " data-id=${BaseArray.id}> <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#fff"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>Borrar</button>
    <button class="botonEditar" data-id=${BaseArray.id}><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /></svg>Editar</button>
</div>

</div>
    `;
  });

  const contenedorTareas = document.querySelector(".imprimir");
  contenedorTareas.innerHTML = Html.join("");

  const botones = document.querySelectorAll(".boton");
  botones.forEach((boton) => {
    boton.addEventListener("click", borrarTarea);
  });

  const botonesEditar = document.querySelectorAll(".botonEditar");
  botonesEditar.forEach((botoneditar) => {
    botoneditar.addEventListener("click", editarTarea);
  });
}

/* Con esto se puede obtener el id del boton precionado */

function borrarTarea(event) {
  //con esto tengo el valor del Id del boton
  let eventoBoton = event.target.getAttribute("data-id");
  console.log(eventoBoton);
  swal({
    title: "Quieres eliminar la tarea?",
    text: "Estas seguro de que quieres eliminar la tarea!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {

      let buscar = BaseArray.filter(
        (element) => element.id != parseInt(eventoBoton)
      );
      //Lo que hace es actualizar el valor que tengo en buscar con lo que tengo en el array
      let actualizarArray = (BaseArray = buscar);
      //Con esto actualiza los datos en el localStorage
      localStorage.setItem("data", JSON.stringify(actualizarArray));
      console.log(actualizarArray);
      //con esto va funcion actualiazr para que se elimine el contenido del dom
      createTask();
      swal("La tarea fue elimina de manera satisfactoria", {
        icon: "success",
      });
    } else {
      swal("La tarea no fue eliminada");
    }
  });


}

function editarTarea(event) {
  let eventoEditar = event.target.getAttribute("data-id");
  console.log("eventoEditar");

  let editar = BaseArray.find(
    (element) => element.id === parseInt(eventoEditar)
  );
  let inputNuevaTarea = prompt("Quieres cambiar la tarea");

  while(inputNuevaTarea===''|| inputNuevaTarea===null){
    inputNuevaTarea = prompt("Quieres cambiar la tarea");

  }
  let cambio = (editar.titulo = inputNuevaTarea);
  //let actualiazr=BaseArray=cambio
  console.log(cambio);
    /*
     *  Para actualizar un registro
     */
    localStorage.setItem("data", JSON.stringify(BaseArray));
  
    createTask();
  }


function modal(){

}