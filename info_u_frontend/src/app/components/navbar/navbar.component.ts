import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, AfterContentChecked } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Navigation } from '../../shared/singleton/navigation';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  @ViewChild('navbarToggler', {static: true}) navbarToggler:ElementRef;
  
  constructor(private afsAuth: AngularFireAuth, public authService: AuthService, private router: Router) { }
  
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

  onLogout() {
    //this.authService.logout();
    this.authService.signOut();
  }

}
