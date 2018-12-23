import { Component, Injector } from '@angular/core';
import { ISolutionControl, ForgeGenericSolution } from '@lcu/solutions';

@Component({
	selector: 'forge-solution-devices-documentation',
	templateUrl: './devices-documentation.component.html',
	styleUrls: ['./devices-documentation.component.scss']
})
export class ForgeDevicesSolutionDocumentation extends ForgeGenericSolution
	implements ISolutionControl {
	//  Fields

	//  Properties
	public DocsRoot: string;

	//  Constructors
	constructor(protected injector: Injector) {
		super(injector);

		this.DocsRoot = 'https://raw.githubusercontent.com/lowcodeunit/lcu-sln-devices/master/docs/';
	}

	//	Life Cycle

	//	API Methods

	//	Helpers
}
