import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  _url = "http://localhost:3000/contacts";
  contacts;
  pages;
  
  constructor(private http: HttpClient) { }
  // [?] (GET) get All Contacts
  getContacts(pageNum) {
    return this.http.get(this._url +'?page=' + pageNum)
  }
  // [?] get Contact by :id
  getSelectedContact(id) {
    return this.http.get(this._url + '/' + id)
  }
  //[?] (POST) Create Contact
  createContact(newContact) {
    return this.http.post(this._url, newContact)
  }
  // [?] (PUT) udpate Contact
  updateContact(id, updatedContact) {
    return this.http.put(this._url + '/' + id, updatedContact)
  }
  //[?] (DELETE) delete Contact
  deleteContact(id) {
    return this.http.delete(this._url + '/' + id)
  }
}
