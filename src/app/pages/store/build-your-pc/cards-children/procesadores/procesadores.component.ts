import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import BKProduct from 'app/core/models/BKProduct';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';
import { ProductService } from 'app/core/services/product_service/product.service';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';
import { CardsChildrenAbstractComponent } from '../cards-children';
import { ConfirmPopUpComponent } from "../../../../../shared/components/pop_up/confirm-pop-up/confirm-pop-up.component";

@Component({
  selector: 'app-procesadores',
  standalone: true,
  imports: [TwoColorsCardComponent, ConfirmPopUpComponent],
  templateUrl: './procesadores.component.html',
  styleUrl: './procesadores.component.scss'
})
export class ProcesadoresComponent extends CardsChildrenAbstractComponent {

  override section: string = 'procesadores';
  override pathToContinue: string = 'mothers';
  showPopUpToConfirmDeleteNextStep = false;
  newProcessorSelected !: BuildYourPcCartEntry ;


  lineAndProcessorAreCompatible(entryToVerify: BuildYourPcCartEntry, lineToVerify: BuildYourPcCartEntry) {
    return lineToVerify.selectedProductName === entryToVerify.selectedProductName;
  }

  override changeProducts() {
    const requirement = this.getRequirement();
    this._productsService.getAllProductsByCategory(this.section, requirement).subscribe(productsResponse => {
      this.products = productsResponse.products;
    })
  }

  override addToCart(cartEntry: BuildYourPcCartEntry) {

    const motherCosenID = this._buildYourPcService.getEntryBySection('Mothers')?.selectedProductID;
    const isCompatible = false;
    if (motherCosenID) {
      this._productsService.checkCompatibility(cartEntry.selectedProductID, motherCosenID).subscribe(response => {
        if (response.condition === false) {
          this.showPopUpToConfirmDeleteNextStep = true;
          this.newProcessorSelected = cartEntry;
        }
        else {
          // const newEntry: BuildYourPcCartEntry = {
          //   selectedProductID: cartEntry.selectedProductID,
          //   categoryName: 'procesadores',
          //   selectedProductName: cartEntry.selectedProductName,
          //   selectedProductQuantity: 1,
          //   selectedProductPrice: cartEntry.selectedProductPrice,
          //   selectedProductPhoto: cartEntry.selectedProductPhoto
          // }
          // this._buildYourPcService.addToCart(newEntry);
          // this._router.navigate(['build-your-pc/mothers']);
          this.takeProductToCart(cartEntry);
        }
      })

    } else {
      // const newEntry: BuildYourPcCartEntry = {
      //   selectedProductID: cartEntry.selectedProductID,
      //   categoryName: 'procesadores',
      //   selectedProductName: cartEntry.selectedProductName,
      //   selectedProductQuantity: 1,
      //   selectedProductPrice: cartEntry.selectedProductPrice,
      //   selectedProductPhoto: cartEntry.selectedProductPhoto
      // }
      // this._buildYourPcService.addToCart(newEntry);
      // this._router.navigate(['build-your-pc/mothers']);
      this.takeProductToCart(cartEntry);
    }



  }

  takeProductToCart( entry : BuildYourPcCartEntry){
    const newEntry: BuildYourPcCartEntry = {
      selectedProductID: entry.selectedProductID,
      categoryName: 'Procesadores',
      selectedProductName: entry.selectedProductName,
      selectedProductQuantity: 1,
      selectedProductPrice: entry.selectedProductPrice,
      selectedProductPhoto: entry.selectedProductPhoto
    }
    this._buildYourPcService.addToCart(newEntry);
    this._router.navigate(['build-your-pc/mothers']);
  }

  getRequirement() {
    const linea = this._buildYourPcService.getEntryBySection('linea')?.selectedProductName;
    if (linea) {
      return linea;
    } else {
      return '';
    }
  }

  confirmDeleteAndContinue() {
    this.closeModal('showPopUpToConfirmDeleteNextStep');

    this._buildYourPcService.removeEntryBySection('mothers');
    this._buildYourPcService.removeEntryBySection('memorias');

    this.takeProductToCart(this.newProcessorSelected);
    
    
  }
  closeModal(option: string) {
    switch (option) {
      case 'showPopUpToConfirmDeleteNextStep':
        this.showPopUpToConfirmDeleteNextStep = false;
        break;
      default: throw new Error('Invalid option');
    }
  }



  //1. Llamamos a la api de productos por categoria
  //2. pido el carrito
  //3. dependiendo la pantalla en la que estoy, pido el atributo que necesite para filtrar
  // 4.si en la pantalla que estoy, necesito algo de lo anterior, lo mando para atras



}
