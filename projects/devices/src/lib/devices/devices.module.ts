import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatListModule, MatToolbarModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatSlideToggleModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule } from '@lcu/hosting';
import { BaseSolutionModule } from '@lcu/solutions';
import { GenericDomainModule } from '@lcu/daf-ui';
import { JsonSchemaEditorModule } from '@lowcodeunit/json-schema-editor';
import { ForgeDevicesSolutionManage } from './manage/devices-manage.component';
import { ForgeDevicesSolutionDocumentation } from './documentation/devices-documentation.component';
import { ForgeDevicesSolutionHeading } from './heading/devices-heading.component';
import { ForgeDevicesSolutionMarketplace } from './marketplace/devices-marketplace.component';
import { ForgeDevicesSolutionOverview } from './overview/devices-overview.component';
import { ForgeDevicesSolutionCreateDialog } from './dialogs/devices-create/devices-create.dialog';
import { ForgeDevicesSolutionSettingsDialog } from './dialogs/devices-settings/devices-settings.dialog';


export class ForgeDevicesSolutionDisplayModule extends BaseSolutionModule {
	public Documentation() {
		return ForgeDevicesSolutionDocumentation;
	}

	public Heading() {
		return ForgeDevicesSolutionHeading;
	}

	public Manage() {
		return ForgeDevicesSolutionManage;
	}

	public Marketplace() {
		return ForgeDevicesSolutionMarketplace;
	}

	public Overview() { 
		return ForgeDevicesSolutionOverview;
	}
}

var comps = [
	ForgeDevicesSolutionDocumentation,
	ForgeDevicesSolutionHeading,
	ForgeDevicesSolutionManage,
	ForgeDevicesSolutionMarketplace,
	ForgeDevicesSolutionOverview,
	ForgeDevicesSolutionCreateDialog,
	ForgeDevicesSolutionSettingsDialog,
];

@NgModule({
	imports: [
		FathymSharedModule,
		FlexLayoutModule,
		GenericDomainModule,
		JsonSchemaEditorModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCheckboxModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatProgressSpinnerModule,
		MatSelectModule,
		MatSlideToggleModule,
		MatToolbarModule,
	],
	declarations: [
		...comps,
	],
	exports: [
		...comps,
	],
	entryComponents: [
		...comps,
	]
})
export class ForgeDevicesSolutionModule { 
}
