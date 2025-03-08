/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as nls from '../../../../nls.js';
import { registerAction2, Action2 } from '../../../../platform/actions/common/actions.js';
import { ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';
import { INotificationService } from '../../../../platform/notification/common/notification.js';

// Register a simple command that shows a notification
registerAction2(class SimpleButtonAction extends Action2 {
	constructor() {
		super({
			id: 'workbench.action.simpleButton',
			title: nls.localize2('simpleButton', "Show Simple Button"),
			category: nls.localize2('custom', "Custom"),
			f1: true
		});
	}

	run(accessor: ServicesAccessor): void {
		const notificationService = accessor.get(INotificationService);
		notificationService.info('Simple button clicked!');
	}
});