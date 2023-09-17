import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  items: MenuItem[] | undefined;
  userName = 'Itamar'

  constructor(private messageService: MessageService,
    private _router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Hello ' + this.userName + '!',
        items: [
          {
            label: 'Tasks',
            icon: 'pi pi-check-circle',
            command: () => {
              this.changeRoute('/tasks');
            }
          },
          {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => {
              this.changeRoute('/profile');
            }
          }
        ]
      }
    ];
  }

  changeRoute(route: string) {
    this._router.navigate([route]);
  }

  delete() {
    this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
  }
}
