import { ForgeJSONSchemaService, DevicesConfigContext } from '@lcu/core';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseModeledResponse, Status, Loading, isResultSuccess, BaseResponse, SingletonService} from '@lcu/common';
import { Observable } from 'rxjs';

@Component({
	selector: 'devices-create-dialog',
	templateUrl: './devices-create.dialog.html',
	styleUrls: ['./devices-create.dialog.scss']
})
export class ForgeDevicesSolutionCreateDialog implements OnInit {
	//	Fields

	//	Properties
	public Error: string;

	public Loading: Loading;

	public DeviceLookup: string;

	//	Constructors
	constructor(protected dialogRef: MatDialogRef<ForgeDevicesSolutionCreateDialog>, @Inject(MAT_DIALOG_DATA) details: any,
		protected schemaSvc: ForgeJSONSchemaService, protected devicesConfig: DevicesConfigContext,
		protected singletonSvc: SingletonService) {
		this.Loading = new Loading();
	}

	//	Life Cycle
	public ngOnInit() {
	}

	//	API Methods
	public Cancel() {
		this.dialogRef.close(<BaseModeledResponse<string>>{
			Model: null,
			Status: <Status>{
				Code: 1,
				Message: 'Cancelled'
			}
		});
	}

	public HandleCreate() {
		this.Loading.Set(true);

		this.Error = null;

		if (this.devicesConfig.Config.DeviceTypes.indexOf(this.DeviceLookup) < 0) {
			this.devicesConfig.Config.DeviceTypes.push(this.DeviceLookup);

			this.devicesConfig.Save(this.devicesConfig.Config);

			this.dialogRef.close(<BaseModeledResponse<string>>{
				Model: this.DeviceLookup,
				Status: <Status>{
					Code: 0,
					Message: 'Success'
				}
			});

			this.Loading.Set(false);
		} else {
			this.Error = 'Schema Already Exists';
		}
	}

	//	Helpers
	
}
