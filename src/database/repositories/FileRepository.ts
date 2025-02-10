import {File} from '../model/File';

export class FileRepository {
    async findById(id: number): Promise<File> {
        return await File.findByPk(id);
    }

    async create(file: File): Promise<File> {
        return await File.create(file);
    }
}