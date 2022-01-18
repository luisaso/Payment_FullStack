import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: [],
})
export class PaymentDetailsFormComponent implements OnInit {
  constructor(
    public _paymentDetailsService: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (this._paymentDetailsService.formData.paymentDetailId == 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this._paymentDetailsService.postPaymentDetail().subscribe(
      (res) => {
        this.resetForm(form);
        this._paymentDetailsService.refreshList();
        this.toastr.success(
          'Submited Successfully',
          'Payment Detail Registered'
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateRecord(form: NgForm) {
    this._paymentDetailsService.putPaymentDetail().subscribe(
      (res) => {
        this.resetForm(form);
        this._paymentDetailsService.refreshList();
        this.toastr.info('Updated Successfully', 'Payment Detail Registered');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this._paymentDetailsService.formData = new PaymentDetail();
  }
}
