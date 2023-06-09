import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AccessLevelGuard } from '../auth/guards/access-level.guard';
import { AccessLevel } from '../auth/decorators/access-level.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { PublicAccess } from '../auth/decorators/public.decorators';

@ApiTags('Projects')
@Controller('project')
@UseGuards(AuthGuard,RolesGuard,AccessLevelGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiHeader({
    name: 'auth_token'
  })
  @ApiParam({
    name: 'userId'
  })
  @Roles('CREATOR')
  @Post('register/userOwner/:userId')
  create(@Body() createProjectDto: CreateProjectDto,@Param('userId')userId:string) {
    return this.projectService.createProject(createProjectDto,userId);
  }
  @ApiHeader({
    name: 'auth_token'
  })
  @Get('all')
  findAll() {
    return this.projectService.findAll();
  }

  @ApiParam({
    name: 'id'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @ApiParam({
    name: 'id'
  })
  @AccessLevel('OWNER')
  @Patch('edit/:id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.projectService.deletProject(id);
  }

  @PublicAccess()
  @Get('list/api')
  public async listApi(){
    return this.projectService.listApi()
  }
}
