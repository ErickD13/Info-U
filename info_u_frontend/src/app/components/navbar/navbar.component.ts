import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, AfterContentChecked } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Navigation } from '../../shared/singleton/navigation';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterContentChecked {
  
  @ViewChild('navbarToggler', {static: true}) navbarToggler:ElementRef;
  
  constructor(private afsAuth: AngularFireAuth, private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) { }
  
  // Text
  public app_name = "Info U";
  
  public nav_home = "Inicio";
  public nav_universities = "Universidades";
  public nav_opportunities = "Oportunidades";
  public nav_research = "Nuestra investigación";
  public nav_histories = "Historias de éxito"
  public nav_login = "Inicia sesión"
  public nav_register = "Regístrate"
  public nav_profile = "Perfil"
  public nav_logout = "Cerrar sesión"
  
  public survey_university = "¿Universidad?";
  public survey_career = "¿Tu pasión?";
  
  // Navbar
  public div_home = "#divHome";
  public div_info = "#divInfo";
  public div_universities = "#divUniversities";
  public div_opportunities = "#divOpportunities";
  public div_histories = "#divHistories";
  public div_research = "#divResearch";
  public div_login = "#divLogin";
  public div_register = "#divRegister";
  public div_profile = "#divProfile";
  public div_navbar = "#divNavbar";
  
  isMenuVisible = false;
  
  ['Navigation'] = Navigation;
  
  ngOnInit() {
    this.getCurrentUser();
  }

  ngAfterContentChecked() {
    
  }
  
  toggleControl(){
    this.isMenuVisible = !this.isMenuVisible;
  }
  
  collapseNav(div: string) {
    this.hideNav();
    Navigation.current_div = div;
  }
  
  hideNav() {
    if (this.isMenuVisible) {
      this.navbarToggler.nativeElement.click();
      this.isMenuVisible = false;
    }
  }
  
  onLogin() {
    this.router.navigate(['user/login']);
  }

  onRegister() {
    this.router.navigate(['user/register']);
  }

  onProfile() {
    this.router.navigate(['user/profile']);
  }

  onHome() {
    this.router.navigate(['/']);
  }

  getCurrentUser() {
    //this.authService.getUser();
    this.authService.is_user_loggedin;
  }

  onLogout() {
    //this.authService.logout();
    this.afsAuth.auth.signOut();
    this.onHome();
  }

}
