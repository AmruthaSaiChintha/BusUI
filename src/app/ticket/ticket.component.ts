import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Bus {
  charges: number;
  BusName: string;
  source: string;
  destination: string;
  departureTime: string;
  departureDate: string;
}

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class ticketComponent implements OnInit {
  source: string = '';
  destination: string = '';
  departureDate: string = '';
  departureTime: string = '';
  BusName: string = '';
  FirstAC: string='';
  SecondAC:string='';
  Sleeper:string='';
  Total:string='';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  // ngOnInit(): void {
  //   this.source = history.state.source;
  //   this.destination = history.state.destination;
  //   this.departureDate = history.state.departureDate;
  //   this.departureTime = history.state.departureTime;
  //   this.BusName = history.state.BusName;
  //   this.charges = history.state.charges;
  //   this.FirstAC = history.state.FirstAC;
  //   this.SecondAC = history.state.SecondAC;
  //   this.Sleeper = history.state.Sleeper;
  //   this.Total = history.state.Total;
  // }

  downloadTicket(): void {
    console.log('Download Ticket button clicked');
    const doc = new jsPDF();
    doc.text(`Source: ${this.source}`, 20, 20);
    doc.text(`Destination: ${this.destination}`, 20, 30);
    doc.text(`Departure Date: ${this.departureDate}`, 20, 40);
    doc.text(`Departure Time: ${this.departureTime}`, 20, 50);
    doc.text(`bus Name: ${this.busName}`, 20, 60);
    // doc.text(`Total: ${this.totalAmount}`, 20, 110);
    // doc.save('ticket.pdf');
    if (this.selectedSeats.firstACSeats > 0) {
      doc.text(`First AC Seats: ${this.selectedSeats.firstACSeats}`, 30, 90);
    }
  
    if (this.selectedSeats.secondACSeats > 0) {
      doc.text(`Second AC Seats: ${this.selectedSeats.secondACSeats}`, 30, 100);
    }
  
    if (this.selectedSeats.sleeperSeats > 0) {
      doc.text(`Sleeper Seats: ${this.selectedSeats.sleeperSeats}`, 30, 110);
    }
  
    doc.text(`Total: ${this.totalAmount}`, 20, 120);
    doc.save('ticket.pdf');
  }

  bankName: any;
  cardNumber: any;
  ExpiryDate: string = '';
  ybl: any;
  showSuccessMessage: boolean = false;

  submitBankDetails() {
    const bankCredData = {
      userId: 123, // Replace with the actual user ID
      bankName: this.bankName,
      cardNumber: this.cardNumber,
      ExpiryDate: this.ExpiryDate, // Use ExpiryDate directly
      isActive: true, // Set the status as needed
      ybl: this.ybl
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.httpClient
      .post('https://localhost:44331/api/bankcreds', bankCredData, { headers })
      .subscribe(
        (response) => {
          console.log('Bank card data sent:', response);
          this.showSuccessMessage = true; // Show success message after submitting
        },
        (error) => {
          console.error('Error sending bank card data:', error);
        }
      );
  }




  navigateToTicket() {
    this.router.navigate(['/ticket']); // Navigate to the ticket component
  }
  submitBankAndBookingDetails() {
  const bankCredData = {
    userId: 123, // Replace with the actual user ID
    bankName: this.bankName,
    cardNumber: this.cardNumber,
    isActive: true // Set the status as needed
  };

  const bookingData = {
    UserName: this.source, // Replace with the actual user name
    BusName: this.BusName,
    ContactNo: '1234567890', // Replace with the actual contact number
    Source: this.source,
    Destination: this.destination,
    DepartureDate: this.departureDate,
    DepartureTime: this.departureTime,
    // charges: parseInt(this.charges),
    FirstAC: this.FirstAC,
    SecondAC: this.SecondAC,
    Sleeper: this.Sleeper,
    Total: this.Total,
  };

  // Send bank and booking details to the server
  this.httpClient.post('https://localhost:44331/api/bankcreds', bankCredData, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }).subscribe(
    (bankResponse) => {
      console.log('Bank card data sent:', bankResponse);

      // After bank response, save booking details
      this.httpClient.post('https://localhost:44331/api/Bookings', bookingData, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe(
        (bookingResponse) => {
          console.log('Booking data sent:', bookingResponse);
          this.showSuccessMessage = true; // Show success message after submitting
        },
        (bookingError) => {
          console.error('Error sending booking data:', bookingError);
        }
      );

    },
    (bankError) => {
      console.error('Error sending bank card data:', bankError);
    }
  );
}
 seat()
 {
  this.router.navigate(['/selectseat']);
 }

  selectedSeats: {
    firstACSeats: number;
    secondACSeats: number;
    sleeperSeats: number;
  } = {
    firstACSeats: 0,
    secondACSeats: 0,
    sleeperSeats: 0
  };

  charges: number = 0;

  busName: string = '';
  totalAmount: number = 0;


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const state = window.history.state;

      if (state) {
      this.source = state.source;
      this.destination = state.destination;
      this.departureDate = state.departureDate;
      this.departureTime = state.departureTime;
      this.busName = state.busName;
      this.totalAmount = state.totalAmount;

      this.selectedSeats.firstACSeats = state.selectedFirstACSeats;
      this.selectedSeats.secondACSeats = state.selectedSecondACSeats;
      this.selectedSeats.sleeperSeats = state.selectedSleeperSeats;
  }
});
 
}
  









}
