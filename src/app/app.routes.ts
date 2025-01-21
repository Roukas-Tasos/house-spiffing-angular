import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { ChoreComponent } from './components/chore/chore.component';
import { LandingComponent } from './components/landing/landing.component';
import { RestrictedContentComponent } from './components/restricted-content/restricted-content.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { authGuard } from './shared/guards/auth.guard';
import { CategoryDashboardComponent } from './components/category/category-dashboard/category-dashboard.component';
import { CategoryNavbarComponent } from './components/category/category-navbar/category-navbar.component';
import { CategoryCreateComponent } from './components/category/category-create/category-create.component';
import { CategoryUpdateComponent } from './components/category/category-update/category-update.component';
import { CategoryReadComponent } from './components/category/category-read/category-read.component';

export const routes: Routes = [
{path: '', component: LandingComponent},
{path: 'users', component: UserComponent},
{path: 'chores', component: ChoreComponent, canActivate:[authGuard] },
{path: 'restricted-content', component: RestrictedContentComponent, canActivate:[authGuard]},
{path: 'user-login', component: UserLoginComponent},
{path: 'category', component: CategoryDashboardComponent, canActivate:[authGuard] },
{path: 'category-create', component: CategoryCreateComponent, canActivate:[authGuard]},
{path: 'category-update', component: CategoryUpdateComponent, canActivate:[authGuard]},
{path: 'category-read', component: CategoryReadComponent, canActivate:[authGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
