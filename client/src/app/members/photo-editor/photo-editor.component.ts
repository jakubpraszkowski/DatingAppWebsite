import { Component, Input } from '@angular/core';
import { Member } from '../../_models/member';
import { environment } from '../../../environments/environment';
import { UploadService } from '../../_services/upload.service';
import { Photo } from '../../_models/photo';
import { MembersService } from '../../_services/members.service';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})

export class PhotoEditorComponent {
  @Input() member: Member | undefined;
  user: User | undefined;
  file = File;
  baseUrl = environment.apiUrl;

  selectedFiles?: FileList;
  currentFile?: File;

  constructor(private readonly uploadService: UploadService, private memberService: MembersService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user
      }
    })
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }


  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: _ => {
        if (this.user && this.member) {
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user)
          this.member.photoUrl = photo.url;
          this.member.photos.forEach(p => {
            if (p.isMain) p.isMain = false;
            if (p.id === photo.id) p.isMain = true;
          })
        }
      }
    })
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe({
      next: _ => {
        if (this.member) {
          this.member.photos = this.member.photos.filter(x => x.id !== photoId);
        }
      }
    })
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.uploadService.upload(this.currentFile).subscribe({
          next: (photo) => {
            if (this.member) {
              this.member.photos.push(photo);
              if (this.member.photos.length === 1) {
                this.setMainPhoto(photo);
              }
            }
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
    }
  }
}