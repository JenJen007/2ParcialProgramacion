import Swal from "sweetalert2";
import { productoActivo } from "../../main";
import { handleGetProductLocalStorage, setInLocalStorage } from "../persistence/localStorage";
import { closeModal } from "../views/modal";
import { handleGetProductsToStore, handleRenderList } from "../views/store";

/**==========PRODUCTS==========*/

//Guardar
const aceptButton = document.getElementById("aceptButton");
aceptButton.addEventListener("click", () => {
  handleSaveOrModifyElement();
});
//Funcion guardar y modificar
const handleSaveOrModifyElement = () => {
  const nombre = document.getElementById("name").value;
  const imagen = document.getElementById("image").value;
  const precio = document.getElementById("precio").value;
  const categoria = document.getElementById("category").value;
  let object = null;
  if(productoActivo){
    object = {
      ...productoActivo,
      nombre,
      imagen,
      precio,
      categoria,
    };
  }else{
    object = {
      id: new Date().toISOString(),
      nombre,
      imagen,
      precio,
      categoria,
    };
  }
  Swal.fire({
    title: "Confirmado!",
    text: "Producto agregado con éxito!",
    icon: "success"
  });
   
  setInLocalStorage(object);
  handleGetProductsToStore();
  closeModal();
};

//Eliminar Producto
export const handleDeleteProduct = () => {
  Swal.fire({
    title: "¿Desea eliminar producto?",
    text: "Si lo eliminas no podras recuperarlo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!"
  }).then((result) => {
    if (result.isConfirmed) {
      const products = handleGetProductLocalStorage();
      const result = products.filter((el) => el.id !== productoActivo.id);
      //setear el nuevo array
      localStorage.setItem("products", JSON.stringify(result));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
      handleGetProductsToStore(); 
      const newProducts = handleGetProductLocalStorage();
      handleRenderList(newProducts);
      closeModal();                         
    }else{
      closeModal();
    }
  });

}