import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public loginForm: FormGroup = FormGroup.prototype;
  public roles: Role[] = [];
  public users: User[] = [];

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private roleService: RoleService,
    private userService: UserService) { }

  ngOnInit(): void {
    Promise.all([this.getAllRoles(), this.getAllUsers()]).then(x => {
      this.loginForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    });
  }

  getUserRole(roleId: number) {
    return this.roles.find(x => x.id === roleId)?.name;
  }

  async deleteUser(userId: number) {
    if (userId) {
      await this.userService.deleteUserAsync(userId).then(async x => {
        await this.getAllUsers();
      });
    }
  }

  async getAllRoles(){
    await this.roleService.getAllRolesAsync().then(x => {
      this.roles = x;
    });
  }

  async getAllUsers(){
    await this.userService.getAllUsersAsync().then(x => {
      this.users = x;
    });
  }

  get f() { return this.loginForm.controls; }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    var user = new User();
    user.name = this.f.name.value;
    user.email = this.f.email.value;
    user.password = this.f.password.value;
    user.roleId = 2;
    await this.userService.createUserAsync(user).then(async x => {
      await this.getAllUsers();
    });
  }
  logout() {
    this.router.navigate(['logout']);
  }
}
