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
import { ModalUpdateAvatarComponent } from './modals/modal-update-avatar/modal-update-avatar.component';
import { ModalUpdateUserComponent } from './modals/modal-update-user/modal-update-user.component';
import { ModalUpdateEmailComponent } from './modals/modal-update-email/modal-update-email.component';
import { ModalUpdatePasswordComponent } from './modals/modal-update-password/modal-update-password.component';
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
    SurveysComponent,
    ModalUpdateAvatarComponent,
    ModalUpdateUserComponent,
    ModalUpdateEmailComponent,
    ModalUpdatePasswordComponent
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
