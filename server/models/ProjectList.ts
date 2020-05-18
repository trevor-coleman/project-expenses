import ProjectFactory, { ProjectSchema, ProjectInterface, ProjectType } from '../classes/projects/ProjectFactory';
import ADbList, { ListCreatedResult } from './ADbList';

export type CreateProjectResult = ListCreatedResult<ProjectType>

export default class ProjectList extends ADbList<ProjectType, ProjectSchema, ProjectInterface> {
 make(projectSchema:ProjectSchema):ProjectType{
     return ProjectFactory.makeProject(projectSchema);
 }

    public collectionName(): string {
        return 'projects';
    }

    public makeSchema(project: ProjectType): ProjectSchema {
        return ProjectFactory.makeSchema(project);
    }
}