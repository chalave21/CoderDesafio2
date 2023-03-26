const fs = require("fs");

class ProductManager{
    static id = 1;
    static products = [];
    constructor(){
        this.products = ProductManager.products;
        this.id = ProductManager.id++;
        this.path = "./dataProducts.json";
    }


    addProduct(title, description, price, thumbnail, code, stock) {
        if(this.products.some(product => product.code === code)) {
            console.log(`Lo siento, el código: ${code} ya existe, por favor coloque otro código.`);
            return;
        }else{
            try {
                this.products.push({
                    id: this.id,
                    title:title,
                    description:description,
                    price:price,
                    thumbnail:thumbnail,
                    code:code,
                    stock:stock,
                });
                if(this.products.length === 0){
                    const product = this.products;
                    const productStringify = JSON.stringify(product,null,2);
                 fs.writeFileSync(this.path,productStringify,"utf-8");
                }else{
                    const product = this.products;
                    const productStringify = JSON.stringify(product,null,2);
                 fs.appendFileSync(this.path,productStringify,"utf-8");
                }
                

                console.log(`Producto agregado exitosamente.`)
            }
            catch (error){
                console.log(error);
            }
        }
    }

    getProducts(){
        return this.products;
    }

    getProductsById(id){
        const product = this.products.find(product => product.id === id);
        if(product){
            return product;
        } else {
            console.log("No se encontro el ID especificado");
            return null;
        }
    }

    updateProduct(id, field, value) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            // Verificar que no se elimine el id del producto.
            if (field === "id") {
                console.log("No se puede actualizar el id del producto.");
                return;
            }
            // Actualizar el campo del producto.
            product[field] = value;

            // Escribir el arreglo de productos actualizado en el archivo JSON.
            const productStringify = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, productStringify, "utf-8");

            console.log(`Producto actualizado exitosamente.`)
        } else {
            console.log("No se encontro el ID especificado");
        }
    }

    // Método para eliminar un producto por su id del arreglo de productos.
    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            // Eliminar el producto del arreglo de productos.
            this.products.splice(index, 1);

            // Escribir el arreglo de productos actualizado en el archivo JSON.
            const productStringify = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, productStringify, "utf-8");

            console.log(`Producto eliminado exitosamente.`)
        } else {
            console.log("No se encontro el ID especificado");
        }
    }

}

///////////////////////////////

//////////////////////////////
//Se crea una instancia de ProductManager.
const yerba = new ProductManager();
 const cocaCola = new ProductManager();
//se llama a la instancia recien creada, devuelve un arreglo vacio.
console.log(yerba.getProducts());
//se llama al metodo addProduct:

//Yerba.
yerba.addProduct("Yerba Mate Amanda","1kg, edicion especial.",600,"https://carrefourar.vtexassets.com/arquivos/ids/209355-800-auto?v=637644769314600000&width=800&height=auto&aspect=true",`AB${647}C`,127);
//Coca-Cola.
cocaCola.addProduct("Coca Cola","1kg, edicion especial.",600,"https://carrefourar.vtexassets.com/arquivos/ids/209355-800-auto?v=637644769314600000&width=800&height=auto&aspect=true",`AC${647}D`,127);

//se llama getProducts() y muestra el producto recien agregado.
console.log(yerba.getProducts());
//se llama a addProducts con el mismo codigo de arriba y arroja un error.
yerba.addProduct("Yerba Mate Amanda","1kg, edicion especial.",600,"https://carrefourar.vtexassets.com/arquivos/ids/209355-800-auto?v=637644769314600000&width=800&height=auto&aspect=true",`AB${647}C`,127);
//Se llama a getProductById().
console.log(yerba.getProductsById(22));

yerba.updateProduct(1,"title","Yerba Mate Playadito");

yerba.deleteProduct(1);