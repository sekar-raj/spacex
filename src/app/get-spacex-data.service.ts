import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetSpacexDataService {
  launch_year;
  constructor(private http: HttpClient) { }

  // get call 

  getSpacexData() {
    const httpParams = new HttpParams({
      fromObject: {
        limit: "100"
      }
    })

   return  this.http.get('https://api.spaceXdata.com/v3/launches', { params: httpParams});
  }

  filterSpacexData(selectedValue) {
    console.log(selectedValue);
    console.log(typeof (selectedValue))
    const year = parseInt(selectedValue) ;
    console.log(year);
    if(isNaN(year)) {
     selectedValue = selectedValue
    } else {
      this.launch_year = selectedValue;
    }
    const httpParams = new HttpParams({
      fromObject: {
        limit: "100",
        launch_success: selectedValue === "Launchtrue" ? "true" : selectedValue === "Launchfalse" ? "false" : '',
        land_success: selectedValue === "Landingtrue" ? "true" : selectedValue === "Landingfalse" ? "false" : '',
        launch_year: this.launch_year
      }
    })

   return  this.http.get('https://api.spaceXdata.com/v3/launches', { params: httpParams});
  }
}
