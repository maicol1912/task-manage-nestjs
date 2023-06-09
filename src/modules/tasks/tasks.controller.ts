import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDTO } from './dto/create-task.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AccessLevelGuard } from '../auth/guards/access-level.guard';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiHeader({
    name: 'auth_token'
  })
  @ApiParam({
    name: 'projectId'
  })
  @Post('create/:projectId')
  public async create(@Body() createTaskDto: CreateTasksDTO,@Param('projectId')projectId:string) {
    return this.tasksService.createTask(createTaskDto,projectId);
  }
}
