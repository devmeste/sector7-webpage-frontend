


export class MiClase {

    constructor() {
        this.valor = 0;
    }

    metodo() {
        console.log('Método de la clase en JavaScript');
        let mp = new MercadoPago('APP_USR-cd1e6255-76b0-4b9f-a190-38d992de3558', {
            locale: 'es-AR'
        });
        return mp;
    }


}






// try {
//     let boton;
//     console.log("Entro aca");
//     boton.addEventListener('click', (event) => {
//         event.preventDefault();
//         makePurchase();
//     });
// } catch (e) {
//     console.log("Este es el error");
//     boton.addEventListener('click', (event) => {
//         event.preventDefault();
//         makePurchase();
//     });
// }

// boton.addEventListener('click', (event) => {
//     event.preventDefault();
//     makePurchase();
// });

// console.log("Cargo el HTML");


// async function makePurchase() {

//     boton = document.getElementById('boton');

//     console.log(boton);

//     boton.addEventListener('click', (event) => {
//         event.preventDefault();
//         makePurchase();
//     });


//     // let mp = new MercadoPago('APP_USR-cd1e6255-76b0-4b9f-a190-38d992de3558', {
//     //     locale: 'es-AR'
//     // });

//     // generateRequestBody();

//     // let cartService = new CartService();

//     let jsonResponse = localStorage.getItem('cart');

//     let token = localStorage.getItem('token');

//     console.log(jsonResponse);

//     // await fetch("http://localhost:8001/api/v1/es/purchase/make", {
//     //     method: "POST",
//     //     body: JSON.stringify(jsonResponse),
//     //     headers: {
//     //         "Accept": "application/json",
//     //         "Authorization": `Bearer ${token}`,
//     //         "Content-type": "application/json"
//     //     }
//     // }).then(response => {
//     //     if(response.ok){
//     //         response.text().then(mpCode => {
//     //             console.log(mpCode);

//     //             createMpButton(mpCode);
//     //         })
//     //     }
//     // }).catch(error => console.log(error));
// }