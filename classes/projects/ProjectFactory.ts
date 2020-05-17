import Project, { IProject } from './Project';
import * as Schema from '../Schema'

export type ProjectSchema = Schema.Project;
export type ProjectInterface = IProject;
export type ProjectType = Project

export default class ProjectFactory {

    static makeProject(projectSchema: ProjectSchema): ProjectType  {
        const {
            _id, userId, startDate, endDate, totalRevenue, totalHSTCollected, totalHSTSpent, totalExpenses, incomeTaxRate, numberOfOrders,
        } = projectSchema;

        const newProjectData: ProjectInterface = {
            _id: _id+"",
            userId: userId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            totalRevenue: totalRevenue,
            totalHSTCollected,
            totalHSTSpent,
            totalExpenses,
            incomeTaxRate,
            numberOfOrders,
        };

        return new Project(newProjectData);
    }


}