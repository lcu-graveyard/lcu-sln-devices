import { Component, Injector } from '@angular/core';
import { ISolutionControl, ForgeGenericSolution } from '@lcu/solutions';
import { Loading, BaseModeledResponse, isResultSuccess } from '@lcu/core';
import { DataFlowContext, DeviceTypeContext, DevicesConfigContext, PageUIService, DatabaseService } from '@lcu/daf-common';
import { SingletonService } from '@lcu/enterprises';
import { DevicesConfig, DeviceTypeConfig, DataSetQuery } from '@lcu/apps';
import { Subscription } from 'rxjs';
import { ForgeDevicesSolutionCreateDialog } from '../dialogs/devices-create/devices-create.dialog';
import { ForgeDevicesSolutionSettingsDialog } from '../dialogs/devices-settings/devices-settings.dialog';

@Component({
    selector: 'forge-solution-devices-manage',
    templateUrl: './devices-manage.component.html',
    styleUrls: ['./devices-manage.component.scss']
})
export class ForgeDevicesSolutionManage extends ForgeGenericSolution
    implements ISolutionControl {
    //  Fields
    protected deviceData: DataFlowContext<any>;

    protected devices: DataFlowContext<any>;

    protected deviceTypeConfig: DeviceTypeContext;

    protected devicesSub: Subscription;

    protected deviceDataSub: Subscription;

    protected deviceTypeSub: Subscription;

    //	Properties
    public CurrentDeviceType: string;

    public CurrentDevice: string;

    public DeviceData: any[];

    public Devices: any[];

    public DevicesConfig: DevicesConfig;

    public DeviceTypeConfig: DeviceTypeConfig;

    public Loading: Loading;

    //	Constructors
    constructor(protected devicesConfig: DevicesConfigContext, protected pgUiSvc: PageUIService,
        protected dbSvc: DatabaseService, protected configSvc: SingletonService, protected injector: Injector) {
        super(injector);

        this.Loading = new Loading();
    }

    //	Life Cycle
    public ngOnInit() {
        super.ngOnInit();

        this.SetupConfigTracking();
    }

    public ngOnDestroy() {
        this.destroyDevicesFlow();

        this.destroyDeviceDataFlow();

        this.destroyDeviceTypeConfig();
    }

    //	API Methods
    public CreateDeviceType() {
        this.pgUiSvc.Dialog.Open(ForgeDevicesSolutionCreateDialog, {}, (result: BaseModeledResponse<string>) => {
            if (isResultSuccess(result)) {
                //this.ManageDeviceType(result.Model);
                this.pgUiSvc.Notify.Signal(`The device '${result.Model}' was created.`);

                this.Loading.Set(false);
            }
        }, "90%");
    }

    public CreateSecureDevice() {

    }

    public LoadDeviceID(device: any) {
        return device ? device[this.DeviceTypeConfig.DeviceIDPropertyKey || 'ID'] : null;
    }

    public ManageDevice(device: any) {
        var deviceId = this.LoadDeviceID(device);

        if (deviceId && this.CurrentDevice != deviceId) {
            this.CurrentDevice = deviceId;

            this.setupDeviceDataFlow();
        } else {
            this.destroyDeviceDataFlow();

            this.setupDeviceDataFlow();
        }
    }

    public ManageDeviceType(type: string) {
        if (type && this.CurrentDeviceType != type) {
            this.CurrentDeviceType = type;

            this.setupDevicesFlow();

            this.setupDeviceDataFlow();

            this.setupDeviceTypeConfig();
        } else {
            this.destroyDeviceDataFlow();

            this.destroyDevicesFlow();

            this.destroyDeviceTypeConfig();
        }
    }

    public ManageDataTypeSettings(type: string) {
        if (this.DeviceTypeConfig)
            this.pgUiSvc.Dialog.Open(ForgeDevicesSolutionSettingsDialog, this.DeviceTypeConfig || {},
                (result) => {
                    if (isResultSuccess(result)) {
                        this.DeviceTypeConfig = Object.assign(this.DeviceTypeConfig || {}, result.Model);

                        this.deviceTypeConfig.Save(this.DeviceTypeConfig).subscribe();
                    }
                }, "90%");
    }

    public ManageIngest() {

    }

    public SetupConfigTracking() {
        this.devicesConfig.Loading.subscribe(loading => this.Loading.Set(loading));

        this.devicesConfig.Context.subscribe(
            (assetConfig) => {
                this.DevicesConfig = assetConfig;
            },
            (err) => {
                this.DevicesConfig = null;
            });
    }

    //	Helpers
    protected destroyDeviceDataFlow() {
        if (this.deviceDataSub) {
            this.deviceDataSub.unsubscribe();

            this.deviceData = null;

            this.CurrentDevice = null;
        }
    }

    protected destroyDevicesFlow() {
        if (this.devicesSub) {
            this.devicesSub.unsubscribe();

            this.devices = null;

            this.CurrentDeviceType = null;
        }
    }

    protected destroyDeviceTypeConfig() {
        if (this.deviceTypeSub) {
            this.deviceTypeSub.unsubscribe();

            this.DeviceTypeConfig = null;
        }
    }

    protected setupDeviceDataFlow() {
        this.deviceData = new DataFlowContext({
            Query: <DataSetQuery>{
                Where: this.CurrentDevice ? `d.deviceId = '${this.CurrentDevice}' ` : null
            },
            Sorting: null,
            Type: `ForgeDeviceTypeTelemetry-${this.CurrentDeviceType}`
        }, this.dbSvc);

        this.deviceData.Loading.subscribe(loading => {
            this.Loading.Set(loading);
        });

        this.deviceDataSub = this.deviceData.Data.subscribe(deviceData => {
            this.DeviceData = deviceData;
        });
    }

    protected setupDevicesFlow() {
        this.devices = new DataFlowContext({
            Query: <DataSetQuery>{
            },
            Sorting: null,
            Type: `ForgeDeviceTypeConfig-${this.CurrentDeviceType}`
        }, this.dbSvc);

        this.devices.Loading.subscribe(loading => {
            this.Loading.Set(loading);
        });

        this.devicesSub = this.devices.Data.subscribe(devices => {
            this.Devices = devices;
        });
    }

    protected setupDeviceTypeConfig() {
        this.deviceTypeConfig = new DeviceTypeContext(this.CurrentDeviceType, this.configSvc);

        this.deviceTypeConfig.Loading.subscribe(loading => {
            this.Loading.Set(loading);
        });

        this.deviceTypeSub = this.deviceTypeConfig.Context.subscribe(config => {
            this.DeviceTypeConfig = config;
        });
    }
}   
