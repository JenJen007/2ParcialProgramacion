//=========LOCALSTORAGE=========//
//Traer productos
export const handleGetProductLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem("products"));
    if (products) {
        return products;
    } else {
        return [];
    }
};
    //guardarEn localstorage
    //recibir un producto
  export const setInLocalStorage = (productIn) => {
        if(productIn){
        //traer los elementos
        let productInLocal = handleGetProductLocalStorage();
        const existingIndex = productInLocal.findIndex(
            (productsLocal) => productsLocal.id === productIn.id
        );
           //verificar si el elemento ya existe
        if (existingIndex !== -1) {
             //si existe debe reemplazarse
            productInLocal[existingIndex] = productIn;
        } else {
            //si no debe agregarse
            productInLocal.push(productIn);
        }
        //setear el nuevo array
        localStorage.setItem("products", JSON.stringify(productInLocal));
    }
};