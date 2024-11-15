import { setProductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { openModal } from "./modal";

//========STORE========

//funcion que se encarga de traer los elementos y llamar al render
export const handleGetProductsToStore = () => {
  const products = handleGetProductLocalStorage();
  handleRenderList(products);
};

//se encarga de filtrar y de renderizar la seccion con todos sus respectivos elementos
export const handleRenderList = (productsIn) => {
  //filtrado de arrays por categorias
  const burgers = productsIn.filter((el) => el.categoria === "Hamburguesas");
  const gaseosa = productsIn.filter((el) => el.categoria === "Gaseosas");
  const papas = productsIn.filter((el) => el.categoria === "Papas");

  //renderiza los elementos de la seccion
  const renderProductGroup = (productos, title) => {
    if (productos.length > 0) {
      const productosHTML = productos.map((producto, index) => {
        return `<div class='containerTargetItem'
             id="product-${producto.categoria}-${index}">
            <div>
            <img src='${producto.imagen}'/>
            <div>
            <h2>${producto.nombre}</h2>
            </div>
            <div  class='targetProps'>
            <p><b>Precio:</b> $ ${producto.precio}</p>
            <p><b>Categoria:</b> ${producto.categoria}</p>
            </div>
            </div>
            </div> `;
      });
      //retornar la seccion con todos los elementos dentro
      return `
        <section class='sectionStore'>
        <div class='containerTitleSection'>
                <h3>${title}</h3>
        </div>
        <div class='containerProductStore'>
        ${productosHTML.join("")}
        </div>
        </section>
        `;
    } else {
      return "";
    }
  };
    //renderizar los productos dentro de su categoria
    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
      ${renderProductGroup(burgers, "Hamburguesas")}
      ${renderProductGroup(gaseosa, "Gaseosas")}
      ${renderProductGroup(papas, "Papas")}
      `;

  //añade los eventos de manera dinamica
  const addEvents = (productsIn) => {
    if(productsIn){
    productsIn.forEach((element, index) => {
      const productContainer = document.getElementById(
        `product-${element.categoria}-${index}`
      );
        productContainer.addEventListener("click", () => {
          setProductoActivo(element);
          openModal();
        });
      });
      }
    };
  addEvents(burgers);
  addEvents(gaseosa);
  addEvents(papas);
};
