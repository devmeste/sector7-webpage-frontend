import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { IUserResponse } from 'app/core/models/IUserResponse';
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { UpdateForm } from 'app/pages/admin/children_pages/build_your_pc_filters/sockets/sockets-update-pop-up/update-form';
import { Observable } from 'rxjs';
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { NgClass } from '@angular/common';
import { convertImageUrlToByteArray, convertNumberArrayToImage } from 'app/core/utils/CustomImageMannager';
import { ImageUploaderComponent } from "../../../../../shared/components/image-uploader/image-uploader.component";
import { IUser, UserData } from 'app/core/models/IUser';
import { HttpErrorResponse } from '@angular/common/http';
import { OneMessageResponse } from 'app/core/models/OneMessageResponse';
import { SpinnerS7Component } from "../../../../../shared/components/spinners/spinner-s7/spinner-s7.component";

@Component({
  selector: 'app-user-update-pop-up',
  standalone: true,
  imports: [MessagePopUpComponent, InputDangerTextComponent, ReactiveFormsModule, NgClass, ImageUploaderComponent, SpinnerS7Component],
  templateUrl: './user-update-pop-up.component.html',
  styleUrl: './user-update-pop-up.component.scss'
})
export class UserUpdatePopUpComponent extends UpdateForm {

  _authService = inject(AuthService);
  photoByteArray: number[] = [];
  photoString = "";
  override successMessage: string = '';
  isLoading: boolean = false;
  override element$!: IUserResponse;

  // is used to open the image uploader without button, just clicking the photo
  openInputImage: boolean = false;


  override getElementToUpdate(): Observable<IUserResponse> {
    return this._authService.getUser();
  }

  override confirmNoNullFields(): boolean {
    throw new Error('Method is not necesary here. i must create a new implementation for updateForm later ');
  }



  override initializeForm(): void {
    
    this.getElementToUpdate().subscribe(user => {
      this.isLoading=true;
      this.element$ = user;
      console.log(user);
      this.form = this.formBuilder.group({
        firstName: [user.firstname, [Validators.required]],
        lastName: [user.lastname, [Validators.required]],
        areaCode: [user.areaCode, [Validators.required]],
        cellphoneNumber: [user.cellphoneNumber, [Validators.required]],
      })

      this.handleUserPhotoUrl(user.presignedUrlPhoto);
    })

  }
  async handleUserPhotoUrl(presignedUrlPhoto: string) {
    this.photoByteArray = await convertImageUrlToByteArray(presignedUrlPhoto);
    this.photoString = convertNumberArrayToImage(this.photoByteArray);
    this.isLoading = false;
  }

  updatePhoto($event: number[]) {
    this.photoByteArray = $event;
    this.photoString = convertNumberArrayToImage($event);
  }


  


  override send($event: SubmitEvent): void {
    this.isLoading = true;

    const updatedUser: UserData = {
      firstname: this.form.get('firstName')?.value,
      lastname: this.form.get('lastName')?.value,
      areaCode: this.form.get('areaCode')?.value,
      cellphoneNumber: this.form.get('cellphoneNumber')?.value,
      email: this.element$.email,
      photo: this.photoByteArray
    }

    this._authService.updateUser(updatedUser).subscribe(
          {
          next: ( response : OneMessageResponse ) => {
            this.elementUpdatedSuccessfully = true;
            this.successMessage = response.message;
            this.isLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            this.elementUpdateFailed = true;
            this.errorMessage = err.error.message;
            this.isLoading = false;
          }
        })
      }
     
}

