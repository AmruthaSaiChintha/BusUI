// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router, ActivatedRoute } from '@angular/router';

// interface Bus {
//   charges: number;
//   busName: string;
//   busId:number;
//   source: string;
//   destination: string;
//   departureTime: string;
//   departureDate: string;
//   firstAC: string;    // Updated property name to lowercase
//   secondAC: string;   // Updated property name to lowercase
//   sleeper: string;    // Updated property name to lowercase
//   total: string;      // Updated property name to lowercase
//   [key: string]: any;
// }

// @Component({
//   selector: 'app-search',
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.css']
// })
// export class searchComponent implements OnInit {
//   BusName = '';
//   source = '';
//   BusId='';
//   destination = '';
//   departureDate: string = '';
//   showBusDetails: boolean = true;
//   buses: Bus[] = [];
//   filteredBuses: Bus[] = [];
//   selectedBus: Bus | undefined;
//   sourceSuggestions: string[] = [];
//   destinationSuggestions: string[] = [];
//   chargesSort: string = 'all';
//   departureTimesort:string='all';

//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.http.get<Bus[]>('https://localhost:44331/api/BusDetails').subscribe((buses: Bus[]) => {
//       this.buses = buses;
//     });
//   }

//   filterSource(): void {
//     this.sourceSuggestions = this.getSuggestions(this.source, 'source');
//     this.showBusDetails = false;
//     this.selectedBus = undefined;
//   }

//   filterDestination(): void {
//     this.destinationSuggestions = this.getSuggestions(this.destination, 'destination');
//     this.showBusDetails = false;
//     this.selectedBus = undefined;
//   }

//   getSuggestions(query: string, type: string): string[] {
//     query = query.toLowerCase();
//     const suggestions = this.buses.map(bus => bus[type]);
//     return suggestions.filter(suggestion => suggestion.toLowerCase().includes(query));
//   }

//   selectSuggestion(type: string, suggestion: string): void {
//     if (type === 'source') {
//       this.source = suggestion;
//       this.sourceSuggestions = [];
//     } else if (type === 'destination') {
//       this.destination = suggestion;
//       this.destinationSuggestions = [];
//     }
//   }

//   parseDate(dateString: string): Date {
//     const parts = dateString.split('-');
//     const year = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1;
//     const day = parseInt(parts[2], 10);
//     return new Date(year, month, day);
//   }

//   searchBuses(): void {
//     this.filteredBuses = this.buses.filter((bus) => {
//       const selectedDepartureDate = this.parseDate(this.departureDate);
//       const busDepartureDate = this.parseDate(bus.departureDate);

//       return (
//         bus.source.toLowerCase().includes(this.source.toLowerCase()) &&
//         bus.destination.toLowerCase().includes(this.destination.toLowerCase()) &&
//         selectedDepartureDate.toDateString() === busDepartureDate.toDateString()
//       );
//     });

//     if (this.filteredBuses.length === 0) {
//       alert('No buses found for this route and date!');
//     }

//     this.showBusDetails = true;
//   }
  
 
//     showBusInfo(bus: Bus): void {
//       if (bus) {
//         this.selectedBus = bus;
//         this.router.navigate(['/ticket'], {
//           state: {
//             source: this.selectedBus.source,
//             destination: this.selectedBus.destination,
//             BusName: this.selectedBus.busName,
//             departureDate: this.selectedBus.departureDate,
//             departureTime: this.selectedBus.departureTime,
//             charges: this.selectedBus.charges,
//             FirstAC: this.selectedBus.firstAC,
//             SecondAC:this.selectedBus.secondAC,
//             Sleeper: this.selectedBus.sleeper,
//             Total: this.selectedBus.total,
//           }
//         });
//       } else {
     
//         console.error('No bus selected.');
//       }
//     }
    
    
//   sortBuses(): void {
  
//     if (this.chargesSort === 'lowToHigh') {
//       this.filteredBuses.sort((a, b) => a.charges - b.charges);
//     } else if (this.chargesSort === 'highToLow') {
//       this.filteredBuses.sort((a, b) => b.charges - a.charges);
//     }

// }
// sortBuse(): void {
 
