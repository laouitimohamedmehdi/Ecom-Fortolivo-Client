import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideHttpClient, withFetch } from '@angular/common/http';  // Importing HttpClient and fetch configuration
// import { provideRouter } from '@angular/router';  // Importing routing if you're using it

// // Bootstrap the Angular application
// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(withFetch()),  // Enable fetch for HttpClient
//     provideRouter([])  // If you're using routing, replace with your actual route configuration
//   ]
// })
//   .catch(err => console.error(err));  // Catch any errors that occur during bootstrapping

// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideHttpClient } from '@angular/common/http'; // Import the HttpClient provider
// import { AppComponent } from './app/app.component';       // Import the root component

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient() // Provide the HttpClient service globally
//   ]
// }).catch(err => console.error('Error during app bootstrapping', err));