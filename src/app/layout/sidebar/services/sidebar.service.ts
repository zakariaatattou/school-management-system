import { BooleanInput } from '@angular/cdk/coercion';
import { Injectable, signal } from '@angular/core';
import { ISidebarItem } from '../models/sideBarItem';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarItems = signal<ISidebarItem[]>([
    {
      title: "Dashboard",
      icon: "dashboard",
      route: "/dashboard"
    },
    {
      title: "Students",
      icon: "supervised_user_circle",
      route: "/students"
    },
    {
      title: "Users",
      icon: "person",
      route: "/users"
    },
    {
      title: "Roles",
      icon: "security",
      route: "/roles"
    },
    {
      title: "Settings",
      icon: "settings",
      route: "/settings"
    },
  ]);
  private sidebarCollapsed = signal<BooleanInput>(false);
  constructor() { }

  public getSidebarItems() {
    return this.sidebarItems()
  }

  public toggleSidebarCollapse() {
    this.sidebarCollapsed.set(!this.sidebarCollapsed())
  }


  get sidebarCollapsedGetter() {
    return this.sidebarCollapsed()
  }





}
