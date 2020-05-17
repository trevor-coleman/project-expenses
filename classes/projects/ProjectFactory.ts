import Database from 'database';
import Dinero from 'dinero.js'
import Project, { IProject } from './Project';
import * as Schema from '../Schema'

export type ProjectSchema = Schema.Project;
export type ProjectInterface = IProject;
export type ProjectType = Project

export default class ProjectFactory {

    static makeProject(projectSchema: ProjectSchema): ProjectType  {
        const validatedSchema =  ProjectFactory.validateSchema(projectSchema)

        const {
            _id, userId, startDate, endDate, totalRevenue, totalHSTCollected, totalHSTSpent, totalExpenses, incomeTaxRate, numberOfOrders,
        } = validatedSchema;

        const newProjectData: ProjectInterface = {
            _id: _id,
            userId: userId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            totalRevenue: Dinero(totalRevenue),
            totalHSTCollected: Dinero(totalHSTCollected),
            totalHSTSpent: Dinero(totalHSTSpent),
            totalExpenses: Dinero(totalExpenses),
            incomeTaxRate,
            numberOfOrders,
        };
        return new Project(newProjectData);
    }

    static makeSchema(project:Project): ProjectSchema {
        const {
            _id, userId, startDate, endDate, totalRevenue, totalHSTCollected, totalHSTSpent, totalExpenses, incomeTaxRate, numberOfOrders,
        } = project;

        const projectSchema: ProjectSchema = {
            _id: Database.makeId(_id),
            userId: userId,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
            totalRevenue: totalRevenue.toObject(),
            totalHSTCollected: totalHSTCollected.toObject(),
            totalHSTSpent: totalHSTSpent.toObject(),
            totalExpenses: totalExpenses.toObject(),
            incomeTaxRate,
            numberOfOrders,
        };



        return ProjectFactory.validateSchema(projectSchema)
    }


    static validateSchema(projectSchema:ProjectSchema) : ProjectSchema {
        try{
            const {
                _id, userId, startDate, endDate, totalRevenue, totalHSTCollected, totalHSTSpent, totalExpenses, incomeTaxRate, numberOfOrders,
            } = projectSchema;

            Database.validateIds([_id, userId]);
            Database.validateDate(startDate);
            Database.validateDate(endDate);
            [totalRevenue, totalExpenses, totalHSTSpent, totalHSTCollected].forEach(
                (item)=>{
                    Database.validateMoney(item);
                }
            )
            Database.validatePercent(incomeTaxRate);
            Database.validateNumber(numberOfOrders);

        } catch (e){
            throw new Error(`Schema Failed Validation - ${e}`);
        }



        return projectSchema;
    }
}