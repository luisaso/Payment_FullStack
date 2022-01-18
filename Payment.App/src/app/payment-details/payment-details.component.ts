import { Component, OnInit } from '@angular/core';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [],
})
export class PaymentDetailsComponent implements OnInit {
  constructor(
    public _paymentDetailsService: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._paymentDetailsService.refreshList();
  }

  populateForm(selectedRecord: PaymentDetail) {
    this._paymentDetailsService.formData = Object.assign({}, selectedRecord);
  }

  onDelete(paymentId: number) {
    if (confirm('Are you sure to delete this record?')) {
      this._paymentDetailsService.deletePaymentDetail(paymentId).subscribe(
        (res) => {
          this._paymentDetailsService.refreshList();
          this.toastr.error(
            'Deleted Successfully',
            'Payment Detail Registered'
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
