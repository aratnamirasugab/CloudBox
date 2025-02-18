export class ObjectRestorationResponse {
    impactedFileAmount: number;
    impactedFolderAmount: number;

    constructor(impactedFileAmount: number, impactedFolderAmount: number) {
        this.impactedFileAmount = impactedFileAmount;
        this.impactedFolderAmount = impactedFolderAmount;
    }
}