//=================CATEGORIAS=================
import { categoriaActiva } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { handleRenderList } from "../views/store";

export const handleFilterProductByCategory = (categoryIn) => {
  const products = handleGetProductLocalStorage();

  // Validar si products no está vacío o indefinido
  if (!products || products.length === 0) {
    console.error("No se encontraron productos en el localStorage.");
    handleRenderList([]); // Renderizar vacío si no hay productos
    return;
  }

  switch (categoryIn) {
    case categoriaActiva:
      handleRenderList(products);
      break;
    case "All":
      handleRenderList(products);
      break;
    case "Hamburguesas":
    case "Papas":
    case "Gaseosas":
      const result = products.filter((el) => el.categoria === categoryIn);
      handleRenderList(result);
      break;
    case "PrecioMayor":
      const resultPrecioMayor = [...products].sort((a, b) => b.precio - a.precio);
      handleRenderList(resultPrecioMayor);
      break;
    case "PrecioMenor":
      const resultPrecioMenor = [...products].sort((a, b) => a.precio - b.precio);
      handleRenderList(resultPrecioMenor);
      break;
    default:
      console.warn(`Categoría no reconocida: ${categoryIn}`);
      break;
  }  
};

// render de la vista de categorias
export const renderCategories = () => {
  //tomamos elementos de la lista
  const ulList = document.getElementById("listFilter");
  //creamos esos elementos dentro de la lista
  ulList.innerHTML = `
      <li  id="All">Todo</li>
      <li  id="Hamburguesas">Haburguesas</li>
      <li  id="Papas">Papas</li>
      <li  id="Gaseosas">Gaseosas</li>
      <li  id="PrecioMayor">Precio Mayor</li>
      <li  id="PrecioMenor">Precio Menor</li>
      `;
  //añadimos de forma dinámica el evento click
  const liElements = ulList.querySelectorAll("li");
  liElements.forEach((liElement) => {
    liElement.addEventListener("click", () => {
      handleClick(liElement);
    });
  });
  //verificamos y manejamos el estilo del elemento activo
  const handleClick = (elemento) => {
    handleFilterProductByCategory(elemento.id);
    liElements.forEach((el) => {
      if (el.classList.contains("liActive")) {
        el.classList.remove("liActive");
      } else {
        if (elemento == el) {
          el.classList.add("liActive");
        }
      }
    });
  };
};
