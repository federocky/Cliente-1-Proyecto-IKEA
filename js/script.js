
window.addEventListener("load", function () {

    var listaProductos = [[1, "GRIFO", 2.50, "producto1", 10], [2, "ESPEJO", 50.00, "producto2", 8], [3, "LAVABO", 25.95, "producto3", 10], [4, "VÁTER", 5.99, "producto4", 10]];
    var carrito = [];

    var producto=0;
    var precioProducto;
    var descripcionProducto;
    var codigoProducto;

    var flag = false;
    var mensajeError = document.getElementById("codigoInexistente");
    var controles = document.getElementById("controles");
    var cantidad=0;
    
    var posicionListaProductos = 0;

    /**
     * Boton buscar busca el codigo, lo muestra si encuentra el producto y muestra mensaje de error en caso contrario.
     */
    document.getElementById("botonEnviar").addEventListener("click", function () {
        var codigoIntroducido = document.getElementById("cuadroTexto").value;
        var productoEncontrado = false;
        document.getElementById("productoAgotado").style.visibility = "hidden";

        for (i = 0; i < listaProductos.length; i++) {

            if (listaProductos[i][0] == codigoIntroducido) {

                if (flag) { //oculta el producto anterior.
                    producto.style.visibility = "hidden";
                }

                //Almaceno el producto
                producto = document.getElementById(listaProductos[i][3]);
                precioProducto = listaProductos[i][2];
                descripcionProducto = listaProductos[i][1];
                codigoProducto = listaProductos[i][0];
                cantidadProductoStock = listaProductos[i][4];
                posicionListaProductos = i;

                //Muestro el producto y los controles
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
            producto.style.visibility = "hidden"; //FIXME: Si la primera vez mete un numero incorrecto salta error en la consola ya que no hay ningun producto almacenado en la variable producto 
            controles.style.visibility = "hidden";
        }

    });

    /**
     * Boton cancelar limpia la pantalla basicamente.
     */
    document.getElementById("botonCancelar").addEventListener("click", function(){
        
        document.getElementById("cuadroTexto"). value = "";
        producto.style.visibility = "hidden";
        controles.style.visibility = "hidden";
        mensajeError.style.visibility = "hidden";
        document.getElementById("productoAgotado").style.visibility = "hidden";
    });

    /**
     * Botones de control de cantidad, aumentan o disminuyen la cantidad de articulos que se desean comprar/eliminar. siempre controlando los extremos.
     */
    document.getElementById("botonMenos").addEventListener("click", function(){
        cantidad = document.getElementById("variableCantidad").innerHTML;
        if (cantidad > 1) document.getElementById("variableCantidad").innerHTML = Number(cantidad) - 1;
    });

    document.getElementById("botonMas").addEventListener("click", function(){
        cantidad = document.getElementById("variableCantidad").innerHTML;
        if(cantidad < Number(document.getElementById("variableStock").innerHTML)) document.getElementById("variableCantidad").innerHTML = Number(cantidad) + 1;
        //FIXME:no me deja aumentar el numero para eliminar, si no hay stock, pero de momento puedo hacerlo uno a uno. 
    });

    /**
     * Agrega el producto al carro siempre que hay stock suficiente.
     */
    document.getElementById("botonAgregar").addEventListener("click", function(){
        var encontrado = false;

        if (document.getElementById("variableStock").innerHTML > 0) {
            for (i = 0; i < carrito.length; i++) {

                if (carrito[i][0] == codigoProducto) { // si ya tengo ese producto actualizo la cantidad
                    carrito[i][3] = Number(carrito[i][3]) + Number(document.getElementById("variableCantidad").innerHTML); //Actualiza la cantidad en el carro
                    listaProductos[posicionListaProductos][4] -= Number(document.getElementById("variableCantidad").innerHTML); //Actualiza la cantidad en stock
                    document.getElementById("variableStock").innerHTML = listaProductos[posicionListaProductos][4]; //Muestra por pantalla el nuevo stock
                    document.getElementById("variableCantidad").innerHTML = 1; //reincia la cantidad de compra en pantalla
                    encontrado = true; 
                }

            }

            if (!encontrado) { // si no tengo ese producto tengo que agregarlo.
                carrito.push([codigoProducto, descripcionProducto, precioProducto, document.getElementById("variableCantidad").innerHTML]); //Agrega el producto al carrito
                listaProductos[posicionListaProductos][4] -= Number(document.getElementById("variableCantidad").innerHTML); //Actualiza el stock en el almacen
                document.getElementById("variableStock").innerHTML = listaProductos[posicionListaProductos][4]; //Actualiza el stock en pantalla
                document.getElementById("variableCantidad").innerHTML = 1; //Actualiza la cantidad de compra en pantalla
                console.log(carrito);
            }

            //Muestro y oculto mensaje de agregado al carro
            document.getElementById("mensaje").style.visibility = "visible";
            setTimeout(function () {
                document.getElementById("mensaje").style.visibility = "hidden";
            }, 2000);

        } else {
            document.getElementById("productoAgotado").style.visibility = "visible";
        }

        
    });

    /**
     * Elimina el articulo del carrito siempre y cuando lo tenga. 
     */
    document.getElementById("botonQuitar").addEventListener("click", function(){
        encontrado = false;

        for (i = 0; i < carrito.length; i++) {

            if (carrito[i][0] == codigoProducto) {

                if (Number(document.getElementById("variableCantidad"). innerHTML) >= carrito[i][3]) {
                    listaProductos[posicionListaProductos][4] += Number(carrito[i][3]);
                    document.getElementById("variableStock").innerHTML = listaProductos[posicionListaProductos][4]; //Actualiza el stock en pantalla
                    carrito.splice(i, 1); // Elimino el articulo del carro.
                    

                } else {
                    listaProductos[posicionListaProductos][4] += Number(document.getElementById("variableCantidad"). innerHTML); //Actualizo stock en almacen
                    document.getElementById("variableStock").innerHTML = listaProductos[posicionListaProductos][4]; //Actualiza el stock en pantalla
                    carrito[i][3] -= Number(document.getElementById("variableCantidad"). innerHTML); //Actualizo en carrito.
                }
                encontrado = true;
                
                                 
            }
        }
        if (!encontrado){
            document.getElementById("mensajeQuitar").innerHTML = "No tienes ese producto"; // FIXME: deberia mostrar este mensaje pero no esta funcionando.
        } 

        //Muestro y oculto mensaje de actualizado al carro
        document.getElementById("mensajeQuitar").style.visibility = "visible";
        setTimeout(function () {
            document.getElementById("mensajeQuitar").style.visibility = "hidden";
        }, 2000);
        
        document.getElementById("mensajeQuitar").innerHTML = "Carrito actualizado correctamente";

    });

    /**
     * Muestra el contenido del carrito en un alert. Deberia hacerlo en el HTML pero no se bien escribir ahi.
     */
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

