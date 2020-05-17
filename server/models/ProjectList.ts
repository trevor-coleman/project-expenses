import ProjectFactory, { ProjectSchema, ProjectInterface, ProjectType } from '../../classes/projects/ProjectFactory';
import ADbList from './ADbList';

export default class ProjectList extends ADbList<ProjectType, ProjectSchema, ProjectInterface> {
 make(projectSchema:ProjectSchema):ProjectType{
     return ProjectFactory.makeProject(projectSchema);
 }

    public collectionName(): string {
        return 'projects';
    }
}