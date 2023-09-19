import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cancelticket',
  templateUrl: './cancelticket.component.html',
  styleUrls: ['./cancelticket.component.css']
})
export class CancelticketComponent {
  UserName: any;
  Email: any;
  Contact: string = '';
  Image: string = '';
  AccountNo:string='';
  showSuccessMessage: boolean = false;

  constructor(private httpClient: HttpClient) {}

  submitDetails() {
    const requestData = {
      UserName: this.UserName,
      Email: this.Email,
      Contact: this.Contact,
      Image: this.Image,
      AccountNo:this.AccountNo
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Simulate a successful submission for demonstration purposes.
    setTimeout(() => {
      this.showSuccessMessage = true;
    }, 1000);

    this.httpClient
      .post('https://localhost:44331/api/refunds', requestData, { headers })
      .subscribe(
        (response) => {
          console.log('Data sent:', response);
          this.showSuccessMessage = true;
        },
        (error) => {
          console.error('Error sending data:', error);
        }
      );
  }

 
}





