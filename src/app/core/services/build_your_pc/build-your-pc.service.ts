import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuildYourPcService {

  constructor() { }

  buildYourPcCart: BuildYourPcCart = {
    Procesador: 'Procesador gamer Intel Core i9-13900K (9a. generación)',
    Motherboard: 'Motherboard Asus Prime A320m-k Am4 Ddr4 ATX',
    MemoriaRAM: null,
    Almacenamiento: 'Disco sólido interno Crucial CT240BX500SSD1 240GB negro',
    FuenteDePoder: 'XCORE Power XCP630-TS 3200 mhz 16 Gb 80+ gold',
    TarjetaDeVideo: null,
    SistemaDeEnfriamiento: null,
    Monitor: null,
    Audifonos: null,
    Teclado: null,
    Mouse: null,
  };

  getBuildYourPcCart() {
    return this.buildYourPcCart;
  }
}

interface BuildYourPcCart {
  Procesador: string | null;
  Motherboard: string | null;
  MemoriaRAM: string | null;
  Almacenamiento: string | null;
  FuenteDePoder: string | null;
  TarjetaDeVideo: string | null;
  SistemaDeEnfriamiento: string | null;
  Monitor: string | null;
  Audifonos: string | null;
  Teclado: string | null;
  Mouse: string | null;
}




























//   constructor() { }

//   buildYourPcCart: BuildYourPcCart = {
//     processor: 'Procesador gamer Intel Core i9-13900K (9a. generación)',
//     motherboard: 'Motherboard Asus Prime A320m-k Am4 Ddr4 ATX ',
//     memory_ram: ' Hyper X ddr4 3200 mhz 16 Gb',
//     storage_device: 'Disco sólido interno Crucial CT240BX500SSD1 240GB negro',
//     power_supply: 'XCORE Power XCP630-TS  3200 mhz 16 Gb 80+ gold',
//     video_card: null,
//     cooling_system: null,
//     monitor:null,
//     headset:  null,
//     keyboard: null,
//     mouse: null,
//   };

//   getBuildYourPcCart() {
//     return this.buildYourPcCart;
//   }

// }

// interface BuildYourPcCart {
//   processor: string | null;
//   motherboard: string | null;
//   memory_ram: string | null;
//   storage_device: string | null;
//   power_supply: string | null;
//   video_card: string | null;
//   cooling_system: string | null;
//   monitor: string | null;
//   headset: string | null;
//   keyboard: string | null;
//   mouse: string | null;
// }
