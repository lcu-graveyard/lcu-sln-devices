import { Component, Injector } from '@angular/core';
import { ISolutionControl, ForgeGenericSolution } from '@lcu/solutions';


@Component({
    selector: 'forge-solution-devices-manage',
    templateUrl: './devices-manage.component.html',
    styleUrls: ['./devices-manage.component.scss']
})
export class ForgeDevicesSolutionManage extends ForgeGenericSolution
    implements ISolutionControl {
    //  Fields

    //  Properties

    //  Constructors
	constructor(protected injector: Injector) {
        super(injector);
    }

    //	Life Cycle

    //	API Methods

    //	Helpers
}   
