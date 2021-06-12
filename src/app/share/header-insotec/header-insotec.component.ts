import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-insotec',
  templateUrl: './header-insotec.component.html',
  styleUrls: ['./header-insotec.component.scss'],
})
export class HeaderInsotecComponent implements OnInit {

  @Input() inicio = true;
  @Input() fin = true;
  login = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.getUser().subscribe(user => {
      console.log('app-header-insotec', this.fin);
      if (user) {
        this.login = true;
      }else {
        this.login = false;
      }
    })
  }

  goTo() {
    const url = this.login ? 'inicio' : 'login';
    this.router.navigateByUrl(url, {replaceUrl:true});
  }
}
