import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { User } from '../../_models/user';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  availableRoles = [
    'Admin',
    'Moderator',
    'Member'
  ];


  constructor(private adminService: AdminService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: users => this.users = users
    })
  }

  openRolesModal(user: User) {
    const config: NgbModalOptions = {
      centered: true
    };
    const rolesModalRef = this.modalService.open(RolesModalComponent, config);
    rolesModalRef.componentInstance.username = user.username;
    rolesModalRef.componentInstance.availableRoles = this.availableRoles;
    rolesModalRef.componentInstance.selectedRoles = [...user.roles];

    const updateRoles = (updatedRoles: string[]) => {
      if (updatedRoles) {
        user.roles = updatedRoles;
        this.adminService.updateUserRoles(user.username, updatedRoles).subscribe({
          next: _ => { }
        })
      }
    };
    rolesModalRef.closed.subscribe(updateRoles);
    rolesModalRef.dismissed.subscribe(updateRoles);
  }
}
