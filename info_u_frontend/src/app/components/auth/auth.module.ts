import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper'

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { SideBarComponent } from './profile/side-bar/side-bar.component';
import { UpdateComponent } from './profile/update/update.component';
import { SurveysComponent } from './profile/surveys/surveys.component';
;

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    RecoveryPasswordComponent,
    SideBarComponent,
    UpdateComponent,
    SurveysComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    NgxFileDropModule
  ]
})
export class AuthModule { }