//   if (this.departureTimesort === 'AM') {
//     this.filteredBuses.sort((a, b) => this.getTimeInMinutes(a.departureTime) - this.getTimeInMinutes(b.departureTime));
//   } else if (this.departureTimesort === 'PM') {
//     this.filteredBuses.sort((a, b) => this.getTimeInMinutes(b.departureTime) - this.getTimeInMinutes(a.departureTime));
//   }
// }

// getTimeInMinutes(time: string): number {

//   const parts = time.split(':');
//   const hours = parseInt(parts[0], 10);
//   const minutes = parseInt(parts[1], 10);
//   return hours * 60 + minutes;
// }
// }





//   sortBuses(): void {
  
//     if (this.chargesSort === 'lowToHigh') {
//       this.filteredBuses.sort((a, b) => a.charges - b.charges);
//     } else if (this.chargesSort === 'highToLow') {
//       this.filteredBuses.sort((a, b) => b.charges - a.charges);
//     }

// }
// sortBuse(): void {
 
//   if (this.departureTimesort === 'AM') {
//     this.filteredBuses.sort((a, b) => this.getTimeInMinutes(a.departureTime) - this.getTimeInMinutes(b.departureTime));
//   } else if (this.departureTimesort === 'PM') {
//     this.filteredBuses.sort((a, b) => this.getTimeInMinutes(b.departureTime) - this.getTimeInMinutes(a.departureTime));
//   }
// }

// getTimeInMinutes(time: string): number {

//   const parts = time.split(':');
//   const hours = parseInt(parts[0], 10);
//   const minutes = parseInt(parts[1], 10);
//   return hours * 60 + minutes;
// }
// }




import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

interface Bus {
  charges: number;
  busName: string;
  busId: number;
  source: string;
  destination: string;
  departureTime: string;
  departureDate: string;
  firstAC: string;
  secondAC: string;
  sleeper: string;
  firstACPrice:number;
  secondACPrice:number;
  sleeperPrice:number;
  total: number;
  availableFirstACSeats: number; // Add available seats property
  [key: string]: any;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class searchComponent implements OnInit {
 



  BusName = '';
  source = '';
  BusId='';
  destination = '';
  departureDate: string = '';
  showBusDetails: boolean = true;
  totalAmount='';
  buses: Bus[] = [];
  filteredBuses: Bus[] = [];
  sourceSuggestions: string[] = [];
  destinationSuggestions: string[] = [];
  chargesSort: string = 'all';
  departureTimesort:string='all';
  firstACSort: string = 'all';

  selectedFirstACSeats: number = 0;
selectedSecondACSeats: number = 0;
selectedSleeperSeats: number = 0;

// Add properties to store the prices of each seat type
firstACPrice: number = 0;
secondACPrice: number = 0;
sleeperPrice: number = 0;
selectedSeatInfo: { [busId: number]: { selectedFirstACSeats: number, selectedSecondACSeats: number, selectedSleeperSeats: number } } = {};

maxFirstACSeats: { [busId: number]: number } = {};
maxSecondACSeats: { [busId: number]: number } = {};
maxSleeperSeats: { [busId: number]: number } = {};
  busName: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.http.get<Bus[]>('https://localhost:44331/api/BusDetails').subscribe((buses: Bus[]) => {
      this.buses = buses;

      buses.forEach((bus) => {
        // Initialize selected seat counts for each bus
        this.selectedSeatInfo[bus.busId] = { selectedFirstACSeats: 0, selectedSecondACSeats: 0, selectedSleeperSeats: 0 };

        this.maxFirstACSeats[bus.busId] = bus.availableFirstACSeats;
        this.maxSecondACSeats[bus.busId] = bus['availableSecondACSeats'];
        this.maxSleeperSeats[bus.busId] = bus['availableSleeperSeats'];
      });
    });
  }
  getMaxSeats(seatType: string, bus: Bus): number {
    return bus[seatType] ? parseInt(bus[seatType], 10) : 0;
  }
  
 

  
  // Sorting by First AC Price (Low to High)
  sortBusesByFirstACPriceLowToHigh(): void {
    this.filteredBuses.sort((a, b) => {
      if (!a.firstACPrice || !b.firstACPrice) {
        return 0;
      }
      return a.firstACPrice - b.firstACPrice;
    });
  }

