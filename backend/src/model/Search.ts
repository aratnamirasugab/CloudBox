import {Folder} from "../database/model/Folder";
import {File} from "../database/model/File";

export class SearchResults {
    private _files: File[] = [];
    private _folders: Folder[] = [];

    constructor(files: File[], folders: Folder[]) {
        this._files = files;
        this._folders = folders;
    }

    get files(): File[] {
        return this._files;
    }

    get folders(): Folder[] {
        return this._folders;
    }
}