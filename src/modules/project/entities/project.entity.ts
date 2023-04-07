import {Column,Entity,OneToMany} from "typeorm"
import { BaseEntity } from "../../../database/base.entity";
import { IProject } from "../../../interfaces/project.interface";
import { UserProjectsEntity } from "../../../user/entities/usersProjects.entity";


@Entity({name:'projects'})
export class ProjectEntity extends BaseEntity implements IProject {
    @Column()
    name:string;

    @Column()
    description:string

    @OneToMany(()=>UserProjectsEntity,(userProjects)=>userProjects.project)
    projectsIncludes:UserProjectsEntity[]
}
