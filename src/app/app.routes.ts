import { Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards/auth.guard';
import { ProfileComponent } from './pages/students/components/profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'students',
        pathMatch: "full"
    },

    {
        path: 'login',
        loadComponent: () => import('./pages/auth/auth.component').then(x => x.AuthComponent),
        data: { title: "Student Management System | Login" }
    },

    {
        path: '',
        loadComponent: () => import('./layout/layout.component').then(x => x.LayoutComponent),
        canActivate: [AuthenticationGuard],
        children: [
            {
                path: 'students',
                loadComponent: () => import('./pages/students/students.component').then(x => x.StudentsComponent),
                data: { title: "Students" },
                // children: [
                //     {
                //         path: 'details/:id',
                //         component: ProfileComponent
                //     }
                // ]
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard.component').then(x => x.DashboardComponent),
                data: { title: "Dashboard" }
            },
            {
                path: 'users',
                loadComponent: () => import('./pages/users/users.component').then(x => x.UsersComponent),
                data: { title: "Users" }
            },
            {
                path: 'roles',
                loadComponent: () => import('./pages/roles/roles.component').then(x => x.RolesComponent),
                data: { title: "Roles" }
            },
            {
                path: 'settings',
                loadComponent: () => import('./pages/settings/settings.component').then(x => x.SettingsComponent),
                data: { title: "Settings" }
            },
        ]
    }

];
