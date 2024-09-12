import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import BKProduct from 'app/core/models/BKProduct';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';
import { ProductService } from 'app/core/services/product_service/product.service';
import { CardsChildrenAbstractComponent } from '../cards-children';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';
import { ConfirmPopUpComponent } from "../../../../../shared/components/pop_up/confirm-pop-up/confirm-pop-up.component";
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";

@Component({
  selector: 'app-mothers',
  standalone: true,
  imports: [TwoColorsCardComponent, ConfirmPopUpComponent, InputDangerTextComponent],
  templateUrl: './mothers.component.html',
  styleUrl: './mothers.component.scss'
})
export class MothersComponent extends CardsChildrenAbstractComponent {

  override pathToContinue: string = 'memorias';
  override section: string = 'mothers';
  showPopUpToConfirmDeleteNextStep: any;
  newMotherSelected!: BuildYourPcCartEntry;
  thereIsPreviousStepSelected: boolean = true; // for default


  getRequirement() {
    return '';
  }




  override changeProducts() {
    
    const processorID = this._buildYourPcService.getEntryBySection('procesadores')?.selectedProductID;
    let socket = '';
    let generation = '';

    if (processorID) {
      const product = this._productsService.getProductById(processorID).subscribe(product => {

        let fieldsJSON = JSON.parse(product?.fieldsJSON);
        Object.keys(fieldsJSON).forEach(key => {
          if (key === 'Socket') {
            socket = fieldsJSON[key];
          } else if (key === 'Generación') {
            generation = fieldsJSON[key];
          }
        })

        if (socket && generation) {
          this._productsService.getAllProductsBySocketAndGeneration('Mothers', socket, generation).subscribe(productsResponse => {
            this.products = productsResponse.products;
            this.setTheSelectedProductFirst();

          });

        } 

      }

      );
    }else{
      console.log("No hay procesador selecionado, es necesario para elegir una memoria.");
      this.thereIsPreviousStepSelected = false;
      // this._router.navigate(['/build-your-pc/linea']);
    }
  }


  confirmDeleteAndContinue() {
    this.closeModal('showPopUpToConfirmDeleteNextStep');

    this._buildYourPcService.removeEntryBySection('mothers');
    this._buildYourPcService.removeEntryBySection('memorias');

    this.takeProductToCart(this.newMotherSelected);
    
    
  }
  closeModal(option: string) {
    switch (option) {
      case 'showPopUpToConfirmDeleteNextStep':
        this.showPopUpToConfirmDeleteNextStep = false;
        break;
      default: throw new Error('Invalid option');
    }
  }

  takeProductToCart( entry : BuildYourPcCartEntry){
    const newEntry: BuildYourPcCartEntry = {
      selectedProductID: entry.selectedProductID,
      categoryName: 'Mothers',
      selectedProductName: entry.selectedProductName,
      selectedProductQuantity: 1,
      selectedProductPrice: entry.selectedProductPrice,
      selectedProductPhoto: entry.selectedProductPhoto
    }
    this._buildYourPcService.addToCart(newEntry);
    this._router.navigate(['build-your-pc/Memorias']);
  }


  override addToCart(cartEntry: BuildYourPcCartEntry): void {
      
    const memoryChosenID= this._buildYourPcService.getEntryBySection('Memorias')?.selectedProductID;
    const isCompatible=false;

    if(memoryChosenID){
      console.log(memoryChosenID);
      this._productsService.checkCompatibility(cartEntry.selectedProductID, memoryChosenID ).subscribe(response => {
        if(response.condition===false){
          this.showPopUpToConfirmDeleteNextStep = true;
          this.newMotherSelected = cartEntry;
        }
        else{
          this.takeProductToCart(cartEntry);
        }
      })
    }else{
      this.takeProductToCart(cartEntry);
    }
  }
}
