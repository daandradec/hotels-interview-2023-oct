// Funcion para generar una imagen aleatoria de un listado sin repetir el valor anterior
export function randomPicture(images: string[], limit: number, previous?: string): string{
    let random = images[Math.floor(Math.random()*limit)];
    if(previous){
        while(random == previous){
            random = images[Math.floor(Math.random()*limit)];
        }
    }
    return random;
}

// Funcion para generar un numero aleatorio entre un limite sin repetir el valor anterior
export function randomValue(limit: number, previous?: number): number{
    let random = Math.floor(Math.random()*limit);
    if(previous){
        while(random == previous){
            random = Math.floor(Math.random()*limit);
        }
    }
    return random;
}