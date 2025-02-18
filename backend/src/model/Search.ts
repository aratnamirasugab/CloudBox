import {Folder} from "../database/model/Folder";
import {File} from "../database/model/File";

export class SearchResults {
    files: File[] = [];
    folders: Folder[] = [];

    constructor(files: File[], folders: Folder[]) {
        this.files = files;
        this.folders = folders;
    }
}