  // Sorting by First AC Price (High to Low)
  sortBusesByFirstACPriceHighToLow(): void {
    this.filteredBuses.sort((a, b) => {
      if (!a.firstACPrice || !b.firstACPrice) {
        return 0;
      }
      return b.firstACPrice - a.firstACPrice;
    });
  }

  // Sorting by Departure Time (AM to PM)
  
  // Update the sortBuses method to handle sorting based on first AC price
 // Update the sortBuses method to handle sorting based on first AC price
sortBuses(): void {
  if (this.chargesSort === 'lowToHigh') {
    this.sortBusesByFirstACPriceLowToHigh();
  } else if (this.chargesSort === 'highToLow') {
    this.sortBusesByFirstACPriceHighToLow();
  } else {
    // Default to sorting by price (all)
    this.sortBusesByFirstACPriceLowToHigh();
  }
}


  // Update the sortBuse method to handle sorting based on departure time
 
  // Sort buses by departure time in ascending order (AM to PM)
  sortBuse(): void {
    if (this.departureTimesort === 'AM') {
      this.sortBusesByTimeAMToPM();
    } else if (this.departureTimesort === 'PM') {
      this.sortBusesByTimePMToAM();
    } else {
      // Default to sorting by time (all)
      this.sortBusesByTimeAMToPM();
    }
  }
  
  // Sort buses by departure time in ascending order (AM to PM)
sortBusesByTimeAMToPM(): void {
  this.filteredBuses.sort((a, b) => {
    const timeA = this.convertTo24HourFormat(a.departureTime);
    const timeB = this.convertTo24HourFormat(b.departureTime);
    return timeA.localeCompare(timeB);
  });
}

// Sort buses by departure time in descending order (PM to AM)
sortBusesByTimePMToAM(): void {
  this.filteredBuses.sort((a, b) => {
    const timeA = this.convertTo24HourFormat(a.departureTime);
    const timeB = this.convertTo24HourFormat(b.departureTime);
    return timeB.localeCompare(timeA);
  });
}

// Convert AM/PM time to 24-hour format
convertTo24HourFormat(time: string): string {
  const [timePart, amPmPart] = time.split(' ');
  const [hours, minutes] = timePart.split(':');
  let hour = parseInt(hours, 10);

  if (amPmPart === 'PM' && hour < 12) {
    hour += 12;
  } else if (amPmPart === 'AM' && hour === 12) {
    hour = 0;
  }

  const hourStr = hour.toString().padStart(2, '0');
  const minuteStr = minutes.padStart(2, '0');

  return `${hourStr}:${minuteStr}`;
}

  



  filterSource(): void {
    this.sourceSuggestions = this.getSuggestions(this.source, 'source');
    this.showBusDetails = false;
    this.selectedBus = undefined;
  }

  filterDestination(): void {
    this.destinationSuggestions = this.getSuggestions(this.destination, 'destination');
    this.showBusDetails = false;
    this.selectedBus = undefined;
  }

  getSuggestions(query: string, type: string): string[] {
    query = query.toLowerCase();
    const suggestions = this.buses.map(bus => bus[type]);
    return suggestions.filter(suggestion => suggestion.toLowerCase().includes(query));
  }

  selectSuggestion(type: string, suggestion: string): void {
    if (type === 'source') {
      this.source = suggestion;
      this.sourceSuggestions = [];
    } else if (type === 'destination') {
      this.destination = suggestion;
      this.destinationSuggestions = [];
    }
  }

