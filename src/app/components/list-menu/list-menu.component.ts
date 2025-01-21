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
    {text: "Users", routerLink: "users"},
    {text: "Category", routerLink: "category"},
    {text: "Chores", routerLink: "chores"},
    {text: "Restricted Content", routerLink: "restricted-content"},
    {text: "User Login", routerLink: "user-login"}
  ]
}
