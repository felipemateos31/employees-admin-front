import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/core/interfaces/models';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  employees: IEmployee[] = [];

  constructor(
    private employeeService: EmployeeService
  ) { }


  ngAfterViewInit(): void {
    this.getEmployees();
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((response: IEmployee[]) => {
      this.employees = response;
      this.employees.map(employee => {
        employee.fullName = `${employee.firstName} ${employee.lastName} ${employee.middleName}`
      });
    }, (error: HttpErrorResponse) => {
      console.error(error);
    });
  }

  onRefreshList(): void {
    this.getEmployees();
  }

  onRemoveEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe((respose:IEmployee)=>{
      this.getEmployees();
    }, (error: HttpErrorResponse) => {
      console.error(error);
    });
  }
}
