import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WorkspaceListComponent } from './workspace-list/workspace-list.component';

const routes: Routes = [
    {path: 'list', component: WorkspaceListComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
