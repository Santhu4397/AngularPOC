import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClilistComponent } from './components/clilist/clilist.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/Login/login/login.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TermsComponent } from './components/terms/terms.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { ViewNameComponent } from './components/view-name/view-name.component';
import { ViewComponent } from './components/view/view.component';
import { AuthGuard } from './guard/auth.guard';
import { ChildGuard } from './guard/child.guard';
import { LazyauthGuard } from './guard/lazyauth.guard';
import { ResolveGuard } from './guard/resolve.guard';
import { TermsGuard } from './guard/terms.guard';

const routes: Routes = [
  {
    path: "home",
    canActivate:[AuthGuard],
    component: HomeComponent
  },
  {
    path: "view",
    component: ViewComponent,

    children: [
      {
        path: "",
       canActivateChild: [ChildGuard],
        children: [
          {
            path: "user",
            component: UserlistComponent
          },
          {
            path: "client",
            component: ClilistComponent
          }
        ]
      }
    ]
  },
  {
    path: "login",
   
    component: LoginComponent
  },
  {
    path: "profile",
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  {
    path: "saveuser",
    canActivate: [AuthGuard],
   
    component: PostComponent,
  },
  
  {
    path: "contact",
   canLoad: [LazyauthGuard],
    loadChildren: () => import("./components/contact/contact.module").then(m => m.ContactModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
