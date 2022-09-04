import { Component, OnInit } from '@angular/core'
import { Farm } from '../models/Farm'
import { FarmService } from '../services/farm.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  itens: string[] = ['Item1', 'Item2', 'Item3', 'Item4']
  farms!: Farm[]

  constructor(private farmService: FarmService) {}

  ngOnInit(): void {
    this.farmService.list().subscribe({
      next: (res) => {
        this.farms = res
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
}
