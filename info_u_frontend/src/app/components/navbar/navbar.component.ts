import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  @ViewChild('dialogScrollingContainer', {static: true}) dialogScrollingContainer: any;
  @ViewChild('navbarToggler', {static: true}) navbarToggler:ElementRef;
  
  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }
    
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
    
    isMenuVisible = false
    
    ngOnInit() {
      this.getCurrentUser();
    }
  
    toggleControl(){
      this.isMenuVisible = !this.isMenuVisible;
      console.log(this.isMenuVisible);
    }

    collapseNav() {
      this.navbarToggler.nativeElement.click();
      this.isMenuVisible = false;
    }

    hideNav() {
      if (this.isMenuVisible) {
        this.navbarToggler.nativeElement.click();
        this.isMenuVisible = false;
      }
    }

    public myEasing = (t: number, b: number, c: number, d: number): number => {
      // easeInOutExpo easing
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      }
  
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }

    doSmth(reachedTarget: boolean): void {
        if (reachedTarget) {
            console.log('Yeah, we reached our destination');
        } else {
            console.log('Ohoh, something interrupted us');
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
      this.afsAuth.auth.signOut();
    }
    
  }
  