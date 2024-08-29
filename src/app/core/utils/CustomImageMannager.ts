export function convertImageUrlToByteArray(url: string): Promise<number[]> {
    
    return fetch(url)
        .then(response => response.blob()) // Obtener la imagen como un Blob
        .then(blob => {
            return new Promise<number[]>((resolve, reject) => {
                const reader = new FileReader();

                reader.readAsArrayBuffer(blob);
                reader.onloadend = () => {
                    const int8Array = new Int8Array(reader.result as ArrayBuffer);
                    const byteArray = Array.from(int8Array);
                    resolve(byteArray); // Resolviendo la promesa con el array de bytes
                };

                reader.onerror = (error) => {
                    console.error('Error al leer la imagen: ', error);
                    reject(error); // Rechazando la promesa si ocurre un error
                };
            });
        })
        .catch(error => {
            console.error('Error al obtener la imagen desde la URL: ', error);
            throw error; // Lanza el error para que pueda ser manejado en el lugar donde se llama la función
        });
}

export function convertNumberArrayToImage(numberArray: number[]) : string {
    // Convierte el arreglo de números a un Uint8Array
   const uint8Array = new Uint8Array(numberArray);

   // Crea un Blob a partir del byte array
   const blob = new Blob([uint8Array], { type: 'image/jpeg' }); // Ajusta el tipo de imagen si es necesario
 
   // Genera una URL a partir del Blob
   const imageUrl = URL.createObjectURL(blob);
 
   return imageUrl;
 }
 


 export function convert_all_strings_into_byte_arrays(imagesString: string[]): Promise<number[][]> {
        return Promise.all(
            imagesString.map(async (imageUrl) => {
                let blob: Blob;
                if (imageUrl.startsWith('blob:')) {
                    // Si es una URL de Blob, simplemente conviértela directamente
                    const response = await fetch(imageUrl);
                    blob = await response.blob();
                } else if (imageUrl.startsWith('https://') || imageUrl.startsWith('http://')) {
                    // Si es una URL remota, haz un fetch para obtener la imagen como Blob
                    const response = await fetch(imageUrl);
                    blob = await response.blob();
                } else {
                    throw new Error('Formato de URL no soportado');
                }
    
                return new Promise<number[]>((resolve, reject) => {
                    const reader = new FileReader();
    
                    reader.readAsArrayBuffer(blob);
                    reader.onloadend = () => {
                        const int8Array = new Int8Array(reader.result as ArrayBuffer);
                        const byteArray = Array.from(int8Array);
                        resolve(byteArray);
                    };
    
                    reader.onerror = (error) => {
                        console.error('Error al leer la imagen: ', error);
                        reject(error);
                    };
                });
            })
        );
    }
    

