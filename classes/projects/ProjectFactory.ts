import Dinero from 'dinero.js'
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

        console.log("inside our own town")
        console.log(projectSchema)

        const newProjectData: ProjectInterface = {
            _id: _id+"",
            userId: userId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            totalRevenue: Dinero({amount: totalRevenue, currency:"CAD"}),
            totalHSTCollected: Dinero({amount: totalHSTCollected, currency:"CAD"}),
            totalHSTSpent: Dinero({amount: totalHSTSpent, currency:"CAD"}),
            totalExpenses: Dinero({amount: totalExpenses, currency:"CAD"}),
            incomeTaxRate,
            numberOfOrders,
        };

        console.log("we waited for the wolves")

        return new Project(newProjectData);
    }


}