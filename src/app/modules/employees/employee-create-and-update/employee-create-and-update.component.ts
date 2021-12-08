import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IEmployee } from 'src/app/core/interfaces/models';
import { EmployeeService } from '../service/employee.service';
import * as moment from 'moment';
import { Utilities } from 'src/app/core/classes/utilities';

@Component({
  selector: 'app-employee-create-and-update',
  templateUrl: './employee-create-and-update.component.html',
  styleUrls: ['./employee-create-and-update.component.scss']
})
export class EmployeeCreateAndUpdateComponent implements OnInit {

  employee: IEmployee;
  employeeForm: FormGroup;

  get id(): AbstractControl { return this.employeeForm.get('id'); }
  get firstName(): AbstractControl { return this.employeeForm.get('firstName'); }
  get lastName(): AbstractControl { return this.employeeForm.get('lastName'); }
  get middleName(): AbstractControl { return this.employeeForm.get('middleName'); }
  get birthDate(): AbstractControl { return this.employeeForm.get('birthDate'); }
  get age(): AbstractControl { return this.employeeForm.get('age'); }
  get gender(): AbstractControl { return this.employeeForm.get('gender'); }
  get maritalStatus(): AbstractControl { return this.employeeForm.get('maritalStatus'); }
  get rfc(): AbstractControl { return this.employeeForm.get('rfc'); }
  get address(): AbstractControl { return this.employeeForm.get('address'); }
  get email(): AbstractControl { return this.employeeForm.get('email'); }
  get phone(): AbstractControl { return this.employeeForm.get('phone'); }
  get position(): AbstractControl { return this.employeeForm.get('position'); }

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

    this.employeeForm = this.formBuilder.group({
      id: [],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      age: [, [Validators.required]],
      gender: ['', [Validators.required]],
      maritalStatus: ['', [Validators.required]],
      rfc: ['', [Validators.required, Validators.maxLength(13), Validators.minLength(10)]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      position: ['', [Validators.required]],
    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const employeeId: string = paramMap.get('id');
      if (employeeId) {
        this.employeeService.getEmployee(employeeId).subscribe((employeeResponse: IEmployee) => {
          if (employeeResponse) {
            this.employee = employeeResponse;
            this.employee.birthDate = moment(employeeResponse.birthDate).format('YYYY-MM-DD');
            this.employeeForm.patchValue(this.employee);


            this.employeeForm.disable();

            this.email.enable();
            this.phone.enable();
            this.position.enable();
            this.maritalStatus.enable();
            this.address.enable();

          } else {
            console.error("Employee not found")
          }
        }, (error: HttpErrorResponse) => {
          console.error(HttpErrorResponse);
        });
      }
    });
  }

  ngOnInit(): void {
  }

  onBackClick(): void {
    if (this.id.value) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute.parent, });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute.parent, });
    }
  }

  onEmployeeFormSubmit(): void {
    if (!this.employeeForm.valid) {
      Utilities.touchAllControls(this.employeeForm);
      return;
    }
    if (this.id.value) {
      this.updateEmployee();
    } else {
      this.createEmployee();
    }
  }

  createEmployee(): void {
    this.employeeService.createEmployee(this.employeeForm.getRawValue()).subscribe((employeeResponse: IEmployee) => {

      this.onBackClick();
    }, (error: HttpErrorResponse) => {

    });
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.employeeForm.getRawValue()).subscribe((employeeResponse: IEmployee) => {

      this.onBackClick();
    }, (error: HttpErrorResponse) => {

    });

  }
}
