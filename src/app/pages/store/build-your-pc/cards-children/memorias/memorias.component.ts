import { Component } from '@angular/core';
import { CardsChildrenAbstractComponent } from '../cards-children';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";

@Component({
  selector: 'app-memorias',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: './memorias.component.html',
  styleUrl: './memorias.component.scss'
})
export class MemoriasComponent extends CardsChildrenAbstractComponent {

  
  override section: string = 'memorias';
  override pathToContinue: string = 'almacenamiento';
  thereIsPreviousStepSelected: boolean = true;


  override getRequirement(): string {

    

    return '';
  }


  override changeProducts() {
    const motherChosenID = this._buildYourPcService.getEntryBySection('mothers')?.selectedProductID;
    let type = '';

    if (motherChosenID) {
      const memoryChosen = this._productsService.getProductById(motherChosenID).subscribe(memory => {

        let fieldsJSON = JSON.parse(memory?.fieldsJSON);
        console.log(fieldsJSON);
        Object.keys(fieldsJSON).forEach(key => {
          if (key === 'Tipo de memoria') {
            type = fieldsJSON[key];
          } 
        })

        if (type) {
          this._productsService.getAllMemoriesByType(type).subscribe(productsResponse => {
            this.products = productsResponse.products;
          });

        } 

      }

      );
    }else{
      
      console.log("No hay mother selecionada, es necesaria para elegir una memoria.");
      this.thereIsPreviousStepSelected = false;
      // this._router.navigate(['build-your-pc/linea']);
    }
  }
}
