import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs'
import { GetSpacexDataService } from './get-spacex-data.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'spaceX';
  spacexdata: any;
  mediaSub: Subscription;
  uniqueYear = [];
  launchYear = [];
  displayData = [];

  constructor(public mediaObserver: MediaObserver, public getSpaceData: GetSpacexDataService) {

  }

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias);
    })

    this.getSpaceData.getSpacexData().subscribe(data => {
      this.spacexdata = data;
      this.spacexdata.forEach(details => {
        details.rocket.first_stage.cores.forEach(element => {
          this.displayData.push({
            mission_name: details.mission_name,
            flight_number: details.flight_number,
            mission_id: details.mission_id,
            launch_year: details.launch_year,
            launch_success: details.launch_success,
            mission_patch: details.links.mission_patch,
            landing_intent: element.landing_intent
          })
          this.launchYear.push({
            launch_year: details.launch_year
          })
        });
      });

      this.uniqueYear = Array.from(new Set(this.launchYear.map(a => a.launch_year)))
        .map(launch_year => {
          return this.launchYear.find(a => a.launch_year === launch_year)
        })
    })

  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

  filterSapceData(selectedValue) {
    this.displayData = [];
    this.getSpaceData.filterSpacexData(selectedValue).subscribe(data => {
      this.spacexdata = data;
      this.spacexdata.forEach(details => {
        details.rocket.first_stage.cores.forEach(element => {
          this.displayData.push({
            mission_name: details.mission_name,
            flight_number: details.flight_number,
            mission_id: details.mission_id,
            launch_year: details.launch_year,
            launch_success: details.launch_success,
            mission_patch: details.links.mission_patch,
            landing_intent: element.landing_intent
          })
        });
      });
    })
  }

}
