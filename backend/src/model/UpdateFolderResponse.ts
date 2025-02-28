export class UpdateFolderResponse {
    affected: boolean;
    rowsAffected: number;

    constructor(affected: boolean = false, rowsAffected: number) {
        this.rowsAffected = rowsAffected;
        this.affected = affected;
    }
}