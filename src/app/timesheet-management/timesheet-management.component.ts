// timesheet-management.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-timesheet-management',
  templateUrl: './timesheet-management.component.html',
  styleUrls: ['./timesheet-management.component.scss'],
})
export class TimesheetManagementComponent implements OnInit {
  timesheets: any[] = [];
  displayedColumns: string[] = ['project', 'task', 'assignedTo', 'fromDate', 'toDate', 'status'];
  timesheet: any;
  users: any[] = [];
  editedTimesheet: any;

  @ViewChild('content') content: any;
  @ViewChild('editModal') editModal: any;
  @ViewChild('timesheetForm') timesheetForm!: NgForm;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private http: HttpClient,
    private userService: UserService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.loadTimesheets();
    this.loadUsers();
    this.timesheet = {};
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  loadTimesheets() {
    this.http.get<any[]>('http://localhost:3000/timesheet').subscribe(
      (data) => {
        this.timesheets = data;
      },
      (error) => {
        console.error('Error loading timesheet', error);
      }
    );
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }

  createTimesheet(form: NgForm) {
    console.log('Form values:', form.value);
    if (form.valid) {
      const newTimesheet = {
        project: form.value.project,
        task: form.value.task,
        assignedTo: form.value.assignedTo,
        fromDate: form.value.fromDate,
        toDate: form.value.toDate,
        status: form.value.status,
      };
  
      this.http.post('http://localhost:3000/timesheet', newTimesheet).subscribe(
        () => {
          this.loadTimesheets();
          this.modalService.dismissAll(); // Close the modal
        },
        (error) => {
          console.error('Error creating timesheet', error);
        }
      );
  
      form.resetForm(); // Reset the form after submission
    }
  }
  
  saveTimesheet(form: any) {
    if (form.valid) {
      if (this.timesheet && this.timesheet.id) {
        this.updateTimesheet();
      } else {
        this.createTimesheet(form);
      }
      form.resetForm(); // Reset the form after submission
    }
  }

  editTimesheet(timesheet: any) {
    this.openEditModal(timesheet);
  }

  openEditModal(timesheet: any) {
    this.editedTimesheet = { ...timesheet };
    this.modalService.open(this.editModal, { size: 'lg' });
  }

  saveEditedTimesheet(form: any) {
    if (form.valid) {
      this.updateTimesheet();
      form.resetForm();
    }
  }

  updateTimesheet() {
    console.log('Update timesheet:', this.editedTimesheet);
  }

  deleteTimesheet(timesheet: any) {
    console.log('Delete timesheet:', timesheet);
  }
}
