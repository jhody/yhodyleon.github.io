const tipos = [
  { idTipo: 1, nombreTipo: "Platos" },
  { idTipo: 2, nombreTipo: "Bebidas" },
  { idTipo: 3, nombreTipo: "Postres" }
];

const categorias = [
  { idCategoria: 1, nombreCategoria: "Fondo", idTipo: 1 },
  { idCategoria: 2, nombreCategoria: "Entradas", idTipo: 1 },
  { idCategoria: 3, nombreCategoria: "Sopas", idTipo: 1 },
  { idCategoria: 4, nombreCategoria: "Cocktails", idTipo: 2 },
  { idCategoria: 5, nombreCategoria: "Refrescos", idTipo: 2 },
  { idCategoria: 6, nombreCategoria: "Jugo de Frutas", idTipo: 2 },
  { idCategoria: 7, nombreCategoria: "Helados", idTipo: 3 },
  { idCategoria: 8, nombreCategoria: "Tortas", idTipo: 3 }
]
const formPlatos = document.getElementById("formPlatos");
const inputNombre = document.getElementById("inputNombre");
const inputPrecio = document.getElementById("inputPrecio");
const selectTipo = document.getElementById("selectTipo");
const selectCategoria = document.getElementById("selectCategoria");
const tablaBody = document.getElementById("tbody");

const resetearFormulario = () => {
  formPlatos.reset();
  formPlatos.querySelectorAll(".errorValidate").forEach((elem)=>{
    elem.classList.remove("errorValidate");
  })
  selectCategoria.innerHTML = "<option value='0'>-Seleccione Categoria-</option>";
}

const llenarTipos = () => {

  tipos.forEach((tipo) => {
    let miOption = document.createElement("option");
    miOption.innerText = tipo.nombreTipo;
    miOption.value = tipo.idTipo;
    selectTipo.appendChild(miOption);
  })

}
llenarTipos();

const llenarCategoriasPorId = (idTipo) => {
  if (idTipo === 0) {
    selectCategoria.innerHTML = "<option value='0'>-Seleccione Categoria-</option>";
    return;
  }
  selectCategoria.innerHTML = "";
  
  let categoriasPorTipo = categorias.filter((cat) => {
    if (cat.idTipo === idTipo) {
      return cat;
    }
  });

  categoriasPorTipo.forEach((cat) => {
    let optionCat = document.createElement("option");
    optionCat.innerText = cat.nombreCategoria;
    optionCat.value = cat.idCategoria;
    selectCategoria.appendChild(optionCat);
  })

}
const load_tabla=()=>{
  let contenLista="";
  lista_platos.forEach((plato,elem)=>{
    let buscar_tipo=tipos.find((tipo)=>{
      if(plato.idTipo==tipo.idTipo){
        return tipo;
      }
    })
    let buscar_categoria=categorias.find((categoria)=>{
      if(plato.idCategoria==categoria.idCategoria){
        return categoria;
      }
    })
    contenLista+=`<tr>
                      <td>${elem+1}</td>
                      <td>${plato.nombre}</td>
                      <td>${plato.precio}</td>
                      <td>${buscar_tipo.nombreTipo}</td>
                      <td>${buscar_categoria.nombreCategoria}</td>
                  </tr>
    `;
  })
  tablaBody.innerHTML=contenLista;
}

/**
 * elemento.onchange Se ejecuta cada vez que un input o select
 * cambia su valor, es decir cuando se selecciona un "option"
 */
selectTipo.onchange = (e) => {
  let idTipo = +selectTipo.value;
  llenarCategoriasPorId(idTipo);
}
let lista_platos=[];
formPlatos.onsubmit = (e) => {
  e.preventDefault();
  let nombre = inputNombre.value;
  let precio = inputPrecio.value;
  let tipo = selectTipo.value;
  let categoria = selectCategoria.value;
  let msj="";
  if(nombre.trim()==""){
    inputNombre.classList.remove("errorValidate");
    inputNombre.classList.add("errorValidate");
    msj+=" * Ingrese un Nombre\n";
  }
  if(precio.trim()==""){
    inputPrecio.classList.add("errorValidate");
    msj+=" * Ingrese un Precio\n";
  }
  if(tipo=="0"){
    selectTipo.classList.add("errorValidate");
    msj+=" * Seleccione un Tipo\n";
  }
  if(categoria=="0"){
    selectCategoria.classList.add("errorValidate");
    msj+=" * Seleccione una Categoría\n";
  }
  if (msj.length>0) {
    formPlatos.classList.add("errorFormulario");
    alert(`Corregir los siguientes errores:\n${msj}`);
    return;
  }
  formPlatos.classList.remove("errorFormulario");
  let objPlato = {
    nombre: nombre,
    precio: precio,
    idTipo: tipo,
    idCategoria: categoria
  }
  console.log(objPlato);

  lista_platos.push(objPlato);
  load_tabla();
  resetearFormulario();
}
