import { Component } from '@angular/core';
import { MenuEntry } from '../../shared/interfaces/menu-entry';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-list-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './list-menu.component.html',
  styleUrl: './list-menu.component.css'
})
export class ListMenuComponent {

  menu : MenuEntry[] = [
    {text: "User Registration", routerLink: "user"},
    {text: "Category", routerLink: "category"},
    {text: "Chore", routerLink: "chore"},
    {text: "User Login", routerLink: "user-login"}
  ]
}
