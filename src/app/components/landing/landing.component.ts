import { Component, Input, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, MatIconModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  @Input() title = 'House Spiffing!';

  userService = inject(UserService);
  user = this.userService.user;

  logout() {
  this.userService.logoutUser();
  }

}
