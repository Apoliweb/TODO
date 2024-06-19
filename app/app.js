let botonSend = document.querySelector(".boton");
let mostrarTareas = document.querySelector(".mostrarTarea");

botonSend.addEventListener("click", crearTarea);

let contador = 0;

function crearTarea() {
  let inputText = document.querySelector(".input").value;
  inputText.value = "";
  let crearCaja = document.createElement("div");
  let contenedorBotones = document.createElement("div");
  /*Con esto me permite agregar un id autoincrementable */
  crearCaja.setAttribute("id", contador);
  contador++;
  crearCaja.classList.add("cajas");
  contenedorBotones.classList.add("contenedorBotones");
  let texto = document.createElement("p");

  texto.innerText = inputText;

  crearCaja.appendChild(texto);
  mostrarTareas.appendChild(crearCaja);

  console.log(crearCaja);
  /* */
  let crearBoton = document.createElement("button");
  crearBoton.innerText = "eliminar Tarea";
  contenedorBotones.appendChild(crearBoton);
  crearCaja.appendChild(contenedorBotones);
  crearBoton.classList.add("eliminar");
  //mostrarTareas.appendChild(crearBoton)
  crearBoton.addEventListener("click", botonBorrar);
  let crearBotoneditar = document.createElement("button");

  crearBotoneditar.innerText = "Editar Tarea";

  contenedorBotones.appendChild(crearBotoneditar);
  crearCaja.appendChild(contenedorBotones);

  crearBotoneditar.classList.add("editar");
  //mostrarTareas.appendChild(crearBoton)
  crearBotoneditar.addEventListener("click", editarTarea);
}

function botonBorrar(event) {
  swal({
    title: "¿Quieres eliminar esta tarea?",
    icon: "warning",
    buttons: ["cancelar", "eliminar"],
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Poof!, tarea eliminada", {
        icon: "success",
        button: false,
      });
      let hijo = event.target.parentNode.parentNode;
      console.log(hijo);
      //aqui seleccionado al padre(donde tengo mis hijo(tareas))
      let padre = document.querySelector(".mostrarTarea");
      //con esto elimino a mis hijos(tareas)
      let eliminarTareas = padre.removeChild(hijo);
    } else {
      swal("La tarea no fue eliminada",{
        icon: "success",
        button: false,
      });
    }
  });
}

//Esta funcion hace que pueda editar la tarea que estoy haciendo
function editarTarea(event) {
  let editar = event.target.parentNode.parentNode;
  //Asi selecciono el elemento p de una tarea
  let elementoTexto = editar.querySelector("p");
  localStorage.setItem("Nombre", elementoTexto);
  let preguntaNuevotexto = prompt("");

  while (preguntaNuevotexto === "" || preguntaNuevotexto === null) {
    preguntaNuevotexto = prompt("");
  }
  let nuevoTexto = (elementoTexto.innerText = preguntaNuevotexto);

  /*
  if(preguntaNuevotexto==''){
   nuevoTexto=preguntaNuevotexto.innerText=elementoTexto
   console.log(nuevoTexto)
    alert('Hola')
  }else{

  }
*/
  //let nuevoTexto=(nuevoTexto=texto)
  //console.log(nuevoTexto)
}
