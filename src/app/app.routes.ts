import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { authGuard } from './shared/guards/auth.guard';
import { CategoryDashboardComponent } from './components/category/category-dashboard/category-dashboard.component';
import { CategoryCreateComponent } from './components/category/category-create/category-create.component';
import { CategoryUpdateComponent } from './components/category/category-update/category-update.component';
import { CategoryReadComponent } from './components/category/category-read/category-read.component';
import { ChoreDashboardComponent } from './components/chore/chore-dashboard/chore-dashboard.component';
import { ChoreCreateComponent } from './components/chore/chore-create/chore-create.component';
import { ChoreReadComponent } from './components/chore/chore-read/chore-read.component';
import { ChoreUpdateComponent } from './components/chore/chore-update/chore-update.component';

export const routes: Routes = [
{path: 'user', component: UserComponent},
{path: 'user-login', component: UserLoginComponent},
{path: 'category', component: CategoryDashboardComponent, canActivate:[authGuard] },
{path: 'category-create', component: CategoryCreateComponent, canActivate:[authGuard]},
{path: 'category-update', component: CategoryUpdateComponent, canActivate:[authGuard]},
{path: 'category-read', component: CategoryReadComponent, canActivate:[authGuard]},
{path: 'chore', component: ChoreDashboardComponent, canActivate:[authGuard]},
{path: 'chore-create', component: ChoreCreateComponent, canActivate:[authGuard]},
{path: 'chore-read', component: ChoreReadComponent, canActivate:[authGuard]},
{path: 'chore-update', component: ChoreUpdateComponent, canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
