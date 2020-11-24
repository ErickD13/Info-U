import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Navigation } from '../../shared/singleton/navigation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  @ViewChild('navbarToggler', {static: true}) navbarToggler:ElementRef;
  
  constructor(private authService: AuthService, private afsAuth: AngularFireAuth, private router: Router) { }
  
  // Text
  public app_name = "Info U";
  
  public isLogged = false;
  
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
  public div_login = "#login";
  public div_register = "#register";
  public div_profile = "#profile";
  
  isMenuVisible = false
  
  ngOnInit() {
    this.getCurrentUser();
  }
  
  toggleControl(){
    this.isMenuVisible = !this.isMenuVisible;
    console.log(this.isMenuVisible);
  }
  
  collapseNav(div: string) {
    this.navbarToggler.nativeElement.click();
    this.isMenuVisible = false;
    if((Navigation.current_div == this.div_login || Navigation.current_div == this.div_register || Navigation.current_div == this.div_profile) &&
      (div == this.div_home || div == this.div_universities || div == this.div_opportunities || div == this.div_histories || div == this.div_research)){
      this.router.navigate(['/'])
    }
    Navigation.current_div = div;
  }
  
  hideNav() {
    if (this.isMenuVisible) {
      this.navbarToggler.nativeElement.click();
      this.isMenuVisible = false;
    }
  }
  
  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }
  
  onLogout() {
    this.afsAuth.auth.signOut().then(() => {
      this.router.navigate(['/'])
    });
  }
  
}
