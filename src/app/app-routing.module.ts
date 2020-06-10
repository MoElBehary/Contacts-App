import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { LoginComponent } from './Login/login/login.component'
import { ContactsComponent } from './contacts/contacts.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'app', component: ContactsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
