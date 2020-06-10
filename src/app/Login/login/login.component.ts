import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    window.addEventListener("resize", function () {
      resizeContentHolder();
    });
    // [?] resize the content container holder to fit the window height size
    function resizeContentHolder() {
      var innerWidth = window.innerWidth;
      var innerHeightWithoutNav = window.innerHeight //- 56;
      if (innerWidth < 992) {
        document.getElementById('loginFormHolder').style.height = innerHeightWithoutNav + 'px'
      } else {
        if (innerHeightWithoutNav > 700) {
          document.getElementById('loginFormHolder').style.height = innerHeightWithoutNav + 'px'
        } else {
          document.getElementById('loginFormHolder').style.height = 700 + 'px'
        }
      }
    }
    // [?] on load at ther realtime
    resizeContentHolder();
  }

}
