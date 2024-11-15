import { productoActivo, setProductoActivo } from "../../main";
import { handleDeleteProduct } from "../services/product";

/**==========POPUP========== */
const cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", () => {
  closeModal();
});

//FUNCIONES ABRIR Y CERRAR MODAL
export const openModal = () => {
  const modal = document.getElementById("modalPopUp");
  modal.style.display = "flex";
  const buttonDelete = document.getElementById("deleteButton");
if(productoActivo){
buttonDelete.style.display = "block";
}else{
buttonDelete.style.display = "none";
}

  if(productoActivo){
    const name = document.getElementById("name");
    const image = document.getElementById("image");
    const price = document.getElementById("precio");
    const category = document.getElementById("category");
    name.value = productoActivo.nombre;
    image.value = productoActivo.imagen;
    price.value = productoActivo.precio;
    category.value = productoActivo.categoria;
  }
};
export const closeModal = () => {
  const modal = document.getElementById("modalPopUp");
  modal.style.display = "none";
  setProductoActivo(null);
  resetModal();
};
const resetModal = () => {
  const nombre = document.getElementById("name");
  const imagen = document.getElementById("image");
  const precio = document.getElementById("precio");
  const category = document.getElementById("category");
  nombre.value = "";
  imagen.value = "";
  precio.value = 0;
  category.value = "Seleccione una categoria";
};

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", () => {
  handleButtonDelete();
});
const handleButtonDelete = () => {
  handleDeleteProduct();
};