  parseDate(dateString: string): Date {
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  searchBuses(): void {
    this.filteredBuses = this.buses.filter((bus) => {
      const selectedDepartureDate = this.parseDate(this.departureDate);
      const busDepartureDate = this.parseDate(bus.departureDate);

      return (
        bus.source.toLowerCase().includes(this.source.toLowerCase()) &&
        bus.destination.toLowerCase().includes(this.destination.toLowerCase()) &&
        selectedDepartureDate.toDateString() === busDepartureDate.toDateString()
      );
    });

    if (this.filteredBuses.length === 0) {
      alert('No buses found for this route and date!');
    }

    this.showBusDetails = true;
  }
  
    // showBusInfo(bus: Bus): void {
    //   if (bus) {
    //     this.selectedBus = bus;
    //     const totalPrice = this.calculateTotalPrice(bus);

    //     this.router.navigate(['/seatlayout'], {
    //       state: {
    //         selectedFirstACSeats: this.selectedSeatInfo[bus.busId].selectedFirstACSeats,
    //         selectedSecondACSeats: this.selectedSeatInfo[bus.busId].selectedSecondACSeats,
    //         selectedSleeperSeats: this.selectedSeatInfo[bus.busId].selectedSleeperSeats,
    //         departureDate: bus.departureDate,
    //         departureTime: bus.departureTime,
    //         busName: bus.busName,
    //         charges: bus.charges, // Pass the charges here
    //         totalAmount: totalPrice 
    //       }
    //     });
    //   } else {
    //     console.error('No bus selected.');
    //   }
    // }
   
    showBusInfo(bus: Bus): void {
      if (bus) {
        this.selectedBus = bus;
        const totalPrice = this.calculateTotalPrice(bus);
    
        this.router.navigate(['/ticket'], {
          state: {
          //   selectedFirstACSeats: this.selectedSeatInfo[bus.busId].selectedFirstACSeats,
          //   selectedSecondACSeats: this.selectedSeatInfo[bus.busId].selectedSecondACSeats,
          //   selectedSleeperSeats: this.selectedSeatInfo[bus.busId].selectedSleeperSeats,
          //   departureDate: bus.departureDate,
          //   departureTime: bus.departureTime,
          //   busName: bus.busName,
          //   charges: bus.charges,
          //  destination:this.destination,
          //   source: this.source,
          //   totalAmount: totalPrice
            
            

            selectedFirstACSeats: this.selectedSeatInfo[bus.busId].selectedFirstACSeats,
        selectedSecondACSeats: this.selectedSeatInfo[bus.busId].selectedSecondACSeats,
        selectedSleeperSeats: this.selectedSeatInfo[bus.busId].selectedSleeperSeats,
        departureDate: bus.departureDate,
        departureTime: bus.departureTime,
        busName: bus.busName,
        charges: bus.charges,
        source: this.source, // Add source here
        destination: this.destination, // Add destination here
        totalAmount: totalPrice
          }
        });
      } else {
        console.error('No bus selected.');
      }
    }
    
 


calculateTotalPrice(bus: Bus): number {
  const selectedSeats = this.selectedSeatInfo[bus.busId];
  const firstACPricePerSeat = bus.firstACPrice ? bus.firstACPrice : 0;
  const secondACPricePerSeat = bus.secondACPrice ? bus.secondACPrice : 0;
  const sleeperPricePerSeat = bus.sleeperPrice ? bus.sleeperPrice : 0;

  const totalPrice =
    selectedSeats.selectedFirstACSeats * firstACPricePerSeat +
    selectedSeats.selectedSecondACSeats * secondACPricePerSeat +
    selectedSeats.selectedSleeperSeats * sleeperPricePerSeat;

  return totalPrice;
}

selectedBus: Bus | undefined = undefined;

isSelectSeatDisabled(bus: Bus): boolean {
  const selectedSeats = this.selectedSeatInfo[bus.busId];
  const availableFirstACSeats = this.getMaxSeats('firstAC', bus);
  const availableSecondACSeats = this.getMaxSeats('secondAC', bus);
  const availableSleeperSeats = this.getMaxSeats('sleeper', bus);

  return (
    selectedSeats.selectedFirstACSeats === null ||
    selectedSeats.selectedSecondACSeats === null ||
    selectedSeats.selectedSleeperSeats === null ||
    selectedSeats.selectedFirstACSeats > availableFirstACSeats ||
    selectedSeats.selectedSecondACSeats > availableSecondACSeats ||
    selectedSeats.selectedSleeperSeats > availableSleeperSeats ||
    (selectedSeats.selectedFirstACSeats === 0 && selectedSeats.selectedSecondACSeats === 0 && selectedSeats.selectedSleeperSeats === 0)
  );
}
}
