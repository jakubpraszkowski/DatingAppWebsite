import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { TimeService } from '../../_services/time.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member | undefined;
  user: User | null = null;
  timeAgo: string | undefined;
  intervalId: any;

  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService, private timeService: TimeService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnInit(): void {
    this.loadMember();
    this.updateTimeAgo();
    this.intervalId = setInterval(() => this.updateTimeAgo(), 60 * 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => {
        this.member = member;
        if (this.member?.lastActive) {
          this.timeAgo = this.timeService.getTimeAgo(this.member?.lastActive);
        }
      }

    })
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member)
      }
    })
  }

  updateTimeAgo() {
    if (this.member?.lastActive) {
      this.timeAgo = this.timeService.getTimeAgo(this.member.lastActive);
    }
  }
}
