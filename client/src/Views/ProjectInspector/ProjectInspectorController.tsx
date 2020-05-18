import { Button } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { useObserver } from 'mobx-react';
import ProjectInspector from './ProjectInspector';
import store from '../../store'


interface IProjectInspectorControllerProps {}

type ProjectInspectorControllerProps = IProjectInspectorControllerProps;

const ProjectInspectorController: FunctionComponent<IProjectInspectorControllerProps> = (props: ProjectInspectorControllerProps) => {
    const {project} = store;
    return useObserver(() => (
        <ProjectInspector project={project}/>
    ));
};

export default ProjectInspectorController;