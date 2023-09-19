import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-viewitems',
  templateUrl: './viewbuses.component.html',
  styleUrls: ['./viewbuses.component.css']
})
export class viewbusesComponent {
  Bus:any;

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.Bus= data;
    }) 

}
}