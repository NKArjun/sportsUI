import { Component, OnInit } from '@angular/core';
import { ImageserviceService } from './imageservice.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  url;
  image;
  userName;
  fileToUpload: File = null;
  selectedFile: ImageSnippet;
  imageUrl: String;
  profileForm: FormGroup;
  showSpinnerPage = false;
  show = false;
  noProfile = false;
  spinnerUpload = false;
  spinnerUpdate = false;
  constructor(private imgService: ImageserviceService, private http: HttpClient, private toast: ToastrService, private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      batsman: ['', Validators.required],
      bowler: ['', Validators.required],
      ability: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.image = sessionStorage.getItem('userName') + '.jpg';
    this.userName = sessionStorage.getItem('userName');
    this.getImage();
  }

  processFile(file: FileList) {
    this.fileToUpload = file.item(0);
    const read = new FileReader();
    read.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.show = true;
    }
    read.readAsDataURL(this.fileToUpload);
  }

  uploadImage() {
    this.spinnerUpload = true;
    var reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result;
    }
    const formData = new FormData();
    var fileName = sessionStorage.getItem('userName');
    formData.append('profile', this.fileToUpload, fileName);
    this.http.post('https://sportsservice.azurewebsites.net/upload', formData).subscribe(data => {
      window.location.reload();
      this.spinnerUpload = false;
      this.toast.success("Successfully Uploaded");
    }, err => {
      this.spinnerUpload = false;
      this.toast.error('Your Profile Photo is not Uploaded Please try again later');
    })
  }

  getImage() {
    this.showSpinnerPage = true;
    this.http.get('https://sportsservice.azurewebsites.net/getImage/' + this.userName, { responseType: 'text' }).subscribe(data => {
      this.showSpinnerPage = false;
      if (data == 'Not Found') {
        this.noProfile = true;
      }
    })
  }

  update() {
    this.spinnerUpdate = true;
    let profile = {
      "userId": sessionStorage.getItem('userId'),
      "batsman": this.profileForm.controls.batsman.value,
      "bowler": this.profileForm.controls.bowler.value,
      "ability": this.profileForm.controls.ability.value
    }
    this.imgService.updateProfile(profile).subscribe(result => {
      this.spinnerUpdate = false;
      this.toast.success('Your Profile is Updated');
    }, err => {
      this.spinnerUpdate = false;
      this.toast.error('Some Error Occurred Please Try again later');
    })
  }

  deleteImage() {
    this.http.delete('https://sportsservice.azurewebsites.net/delete/' + this.userName).subscribe(result => {
      window.location.reload();
      this.toast.info(result['message']);
      this.noProfile = true;
    })
  }
}
