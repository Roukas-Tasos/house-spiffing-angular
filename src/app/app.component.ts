import { Component, Input } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ListMenuComponent } from './components/list-menu/list-menu.component';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingComponent, ListMenuComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
