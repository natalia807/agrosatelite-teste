import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Farm } from '../models/Farm';
import { FarmService } from '../services/farm.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  farm!: Farm;
  ownerFarmName!: string;

  constructor(private farmService: FarmService, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.farmService.read(id).subscribe({
      next: (res) => {
        this.farm = res
        const owner_id = Number(res.owner_id)
        this.farmService.getOwner(owner_id).subscribe({
          next: (res) => {
            this.ownerFarmName = res.name
          }
        })
      }
    })
  }

  deleteFarm() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.farmService.delete(id).subscribe({
      next: (res) => {
        this.toastr.success('Sucessfully deleted');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

}
