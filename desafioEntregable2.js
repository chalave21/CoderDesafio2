const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    const products = this.getProducts();
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
    product.id = lastProductId + 1;
     // Validar que no exista un producto con el mismo código
    const productWithSameCode = products.find((p) => p.code === product.code);
    if (productWithSameCode) {
        throw new Error(`Ya existe un producto con el código ${product.code}`);
    }
    products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(products));
  }

  getProducts() {
    if (!fs.existsSync(this.path)) {
      return [];
    }
    const productsData = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(productsData);
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find((product) => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex >= 0) {
      const updatedProduct = { ...products[productIndex], ...updatedFields, id };
      products[productIndex] = updatedProduct;
      fs.writeFileSync(this.path, JSON.stringify(products));
    }
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const updatedProducts = products.filter((product) => product.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(updatedProducts));
  }
}


const productManager1 = new ProductManager('./products.json');

productManager1.addProduct({
  title: 'Producto 1',
  description: 'Descripción del producto 1',
  price: 10.99,
  thumbnail: 'ruta/de/la/imagen.jpg',
  code: 'PROD1',
  stock: 100,
});


const products = productManager1.getProducts();
console.log(products);

const product = productManager1.getProductById(1);
console.log(product);

productManager1.updateProduct(1, { price: 12.99, stock: 50 });

productManager1.deleteProduct(1);