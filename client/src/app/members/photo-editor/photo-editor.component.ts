import { Component, Input } from '@angular/core';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { environment } from '../../../environments/environment';
import { UploadService } from '../../_services/upload.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})

export class PhotoEditorComponent {
  @Input() member: Member | undefined;
  file = File;
  baseUrl = environment.apiUrl;
  user: User | undefined;

  selectedFiles?: FileList;
  currentFile?: File;
  message = '';

  constructor(private readonly uploadService: UploadService) { }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    console.log("dupcia");
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      console.log("jebac disa");
      if (file) {
        this.currentFile = file;
        console.log("wbijasz malutka");
        this.uploadService.upload(this.currentFile);
      }
    }
  }
}