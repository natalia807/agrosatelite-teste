import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { DrawAddon } from '@common/draw'
import { GeoJsonFeatureAddon } from '@common/feature'
import { GeoJsonFeature, pointClickStyle } from '@common/geolib'
import { ToastrService } from 'ngx-toastr'
import GeoJSON from 'ol/format/GeoJSON'

import { BasemapComponent } from '../basemap/basemap.component'
import { MapService } from '../map.service'
import { Owner } from '../models/Owner'
import { FarmService } from '../services/farm.service'

@Component({
  selector: 'app-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.scss'],
})
export class NewRegisterComponent implements OnInit {
  registerForm!: FormGroup
  private _map!: BasemapComponent
  private _geometries: GeoJsonFeature[] = []
  updateMode: boolean = false
  ownerFarmName!: string
  owners!: Owner[]

  constructor(
    private farmService: FarmService,
    private formBuilder: FormBuilder,
    private _mapService: MapService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      area: [],
      centroid: [],
      geometry: [],
      owner_id: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this._map = this._mapService.map
    const id = this.activatedRoute.snapshot.params['id']
    if (id) {
      this.updateMode = true
      this.farmService.read(id).subscribe({
        next: (res) => {
          this.registerForm.setValue({
            name: res.name,
            area: res.area,
            geometry: res.geometry,
            owner_id: res.owner_id,
            centroid: res.centroid,
          })

          const owner_id = Number(res.owner_id)
          this.farmService.getOwner(owner_id).subscribe({
            next: (res) => {
              this.ownerFarmName = res.name
            },
          })
        },
        error: (err) => {
          console.log(err)
        },
      })
    }
  }

  handleEdit() {
    this.farmService.listOwners().subscribe({
      next: (res) => {
        res.map((owner: any) => {
          if (owner.name === this.registerForm.value.owner_id) {
            this.registerForm.value.owner_id = owner.id
            // Edit
            const id = this.activatedRoute.snapshot.params['id']
            this.farmService.editFarm(id, this.registerForm.value).subscribe()
            this.router.navigate(['/'])
          }
        })
      },
    })
  }

  handleCreate() {
    if (this.registerForm.value.geometry === null && this.registerForm.value.centroid === null) {
      this.toastr.error('Por favor, selecione a área')
      return
    }

    this.farmService.listOwners().subscribe({
      next: (res) => {
        res.map((owner: any) => {
          if (owner.name === this.registerForm.value.owner_id) {
            this.registerForm.value.owner_id = owner.id
            if (this.registerForm.valid) {
              this.farmService.create(this.registerForm.value).subscribe()
              this.router.navigate(['/'])
            }
          }
        })
      },
    })
  }

  draw(type: 'Circle') {
    if (!this._map) return
    this._map.includeAddon(
      new DrawAddon({
        identifier: 'geometry_map',
        drawType: type,
        callback: (geometry, center, area) => {
          this.registerForm.value.centroid = center
          this.registerForm.value.area = area
          const geo = new GeoJSON().writeGeometryObject(geometry) as any
          this.handleNewGeometry(geo)
        },
      })
    )
  }

  geometrySeed: number = 1
  handleNewGeometry(geometry: any) {
    const identifier = this.geometrySeed++

    this._map.includeAddon(
      new GeoJsonFeatureAddon({
        identifier: `geometry::${identifier}`,
        feature: geometry,
        styleFunction: () => {
          return pointClickStyle({
            hover: false,
            strokeColor: '#1962D1',
          })
        },
      })
    )
    this._map.fitToAddons(this._map.listByPrefix('geometry'))
    // console.log('New geometry', geometry)
    this.registerForm.value.geometry = geometry
    this._geometries.push(geometry)
  }

  ngOnDestroy() {
    this._map.removeByPrefix('geometry')
  }
}
