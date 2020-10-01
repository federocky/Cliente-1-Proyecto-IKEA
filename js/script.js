
window.addEventListener("load", function () {

    var listaProductos = [[1, "Producto 1", 2.50, "producto1", 10], [2, "Producto 2", 50.00, "producto2", 8], [3, "Producto 3", 25.95, "producto3", 10], [4, "Producto 4", 5.99, "producto4", 10]];
    var carrito = [];

    var producto;
    var precioProducto;
    var descripcionProducto;
    var codigoProducto;
    var cantidadProductoStock;

    var flag = false;
    var mensajeError = document.getElementById("codigoInexistente");
    var controles = document.getElementById("controles");
    var cantidad=0;
    
    var posicionListaProductos = 0;


    document.getElementById("botonEnviar").addEventListener("click", function () {
        var codigoIntroducido = document.getElementById("cuadroTexto").value;
        var productoEncontrado = false;

        for (i = 0; i < listaProductos.length; i++) {

            if (listaProductos[i][0] == codigoIntroducido) {

                if (flag) { //oculta el producto anterior.
                    producto.style.visibility = "hidden";
                }

                producto = document.getElementById(listaProductos[i][3]);
                precioProducto = listaProductos[i][2];
                descripcionProducto = listaProductos[i][1];
                codigoProducto = listaProductos[i][0];
                cantidadProductoStock = listaProductos[i][4];
                posicionListaProductos = i;

                producto.style.visibility = "visible";
                controles.style.visibility = "visible";
                document.getElementById("variableStock").innerHTML = listaProductos[i][4];
                document.getElementById("variableCantidad").innerHTML = 1;

                flag = true;
                productoEncontrado = true;
                mensajeError.style.visibility = "hidden";
                //document.getElementById("mensaje").style.visibility = "hidden";
            }    

        }

        if (!productoEncontrado) {
            mensajeError.style.visibility = "visible";
            //producto = document.getElementById("producto1"); // esto es una trampa para evitar que si el primer codigo introducido no existe no salte error ya que producto no existiria
            producto.style.visibility = "hidden";
            controles.style.visibility = "hidden";
        }

    });


    document.getElementById("botonCancelar").addEventListener("click", function(){

        document.getElementById("cuadroTexto"). value = "";
        producto.style.visibility = "hidden";
        controles.style.visibility = "hidden";
        mensajeError.style.visibility = "hidden";
    });

    document.getElementById("botonMenos").addEventListener("click", function(){
        cantidad = document.getElementById("variableCantidad").innerHTML;
        if (cantidad > 1) document.getElementById("variableCantidad").innerHTML = Number(cantidad) - 1;
    });

    document.getElementById("botonMas").addEventListener("click", function(){
        cantidad = document.getElementById("variableCantidad").innerHTML;
        if(cantidad < Number(document.getElementById("variableStock").innerHTML)) document.getElementById("variableCantidad").innerHTML = Number(cantidad) + 1;
    });


    document.getElementById("botonAgregar").addEventListener("click", function(){
        var encontrado = false;

        if (document.getElementById("variableStock").innerHTML > 0) {
            for (i = 0; i < carrito.length; i++) {

                if (carrito[i][0] == codigoProducto) {
                    carrito[i][3] = Number(carrito[i][3]) + Number(document.getElementById("variableCantidad").innerHTML);
                    listaProductos[posicionListaProductos][4] -= Number(document.getElementById("variableCantidad").innerHTML);
                    document.getElementById("variableStock").innerHTML = listaProductos[posicionListaProductos][4];
                    document.getElementById("variableCantidad").innerHTML = 1;
                    encontrado = true;
                }

            }

            if (!encontrado) {
                carrito.push([codigoProducto, descripcionProducto, precioProducto, document.getElementById("variableCantidad").innerHTML]);
                listaProductos[posicionListaProductos][4] -= Number(document.getElementById("variableCantidad").innerHTML);
                document.getElementById("variableStock").innerHTML = listaProductos[posicionListaProductos][4];
                document.getElementById("variableCantidad").innerHTML = 1;
                console.log(carrito);
            }

            document.getElementById("mensaje").style.visibility = "visible";
            setTimeout(function () {
                document.getElementById("mensaje").style.visibility = "hidden";
            }, 2000);
        }

        
    });


    document.getElementById("carrito").addEventListener("click", function(){
        var resultado="";
        var total = 0;

        for(i=0; i< carrito.length; i++){
            resultado += carrito[i][1]+" cantidad: "+carrito[i][3] + " precio= "+carrito[i][2] + ", precio total=" + carrito[i][3]*carrito[i][2]+"\n";
            total += carrito[i][3]*carrito[i][2];
        }

        alert(resultado += "---------------\n TOTAL= "+total);
    });

});

