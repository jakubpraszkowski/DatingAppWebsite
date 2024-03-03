import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TabService } from '../../_services/tab.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined;

  constructor(private memberService: MembersService, private toastr: ToastrService, private router: Router,
    private tabService: TabService) { }

  ngOnInit(): void {

  }

  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe({
      next: _ => {
        this.toastr.success('You have liked ' + member.knownAs);
      }
    })
  }

  goToMessages(member: Member) {
    this.router.navigate(['/members', member.userName]);
    this.tabService.changeTab(3);
  }
}
