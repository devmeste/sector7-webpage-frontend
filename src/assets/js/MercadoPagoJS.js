


export class MercadoPagoJS {

    createButton(mpCode) {
        return new Promise((resolve, reject) => {
            let mp = new MercadoPago('APP_USR-cd1e6255-76b0-4b9f-a190-38d992de3558', {
                locale: 'es-AR'
            });

            mp.bricks().create("wallet", "wallet-container", {
                initialization: {
                    preferenceId: mpCode
                }
            }).then(() => {
                resolve('Bricks ready!');
            }).catch((error) => {
                console.error('Error creating button:', error);
                reject(error);
            });
        });
    }
}
