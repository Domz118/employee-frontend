
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/service/notification/notification.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  id: number = null;
  name: string = '';
  email: string = '';
  phone: string = '';
  message: string = '';

  constructor(private notificationService: NotificationService) {
    }

  ngOnInit(): void {
    }

  onSubmit(): void {
    const payload = {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      message: this.message
    };

  this.notificationService.sendContact(payload).subscribe({
    next: (res) => alert(res), // res = "Notification mail sent!"
    error: err => alert(err.error?.message || 'Failed to send message.')
  });


  }
}

