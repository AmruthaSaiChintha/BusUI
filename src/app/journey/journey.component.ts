import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit{

  source: string = '';
  destination: string = '';
  departureDate: string = '';
  departureTime: string = '';
  BusName: string = '';
  charges: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.source = history.state.source;
    this.destination = history.state.destination;
    this.departureDate = history.state.departureDate;
    this.departureTime = history.state.departureTime;
    this.BusName = history.state.BusName;
    this.charges = history.state.charges;
  }

  downloadTicket(): void {
    // create new jsPDF instance
    const doc = new jsPDF();

    // add content to PDF
    doc.text(`Source: ${this.source}`, 20, 20);
    doc.text(`Destination: ${this.destination}`, 20, 30);
    doc.text(`Departure Date: ${this.departureDate}`, 20, 40);
    doc.text(`Departure Time: ${this.departureTime}`, 20, 50);
    doc.text(`BusName: ${this.BusName}`, 20, 60);
    doc.text(`Charges: ${this.charges}`, 20, 70);

    // save PDF file
    doc.save('ticket.pdf');
  }

  
  
}





