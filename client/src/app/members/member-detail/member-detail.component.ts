import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabChangeEvent, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeService } from '../../_services/time.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
  imports: [CommonModule, MatTabsModule, GalleryModule]
})

export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('photoTab') photoTab!: MatTabGroup;

  member: Member | undefined;
  images: GalleryItem[] = [];
  isPhotoTabActive: boolean = false;
  timeAgo: string | undefined;
  intervalId: any;

  constructor(private memberService: MembersService, private route: ActivatedRoute, private timeService: TimeService) { }

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
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member,
          this.getImages()
        this.timeAgo = this.member?.lastActive ? this.timeService.getTimeAgo(this.member.lastActive) : '';
      }
    });
  }

  getImages() {
    if (!this.member) return;
    for (const photo of this.member?.photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }))
    }
  }

  onTabChange(event: MatTabChangeEvent) {
    this.isPhotoTabActive = event.index === 2;
  }

  updateTimeAgo() {
    if (this.member?.lastActive) {
      this.timeAgo = this.timeService.getTimeAgo(this.member.lastActive);
    }
  }
}
