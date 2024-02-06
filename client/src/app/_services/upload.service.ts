import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseUrl = environment.apiUrl + 'users/add-photo';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  upload(file: File): void {
    const formData: FormData = new FormData();
    formData.append('file', file);


    this.http.post(this.baseUrl, formData)
      .subscribe(res => {
        this.toastr.success("You uploaded the photo")
      })


  }
}