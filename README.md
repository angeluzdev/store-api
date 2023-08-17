
# Store API

API de un ecommerce que permite tener acceso a la información base que conforma una tienda online, como productos, usuarios, categorias, pagos, autenticación, filtrado, etc.

Esta API contiene:
- Distintos productos
- Filtrar los productos
- Autenticación con JWT
- Operaciones CRUD
- Categorías
- Y mucho más

🟢 AVISO 🟢
Estoy alojando la API en un plan gratuito de hosting, por ende este servicio me trae ciertas limitaciones del lado del server que escapan de mi control, una de ellas (la más importante) es que la primera consulta luego de inactividad a la API se tardará algunos segundos, ya posteriormete a esta primera consulta las demás iran mucho más rapido.
Espero comprensión.😊

## Productos
Endpoints de la sección productos
### Obtener todos los productos
                    https://store-proyect.onrender.com/api/v1/products
Respuesta:

        {
            "id": 3,
            "title": "HP Laptop de 15.6 pulgadas",
            "description": "Una laptop de 15.6 pulgadas , procesador Intel Core i5-1135G7, pantalla LED antirreflejos FHD de 15.6 pulgadas, HDMI, Wi-Fi y Bluetooth, diseño ligero, carga rápida, Windows 11 Home (16 GB de RAM | SSD de 1 TB)",
            "price": 600,
            "brand": "HP",
            "image": "https://m.media-amazon.com/images/I/71KQlw+d-yL._AC_SX466_.jpg",
            "create_at": "2023-08-10T20:24:50.000Z",
            "category": {
            "id": 2,
            "category_name": "office",
            "create_at": "2023-08-10T20:20:17.000Z"
            }
        }
### Obtener un solo producto
Se puede obtener un solo productos proporcionando su id como parámetro.

                        https://store-proyect.onrender.com/api/v1/products/{id}
Respuesta:
               
                {
                    "id": 5,
                    "title": "Súper kit de iniciación Arduino",
                    "description": "La forma más económica para empezar a programar en Arduino para los principiantes que estén interesados.",
                    "price": 45,
                    "brand": "Arduino",
                    "image": "https://m.media-amazon.com/images/I/81itBMd1hzL._SX522_.jpg",
                    "create_at": "2023-08-10T20:24:50.000Z",
                    "category": {
                    "id": 3,
                    "category_name": "electronicos",
                    "create_at": "2023-08-10T20:20:17.000Z"
                    },
                    "reviews": [
                    {
                        "id": 1,
                        "content": "Muy buen producto😝",
                        "create_at": "2023-08-12T22:10:59.000Z",
                        "username": "richi"
                    }
                    ]
                }

Se obtendrá solo un producto, añadiéndole los comentarios que este tenga.

### Crear un producto
                        [POST] https://store-proyect.onrender.com/api/v1/products
                        
                        Body:
                        {
                            "title": string,
                            "description": string,
                            "price": number,
                            "brand": string,
                            "image": string,
                            "category_id": number
                        }


Respuesta:

                        {
                            "message": "success",
                            "newId": "Nuevo id del producto ingresado"
                        }

### Actualizar producto
Se puede actualizar un producto pasando su id y las propiedades existentes que se quieran actualizar

                        [PUT] https://store-proyect.onrender.com/api/v1/products/update/{id}
                        Body:
                        {
                            "title": "Actulizando el título",
                            "price": 23
                        }
                    
Respuesta:

                        {
                            "message": "success"
                        }

### Eliminar producto
Se elimina un producto pasando su id como parámetro.

                       [DELETE] https://store-proyect.onrender.com/api/v1/products/delete/{id}


Respuesta:

                        {
                            "message": "success"
                        }

### Paginación de productos
Se puede paginar los productos así como la cantidad de productos que vendrán en esa paginación usan offset y limit, como query parameter.

                        [GET] https://store-proyect.onrender.com/api/v1/products?offset={n}&limit={m}
                        

El offset determina la página que se va a mostrar y el limit la cantidad de elementos por página, los dos deben ser números positivos.
La paginación empieza por la página 0 como si fuese la primera página.
#### Ejemplo:
                            https://store-proyect.onrender.com/api/v1/products?offset=0&limit=3


En este caso traerá los primeros 3 elementos que representan la página 1 (0);

                            https://store-proyect.onrender.com/api/v1/products?offset=1&limit=3

Traerá los siguientes 3 elementos que representan la página 2 (1)

                Recordar que la paginación empieza por el 0 que representaría la página 1, el 1 que representaría la página 2 y así consecutivamente.


## Filtración de productos
### Obtener productos por titulo
Mostrar los productos por título usando el /:t parámetro.

                            [GET] https://store-proyect.onrender.com/api/v1/products/title/:t

### Filtrar por categoria
Mostrar los productos por el id de una determinada categoria

                            [GET] https://store-proyect.onrender.com/api/v1/products/category/:id

### Filtrar por rango de precio
Mostrar los productos que estén en un rango de precios, por medio de los parámetros :min y :max

                            [GET] https://store-proyect.onrender.com/api/v1/products/range/:min/:max

## Categorias
### Obtener todas las categorias
            
                            [GET] https://store-proyect.onrender.com/api/v1/categories

