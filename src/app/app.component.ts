import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pwa-demo';
  eventListener : any;
  openCamera(){
    (window as any).sendMessageToFlutter('open-camera');
  }

  ngOnInit(): void {
    // Listen for the custom event from index.js
    window.addEventListener('messageFromMobileApp', this.messageFromMobileApp);
  }

  messageFromMobileApp(event: any) : void{
    alert('new Message Received');
    debugger;
    alert(event.detail);
  }

  ngOnDestroy(): void {
    // Clean up the event listener when the component is destroyed
    window.removeEventListener('messageFromMobileApp', this.messageFromMobileApp);
  }
}
