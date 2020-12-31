export class Dialog {
    private DialogData: DialogData;
    constructor(dialogData: DialogData) {
        this.DialogData = dialogData;
    }

    public Show = (message: string, title: string, dialogOption: IDialogOption = InitDialogOption()) => {
        return new Promise<DialogResult>(async (resolve, reject) => {
            this.DialogData.title = title;
            this.DialogData.message = message;
            this.DialogData.dialogOption = dialogOption;
            if (this.DialogData.dialogOption.yes.isShow == false &&
                this.DialogData.dialogOption.no.isShow == false &&
                this.DialogData.dialogOption.cancel.isShow == false) {
                    this.DialogData.isShow = false;
                reject("必ず「Yes」「No」「Cancel」のうち最低一つは表示設定にしてください");
                return;
            }
            this.DialogData.yesClick = () => {
                this.DialogData.isShow = false;
                resolve(DialogResult.Yes);
            };
            this.DialogData.noClick = () => {
                this.DialogData.isShow = false;
                resolve(DialogResult.No);
            };
            this.DialogData.cancelClick = () => {
                this.DialogData.isShow = false;
                resolve(DialogResult.Cancel);
            };
            this.DialogData.isShow = true;
        });
    }
}

export type DialogResult = typeof DialogResult[keyof typeof DialogResult];
export const DialogResult = {
    Yes: 'Yes',
    No: 'No',
    Cancel: 'CANCEL'
} as const;


export class DialogData {
    public zindex: number;
    public isShow: boolean;
    public title: string;
    public message: string;
    public dialogOption: IDialogOption;
    constructor(zindex: number = 2000) {
        this.isShow = false;
        this.title = "";
        this.message = "";
        this.zindex = zindex;
        this.dialogOption = InitDialogOption();
    }
    public yesClick: any;
    public noClick: any;
    public cancelClick: any;
}

export const InitDialogOption = (): IDialogOption => {
    return {
        yes: {
            isShow: true,
            label: "Yes",
        },
        no: {
            isShow: true,
            label: "No",
        },
        cancel: {
            isShow: true,
            label: "キャンセル",
        },
        isRightBottonYes: true,
    }
}

export interface IDialogOption {
    yes: {
        isShow: boolean;
        label: string;
    };
    no: {
        isShow: boolean;
        label: string;
    };
    cancel: {
        isShow: boolean;
        label: string;
    }
    isRightBottonYes: boolean;
}