Response:

                            {
                                "id": 1,
                                "category_name": "gadgets",
                                "create_at": "2023-08-02T23:47:07.000Z"
                            }

### Crear una categoria
                            [POST] https://store-proyect.onrender.com/api/v1/categories

Response:

                            {
                                "message": "success",
                                "newId": 7
                            }

### Actualizar una categoria 

                            [PUT] https://store-proyect.onrender.com/api/v1/categories/update/:id

Response:

                            {
                                "message": "success"
                            }

### Eliminar una categoria

                            [DELETE] https://store-proyect.onrender.com/api/v1/categories/delete/:id

Response:

                            {
                                "message": "success
                            }


## Reviews
El usuario tendrá la capacidad de poder realizar comentarios de un producto.
### Obtener los comentarios de un producto
Obtener todos los comentarios de un producto por su id.

                            [GET] https://store-proyect.onrender.com/api/v1/reviews/:id

Response:

                            [
                                {
                                    "id": 1,
                                    "content": "Muy buen producto😝",
                                    "user_id": 1,
                                    "product_id": 5,
                                    "create_at": "2023-08-12T22:10:59.000Z"
                                }
                            ]

### Crear un comentario

                            [POST] https://store-proyect.onrender.com/api/v1/reviews/add

                            Body:
                            {
                                "content": "Un nuevo fantástico comentario",
                                "user_id": 1,
                                "product_id": 5
                            }
    
El user_id y product_id deben ser números enteros, además de que ambos deben existir, es decir, debe ser el id de un usuario existente y el id de un producto existente.

### Eliminar un comentario
                        
                        [DELETE] https://store-proyect.onrender.com/api/v1/reviews/delete/:id
                        
Response:

                        {
                            "message": "success"
                        }

## Autenticación
El usuario podrá registrarse, iniciar sesión con su cuenta y poder reestablecer su contraseña.
Se hace uso de Tokens JWT.

### Iniciar sesión

                                [POST] https://store-proyect.onrender.com/api/v1/auth/signin
                                Body:
                                {
                                    "email": "yourEmail",
                                    "password": "yourPassword"
                                }

Response:
                    
                                {
                                    "id": 1,
                                    "username": "richi",
                                    "email": "exmaple@gmail.com",
                                    "joined": "2023-08-07T20:25:34.000Z",
                                    "role": "customer",
                                    "recovery_token": null,
                                    "token": "tokenJWTofThisAccount"
                                }
                        
### Crear cuenta

                                [POST] https://store-proyect.onrender.com/api/v1/auth/signup
                                Body:
                                {
                                    "username": "your username",
                                    "email": "your email",
                                    "password": "your new password"
                                }

Response:

                                {
                                    "id": 1,
                                    "username": "your username",
                                    "email": "example@gmail.com",
                                    "joined": "2023-08-07T20:25:34.000Z",
                                    "role": "customer",
                                    "recovery_token": null,
                                    "token": "tokenJWTofThisAccount"
                                }
                    
###  Recuperación de cuenta
Si el usuario olvidó la contraseña de su cuenta podra recuperar en el siguiente endpoint:

                            [POST] https://store-proyect.onrender.com/api/v1/auth/recovery

                            Body:
                            {
                                "email": "email de la cuenta a recuperar"
                            }

Response:

Se enviará un correo al email de la cuenta asociada que se quiere recuperar. Este email tendrá un link que lo dirigirá a que pueda cambiar la contraseña.

### Cambio de contraseña
Una vez el usuario haya recibido el correo del endpoint anterior, se usará esta ruta para poder cambia la contraseña.

                            [POST] https://store-proyect.onrender.com/api/v1/auth/change-password

                            Body:
                            {
                                "newPassword": "abc",
                                "token": "tokenJWT"
                            }


El token será proporcionado en el link de recuperación enviado al correo.

### Pagos

Esta ruta se encargará de crear las sesiones de Pago de los productos que se quieran comprar, definidos en el carrito de compras.

                            [POST] https://store-proyect.onrender.com/api/v1/payment

                            Body:
                            [
                                {
                                    "id": 3 (id del producto),
                                    "qty": 2 (cantidad de ese producto)
                                },
                                ...
                            ]

La data que se debe enviar es un arreglo conformado por objetos que contiene el id del producto y su cantidad.

Response:

Se devolverá un URL que representa la sesión de pago (alojada en stripe), aquí es donde el usuario podra realizar la compra.

## Ordenes de compra

- Para guardar en la base de datos las compras que haya echo el usuario
- Obtener las compras de un determinado usuario.

### Guardar una orden de compra

                            [POST] https://store-proyect.onrender.com/api/v1/order-products

                            Body:
                                [
                                    {
                                    "id": 3 (id del producto),
                                    "qty": 2 (cantidad de ese producto)
                                    },
                                    ...
                                ]

Response:

                {
                    "message": "success"
                }

La data que se envia es la misma que en la ruta anterior (payment). Es después de que el usuario concrete su compra en la ruta payment que se debe guardar esa compra en la BD.

### Obtener ordenes de compra de un usuario

                            [POST] https://store-proyect.onrender.com/api/v1/order-products/my-orders
