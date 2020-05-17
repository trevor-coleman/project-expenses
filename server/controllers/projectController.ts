import {Request, Response} from 'express';
import ProjectList from 'models/ProjectList';
import { InvalidPropertyError, RequiredParameterError, UniqueConstraintError } from '../../classes/errors';
import makeHttpError from '../../classes/errors/http-error';
import ProjectFactory, { ProjectSchema } from '../../classes/projects/ProjectFactory';
import Database from 'database';

const db = Database.makeDb()
const projectList = new ProjectList({ db })

export const addProject = async (req: Request, res: Response) =>  {
    console.log("\nPOST---")
    console.log(req.body);

    try {
        let projectSchema = req.body as ProjectSchema;
        if (!projectSchema) {
            res.send("Bad request").status(400)
        }

        console.log("posting")

        const project = ProjectFactory.makeProject(projectSchema);
        console.log("make Project")
        const result = await projectList.add(project)
        console.log("success", result)

    } catch (e) {
        console.log(e);
    }

    res.send();
};