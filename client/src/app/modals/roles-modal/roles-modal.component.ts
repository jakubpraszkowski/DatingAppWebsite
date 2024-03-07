import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.css'
})
export class RolesModalComponent {
  username = '';
  availableRoles: any[] = [];
  selectedRoles: any[] = [];

  constructor(public activeModal: NgbActiveModal) { }

  updateCheckedRoles(checkedValue: string) {
    const index = this.selectedRoles.indexOf(checkedValue);
    index !== -1 ? this.selectedRoles.splice(index, 1) : this.selectedRoles.push(checkedValue);
  }

  submit() {
    this.activeModal.close(this.selectedRoles);
  }
}