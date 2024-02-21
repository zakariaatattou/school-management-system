import { Component } from '@angular/core';
import { SidebarService } from './services/sidebar.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, RouterModule, MatIconModule, MatButtonModule,],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  user = this.userService.getUser()
  constructor(public sidebarService: SidebarService, private userService: UserService
  ) {
  }
}
