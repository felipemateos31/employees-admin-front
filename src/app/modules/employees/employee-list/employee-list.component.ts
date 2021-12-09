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
  filterName: string;
  filterRfc: string;
  filterStatus: number;
  showFilter: boolean;

  constructor(
    private employeeService: EmployeeService
  ) { }


  ngAfterViewInit(): void {
    this.getEmployees(0);
  }

  ngOnInit(): void {
    this.showFilter = false;
  }

  getEmployees(consult: number): void {

    const params = {
      typeConsult: consult,
      status: this.filterStatus,
      name: this.filterName,
      rfc: this.filterRfc
    }

    console.log(params);

    this.employeeService.getEmployees(params).subscribe((response: IEmployee[]) => {
      this.employees = response;
      this.employees.map(employee => {
        employee.fullName = `${employee.firstName} ${employee.lastName} ${employee.middleName}`
      });
    }, (error: HttpErrorResponse) => {
      console.error(error);
    });
  }

  onRefreshList(): void {
    this.showFilter = false;
    this.filterName = '';
    this.filterRfc = '';
    this.filterStatus = 0;
    this.getEmployees(0);
  }

  onRemoveEmployee(id: string): void {
    if (confirm(`¿Esta seguro de eliminar el empleado?`)) {
      this.employeeService.deleteEmployee(id).subscribe((respose: IEmployee) => {
        this.getEmployees(0);
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      });
    }
  }

  onFilterList(): void {
    this.getEmployees(1)
  }
}
