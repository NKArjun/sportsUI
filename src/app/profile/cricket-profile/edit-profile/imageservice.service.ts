import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageserviceService {

  constructor(private http:HttpClient) { }

  uploadImage(image:File):Observable<any>{
    const formData = new FormData();
    formData.append('Image',image,image.name);
    return this.http.post('../../../../assets/images',formData);
  }

  updateProfile(form):Observable<any>{
    return this.http.post('https://sportsservice.azurewebsites.net/updateProfile',form);
  }
}
