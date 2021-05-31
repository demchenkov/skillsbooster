import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dimensions, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'sb-change-photo-modal',
  templateUrl: './change-photo-modal.component.html',
  styleUrls: ['./change-photo-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePhotoModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ChangePhotoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public imageChangedEvent: any,
  ) { }

  ngOnInit(): void {
  }


  imageCropped(event: ImageCroppedEvent) {
    // this.croppedImage = event.base64;
    // console.log(event, base64ToFile(event.base64));
}

  imageLoaded() {
    // this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
      console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
      console.log('Load failed');
  }


  onConfirm() {
    // if (this.form.valid) {
    //   this.dialogRef.close(this.form.value);
    // }
  }
}
