import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
    CommonModule
  ],
  exports:[UserDetailsComponent
  ,FormsModule,CommonModule]
})
export class SharedModule { }
