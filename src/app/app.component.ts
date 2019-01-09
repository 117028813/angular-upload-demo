import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  imageObj = {name: null, dataSrc: null}

  constructor(private http: HttpClient) {}
  
  upload(file) {
    console.log(file.files)

    const formData = new FormData()
    for (let i = 0; i < file.files.length; i++) {
      formData.append(`file${i}`, file.files[i])
    }
    this.http.post('http://localhost:3000/upload', formData).subscribe((data:any) => {
      console.log(data)
    })
  }

  onChange(image) {
    console.log(image.files[0])
    if (!image.files[0].type.match(/image/)) {
      console.log('type error')
      return
    }
    this.imageObj.name = image.files[0].name
    const reader = new FileReader()
    reader.readAsDataURL(image.files[0])
    reader.addEventListener('load', () => this.imageObj.dataSrc = reader.result)
  }

  uploadImage() {
    this.http.post('http://localhost:3000/uploadImage', JSON.stringify({image: this.imageObj})).subscribe((data: any) => {
      console.log(data)
    })
  }

}
