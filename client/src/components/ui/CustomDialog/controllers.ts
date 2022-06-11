import { observable, runInAction } from 'mobx';
import { CustomDialogId, DialogsCollection } from './CustomDialog.types';

export const dialogs = observable<DialogsCollection>({});

function changeDialogState(dialogId: CustomDialogId, opened: boolean) {
    if (!dialogs.hasOwnProperty(dialogId)) {
        throw new Error('Dialog with provided id was not created');
    }

    runInAction(() => (dialogs[dialogId].opened = opened));
}

export function addDialog(id: CustomDialogId) {
    if (!dialogs.hasOwnProperty(id)) {
        runInAction(() => (dialogs[id] = { opened: false }));
    }
}

export function openDialogHandler(dialogId: CustomDialogId) {
    return () => {
        openDialog(dialogId);
    };
}

export function closeDialogHandler(dialogId: CustomDialogId) {
    return () => {
        changeDialogState(dialogId, false);
    };
}

export function openDialog(dialogId: CustomDialogId) {
    changeDialogState(dialogId, true);
}

export function closeDialog(dialogId: CustomDialogId) {
    changeDialogState(dialogId, false);
}
