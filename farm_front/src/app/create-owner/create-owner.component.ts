import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmService } from '../services/farm.service';

@Component({
  selector: 'app-create-owner',
  templateUrl: './create-owner.component.html',
  styleUrls: ['./create-owner.component.scss']
})
export class CreateOwnerComponent implements OnInit {
  registerOwnerForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private farmService: FarmService, private router: Router) {
    this.registerOwnerForm = this.formBuilder.group({
      name: [''],
      document: [''],
      document_type: ['']
    })
   }

  ngOnInit(): void {    
  }

  handleCreateOwner() {
    if (this.registerOwnerForm.valid) {
      this.farmService.createOwner(this.registerOwnerForm.value).subscribe()
      this.router.navigate([''])
    }
  }
}
