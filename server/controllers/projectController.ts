import {Request, Response} from 'express';

export let allProjects = (req: Request, res: Response) => {
    res.send("Returns all projects")
}

export let getProject = (req: Request, res: Response) => {
    res.send("Returns one project")
}

export let deleteProject = (req: Request, res: Response) => {
    res.send("Returns one project");
};

export let updateProject = (req: Request, res: Response) => {
    res.send("Returns one project");
};

export let addProject = (req: Request, res: Response) => {
    res.send("Returns one project");
};