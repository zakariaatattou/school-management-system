import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { SidebarService } from '../sidebar/services/sidebar.service';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title: string = '';
  constructor(public sidebarService: SidebarService,
    private titleService: Title,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {
    // Change page title on navigation or language change, based on route data
    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    onNavigationEnd
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route: any) => route.outlet === 'primary'),
        switchMap((route: any) => route.data)
      )
      .subscribe((event: any) => {
        this.title = event.title
        this.titleService.setTitle(event.title);
      });

  }


  logout() {
    this.authService.logout()
  }
}
