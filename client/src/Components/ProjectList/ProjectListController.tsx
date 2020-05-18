import { observable } from 'mobx';
import ProjectList from './ProjectList';
import React, { FunctionComponent } from 'react';
import axios from 'axios'
import { useObserver } from 'mobx-react';
import * as Schema from '../../../../classes/Schema'

interface IProjectListControllerProps {}

type ProjectListControllerProps = IProjectListControllerProps;

const ProjectListController: FunctionComponent<IProjectListControllerProps> = (props: ProjectListControllerProps) => {
    let projects = observable([])

    axios.get('/api/5ec1d99c73b4e52eeab42346/projects').then((response)=>{
        projects.replace(response.data)
    })



    return useObserver(() => (
        <ProjectList projects={projects}/>
    ));
};

export default ProjectListController;