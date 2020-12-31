<script lang="ts">
import { defineComponent, reactive } from "vue";

import VcDialog from "@/component/vue-dialog/vue-dialog.vue"

import { DialogData, Dialog, DialogResult, IDialogOption, InitDialogOption } from "@/component/vue-dialog/vue-dialog.ts"

interface IState {
    dialogData: DialogData;
    dialogResult1: DialogResult | null;
    dialogResult2: DialogResult | null;
    dialogOption: {
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
}


export default defineComponent({
    components: {
        "vc-dialog": VcDialog,
    },
    setup() {
        const state = reactive < IState > ({
            dialogData: new DialogData(2000),
            dialogResult1: null,
            dialogResult2: null,
            dialogOption: {
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
        });

        const dialog: Dialog = new Dialog(state.dialogData);
        const showDialog = async () => {
            const ret: DialogResult = await dialog.Show("たいとる", "めっせーじ");
            if (ret == DialogResult.Yes) {
                console.log("Yesが押されました")
            } else if (ret == DialogResult.No) {
                console.log("Noが押されました")
            } else if (ret == DialogResult.Cancel) {
                console.log("Cancelが押されました")
            }
            state.dialogResult1 = ret;
        };


        const showDialogCustomMessage = async () => {
            try {
                const dialogOption: IDialogOption = InitDialogOption();
                dialogOption.yes.isShow = state.dialogOption.yes.isShow;
                dialogOption.yes.label = state.dialogOption.yes.label;
                dialogOption.no.isShow = state.dialogOption.no.isShow;
                dialogOption.no.label = state.dialogOption.no.label;
                dialogOption.cancel.isShow = state.dialogOption.cancel.isShow;
                dialogOption.cancel.label = state.dialogOption.cancel.label;
                dialogOption.isRightBottonYes = state.dialogOption.isRightBottonYes;
                const ret: DialogResult = await dialog.Show("詳細オプション指定", "めっせーじ", dialogOption);
                if (ret == DialogResult.Yes) {
                    console.log("Yesが押されました")
                } else if (ret == DialogResult.No) {
                    console.log("Noが押されました")
                } else if (ret == DialogResult.Cancel) {
                    console.log("Cancelが押されました")
                }
                state.dialogResult2 = ret;

            } catch (error) {
                state.dialogResult2 = error;
            }
        };
        return {
            state,
            showDialog,
            showDialogCustomMessage
        }
    },
});
</script>

<template>
<vc-dialog :data="state.dialogData"></vc-dialog>
<div class="container">
    <div class="card mt-4">
        <div class="card-header bg-primary text-white">
            ダイアログ（デフォルトで使用）
        </div>
        <div class="card-body">
            <div class="mb-3">
                <button type="button" class="btn btn-primary w-100" @click="showDialog">ダイアログ表示</button>
            </div>
            <div class="mb-3">
                <label class="form-label">ダイアログ選択結果</label>
                <input type="text" class="form-control" readonly :value="state.dialogResult1">
            </div>
        </div>
    </div>
    <div class="card mt-4">
        <div class="card-header bg-primary text-white">
            ダイアログ（詳細オプション指定）
        </div>
        <div class="card-body">
            <div class="mb-3">
                <label class="form-label">Yesラベル</label>
                <input type="text" class="form-control" v-model="state.dialogOption.yes.label">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="checkbox1" v-model="state.dialogOption.yes.isShow">
                    <label class="form-check-label" for="checkbox1">「Yes」ボタン表示</label>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Noラベル</label>
                <input type="text" class="form-control" v-model="state.dialogOption.no.label">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="checkbox2" v-model="state.dialogOption.no.isShow">
                    <label class="form-check-label" for="checkbox2">「No」ボタン表示</label>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Noラベル</label>
                <input type="text" class="form-control" v-model="state.dialogOption.cancel.label">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="checkbox3" v-model="state.dialogOption.cancel.isShow">
                    <label class="form-check-label" for="checkbox3">「キャンセル」ボタン表示</label>
                </div>
            </div>
            <div class="mb-3">
                <button type="button" class="btn btn-primary w-100" @click="showDialogCustomMessage">ダイアログ表示</button>
            </div>
            <div class="mb-3">
                <label class="form-label">ダイアログ選択結果</label>
                <input type="text" class="form-control" readonly :value="state.dialogResult2">
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
</style>
